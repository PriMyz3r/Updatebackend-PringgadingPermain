import './components/Header'
import './components/Footer'
import '../styles/main.css'
import * as bootstrap from 'bootstrap'
import Alert from 'bootstrap/js/dist/alert'
import { Tooltip, Toast, Popover } from 'bootstrap'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseConfig } from '../../firebase-config.js';
import { initializeApp } from 'firebase/app';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
    // Your code here
    // Handle forgot password form submission
      document.getElementById('lupapassword-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('reset-email').value;

        sendPasswordResetEmail(auth, email)
          .then(() => {
            alert('Password reset link sent to your email.');
          })
          .catch((error) => {
            const errorMessage = error.message;
            alert('Error: ' + errorMessage);
          });
      });
});