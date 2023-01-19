
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDX0yzRoXgr4B6fp_fygcM7HzkMVhy07yI",
  authDomain: "bosswepapp.firebaseapp.com",
  projectId: "bosswepapp",
  storageBucket: "bosswepapp.appspot.com",
  messagingSenderId: "43428657964",
  appId: "1:43428657964:web:319f2ceee36c108de4ca89",
  measurementId: "G-2EKSY73K74"
};

export const app = initializeApp(firebaseConfig);
export default getFirestore()

