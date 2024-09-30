// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-VqSy_yhbL8-1Vj-wOXxgNqGYDyLWc0I",
  authDomain: "art-cdfd5.firebaseapp.com",
  projectId: "art-cdfd5",
  storageBucket: "art-cdfd5.appspot.com",
  messagingSenderId: "536420245664",
  appId: "1:536420245664:web:c512eb312fcbacebe6e9c5",
  measurementId: "G-P093NF5VVM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth,app}