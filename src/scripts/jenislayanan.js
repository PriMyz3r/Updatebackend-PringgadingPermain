import './components/HeaderLayanan'
import './components/Footer'
import '../styles/main.css'
import '../styles/responsive.css'
import * as bootstrap from 'bootstrap'
import Alert from 'bootstrap/js/dist/alert'
import { Tooltip, Toast, Popover } from 'bootstrap'

document.addEventListener('DOMContentLoaded', () => {
    const normalBtn = document.querySelector('.subscription-card.normal button');
    const vipBtn = document.querySelector('.subscription-card.vip button');
  
    normalBtn.addEventListener('click', () => {
      alert('Anda memilih paket Normal');
    });
  
    vipBtn.addEventListener('click', () => {
      alert('Anda memilih paket VIP');
    });
  });
  