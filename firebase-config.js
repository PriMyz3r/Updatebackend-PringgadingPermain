import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

export const firebaseConfig = {
  apiKey: "AIzaSyA5Su0u4ENmwYxCP2BzXgiq0L9qkdK8XUw",
  authDomain: "backend-profile-village.firebaseapp.com",
  databaseURL: "https://backend-profile-village-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "backend-profile-village",
  storageBucket: "backend-profile-village.appspot.com",
  messagingSenderId: "713437424547",
  appId: "1:713437424547:web:c6b0f1c230f5d847a84816",
  measurementId: "G-89J2PG5M6Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, database };
