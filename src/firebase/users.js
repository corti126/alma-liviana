// Cloud Firestore users service (Firebase v9 modular).
//
// Collection: users
// Document id: the Firebase Auth uid
// Document shape: { uid, name, email, role: 'customer'|'admin'|'owner', createdAt }
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config.js';

export const getUserProfile = async (uid) => {
  if (!uid) return null;
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

// Creates the profile on registration (merges if it already exists).
export const createUserProfile = async (uid, { name, email, role = 'customer' }) =>
  setDoc(
    doc(db, 'users', uid),
    { uid, name, email, role, createdAt: serverTimestamp() },
    { merge: true }
  );

export const upsertUserProfile = async (uid, data) =>
  setDoc(doc(db, 'users', uid), data, { merge: true });

export const setUserRole = (uid, role) =>
  updateDoc(doc(db, 'users', uid), { role });
