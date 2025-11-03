const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const display = document.querySelector("div.cards"); // Assuming you'll create a div with class 'cards' to hold the member info
const membersURL = "data/members.json";

async function getMembers() {
  try {
    const response = await fetch(membersURL);
    if (response.ok) {
      const data = await response.json();
      // console.log(data); // For testing
      displayMembers(data.members);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.error("Error fetching members:", error);
  }
}

function displayMembers(members) {
  members.forEach((member) => {
    let card = document.createElement("section");
    card.classList.add("member-card"); // Add a class for styling

    let name = document.createElement("h2");
    name.textContent = member.name;

    let address = document.createElement("p");
    address.textContent = member.address;

    let phone = document.createElement("p");
    phone.textContent = member.phone;

    let website = document.createElement("a");
    website.href = member.website;
    website.textContent = "Visit Website";
    website.setAttribute("target", "_blank"); // Open in a new tab

    let image = document.createElement("img");
    image.src = member.image;
    image.alt = `Logo of ${member.name}`;
    image.loading = "lazy"; // Improve performance

    let membership = document.createElement("p");
    membership.textContent = `Membership Level: ${member.membershipLevel}`;

    let otherInfo = document.createElement("p");
    otherInfo.textContent = member.otherInfo;

    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(website);
    card.appendChild(membership);
    card.appendChild(otherInfo);

    display.appendChild(card);
  });
}

gridButton.addEventListener("click", () => {
  display.classList.add("grid");
  display.classList.remove("list");
});

listButton.addEventListener("click", () => {
  display.classList.remove("grid");
  display.classList.add("list");
});

getMembers();