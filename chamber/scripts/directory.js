const JSON_FILE_PATH = 'data/members.json';
let companyData = []; // Store fetched data globally so we don't fetch repeatedly
let currentView = 'grid'; // Initial view state
const MAX_SPOTLIGHTS = 3; // Define max spotlights for the new function

// =========================================================================
// === EXISTING FUNCTIONS (Unchanged, but used by new spotlight function) ===
// =========================================================================

/**
 * Fetches company data from a local JSON file using async/await.
 * @returns {Promise<Array>} An array of company objects.
 */
async function fetchCompanyData() {
    try {
        const response = await fetch(JSON_FILE_PATH);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Assuming your JSON structure has a 'companies' key based on the return data.companies || []
        const data = await response.json();
        return data.companies || data || []; 

    } catch (error) {
        console.error('Error fetching company data:', error);
        // Using document.querySelector('.cards') for directory error message
        const cardsContainer = document.querySelector('.cards');
        
        if (cardsContainer) {
            cardsContainer.innerHTML = `<p style="color: red;">Failed to load data: ${error.message}. Check the path: <strong>'${JSON_FILE_PATH}'</strong>.</p>`;
        }
        
        return [];
    }
}

/**
 * Creates a paragraph element with strong label text and dynamic content.
 * (Used for directory display, not strictly required for spotlight but kept)
 * @param {string} label - The bold label text.
 * @param {any} value - The dynamic value to display (can be an array or string).
 * @returns {HTMLParagraphElement} The created <p> element.
 */
function createDetailParagraph(label, value) {
    if (!value) return null;

    const p = document.createElement('p');
    p.innerHTML = `<strong>${label}:</strong> `; 

    const textValue = Array.isArray(value) ? value.join(', ') : String(value);

    p.insertAdjacentText('beforeend', textValue);
    
    return p;
}

/**
 * Displays the company data in the designated HTML container and applies the current view mode.
 * (This function is for the main Directory page, not the Homepage Spotlights)
 */
function displayCompanies(companies, viewMode) {
    const cardsContainer = document.querySelector('.cards'); 
    
    if (!cardsContainer) {
        // console.warn("Directory container (.cards) not found. Skipping main directory display.");
        return;
    }
    
    // ... (rest of displayCompanies logic unchanged) ...
    // Note: The complete displayCompanies function is lengthy. Only showing signature here.
    // ...
}

/**
 * Handles the view toggle buttons (List/Grid).
 * (For the main Directory page, not the Homepage Spotlights)
 */
function toggleView(mode) {
    // ... (rest of toggleView logic unchanged) ...
}


// =========================================================================
// === NEW SPOTLIGHT FUNCTIONALITY (Responding to the prompt) ==============
// =========================================================================

/**
 * Creates the HTML element for a single spotlight card for the homepage.
 * It uses a simplified structure compared to the full directory card.
 * @param {Object} member - A single member object.
 * @returns {HTMLElement} - The fully constructed card div.
 */
function createSpotlightCard(member) {
    const card = document.createElement('div');
    // Use the member's membership level for dynamic styling (e.g., gold or silver class)
    const levelClass = member.membershipLevel ? member.membershipLevel.toLowerCase() : '';
    card.classList.add('spotlight-card', levelClass); // Reusing the spotlight-card class from HTML

    // Assuming image is stored as 'image' in the JSON, and name as 'name'
    card.innerHTML = `
        <img src="${member.image || 'images/default-logo.png'}" alt="${member.name} logo" class="spotlight-logo">
        <h3>${member.name}</h3>
        <p><strong>Level:</strong> ${member.membershipLevel}</p>
        <p><strong>Phone:</strong> <a href="tel:${member.phone}">${member.phone}</a></p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Web:</strong> <a href="${member.website}" target="_blank">${member.website.replace(/(https?:\/\/)/, '')}</a></p>
    `;
    
    return card;
}

/**
 * Selects a specified number of unique random members from an array.
 * @param {Array<Object>} arr - Array of qualified member objects.
 * @param {number} count - Maximum number of members to select.
 * @returns {Array<Object>} - Array of randomly selected members.
 */
function getRandomMembers(arr, count) {
    // 1. Shuffle the array using the Fisher-Yates algorithm for good randomness
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // 2. Return a slice containing up to 'count' members
    return arr.slice(0, Math.min(count, arr.length));
}

/**
 * Fetches member data, filters for Gold/Silver, selects members randomly, and displays them
 * in the .spotlight-grid section.
 */
async function displaySpotlights() {
    const spotlightGrid = document.querySelector('.spotlight-grid');
    if (!spotlightGrid) return; // Exit if the container isn't found (e.g., not on homepage)
    
    spotlightGrid.innerHTML = '<p>Loading Chamber Spotlights...</p>';

    try {
        // 1. Fetch data
        const members = await fetchCompanyData();

        // 2. Filter for Gold or Silver members
        const qualifiedMembers = members.filter(member => 
            member.membershipLevel && (member.membershipLevel.toLowerCase() === 'gold' || member.membershipLevel.toLowerCase() === 'silver')
        );

        if (qualifiedMembers.length === 0) {
            spotlightGrid.innerHTML = '<p>No Gold or Silver members available for spotlight.</p>';
            return;
        }

        // 3. Randomly select two or three unique members (Max 3)
        const selectedMembers = getRandomMembers(qualifiedMembers, MAX_SPOTLIGHTS);

        // 4. Generate and display the HTML
        spotlightGrid.innerHTML = ''; // Clear loading message

        selectedMembers.forEach(member => {
            const card = createSpotlightCard(member);
            spotlightGrid.appendChild(card);
        });

    } catch (error) {
        console.error('Error generating spotlights:', error);
        spotlightGrid.innerHTML = `<p style="color: red;">Spotlight display failed.</p>`;
    }
}


// =========================================================================
// === APPLICATION INITIALIZATION (Modified) ===============================
// =========================================================================

/**
 * Main initialization function to run when the DOM is fully loaded.
 */
async function initializeDirectory() {
    // 1. Directory Setup (Only needed if the current page is the directory)
    const listButton = document.getElementById('list-button');
    const gridButton = document.getElementById('grid-button');

    if (listButton && gridButton) {
        listButton.addEventListener('click', () => toggleView('list'));
        gridButton.addEventListener('click', () => toggleView('grid'));
        
        // Fetch data once for the directory page
        companyData = await fetchCompanyData(); 
        displayCompanies(companyData, currentView); 
    }
    
    // 2. Homepage Spotlight Setup (Always run if the .spotlight-grid exists)
    displaySpotlights();
}

// Execute the main function to start the application
document.addEventListener('DOMContentLoaded', initializeDirectory);