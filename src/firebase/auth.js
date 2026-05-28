// Firebase Authentication wrapper — to be filled in.
//
// Suggested implementation:
//
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
//   sendPasswordResetEmail,
// } from 'firebase/auth';
// import { auth } from './config.js';
//
// export const loginWithEmail = (email, password) =>
//   signInWithEmailAndPassword(auth, email, password);
//
// export const registerWithEmail = (email, password) =>
//   createUserWithEmailAndPassword(auth, email, password);
//
// export const logout = () => signOut(auth);
//
// export const subscribeToAuth = (cb) => onAuthStateChanged(auth, cb);
//
// export const resetPassword = (email) => sendPasswordResetEmail(auth, email);

export const loginWithEmail = async () => {
  throw new Error('Firebase auth not yet connected.');
};
export const registerWithEmail = async () => {
  throw new Error('Firebase auth not yet connected.');
};
export const logout = async () => {};
export const subscribeToAuth = () => () => {};
export const resetPassword = async () => {};
