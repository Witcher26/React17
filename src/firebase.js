// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFtnHQgFDopz5CAF0OiHDDHe9Rxb0eRa0",
  authDomain: "todosbywitcher.firebaseapp.com",
  projectId: "todosbywitcher",
  storageBucket: "todosbywitcher.appspot.com",
  messagingSenderId: "823536152192",
  appId: "1:823536152192:web:6d628cdb22055a5ce08065",
  databaseURL: "https://todosbywitcher-default-rtdb.europe-west1.firebasedatabase.app/:null",
  
};

const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;

// Initialize Firebase
const app = initializeApp(firebaseConfig);