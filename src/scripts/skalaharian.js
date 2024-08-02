import './components/HeaderLayanan';
import './components/Footer';
import '../styles/main.css';
import '../styles/responsive.css';
import * as bootstrap from 'bootstrap';
import Alert from 'bootstrap/js/dist/alert';
import { Tooltip, Toast, Popover } from 'bootstrap';

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, push, set } from "firebase/database";
import { firebaseConfig } from "../../firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('#time-buttons .btn');
    let selectedTime = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            selectedTime = button.getAttribute('data-time');
        });
    });

    document.getElementById('btn-up-skala').addEventListener('click', (e) => {
        e.preventDefault();
        if (selectedTime) {
            onAuthStateChanged(auth, user => {
                if (user) {
                    const userId = user.uid;
                    const transactionsRef = ref(database, 'users/' + userId + '/langganan');

                    const today = new Date();
                    const formattedDate = today.toISOString().split('T')[0];
                    const daysOfWeek = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
                    const currentDay = daysOfWeek[today.getDay()];

                    const transactionData = {
                        transaksi: `${formattedDate} - ${currentDay} - ${selectedTime}`
                    };

                    const newTransactionRef = push(transactionsRef);
                    set(newTransactionRef, transactionData)
                        .then(() => {
                            window.location.href = 'langganan.html';
                        })
                        .catch(error => {
                            console.error('Error writing new transaction to Firebase Database', error);
                        });
                } else {
                    alert('User not authenticated');
                }
            });
        } else {
            alert('Please select a time.');
        }
    });
});
