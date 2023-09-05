import { firebase } from "../lib/firebase";
import "firebase/compat/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

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
      const error = new Error("Username should be at least 4 characters long");
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
      return { error: true, message: "user not found please register first" };
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

export async function uploadPost(creds) {
  const { title, description, file, postedBy } = creds;
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

async function addPostToFirestore(postData) {
  return firebase.firestore().collection("post").add(postData);
}

async function updatePostId(docRef) {
  return docRef.update({ postId: docRef.id });
}

async function incrementPostCount(userId) {
  const userRef = firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId);
  const querySnapshot = await userRef.get();

  const documentSnapshot = querySnapshot.docs[0];
  const userDocRef = documentSnapshot.ref;
  const { post } = (await userDocRef.get()).data();
  // Update the document using userDocRefc
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

// export async function fetchPostOfCurrentUser(userId) {
//   const postRef = firebase.firestore().collection("posts");
// }

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
      console.log(snap);
      const data = snap.docs[0].data();
      return { username: data.username, profilePic: data.profilePic };
    });
  return user;
}
