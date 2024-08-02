// Import necessary components and styles
import './components/Header';
import './components/Footer';
import '../styles/main.css';
import * as bootstrap from 'bootstrap';
import Alert from 'bootstrap/js/dist/alert';
import { Tooltip, Toast, Popover } from 'bootstrap';

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const activityId = params.get('id');

    if (activityId) {
        try {
            // Fetch data langsung dari API eksternal
            const response = await fetch(`https://b-api-gules.vercel.app/Kegiatan/${activityId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const activity = await response.json();

            console.log(activity); // Tambahkan ini untuk debug
            
            if (activity && activity.data) { // Cek jika activity dan activity.data ada
                const detailContainer = document.getElementById('activity-detail');
                if (!detailContainer) {
                    throw new Error('Element with ID "activity-detail" not found.');
                }

                const activityElement = document.createElement('div');
                activityElement.classList.add('activity', 'card');

                const img = document.createElement('img');
                img.src = activity.data.img;
                img.alt = activity.data.title;
                img.classList.add('card-img-top');

                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');

                const title = document.createElement('h2');
                title.textContent = activity.data.title;
                title.classList.add('card-title');

                const date = document.createElement('p');
                date.textContent = activity.data.tanggal;
                date.classList.add('card-text');

                const description = document.createElement('p');
                description.textContent = activity.data.description;
                description.classList.add('card-text');

                const content = document.createElement('p');
                content.textContent = activity.data.content;
                content.classList.add('card-text');

                cardBody.appendChild(title);
                cardBody.appendChild(date);
                cardBody.appendChild(description);
                cardBody.appendChild(content);
                activityElement.appendChild(img);
                activityElement.appendChild(cardBody);
                detailContainer.appendChild(activityElement);
            } else {
                alert('Kegiatan tidak ditemukan.');
            }
        } catch (error) {
            console.error('Error fetching activity:', error);
            alert('Gagal memuat data kegiatan.');
        }
    } else {
        alert('ID kegiatan tidak ditemukan di URL.');
    }
});
