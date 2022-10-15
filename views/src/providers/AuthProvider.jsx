import React, { useState, useEffect, createContext, useContext } from "react";

import { auth, db } from "../utils/firebase";

import {
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { doc, setDoc, onSnapshot } from "firebase/firestore";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userDoc, setUserDoc] = useState(null);
  const [message, setMessage] = useState({});

  const signUpUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
    return signInWithPopup(auth, provider);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const signOutUser = () => {
    signOut(auth);
  };

  useEffect(() => {
    let unsub;
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        unsub = onSnapshot(docRef, (doc) => {
          if (doc.exists()) {
            setUserDoc(doc.data());
            setUser(user);
          } else {
            setDoc(docRef, {
              profileCompleted: false,
              uid: user.uid,
              goals: ["brush", "read", "walk", "water", "workout", "sleep"],
            });
          }
        });
      } else {
        setUser(user);
        setUserDoc(null);
      }
    });

    return unsub;
  }, []);

  const value = {
    user,
    setUser,
    userDoc,
    message,
    setMessage,
    resetPassword,
    signUpUser,
    loginWithEmail,
    loginWithGoogle,
    signOutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return {
    ...auth,
    isAuthenticated: !!auth.currentUser,
  };
};
