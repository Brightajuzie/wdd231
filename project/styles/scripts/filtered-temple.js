 
const mainnav = document.querySelector('.navigation ul');
const hambutton = document.querySelector('#menu');

 
hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('show');
    hambutton.classList.toggle('show');
});

 
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Feather River California Temple",
        location: "Feather River, California",
        dedicated: "2023, October, 8",
        area: 41665,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/feather-river-california-temple/feather-river-california-temple-39697-main.jpg"
    },
    {
        templeName: "Lima Peru Los Olivos Temple",
        location: "Lima Peru Los Olivos, Peru",
        dedicated: "2024, January, 14",
        area: 47413,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/lima-peru-los-olivos-temple/lima-peru-los-olivos-temple-42524-main.jpg"
    },
    {
        templeName: "Orem Utah Temple",
        location: "Orem Utah, United States",
        dedicated: "2024, January, 21",
        area: 71998,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/orem-utah-temple/orem-utah-temple-39549-main.jpg"
    },
    {
        templeName: "Bangkok Thailand Temple",
        location: "Bangkok, Thailand",
        dedicated: "2023, October, 22",
        area: 48525,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/bangkok-thailand-temple/bangkok-thailand-temple-40037-main.jpg"
    },
];

 
const getDedicationDate = (temple) => new Date(temple.dedicated);

 
function createTempleCard(filteredTemples) {
    
    document.querySelector(".photo-album").innerHTML = "";

    filteredTemples.forEach(temple => {
       
        let card = document.createElement("section");
        let name = document.createElement("h1");
        let location = document.createElement("p");
        let dedication = document.createElement("p");
        let area = document.createElement("p");
        let image = document.createElement("img");

       
        name.textContent = temple.templeName;
        location.innerHTML = `<span class="label">Location:</span> ${temple.location}`;
        dedication.innerHTML = `<span class="label">Dedication:</span> ${temple.dedicated}`;
        area.innerHTML = `<span class="label">Area:</span> ${temple.area.toLocaleString()} sq ft`;

         
        image.setAttribute("src", temple.imageUrl);
        image.setAttribute("alt", `${temple.templeName} Temple`);
        image.setAttribute("loading", "lazy");

        
        card.appendChild(name);
        card.appendChild(location);
        card.appendChild(dedication);
        card.appendChild(area);
        card.appendChild(image);

        
        document.querySelector(".photo-album").appendChild(card);
    });
}

 
createTempleCard(temples);

 
const OLD_YEAR_THRESHOLD = 1900; 

 
const NEW_YEAR_THRESHOLD = 2000; 

 
const LARGE_AREA_THRESHOLD = 90000; 

 
const SMALL_AREA_THRESHOLD = 10000; 


 
document.getElementById("oldest").addEventListener("click", () => {
    const oldTemples = temples.filter(temple => {
        const dedicatedYear = getDedicationDate(temple).getFullYear();
        
        return dedicatedYear < OLD_YEAR_THRESHOLD; 
    });
    createTempleCard(oldTemples);
});

 
document.getElementById("newest").addEventListener("click", () => {
    const newTemples = temples.filter(temple => {
        const dedicatedYear = getDedicationDate(temple).getFullYear();
         
        return dedicatedYear > NEW_YEAR_THRESHOLD; 
    });
    createTempleCard(newTemples);
});

 
document.getElementById("largest").addEventListener("click", () => {
     
    const largestTemples = temples.filter(temple => temple.area > LARGE_AREA_THRESHOLD);
    createTempleCard(largestTemples);
});

 
document.getElementById("smallest").addEventListener("click", () => {
     
    const smallestTemples = temples.filter(temple => temple.area < SMALL_AREA_THRESHOLD);
    createTempleCard(smallestTemples);
});

 
document.getElementById("home").addEventListener("click", () => {
    createTempleCard(temples);
});

 