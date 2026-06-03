// Cloud Firestore orders service (Firebase v9 modular).
//
// Collection: orders
// Document shape:
//   { userId, customerName, items: [{ id, name, size, price, quantity }],
//     total, status, createdAt }
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config.js';

const ordersCol = collection(db, 'orders');

export const listOrders = async () => {
  const snap = await getDocs(query(ordersCol, orderBy('createdAt', 'desc')));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const createOrder = async (data) => {
  const ref = await addDoc(ordersCol, {
    status: 'pendiente',
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
};

export const updateOrderStatus = (id, status) =>
  updateDoc(doc(db, 'orders', id), { status });
