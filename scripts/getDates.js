// Function to handle the footer content (current year and last modified date)
function updateFooter() {
    const lastModifiedElement = document.getElementById("lastModified");
    const currentYearElement = document.getElementById("currentYear");
    
    if (lastModifiedElement) {
        lastModifiedElement.textContent = document.lastModified;
    }
    
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
}

// Function to handle the mobile navigation menu toggle
function setupMobileMenu() {
    const mainnav = document.querySelector('.navigation');
    const hambutton = document.querySelector('#menu');

    if (mainnav && hambutton) {
        hambutton.addEventListener('click', () => {
            mainnav.classList.toggle('show');
            hambutton.classList.toggle('show');
        });
    }
}

// Function to handle the dark mode toggle
function setupDarkModeToggle() {
    const modeButton = document.querySelector("#mode");
    const body = document.body; 

    if (modeButton) {
        modeButton.addEventListener("click", () => {
            body.classList.toggle("dark-mode");
            if (body.classList.contains("dark-mode")) {
                modeButton.textContent = "🔆";
            } else {
                modeButton.textContent = "🕶️";
            }
        });
    }
}

// Function to handle and display the visit count using localStorage
function trackPageVisits() {
    const visitsDisplay = document.querySelector(".visits");
    let numVisits = Number(localStorage.getItem("numVisits-ls")) || 0;

    if (visitsDisplay) {
        if (numVisits !== 0) {
            visitsDisplay.textContent = numVisits;
        } else {
            visitsDisplay.textContent = "This is your first visit. 🥳 Welcome!";
        }
    }
    
    numVisits++;
    localStorage.setItem("numVisits-ls", numVisits);
}

// Function to calculate and display the wind chill factor
function displayWindChill() {
    const temperatureFahrenheit = 45; // °F
    const windSpeedMph = 5; // mph
    const windChillElement = document.getElementById('wind-chill');

    const calculateWindChill = (temp, speed) => {
        return 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    };

    if (windChillElement) {
        if (temperatureFahrenheit <= 50 && windSpeedMph > 3) {
            const windChill = calculateWindChill(temperatureFahrenheit, windSpeedMph).toFixed(1);
            windChillElement.textContent = `${windChill}°F`;
        } else {
            windChillElement.textContent = 'N/A';
        }
    }
}

// Function to display the static weather condition
function displayWeatherCondition() {
    const weatherConditionElement = document.getElementById('weather-condition');
    const staticCondition = "Cloudy"; // Example static weather condition

    if (weatherConditionElement) {
        weatherConditionElement.textContent = staticCondition;
    }
}

// Run all setup functions when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    updateFooter();
    setupMobileMenu();
    setupDarkModeToggle();
    trackPageVisits();
    displayWindChill();
    displayWeatherCondition(); // Call the new function
});