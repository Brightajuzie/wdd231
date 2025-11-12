document.getElementById("lastModified").textContent = document.lastModified;
document.getElementById("currentYear").textContent = new Date().getFullYear();
const mainnav = document.querySelector('.navigation')
const hambutton = document.querySelector('#menu');
hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('show');
    hambutton.classList.toggle('show');
});

// FIX: Check if the mode button exists before trying to add a listener
const modeButton = document.querySelector("#mode");
const main = document.querySelector("main");

if (modeButton) {
    modeButton.addEventListener("click", () => {
        if (modeButton.textContent.includes("🕶️")) {
            main.style.background = "#000";
            main.style.color = "#fff";
            modeButton.textContent = "🔆";
        } else {
            main.style.background = "#eee";
            main.style.color = "#000";
            modeButton.textContent = "🕶️";
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    // Lazy Loading Implementation
    const images = document.querySelectorAll('img[data-src]');
    // ... (Lazy loading logic is correct and unchanged)
    const loadImages = (image) => {
        image.setAttribute('src', image.getAttribute('data-src'));
        image.onload = () => {
            image.removeAttribute('data-src');
        };
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadImages(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    images.forEach(img => {
        observer.observe(img);
    });

    // Last Visit Logic
    const lastVisitKey = 'lastVisit';
    const lastVisitMessageElement = document.getElementById('lastVisitMessage');
    const now = Date.now();
    const storedLastVisit = localStorage.getItem(lastVisitKey);

    if (lastVisitMessageElement) { // Check if the target element exists
        if (!storedLastVisit) {
            lastVisitMessageElement.textContent = "Welcome! Let us know if you have any questions.";
        } else {
            const lastVisitTime = parseInt(storedLastVisit);
            const timeDifference = now - lastVisitTime;
            const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

            if (daysDifference < 1) {
                lastVisitMessageElement.textContent = "Back so soon! Awesome!";
            } else if (daysDifference === 1) {
                lastVisitMessageElement.textContent = "You last visited 1 day ago.";
            } else {
                lastVisitMessageElement.textContent = `You last visited ${daysDifference} days ago.`;
            }
        }
    }

    localStorage.setItem(lastVisitKey, now);
});

// ... (Christmas Countdown logic is correct and unchanged)
const msToDays = 86400000;
const theDateToday = new Date();

const todayElement = document.querySelector("#today");
const christmasElement = document.querySelector("#christmas");
const christmasDateElement = document.querySelector("#christmasDate");
const daysElement = document.querySelector("#daysleft");

const today = Date.now();
const christmasDate = new Date(Date.UTC(theDateToday.getFullYear(), 11, 25));

if (theDateToday.getMonth() == 11 && theDateToday.getDate() > 25) {
    christmasDate.setFullYear(christmasDate.getFullYear() + 1);
}

let daysleft = (christmasDate.getTime() - Date.now()) / msToDays;

// FIX: Add checks for null elements before setting textContent
if (todayElement) todayElement.textContent = today;
if (christmasElement) christmasElement.textContent = christmasDate.getTime();
if (christmasDateElement) christmasDateElement.textContent = christmasDate;
if (daysElement) daysElement.textContent = `${daysleft.toFixed(0)} days`;

// Date.now() timestamp
const todayTimestampElement = document.querySelector('.today');
if (todayTimestampElement) todayTimestampElement.textContent = Date.now();