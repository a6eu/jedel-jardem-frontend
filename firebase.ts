import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDCAXdaeFhY5emSAxpGMVJbDPr60AJ7fkc",
  authDomain: "jedeljardem-ec1e1.firebaseapp.com",
  projectId: "jedeljardem-ec1e1",
  storageBucket: "jedeljardem-ec1e1.firebasestorage.app",
  messagingSenderId: "17249683169",
  appId: "1:17249683169:web:bf242375695142e41699a0",
  measurementId: "G-E7WZH2ZHHF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };