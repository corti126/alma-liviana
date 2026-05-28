// Firebase Storage placeholder for product image uploads.
//
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { storage } from './config.js';
//
// export const uploadProductImage = async (file, productId) => {
//   const path = `products/${productId}/${file.name}`;
//   const r = ref(storage, path);
//   await uploadBytes(r, file);
//   return getDownloadURL(r);
// };

export const uploadProductImage = async () => {
  throw new Error('Firebase storage not yet connected.');
};
