const products = [
  
  {
    id: "az-ernr",
    name: "Errand Runner",
    description: "On-demand personal errands and shopping.",
    averagerating: 4.8
  },
  {
    id: "az-hndy",
    name: "Skilled Handyman",
    description: "Home repairs, assembly, and installations.",
    averagerating: 4.6
  },
  {
    id: "az-rdr01",
    name: "Dedicated Rider (Logistics)",
    description: "Secure, tracked package delivery and transport.",
    averagerating: 4.9
  },
  {
    id: "az-msc",
    name: "Miscellaneous Tasks",
    description: "Tasks that don't fit standard categories.",
    averagerating: 4.2
  },
  {
    id: "az-homecln",
    name: "Home Cleaning",
    description: "Standard and deep cleaning services.",
    averagerating: 4.7
  }

];

products.forEach (product =>{
  
    let items = document.createElement("option")
    items.textContent = `${product.name} :${product.averagerating}`;
    items.value = product.id;
    productName.appendChild(items);
    
    


     
});