import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCmpan7-nkI6LDuEMxiLxv2gxonO9yixo8",
  authDomain: "alma-liviana.firebaseapp.com",
  projectId: "alma-liviana",
  storageBucket: "alma-liviana.firebasestorage.app",
  messagingSenderId: "1095588316548",
  appId: "1:1095588316548:web:8ac3527da883314bca09d1",
  measurementId: "G-5VVD6T75M1"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;