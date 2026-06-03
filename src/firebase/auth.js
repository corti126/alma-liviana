// Firebase Authentication wrapper (Firebase v9 modular).
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { auth } from './config.js';

export const loginWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const registerWithEmail = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const updateAuthProfile = (displayName) =>
  auth.currentUser
    ? updateProfile(auth.currentUser, { displayName })
    : Promise.resolve();

export const logout = () => signOut(auth);

export const subscribeToAuth = (cb) => onAuthStateChanged(auth, cb);

export const resetPassword = (email) => sendPasswordResetEmail(auth, email);
