import './components/Header'
import './components/Footer'
import '../styles/main.css'
import * as bootstrap from 'bootstrap'
import Alert from 'bootstrap/js/dist/alert'
import { Tooltip, Toast, Popover } from 'bootstrap'
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider  } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { firebaseConfig } from '../../firebase-config.js';
import { initializeApp } from 'firebase/app';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const provider = new GoogleAuthProvider();

document.addEventListener('DOMContentLoaded', () => {
    // Register form submission
    document.getElementById('register-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const username = document.getElementById('username').value;
        const level = 1;
        
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await set(ref(database, 'users/' + user.uid), {
                email: user.email,
                username,
                level
            });
            alert('Additional information saved successfully.');
            window.location.href = 'langganan.html'; // Redirect to langganan page
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });
    
    // Google register button
    document.getElementById('register-google').addEventListener('click', async () => {
        const username = prompt('Please enter your username:');
        const level = 1;

        if (!username) {
            alert('Username is required.');
            return;
        }

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            await set(ref(database, 'users/' + user.uid), {
                email: user.email,
                username,
                level
            });
            alert('Additional information saved successfully.');
            window.location.href = 'langganan.html'; // Redirect to langganan page
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });
});
