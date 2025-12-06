// chamber/scripts/discover.js

import { pointsOfInterest } from "../data/discover.mjs";

const cardsContainer = document.getElementById('cards-container');
const visitMessageElement = document.getElementById('visit-message');

// ==================================================
// 1. Build Gallery Cards
// ==================================================

function createPoiCard(poi, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.style.gridArea = `card${index + 1}`; // Assign grid area name

    card.innerHTML = `
        <h2>${poi.name}</h2>
        <figure>
            <img src="${poi.image}" alt="${poi.name}" loading="lazy">
        </figure>
        <address>${poi.address}</address>
        <p>${poi.description}</p>
        <button>Learn More</button>
    `;
    
    return card;
}

function displayPoiCards() {
    pointsOfInterest.forEach((poi, index) => {
        const card = createPoiCard(poi, index);
        cardsContainer.appendChild(card);
    });
}

// ==================================================
// 2. Visitor Last Visit Message
// ==================================================

const LAST_VISIT_KEY = 'lastVisit';
const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

function displayVisitMessage() {
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
    const currentDate = Date.now();

    if (!lastVisit) {
        // First visit
        visitMessageElement.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = parseInt(lastVisit);
        const timeDifference = currentDate - lastVisitDate;
        const daysDifference = Math.floor(timeDifference / MILLISECONDS_PER_DAY);

        if (timeDifference < MILLISECONDS_PER_DAY) {
            // Less than a day (24 hours)
            visitMessageElement.textContent = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            // Exactly one day or between 1 and 2 days ago
            visitMessageElement.textContent = "You last visited 1 day ago.";
        } else {
            // More than one day
            visitMessageElement.textContent = `You last visited ${daysDifference} days ago.`;
        }
    }

    // Update localStorage with the current date for the next visit comparison
    localStorage.setItem(LAST_VISIT_KEY, currentDate.toString());
}

// ==================================================
// Initialization
// ==================================================

document.addEventListener('DOMContentLoaded', () => {
    displayVisitMessage();
    displayPoiCards();
});