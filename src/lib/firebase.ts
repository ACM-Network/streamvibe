import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsQ3zkzQ8N2HRn4JJU_T-8LLttaVRRKmI",
  authDomain: "streamvibe-34461.firebaseapp.com",
  projectId: "streamvibe-34461",
  storageBucket: "streamvibe-34461.firebasestorage.app",
  messagingSenderId: "993528819202",
  appId: "1:993528819202:web:0d8cb8289ad5e3b08b011b"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
