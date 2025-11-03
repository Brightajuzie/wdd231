 
function fetchWeather() {
    const weatherData = {
        temperature: "25°C",
        condition: "Sunny",
        icon: "☀️"
    };

    const weatherDiv = document.getElementById("weather-data");
    weatherDiv.innerHTML = `
        <p>${weatherData.icon} ${weatherData.temperature}</p>
        <p>${weatherData.condition}</p>
    `;
}

fetchWeather();  