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


const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: ['HTML', 'CSS'],
        completed: false
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 330,
        title: 'Web Backend Development',
        credits: 3,
        certificate: 'Web and Computer Programming',
        description: 'This course focuses on server-side programming, databases, and secure backend development practices.',
        technology: ['Node.js', 'Express', 'MongoDB'],
        completed: false
    }
];

// --- NEW COURSE DISPLAY FUNCTIONS ---

/**
 * Creates and appends HTML for a single course to the specified container.
 * @param {object} course - The course object to display.
 */
function createCourseCard(course) {
    const card = document.createElement('div');
    card.classList.add('course-card');
    if (course.completed) {
        card.classList.add('completed');
    }

    // Use ✅ for completed and ❌ for not completed, as requested.
    const completedStatus = course.completed ? '✅ Yes' : '❌ No';

    card.innerHTML = `
        <p><strong>Subject:</strong> ${course.subject}</p>
        <p><strong>Course:</strong> ${course.number}</p>
        <p><strong>Title:</strong> ${course.title}</p>
        <p><strong>Credits:</strong> ${course.credits}</p>
        <p><strong>Completed:</strong> ${completedStatus}</p>
        <p class="description">${course.description}</p>
    `;
    return card;
}

/**
 * Renders an array of courses to the DOM, sorted by title.
 * @param {Array<object>} courseArray - The courses to display.
 * @param {string} filterText - Text to display above the course list (e.g., "All Courses").
 */
function displayCourses(courseArray, filterText) {
    const displayContainer = document.querySelector('#course-display');
    if (!displayContainer) return;

    // Sort the array by course title (name) alphabetically
    const sortedCourses = [...courseArray].sort((a, b) => a.title.localeCompare(b.title));

    // Clear previous content
    displayContainer.innerHTML = '';

    // Add a heading for context
    const heading = document.createElement('h2');
    heading.textContent = filterText;
    displayContainer.appendChild(heading);

    // Add cards
    sortedCourses.forEach(course => {
        const card = createCourseCard(course);
        displayContainer.appendChild(card);
    });

    // Calculate and display total credits
    const totalCredits = sortedCourses.reduce((sum, course) => sum + course.credits, 0);
    const creditsParagraph = document.createElement('p');
    creditsParagraph.classList.add('total-credits');
    creditsParagraph.innerHTML = `<strong>Total Credits Displayed: ${totalCredits}</strong>`;
    displayContainer.appendChild(creditsParagraph);
}

 

function filterAllCourses() {
    displayCourses(courses, '📚 All Available Courses');
}

function filterCseCourses() {
    const cseCourses = courses.filter(course => course.subject === 'CSE');
    displayCourses(cseCourses, '💻 CSE (Computer Science) Courses');
}

function filterWddCourses() {
    const wddCourses = courses.filter(course => course.subject === 'WDD');
    displayCourses(wddCourses, '🌐 WDD (Web Development) Courses');
}

/*
 Sets up event listeners for the filter buttons.

*/
function setupCourseFilters() {
     
    document.getElementById('filter-all')?.addEventListener('click', filterAllCourses);
    document.getElementById('filter-cse')?.addEventListener('click', filterCseCourses);
    document.getElementById('filter-wdd')?.addEventListener('click', filterWddCourses);

    // Display all courses by default when filters are set up
    filterAllCourses();
}


// Run all setup functions when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    updateFooter();
    setupMobileMenu();
    setupDarkModeToggle();
    trackPageVisits();
    displayWindChill();
    displayWeatherCondition();
    setupCourseFilters(); // Call the new function to set up filters and display default
});