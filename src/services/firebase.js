import { firebase, db } from "../lib/firebase";
import "firebase/compat/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { arrayRemove, arrayUnion, updateDoc } from "firebase/firestore";

const auth = getAuth();

const getUserDocRef = async (userId) => {
    const userDoc = await db
        .collection("users")
        .where("userId", "==", userId)
        .get();

    return userDoc.docs[0].ref;
};

const getPostDocRef = async (postId) => {
    const postDoc = await db
        .collection("post")
        .where("postId", "==", postId)
        .get();

    return postDoc.docs[0].ref;
};

export async function getCurrentUser() {
    const user = await new Promise((resolve) =>
        onAuthStateChanged(auth, resolve)
    );
    if (user) {
        return await findUser(user.email);
    } else {
        throw new Error("user is not logged in");
    }
}

async function findUser(email) {
    return firebase
        .firestore()
        .collection("users")
        .where("email", "==", email)
        .get()
        .then((snap) => snap.docs[0].data());
}

export function doesUserExists(username) {
    return new Promise((resolve, reject) => {
        // Check username length
        if (username.length <= 0) resolve(false);

        if (username.length < 3) {
            const error = new Error(
                "Username should be at least 4 characters long"
            );
            error.code = "auth/username_length";
            reject(error);
        }

        // Check username format
        const usernameRegex = /^[a-zA-Z0-9_.]+$/;
        if (!usernameRegex.test(username)) {
            const error = new Error(
                "Username should contain only letters, numbers and special characters like '.' or '_' "
            );
            error.code = "auth/username_format";
            reject(error);
        }

        firebase
            .firestore()
            .collection("users")
            .where("username", "==", username)
            .get()
            .then((result) => {
                const userExists = !result.empty;
                if (userExists) {
                    const error = new Error("username is already in use");
                    error.code = "auth/username already in use";
                    reject(error);
                } else {
                    resolve(false);
                }
            });
    });
}

export async function handleLogin(creds) {
    try {
        await firebase
            .auth()
            .signInWithEmailAndPassword(creds.email, creds.password);
        const { username } = await findUser(creds.email);

        localStorage.setItem("loggedIN", true);
        localStorage.setItem("username", username);
        return { status: "ok" };
    } catch (e) {
        if (e.code === "auth/user-not-found") {
            return {
                error: true,
                message: "user not found please register first",
            };
        } else {
            return { error: true, message: "invalid username or password" };
        }
    }
}

export async function handleRegistration(creds) {
    try {
        const createdUser = await firebase
            .auth()
            .createUserWithEmailAndPassword(creds.email, creds.password);

        await createdUser.user.updateProfile({
            displayName: creds.username,
        });

        await firebase.firestore().collection("users").add({
            userId: createdUser.user.uid,
            username: creds.username.toLowerCase(),
            fullname: creds.fullname,
            email: creds.email.toLowerCase(),
            profilePic: null,
            dateCreated: Date.now(),
            post: 0,
        });

        localStorage.setItem("loggedIN", true);
        localStorage.setItem("username", creds.username.toLowerCase());

        return { status: "ok" };
    } catch (e) {
        console.log(e);
        if (e.code === "auth/email-already-in-use") {
            //auth/email-already-in-use
            return { error: true, message: "email is already in use" };
        } else if (e.code === "auth/weak-password") {
            // auth/weak-password
            return { error: true, message: "weak password" };
        } else {
            //auth/username already in use
            return { error: true, message: "username already in use" };
        }
    }
}

export async function logoutUser() {
    try {
        await firebase.auth().signOut();
        localStorage.removeItem("loggedIN");
        localStorage.removeItem("username");
        window.location.href = "/";
    } catch (e) {
        console.log(e);
    }
}

export async function uploadPost(data) {
    const { title, description, file, postedBy, tag } = data;
    const storageRef = firebase
        .storage()
        .refFromURL("gs://pointerest-4877f.appspot.com/" + file.name);

    try {
        await uploadFile(storageRef, file);
        console.log("File uploaded successfully");

        const downloadURL = await storageRef.getDownloadURL();
        console.log("Post added to Firestore");

        incrementPostCount(postedBy);

        const newPostRef = await addPostToFirestore({
            postedBy,
            likes: 0,
            title,
            description,
            imageURL: downloadURL,
            tag: arrayUnion(tag),
        });

        await updatePostId(newPostRef);
        console.log("Added post ID");
    } catch (error) {
        console.error("Error uploading post:", error);
    }
}

async function uploadFile(storageRef, file) {
    return new Promise((resolve, reject) => {
        const task = storageRef.put(file);
        task.on(
            "state_changed",
            (progress) => {},
            (error) => {
                reject(error);
            },
            () => {
                resolve();
            }
        );
    });
}

export async function updateUserProfile(file) {
    const storageRef = firebase
        .storage()
        .refFromURL("gs://pointerest-4877f.appspot.com/" + file.name);
    const userDocRef = await getUserDocRef(auth.currentUser.uid);
    try {
        await uploadFile(storageRef, file);
        const downloadURL = await storageRef.getDownloadURL();
        console.log(downloadURL);
        await updateDoc(userDocRef, {
            profilePic: downloadURL,
        });
        console.log("uploaded profile successfully");
    } catch (e) {
        console.log(
            "error updating profile please try again later! ",
            e.message
        );
    }
}

