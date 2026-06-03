// Firebase Storage service for product image uploads (Firebase v9 modular).
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './config.js';

export const uploadProductImage = async (file, productId = 'misc') => {
  const safeName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  const path = `products/${productId}/${safeName}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

export const deleteProductImage = async (path) => {
  try {
    await deleteObject(ref(storage, path));
  } catch {
    // Ignore missing files.
  }
};
