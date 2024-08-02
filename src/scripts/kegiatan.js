// Import necessary components and styles
import './components/Header';
import './components/Footer';
import '../styles/main.css';
import '../styles/responsive.css';
import * as bootstrap from 'bootstrap';
import Alert from 'bootstrap/js/dist/alert';
import { Tooltip, Toast, Popover } from 'bootstrap';

// Function to fetch and display data
async function fetchData() {
    try {
        // Fetch data directly from the external API
        const response = await fetch('https://b-api-gules.vercel.app/Kegiatan');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log('Fetched data:', result); // Debugging line

        // Access the actual data from the result
        const data = result.data;

        // Ensure data categories exist before calling displayData
        if (data.harian && data.mingguan && data.bulanan) {
            displayData('harian', data.harian);
            displayData('mingguan', data.mingguan);
            displayData('bulanan', data.bulanan);
        } else {
            console.error('Data categories are missing:', data);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to display data
function displayData(category, activities) {
    const container = document.getElementById(`${category}-container`);
    
    // Clear existing content
    container.innerHTML = '';

    // Add a header for each category
    const header = document.createElement('h2');
    header.textContent = capitalizeFirstLetter(category);
    header.classList.add('category-header');
    container.appendChild(header);

    if (!activities || activities.length === 0) {
        container.innerHTML += '<p>No activities available.</p>';
        return;
    }

    const row = document.createElement('div');
    row.classList.add('row');

    // Add a specific class for each category to distinguish them
    const categoryClass = `category-${category}`;
    row.classList.add(categoryClass);
    
    activities.forEach(activity => {
        const col = document.createElement('div');
        col.classList.add('col-md-4'); // Create a column with Bootstrap grid system
        
        const link = document.createElement('a');
        link.href = `detailkegiatan.html?id=${activity.id}`; // Assuming each activity has a unique ID
        link.classList.add('text-decoration-none'); // Optional: remove underline from link text

        const activityElement = document.createElement('div');
        activityElement.classList.add('activity', 'card');

        const img = document.createElement('img');
        img.src = activity.img;
        img.alt = activity.title;
        img.classList.add('card-img-top');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const title = document.createElement('h3');
        title.textContent = activity.title;
        title.classList.add('card-title');

        const date = document.createElement('p');
        date.textContent = activity.tanggal;
        date.classList.add('card-text');

        cardBody.appendChild(title);
        cardBody.appendChild(date);
        activityElement.appendChild(img);
        activityElement.appendChild(cardBody);
        link.appendChild(activityElement);
        col.appendChild(link);
        row.appendChild(col);
    });
    
    container.appendChild(row);
}

// Helper function to capitalize the first letter of the category
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Initialize fetch data on DOMContentLoaded
document.addEventListener('DOMContentLoaded', fetchData);
