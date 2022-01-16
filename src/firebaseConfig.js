import { initializeApp } from "firebase/app";
// import { getAuth, signOut } from "@firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyD4B6KAVjuKVnltHRPCaGu5qP35piAPGxQ",
    authDomain: "mern-adda.firebaseapp.com",
    databaseURL: "https://mern-adda-default-rtdb.firebaseio.com",
    projectId: "mern-adda",
    storageBucket: "mern-adda.appspot.com",
    messagingSenderId: "972879536212",
    appId: "1:972879536212:web:1a866a1eb16f59032c0dc1"
};

export const app = initializeApp(firebaseConfig);