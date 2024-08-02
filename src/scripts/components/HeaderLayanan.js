import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { firebaseConfig } from '../../../firebase-config.js';
import { initializeApp } from 'firebase/app';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="index.html">
        <img src="assets/img/pringgading-logo.png" alt="Bootstrap">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="index.html">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="profile.html">Profile</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="program.html">Program</a>
          </li>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="kegiatan.html">Kegiatan</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="login.html">Layanan</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="login.html" id="nav-link-login">Login</a>
          </li>
          <li>
            <a class="nav-link" href="#" id="logout-button" style="display: none;">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
          <div class="hero">
            <img src="assets/img/header2.png" alt="Hero Image">
        </div>
        `;
    }
}

   // Wait for custom elements to be defined and rendered
   customElements.whenDefined('custom-header').then(() => {
    // Check if user is already logged in
    onAuthStateChanged(auth, (user) => {
        const navLinkLogin = document.getElementById('nav-link-login');
        const logoutButton = document.getElementById('logout-button');

        if (navLinkLogin && logoutButton) {
            if (user) {
                // User is signed in, change "Login" to "User" and show "Logout"                    
                navLinkLogin.style.display = 'none';
                logoutButton.textContent = 'User Logout';
                logoutButton.style.display = 'block';
            } else {
                // User is not signed in, show "Login" and hide "Logout"
                navLinkLogin.textContent = 'User Login';
                navLinkLogin.style.display = 'block';
                logoutButton.style.display = 'none';
            }
        }
    });

    // Add event listener for logout button
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            signOut(auth).then(() => {
                alert('User logged out successfully');
                window.location.href = 'index.html'; // Redirect to home page after logout
            }).catch((error) => {
                alert('Error logging out: ' + error.message);
            });
        });
    }
  
    const dropdownItems = document.querySelectorAll('.dropdown');

    dropdownItems.forEach(function(item) {
        item.addEventListener('mouseover', function() {
            const dropdownContent = this.querySelector('.dropdown-content');
            if (dropdownContent) {
                dropdownContent.style.display = 'block';
            }
        });

        item.addEventListener('mouseout', function() {
            const dropdownContent = this.querySelector('.dropdown-content');
            if (dropdownContent) {
                dropdownContent.style.display = 'none';
            }
        });
    });
});

customElements.define('custom-header', Header);