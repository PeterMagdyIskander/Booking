import firebase from 'firebase/app';
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyC3q1c5zWiUpzVxGHm5lE3XaySf2eouRzU",
  authDomain: "booking-b4b80.firebaseapp.com",
  projectId: "booking-b4b80",
  storageBucket: "booking-b4b80.appspot.com",
  messagingSenderId: "616486841704",
  appId: "1:616486841704:web:9c3a0c2a88d3f2cb127add"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
  
export default db;