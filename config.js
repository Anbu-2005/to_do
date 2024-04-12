import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database";

const firebaseconfig = {
  apiKey: "AIzaSyBl0w_xCvutspmeycFNrcg-qRWy1kzwsJY",
  authDomain: "final2-7129f.firebaseapp.com",
  databaseURL:
    "https://final2-7129f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "final2-7129f",
  storageBucket: "final2-7129f.appspot.com",
  messagingSenderId: "699984483201",
  appId: "1:699984483201:web:1f4897ef15d0dda7090e80",
  measurementId: "G-8C24QMPX3K",
};
if (firebase.apps.length == 0) {
  firebase.initializeApp(firebaseconfig);
}
const db = getDatabase();

export { db };
