import { firebase } from "@react-native-firebase";

import "@firebase/compat/auth";
import "@firebase/compat/firestore";
import App from "./App";
import { name as appName } from "./app.json";
import { name as appName } from "./app.json";

const firebaseconfig = {
  apiKey: "AIzaSyAQiTAy65HLAYeUIPUetFsJxlpyD4LNqVg",
  authDomain: "test-33fba.firebaseapp.com",
  projectId: "test-33fba",
  storageBucket: "test-33fba.appspot.com",
  messagingSenderId: "265536636843",
  appId: "1:265536636843:web:a265890d47abf73d7334ee",
  measurementId: "G-BDZXP5GZBF",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
