// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTVb-X4F6OCUkt3XqUb5p9PtgcHvWZxhk",
  authDomain: "flashcardsaas-91ec3.firebaseapp.com",
  projectId: "flashcardsaas-91ec3",
  storageBucket: "flashcardsaas-91ec3.appspot.com",
  messagingSenderId: "1056797228061",
  appId: "1:1056797228061:web:59bb343d7b91110f27daf4",
  measurementId: "G-NHW9RW35PW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}