import './components/Header'
import './components/Footer'
import '../styles/main.css'
import '../styles/responsive.css'
import * as bootstrap from 'bootstrap'
import Alert from 'bootstrap/js/dist/alert'
import { Tooltip, Toast, Popover } from 'bootstrap'
import L from 'leaflet';

document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([-7.856777, 110.315379], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([-7.856777, 110.315379]).addTo(map)
        .bindPopup('Perumahan Pringgading Permai')
        .openPopup();
});