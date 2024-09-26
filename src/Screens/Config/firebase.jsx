// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAXFRN0tWv3TEMoBw01t-krb48xMTHeF5I",
    authDomain: "todo-app-67528.firebaseapp.com",
    projectId: "todo-app-67528",
    storageBucket: "todo-app-67528.appspot.com",
    messagingSenderId: "487757996655",
    appId: "1:487757996655:web:c91f4a1cafcc892894239a",
    measurementId: "G-GVLC7SJ6VH"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getFirestore(app)

export {auth,database}