import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCQSxcs9f5t5jXA_gZhdxGWEOUBN-_Mj3E",
  authDomain: "ctwitter-26051.firebaseapp.com",
  projectId: "ctwitter-26051",
  storageBucket: "ctwitter-26051.appspot.com",
  messagingSenderId: "923700401206",
  appId: "1:923700401206:web:e1da1a3b643502b6c13497",
};

initializeApp(firebaseConfig);

export const authService = getAuth();
export const dbService = getFirestore();
export const storageService = getStorage();
