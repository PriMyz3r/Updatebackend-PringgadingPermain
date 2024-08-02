import './components/HeaderLayanan'
import './components/Footer'
import '../styles/main.css'
import '../styles/responsive.css'
import * as bootstrap from 'bootstrap'
import Alert from 'bootstrap/js/dist/alert'
import { Tooltip, Toast, Popover } from 'bootstrap'
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, push, set } from "firebase/database";
import { firebaseConfig } from "../../firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', () => {
    const hariButtons = document.querySelectorAll('#hari-buttons .btn');
    const jamButtons = document.querySelectorAll('#jam-buttons .btn');
    let selectedDay = null;
    let selectedTime = null;

    hariButtons.forEach(button => {
        button.addEventListener('click', () => {
            hariButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            selectedDay = button.querySelector('input').value;
            console.log('Selected Day:', selectedDay); // Debug log
        });
    });

    jamButtons.forEach(button => {
        button.addEventListener('click', () => {
            jamButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            selectedTime = button.querySelector('input').value;
            console.log('Selected Time:', selectedTime); // Debug log
        });
    });

    document.getElementById('btn-save-transaction').addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Save button clicked'); // Debug log
        if (selectedDay && selectedTime) {
            onAuthStateChanged(auth, user => {
                if (user) {
                    console.log('User authenticated:', user); // Debug log
                    const userId = user.uid;
                    const transactionsRef = ref(database, 'users/' + userId + '/langganan');

                    const today = new Date();
                    const formattedDate = today.toISOString().split('T')[0];

                    const transactionData = {
                        transaksi: `${formattedDate} - ${selectedDay} - ${selectedTime}`
                    };

                    console.log('Transaction Data:', transactionData); // Debug log

                    const newTransactionRef = push(transactionsRef);
                    set(newTransactionRef, transactionData)
                        .then(() => {
                            console.log('Transaction saved successfully'); // Debug log
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
            alert('Please select both a day and a time.');
        }
    });
});
