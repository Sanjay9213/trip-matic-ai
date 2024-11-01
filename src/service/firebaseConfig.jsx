// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAykE6mQDYyaoCRnag2VGB2POfYkYI0hG0",
  authDomain: "tripmatic-ai.firebaseapp.com",
  projectId: "tripmatic-ai",
  storageBucket: "tripmatic-ai.appspot.com",
  messagingSenderId: "1067681025661",
  appId: "1:1067681025661:web:af20bed9f10e17a736eb14",
  measurementId: "G-M3QWPVLS4F"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);