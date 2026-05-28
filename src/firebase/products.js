// Firestore products service placeholder.
//
// Collection: products
// Document shape:
//   { id, name, description, category, price, stock, image, featured, active }
//
// import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
// import { db } from './config.js';
//
// export const listProducts = async () => {
//   const snap = await getDocs(collection(db, 'products'));
//   return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
// };
//
// export const getProduct = async (id) => {
//   const snap = await getDoc(doc(db, 'products', id));
//   return snap.exists() ? { id: snap.id, ...snap.data() } : null;
// };
//
// export const createProduct = (data) => addDoc(collection(db, 'products'), data);
// export const updateProduct = (id, data) => updateDoc(doc(db, 'products', id), data);
// export const deleteProduct = (id) => deleteDoc(doc(db, 'products', id));

import mock from '../data/products.js';

export const listProducts = async () => mock;
export const getProduct = async (id) => mock.find((p) => p.id === id) || null;
export const createProduct = async () => {};
export const updateProduct = async () => {};
export const deleteProduct = async () => {};
