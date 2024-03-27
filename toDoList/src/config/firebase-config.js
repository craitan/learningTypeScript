import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from 'firebase/database';
import { getStorage } from "firebase/storage";
import { useState, useEffect } from "react";

const firebaseConfig = {
    apiKey: "AIzaSyCr5Ivmnob3_S0zf23Q6IGQuO2qYDOycvc",
    authDomain: "todolist-237bb.firebaseapp.com",
    databaseURL: "https://todolist-237bb-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "todolist-237bb",
    storageBucket: "todolist-237bb.appspot.com",
    messagingSenderId: "927784190901",
    appId: "1:927784190901:web:b78a75f8ad8926aa868ffc"
};

const app = initializeApp(firebaseConfig);

export function useAuth() {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
        return unsub;
    }, [])

    return currentUser;
}


export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
