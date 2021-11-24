// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCucS1CGDPlAexGeqPmnc57RqoVjduOz8s",
  authDomain: "allensteamlife-ac9e8.firebaseapp.com",
  projectId: "allensteamlife-ac9e8",
  storageBucket: "allensteamlife-ac9e8.appspot.com",
  messagingSenderId: "176896454873",
  appId: "1:176896454873:web:3832c60e538025ac728ec8",
  measurementId: "G-QGSYFFQ6Z9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
app.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);