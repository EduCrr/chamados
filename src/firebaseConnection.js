import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

let firebaseConfig = {
  apiKey: "AIzaSyBP3MQk-V6ddULE_ymYVGEABMIxbXf_148",
  authDomain: "chamados-1cbd5.firebaseapp.com",
  projectId: "chamados-1cbd5",
  storageBucket: "chamados-1cbd5.appspot.com",
  messagingSenderId: "468734603063",
  appId: "1:468734603063:web:73b8c7a6162c841cf5f4b2",
  measurementId: "G-J2X6JJ4GB0",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase;
