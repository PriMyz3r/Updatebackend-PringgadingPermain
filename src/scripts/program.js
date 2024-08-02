// Import necessary components and styles
import './components/Header';
import './components/Footer';
import '../styles/main.css';
import '../styles/responsive.css'
import * as bootstrap from 'bootstrap';
import Alert from 'bootstrap/js/dist/alert';
import { Tooltip, Toast, Popover } from 'bootstrap';

// Fungsi untuk mengunduh file PDF
function downloadPDF(filename) {
    const link = document.createElement('a');
    link.href = 'assets/pdf/' + filename;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
