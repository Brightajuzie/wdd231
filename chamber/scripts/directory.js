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
        // console.log('fetched'); // Removed debug log

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.companies || []; 

    } catch (error) {
        console.error('Error fetching company data:', error);
        // Using document.querySelector('.cards') for consistency
        const cardsContainer = document.querySelector('.cards');
        
        if (cardsContainer) {
            // Using innerHTML is safe here as error message is static/controlled
            cardsContainer.innerHTML = `<p style="color: red;">Failed to load data: ${error.message}. Check the path: <strong>'${JSON_FILE_PATH}'</strong>.</p>`;
        }
        
        return [];
    }
}

/**
 * Creates a paragraph element with strong label text and dynamic content.
 * Uses textContent for the dynamic value for XSS safety.
 * @param {string} label - The bold label text.
 * @param {any} value - The dynamic value to display (can be an array or string).
 * @returns {HTMLParagraphElement} The created <p> element.
 */
function createDetailParagraph(label, value) {
    if (!value) return null;

    const p = document.createElement('p');
    p.innerHTML = `<strong>${label}:</strong> `; // Label is trusted static content

    // Convert arrays (like services, products) to comma-separated string
    const textValue = Array.isArray(value) ? value.join(', ') : String(value);

    // Use textContent to append the dynamic, potentially unsafe value
    p.insertAdjacentText('beforeend', textValue);
    
    return p;
}


/**
 * Displays the company data in the designated HTML container and applies the current view mode.
 * **FIXED:** Uses safer DOM methods and handles all unique JSON fields.
 * @param {Array} companies - Array of company objects.
 * @param {string} viewMode - 'list' or 'grid'
 */
function displayCompanies(companies, viewMode) {
    const cardsContainer = document.querySelector('.cards'); 
    
    // Fallback if the container is missing
    if (!cardsContainer) {
        console.error("Required HTML container (.cards) not found. Cannot display data.");
        return;
    }
    
    // 1. Update the parent container's class based on view mode
    cardsContainer.classList.remove(viewMode === 'list' ? 'grid' : 'list');
    cardsContainer.classList.add(viewMode);
    
    // 2. Clear previous content
    cardsContainer.innerHTML = ''; 

    if (companies.length === 0) {
        cardsContainer.innerHTML = '<p>No company members found.</p>';
        return;
    }

    companies.forEach(company => {
        const card = document.createElement('div');
        card.classList.add('company-card', company.membershipLevel.toLowerCase());
        
        // --- Image ---
        if (company.image) {
            const img = document.createElement('img');
            img.setAttribute('src', company.image);
            img.setAttribute('alt', `${company.name} logo`);
            img.classList.add('company-logo');
            card.appendChild(img);
        }

        // --- Name and Membership Level ---
        const h3 = document.createElement('h3');
        h3.textContent = `${company.name} (${company.membershipLevel})`;
        card.appendChild(h3);

        // --- Address ---
        card.appendChild(createDetailParagraph('Address', company.address));

        // --- Phone ---
        const phoneP = document.createElement('p');
        const phoneLink = document.createElement('a');
        phoneLink.setAttribute('href', `tel:${company.phone}`);
        phoneLink.textContent = company.phone;
        phoneP.innerHTML = `<strong>Phone:</strong> `;
        phoneP.appendChild(phoneLink);
        card.appendChild(phoneP);
        
        // --- Website ---
        const websiteP = document.createElement('p');
        const websiteLink = document.createElement('a');
        websiteLink.setAttribute('href', company.website);
        websiteLink.setAttribute('target', '_blank');
        websiteLink.textContent = company.website;
        websiteP.innerHTML = `<strong>Website:</strong> `;
        websiteP.appendChild(websiteLink);
        card.appendChild(websiteP);

        // --- Dynamic Details (Using the helper function to cover all JSON fields) ---
        
        // Common Fields
        card.appendChild(createDetailParagraph('Established', company.established));
        card.appendChild(createDetailParagraph('Services', company.services));
        card.appendChild(createDetailParagraph('Products', company.products));
        card.appendChild(createDetailParagraph('Cuisine', company.cuisine));
        
        // Unique Fields (as per data/members.json)
        card.appendChild(createDetailParagraph('Employees', company.employees));
        card.appendChild(createDetailParagraph('Catering Services', company.cateringServices));
        card.appendChild(createDetailParagraph('Educational Levels', company.levels));
        card.appendChild(createDetailParagraph('Enrollment', company.enrollment));
        card.appendChild(createDetailParagraph('Specialization', company.specialization));
        card.appendChild(createDetailParagraph('Delivery Available', company.deliveryAvailable));
        card.appendChild(createDetailParagraph('Agents', company.agents));
        card.appendChild(createDetailParagraph('Turnaround Time', company.turnaroundTime));
        
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
    
    // Update active button classes
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

// --- CRITICAL FIX: INITIALIZATION AND EVENT LISTENERS ---

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
    displayCompanies(companyData, currentView); 
}

// Execute the main function to start the application
initializeDirectory();