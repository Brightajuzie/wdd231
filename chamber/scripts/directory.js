const JSON_FILE_PATH = 'data/members.json';
let companyData = []; // Store fetched data globally so we don't fetch repeatedly
let currentView = 'grid'; // Initial view state

/**
 * Fetches company data from a local JSON file using async/await.
 * @returns {Promise<Array>} An array of company objects.
 */
async function fetchCompanyData() {
    try {
        const response = await fetch(JSON_FILE_PATH);
        // console.log('fetched'); // Removed for production readiness

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // Assuming the JSON structure is { "companies": [...] }
        return data.companies || []; 

    } catch (error) {
        console.error('Error fetching company data:', error);
        const list = document.getElementById('member-list');
        
        if (list) {
            // Using textContent for safer error message display
            list.innerHTML = `<p style="color: red;">Failed to load data: ${error.message}. Check the path: <strong>'${JSON_FILE_PATH}'</strong>.</p>`;
        }
        
        return [];
    }
}

/**
 * Displays the company data in the designated HTML container and applies the current view mode.
 * @param {Array} companies - Array of company objects.
 * @param {string} viewMode - 'list' or 'grid'
 */
function displayCompanies(companies, viewMode) {
    // Note: It's better to target the element that holds the cards directly
    const cardsContainer = document.querySelector('.cards'); 
    
    if (!cardsContainer) {
        console.error("Required HTML containers not found. Cannot display data.");
        return;
    }
    
    // 1. Update the parent container's class based on view mode
    if (viewMode === 'list') {
        cardsContainer.classList.remove('grid');
        cardsContainer.classList.add('list');
    } else { // 'grid' mode
        cardsContainer.classList.remove('list');
        cardsContainer.classList.add('grid');
    }
    
    // 2. Clear previous content
    cardsContainer.innerHTML = ''; 

    if (companies.length === 0) {
        cardsContainer.innerHTML = '<p>No company members found.</p>';
        return;
    }

    companies.forEach(company => {
        const card = document.createElement('div');
        card.classList.add('company-card', company.membershipLevel.toLowerCase());
        
        // --- Safer DOM Manipulation ---

        // Image
        if (company.image) {
            const img = document.createElement('img');
            img.setAttribute('src', company.image);
            img.setAttribute('alt', `${company.name} logo`);
            img.classList.add('company-logo');
            card.appendChild(img);
        }

        // Name and Membership Level
        const h3 = document.createElement('h3');
        // Using textContent is safer than innerHTML for dynamic text
        h3.textContent = `${company.name} (${company.membershipLevel})`;
        card.appendChild(h3);

        // Address
        const addressP = document.createElement('p');
        addressP.innerHTML = `<strong>Address:</strong> ${company.address}`;
        card.appendChild(addressP);

        // Phone
        const phoneP = document.createElement('p');
        const phoneLink = document.createElement('a');
        phoneLink.setAttribute('href', `tel:${company.phone}`);
        phoneLink.textContent = company.phone;
        phoneP.innerHTML = `<strong>Phone:</strong> `;
        phoneP.appendChild(phoneLink);
        card.appendChild(phoneP);
        
        // Website
        const websiteP = document.createElement('p');
        const websiteLink = document.createElement('a');
        websiteLink.setAttribute('href', company.website);
        websiteLink.setAttribute('target', '_blank');
        websiteLink.textContent = company.website;
        websiteP.innerHTML = `<strong>Website:</strong> `;
        websiteP.appendChild(websiteLink);
        card.appendChild(websiteP);

        // Dynamic Details (Established, Services, etc.)
        if (company.established) {
            const p = document.createElement('p');
            p.innerHTML = `<strong>Established:</strong> ${company.established}`;
            card.appendChild(p);
        }
        if (company.services) {
            const p = document.createElement('p');
            p.innerHTML = `<strong>Services:</strong> ${company.services.join(', ')}`;
            card.appendChild(p);
        }
        // ... (Repeat for products and cuisine, or use a loop)
        if (company.products) {
            const p = document.createElement('p');
            p.innerHTML = `<strong>Products:</strong> ${company.products.join(', ')}`;
            card.appendChild(p);
        }
        if (company.cuisine) {
            const p = document.createElement('p');
            p.innerHTML = `<strong>Cuisine:</strong> ${company.cuisine.join(', ')}`;
            card.appendChild(p);
        }
        
        cardsContainer.appendChild(card);
    });
}

/**
 * Handles the view toggle buttons (List/Grid).
 * @param {string} mode - The view mode to switch to ('list' or 'grid').
 */
function toggleView(mode) {
    const listButton = document.getElementById('list-button');
    const gridButton = document.getElementById('grid-button');
    
    currentView = mode; // Update the global state
    
    // Update active button classes (Error handling for null removed as per brief)
    if (listButton && gridButton) {
        if (mode === 'list') {
            listButton.classList.add('active-view');
            gridButton.classList.remove('active-view');
        } else {
            listButton.classList.remove('active-view');
            gridButton.classList.add('active-view');
        }
    }

    // Re-display the data with the new view mode
    displayCompanies(companyData, currentView);
}


/**
 * Main initialization function to run when the DOM is fully loaded.
 */
async function initializeDirectory() {
    // 1. Attach event listeners for the view toggle buttons
    const listButton = document.getElementById('list-button');
    const gridButton = document.getElementById('grid-button');

    if (listButton) {
        listButton.addEventListener('click', () => toggleView('list'));
    }

    if (gridButton) {
        gridButton.addEventListener('click', () => toggleView('grid'));
    }

    // 2. Fetch data and display initial view
    companyData = await fetchCompanyData(); 
    
    // Use the initially set view 'grid'
    displayCompanies(companyData, currentView); 
}

// 3. Run the initialization function immediately.
// 'defer' in the script tag ensures the DOM is ready before this executes.
initializeDirectory();
/**
 * Orchestrates the initial load of data and displays it in the default view.
 */
async function initialDataLoad() {
    const listContainer = document.getElementById('member-list');
    
    if (listContainer) {
        listContainer.innerHTML = '<p>Fetching member data...</p>';
    }
    
    // Fetch data and store it once
    companyData = await fetchCompanyData();
    
    // Display the data using the default initial view (which you requested to be 'grid')
    displayCompanies(companyData, currentView);
}

// --- Event Listeners and Initial Setup ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Load: Fetch data and display it immediately in the default 'grid' view
    initialDataLoad(); 

    // 2. Attach view toggle listeners
    const listButton = document.getElementById('list-button');
    const gridButton = document.getElementById('grid-button');

    if (listButton) {
        listButton.addEventListener('click', () => toggleView('list'));
    }
    
    if (gridButton) {
        gridButton.addEventListener('click', () => toggleView('grid'));
    }
    
    // Ensure the initial active button matches the initial view ('grid')
    if (listButton && gridButton) {
        listButton.classList.remove('active-view');
        gridButton.classList.add('active-view');
    }
});