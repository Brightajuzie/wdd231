const baseURL = "https://brightajuzie.github.io/wdd230/";
const linksURL = "https://brightajuzie.github.io/wdd230/data/links.json";
async function getLinks() {
  try {
    const response = await fetch(linksURL);
    if (response.ok) {
      const data = await response.json();
      
      displayLinks(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
     ;
  }
}

function displayLinks(data) {
  const learningActivities = document.querySelector(".card h2").parentNode;  
  learningActivities.innerHTML = '';

  data.weeks.forEach(weekData => {
    const weekHeading = document.createElement('h3');
    weekHeading.textContent = weekData.week;
    learningActivities.appendChild(weekHeading);

    const linkList = document.createElement('ul');
    weekData.links.forEach(link => {
      const listItem = document.createElement('li');
      const anchor = document.createElement('a');
      anchor.href = baseURL + link.url;
      anchor.textContent = link.title;
      listItem.appendChild(anchor);
      linkList.appendChild(listItem);
    });
    learningActivities.appendChild(linkList);
  });
}

getLinks();