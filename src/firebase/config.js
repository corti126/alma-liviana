// Firebase initialization for Alma Liviana.
// Credentials are read from Vite env vars when available, otherwise from the
// inline config below. Fill in the real project credentials to connect.
import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const env = import.meta.env || {};

export const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || 'REPLACE_ME',
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || 'REPLACE_ME',
  projectId: env.VITE_FIREBASE_PROJECT_ID || 'REPLACE_ME',
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || 'REPLACE_ME',
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'REPLACE_ME',
  appId: env.VITE_FIREBASE_APP_ID || 'REPLACE_ME',
};

// Avoid re-initializing during hot reloads.
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
// Keep the user logged in across page refreshes.
setPersistence(auth, browserLocalPersistence).catch(() => {});

export const db = getFirestore(app);
export const storage = getStorage(app);
