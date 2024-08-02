import './components/Header';
import './components/Footer';
import '../styles/main.css';
import * as bootstrap from 'bootstrap';
import Alert from 'bootstrap/js/dist/alert';
import { Tooltip, Toast, Popover } from 'bootstrap';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail, EmailAuthProvider, linkWithCredential, onAuthStateChanged } from 'firebase/auth';
import { firebaseConfig } from '../../firebase-config.js';
import { initializeApp } from 'firebase/app';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

document.addEventListener('DOMContentLoaded', () => {
  // Check if user is already logged in
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, redirect to layanan.html
      window.location.href = 'langganan.html';
    }
  });

  // Handle login form submission
  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('floatingInput').value;
    const password = document.getElementById('floatingPassword').value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      alert('User logged in successfully: ' + userCredential.user.email);
      window.location.href = 'langganan.html'; // Redirect to langganan page
    } catch (error) {
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        alert('Email atau Password Salah');
      } else if (error.code === 'auth/provider-already-linked') {
        alert('Anda terakhir login menggunakan Gmail. Silakan login menggunakan Google atau atur password terlebih dahulu.');
      } else {
        alert('Error: ' + error.message);
      }
    }
  });

  // Handle Google login button click
  document.getElementById('login-google').addEventListener('click', () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        alert('User logged in with Google: ' + user.email);
        window.location.href = 'layanan.html'; // Redirect to layanan page

        const email = user.email;
        const password = prompt('Enter a password to enable email/password login for this account:');
        if (password) {
          const emailCredential = EmailAuthProvider.credential(email, password);
          linkWithCredential(user, emailCredential)
            .then((usercred) => {
              alert('Account linking success: ' + usercred.user.email);
            }).catch((error) => {
              alert('Account linking error: ' + error.message);
            });
        }
      }).catch((error) => {
        alert('Error: ' + error.message);
      });
  });
});
