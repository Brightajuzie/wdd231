import { handymen } from "../data/handymen.mjs";

// CRITICAL: The ID "cards-container" must exist in the HTML
const cardsContainer = document.getElementById('cards-container');
const visitMessageElement = document.getElementById('visit-message');

// ==================================================
// 1. Build Gallery Cards
// ==================================================

/**
 * Creates the HTML element for a single handyman card.
 * @param {Object} handyman - A single handyman object.
 * @returns {HTMLElement} - The fully constructed card div.
 */
function createHandymanCard(handyman) {
    const card = document.createElement('div');
    // FIX 1: Use the class defined in your CSS for responsive layout
    card.classList.add('spotlight-card');
    
    // FIX 2: Added class for image styling and removed unnecessary gridArea assignment
    const availabilityText = handyman.available ? 'Book Now' : 'Currently Busy';
    const buttonClass = handyman.available ? 'available' : 'unavailable';
    
    // HTML structure adjusted for Handyman data
    card.innerHTML = `
        <h3>${handyman.name}</h3>
        <figure>
            <img src="${handyman.image}" alt="${handyman.name} - ${handyman.skill}" class="spotlight-logo" loading="lazy">
        </figure>
        <p class="skill">**Skill:** ${handyman.skill}</p>
        <p class="area">**Service Area:** ${handyman.area}</p>
        <p class="rating">**Rating:** ${handyman.rating} ★</p>
        <p class="experience">**Experience:** ${handyman.experienceYears} Years</p>
        <button class="${buttonClass}">
            ${availabilityText}
        </button>
    `;
    
    return card;
}

// Function adjusted to iterate over the 'handymen' array
function displayHandymenCards() {
    // Clear the "Loading..." message
    cardsContainer.innerHTML = '';
    
    handymen.forEach(handyman => {
        // Removed index as it is no longer needed after removing gridArea assignment
        const card = createHandymanCard(handyman); 
        cardsContainer.appendChild(card);
    });
}

// ==================================================
// 2. Visitor Last Visit Message (No Change Required)
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
    // Only display message if the element exists (which it should)
    if (visitMessageElement) {
        displayVisitMessage();
    }
    // Function call updated
    if (cardsContainer) {
        displayHandymenCards();
    }
});