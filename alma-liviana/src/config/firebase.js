import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Configuración segura utilizando las variables de entorno de Vite
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Inicializamos la aplicación de Firebase
const app = initializeApp(firebaseConfig);

// Inicializamos y exportamos los servicios listos para usar en la app de "Alma Liviana"
export const db = getFirestore(app);       // Base de datos para productos, stock y órdenes
export const auth = getAuth(app);         // Autenticación de clientes y administradores
export const storage = getStorage(app);   // Almacenamiento para las imágenes de las remeras

export default app;