async function addPostToFirestore(postData) {
    return firebase.firestore().collection("post").add(postData);
}

async function updatePostId(docRef) {
    return docRef.update({ postId: docRef.id });
}

async function incrementPostCount(userId) {
    const userDocRef = await getUserDocRef(userId);
    const { post } = (await userDocRef.get()).data();
    // Updating the document using userDocRefc
    await userDocRef.update({ post: post + 1 });
}

export async function fetchAllPosts() {
    const posts = [];
    await firebase
        .firestore()
        .collection("post")
        .get()
        .then((snapShot) => {
            snapShot.forEach((doc) => {
                posts.push(doc.data());
            });
        });
    return posts;
}

// ToDO --> changes required to filter based on Tags
export async function filteredPosts(filterBy) {
    const posts = [];
    await firebase
        .firestore()
        .collection("post")
        .where("tag", "array-contains", filterBy)
        .get()
        .then((snapShot) => {
            snapShot.forEach((doc) => {
                posts.push(doc.data());
            });
        });
    return posts;
}

async function getUserIdByUsername(name) {
    return await firebase
        .firestore()
        .collection("users")
        .where("username", "==", name)
        .get()
        .then((snap) => {
            return snap.docs[0].data().userId;
        });
}

export async function fetchSavedPosts(userName) {
    const userId = await getUserIdByUsername(userName);
    const userDocRef = await getUserDocRef(userId);
    const userDoc = await userDocRef.get();
    const userData = userDoc.data();
    const savedPosts = userData.savedPosts || [];

    return savedPosts;
}

export async function fetchPostsOfUser(userName) {
    const userId = await getUserIdByUsername(userName);
    const posts = await firebase
        .firestore()
        .collection("post")
        .where("postedBy", "==", userId)
        .get()
        .then((snap) => {
            return snap.docs.map((doc) => doc.data());
        });
    console.log(posts);
    return posts;
}

export async function getPinById(pinId) {
    const pin = await firebase
        .firestore()
        .collection("post")
        .where("postId", "==", pinId)
        .get()
        .then((snap) => {
            return snap.docs[0].data();
        });

    return pin;
}

export async function getUserById(userId) {
    const user = await firebase
        .firestore()
        .collection("users")
        .where("userId", "==", userId)
        .get()
        .then((snap) => {
            const data = snap.docs[0].data();
            return {
                username: data.username,
                profilePic: data.profilePic,
                userId: data.userId,
            };
        });
    return user;
}

export async function getCurrentUserId() {
    return auth.currentUser.uid;
}

export async function savePost(postLink, postId) {
    const userId = auth.currentUser.uid;

    const userDocRef = await getUserDocRef(userId);
    const postDocRef = await getPostDocRef(postId);

    const [userDoc, postDoc] = await Promise.all([
        userDocRef.get(),
        postDocRef.get(),
    ]);

    const [userData, postData] = await Promise.all([
        userDoc.data(),
        postDoc.data(),
    ]);

    const savedPosts = userData.savedPosts || [];

    const isSaved = await checkIfSaved(postId);
    //unsave functionality
    if (isSaved) {
        const postToRemove = savedPosts.find((post) => post.id === postId);

        await Promise.all([
            updateDoc(userDocRef, {
                savedPosts: arrayRemove(postToRemove),
            }),

            updateDoc(postDocRef, {
                savedBy: arrayRemove(userId),
            }),
        ]);

        return false;
    } else {
        // save functionality
        await Promise.all([
            updateDoc(userDocRef, {
                savedPosts: arrayUnion({
                    url: postLink,
                    id: postId,
                }),
            }),
            updateDoc(postDocRef, {
                savedBy: arrayUnion(userId),
            }),
        ]);
        return true;
    }
}

export async function likePost(postId) {
    const userId = auth.currentUser.uid;

    const userDocRef = await getUserDocRef(userId);
    const postDocRef = await getPostDocRef(postId);

    const [userDoc, postDoc] = await Promise.all([
        userDocRef.get(),
        postDocRef.get(),
    ]);

    const [userData, postData] = await Promise.all([
        userDoc.data(),
        postDoc.data(),
    ]);

    const likedBy = postData.likedBy || [];
    const isLiked = likedBy.includes(userId);

    if (isLiked) {
        await Promise.all([
            updateDoc(postDocRef, {
                likedBy: arrayRemove(userId),
            }),
            updateDoc(userDocRef, {
                likedPosts: arrayRemove(postId),
            }),
        ]);
    } else {
        await Promise.all([
            updateDoc(postDocRef, {
                likedBy: arrayUnion(userId),
            }),
            updateDoc(userDocRef, {
                likedPosts: arrayUnion(postId),
            }),
        ]);
        return likedBy.length + 1;
    }
}

export async function checkIfSaved(postId) {
    const userId = auth.currentUser.uid;
    const userDocRef = await getUserDocRef(userId);
    const userDoc = await userDocRef.get();
    const userData = userDoc.data();
    const savedPosts = userData.savedPosts || [];
    return savedPosts.some((post) => post.id === postId);
}

export async function checkIfLiked(postId) {
    const userId = auth.currentUser.uid;
    const postDocRef = await getPostDocRef(postId);
    const postDoc = await postDocRef.get();
    const postData = postDoc.data();
    const likedBy = postData.likedBy || [];
    return [likedBy.includes(userId), likedBy.length];
}
