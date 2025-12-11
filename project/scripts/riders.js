// akpo-aza/scripts/riders.js (Adjusted to reflect the new purpose)

const JSON_FILE_PATH = 'data/riders.json';
const SPOTLIGHT_CONTAINER_SELECTOR = '.spotlight-grid'; // Use the same container class
const MAX_SPOTLIGHTS = 3; // Define max spotlights

// =========================================================================
// === CORE DATA FETCH FUNCTION (Adjusted) =================================
// =========================================================================

/**
 * Fetches rider data from the local JSON file.
 * @returns {Promise<Array>} An array of rider objects.
 */
async function fetchRiderData() {
    try {
        const response = await fetch(JSON_FILE_PATH);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // The JSON data structure uses the key 'riders', so we return data.riders
        const data = await response.json();
        return data.riders || []; 

    } catch (error) {
        console.error('Error fetching rider data:', error);
        
        const spotlightContainer = document.querySelector(SPOTLIGHT_CONTAINER_SELECTOR);
        if (spotlightContainer) {
            spotlightContainer.innerHTML = `<p style="color: red;">Failed to load rider data: ${error.message}. Check the path: <strong>'${JSON_FILE_PATH}'</strong>.</p>`;
        }
        
        return [];
    }
}


// =========================================================================
// === NEW SPOTLIGHT FUNCTIONALITY (Rider Focus) ===========================
// =========================================================================

/**
 * Creates the HTML element for a single rider spotlight card.
 * @param {Object} rider - A single rider object.
 * @returns {HTMLElement} - The fully constructed card div.
 */
function createSpotlightRiderCard(rider) {
    const card = document.createElement('div');
    // Add classes based on rating/availability for styling
    const availabilityClass = rider.available ? 'rider-available' : 'rider-unavailable';
    card.classList.add('spotlight-card', availabilityClass); 

    // HTML structure uses Rider-specific properties
    card.innerHTML = `
        <img src="${rider.image || 'images/default-rider.png'}" alt="${rider.name} profile photo" class="spotlight-logo">
        <h3>${rider.name}</h3>
        <p class="rider-id">#${rider.riderID}</p>
        <p class="rider-stat"><strong>Rating:</strong> <span class="rating-value">${rider.rating} ★</span></p>
        <p class="rider-stat"><strong>Deliveries:</strong> ${rider.deliveriesCompleted}</p>
        <p class="rider-stat"><strong>Vehicle:</strong> ${rider.vehicleType}</p>
        <p class="rider-stat"><strong>Zone:</strong> ${rider.zone}</p>
        <p class="rider-contact"><a href="tel:${rider.phone}">Call Rider</a></p>
    `;
    
    return card;
}

/**
 * Selects a specified number of high-performing riders.
 * Selection criteria: Available and highest rating, secondarily by deliveriesCompleted.
 * @param {Array<Object>} arr - Array of all rider objects.
 * @param {number} count - Maximum number of riders to select.
 * @returns {Array<Object>} - Array of selected riders.
 */
function selectTopRiders(arr, count) {
    // 1. Filter for riders that are currently available
    const availableRiders = arr.filter(rider => rider.available);
    
    // If fewer available riders than max count, use all of them.
    if (availableRiders.length === 0) {
        // Fallback: If no one is available, show the top rated overall, regardless of current status.
        return arr.sort((a, b) => {
            if (b.rating !== a.rating) return b.rating - a.rating;
            return b.deliveriesCompleted - a.deliveriesCompleted;
        }).slice(0, Math.min(count, arr.length));
    }
    
    // 2. Sort the available riders: Primary by rating (desc), Secondary by deliveries (desc)
    availableRiders.sort((a, b) => {
        // Higher rating comes first
        if (b.rating !== a.rating) {
            return b.rating - a.rating; 
        }
        // If ratings are equal, higher completed deliveries comes first
        return b.deliveriesCompleted - a.deliveriesCompleted;
    });
    
    // 3. Return a slice containing up to 'count' riders
    return availableRiders.slice(0, Math.min(count, availableRiders.length));
}

/**
 * Fetches rider data, selects the top performers, and displays them
 * in the .spotlight-grid section.
 */
async function displayRiderSpotlights() {
    const spotlightGrid = document.querySelector(SPOTLIGHT_CONTAINER_SELECTOR);
    if (!spotlightGrid) return; // Exit if the container isn't found (e.g., not on homepage)
    
    spotlightGrid.innerHTML = '<p>Searching for Top Riders...</p>';

    try {
        // 1. Fetch data
        const riders = await fetchRiderData();

        if (riders.length === 0) {
            spotlightGrid.innerHTML = '<p>No rider data available.</p>';
            return;
        }

        // 2. Select top riders based on performance
        const topRiders = selectTopRiders(riders, MAX_SPOTLIGHTS);

        // 3. Generate and display the HTML
        spotlightGrid.innerHTML = ''; // Clear loading message

        topRiders.forEach(rider => {
            const card = createSpotlightRiderCard(rider);
            spotlightGrid.appendChild(card);
        });

    } catch (error) {
        console.error('Error generating rider spotlights:', error);
        spotlightGrid.innerHTML = `<p style="color: red;">Rider Spotlight display failed.</p>`;
    }
}


// =========================================================================
// === APPLICATION INITIALIZATION (Simplified) =============================
// =========================================================================

/**
 * Main initialization function to run when the DOM is fully loaded.
 * Focuses only on the rider spotlights (assuming this script is for the homepage).
 * All legacy directory functions (toggleView, displayCompanies, companyData) are removed.
 */
async function initializeRiderSpotlights() {
    // Display the spotlight section immediately
    displayRiderSpotlights();
    
    // Note: If you need directory functionality later, you'll need a separate script
    // that handles the main directory view (grid/list) and fetches the full data set.
}

// Execute the main function to start the application
document.addEventListener('DOMContentLoaded', initializeRiderSpotlights);