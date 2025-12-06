const myTown = document.querySelector('#town'); 
const myGraphics = document.querySelector('#graphic');
const myDescription = document.querySelector('#description');
const myTemperature = document.querySelector('#temperature')

const myKey = "531db0b736984977701c6ccb948175ae"
const myLat="5.1066"
const myLon = "7.3667"

const myURL = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${myKey}&nuits=imperial`

async function apiFetch() {
  try {
    const response = await fetch(myURL);
    if (response.ok) {
      const data = await response.json();
       
       displayResults(data);  
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      
  }
}

function displayResults(data) {
    
    myTown.innerHTML = data.name
    myDescription.innerHTML = data.weather[0].description
    myTemperature.innerHTML = `${data.main.temp}&deg;F`
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    myGraphics.setAttribute('SRC', iconsrc)
    myGraphics.setAttribute('alt,data.weather[0].description')
}

apiFetch();
