// Cloud Firestore products service (Firebase v9 modular).
//
// Collection: products
// Document shape:
//   { name, description, category, price, image, featured, active,
//     sizes: ["S","M","L","XL"], sizesStock: { S, M, L, XL }, createdAt }
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config.js';

const productsCol = collection(db, 'products');

const mapDoc = (d) => ({ id: d.id, ...d.data() });

export const listProducts = async () => {
  const snap = await getDocs(query(productsCol, orderBy('createdAt', 'desc')));
  return snap.docs.map(mapDoc);
};

export const getProduct = async (id) => {
  const snap = await getDoc(doc(db, 'products', id));
  return snap.exists() ? mapDoc(snap) : null;
};

export const createProduct = async (data) => {
  const ref = await addDoc(productsCol, {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
};

export const updateProduct = (id, data) =>
  updateDoc(doc(db, 'products', id), data);

export const deleteProduct = (id) => deleteDoc(doc(db, 'products', id));
