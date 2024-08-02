import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set, onValue, push } from 'firebase/database';
import { firebaseConfig } from '../../firebase-config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', () => {
  const timeOptionSelect = document.getElementById('time-option');
  const subscriptionForm = document.getElementById('subscription-form');
  const tableBody = document.querySelector('#riwayat-transaksi tbody');

  // Generate date options
  const today = new Date().toISOString().split('T')[0];
  const timeOptions = [`${today} - 08:45`, `${today} - 14:00`, `${today} - 16:00`];

  timeOptions.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option;
    optionElement.textContent = option;
    timeOptionSelect.appendChild(optionElement);
  });

  // Listen for authentication state changes
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userId = user.uid;

      // Handle form submission
      subscriptionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedTime = timeOptionSelect.value;

        const transactionRef = ref(database, 'users/' + userId + '/langganan');
        const newTransactionRef = push(transactionRef);

        set(newTransactionRef, {
          transaksi: selectedTime,
        }).then(() => {
          alert('Transaksi berhasil ditambahkan!');
          subscriptionForm.reset();
        }).catch((error) => {
          console.error('Error adding transaction:', error);
        });
      });

      // Fetch and display transaction history
      const transactionsRef = ref(database, 'users/' + userId + '/langganan');
      onValue(transactionsRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          tableBody.innerHTML = '';

          let index = 1;
          for (const key in data) {
            const transaction = data[key].transaksi;
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${index}</td>
              <td>${transaction}</td>
            `;
            tableBody.appendChild(row);
            index++;
          }
        } else {
          tableBody.innerHTML = '<tr><td colspan="2" class="text-center">No transactions found</td></tr>';
        }
      });
    } else {
      // Redirect to login page if not authenticated
      window.location.href = 'login.html';
    }
  });
});
