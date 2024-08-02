import './components/HeaderLayanan';
import './components/Footer';
import '../styles/main.css';
import '../styles/responsive.css';
import * as bootstrap from 'bootstrap';
import Alert from 'bootstrap/js/dist/alert';
import { Tooltip, Toast, Popover } from 'bootstrap';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseConfig } from '../../firebase-config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', function() {
  const tableBody = document.querySelector('#riwayat-transaksi tbody');

  // Check if user is already logged in and get their userId
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userId = user.uid; // Get the logged-in user's ID

      // Reference to the user transactions in the database
      const transactionsRef = ref(database, 'users/' + userId + '/langganan');

      // Function to fetch data from Firebase Realtime Database
      onValue(transactionsRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          // Clear the table body before appending new data
          tableBody.innerHTML = '';

          // Iterate over the data and create table rows
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
          // If no data exists, show a message
          tableBody.innerHTML = '<tr><td colspan="2" class="text-center">No transactions found</td></tr>';
        }
      });
    } else {
      // If no user is logged in, show a message
      tableBody.innerHTML = '<tr><td colspan="2" class="text-center">Please log in to view transactions</td></tr>';
    }
  });
});
