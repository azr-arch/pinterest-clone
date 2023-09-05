import Firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyBhB-g1e9zccRs6goo1gpc3jSStc02qQCM",
  authDomain: "pointerest-4877f.firebaseapp.com",
  projectId: "pointerest-4877f",
  storageBucket: "pointerest-4877f.appspot.com",
  messagingSenderId: "835830196270",
  appId: "1:835830196270:web:0ee7e518412ddaf9a717bf",
};

const firebase = Firebase.initializeApp(config);
const db = firebase.firestore();

const { FieldValue } = Firebase.firestore;

export { FieldValue, firebase, db };
