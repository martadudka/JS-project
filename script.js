// Product data
const productCatalog = [
  {
    id: 1,
    name: "Notebook",
    price: 10,
    imageUrl: "assets/notebook.jpg",
  },
  {
    id: 2,
    name: "Pen",
    price: 2,
    imageUrl: "assets/pen.jpg",
  },
  {
    id: 3,
    name: "Backpack",
    price: 30,
    imageUrl: "assets/backpack.jpg",
  },
];

// Shopping cart - initially empty
const cart = [];

// Displays all products in the catalog
function showCatalog() {
  const catalogContainer = document.getElementById("product-catalog");
  catalogContainer.innerHTML = "";

  for (let i = 0; i < productCatalog.length; i++) {
    const product = productCatalog[i];

    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
        <h3>${product.name}</h3>
        <img src="${product.imageUrl}" alt="${product.name}">
        <p>Price: €${product.price.toFixed(2)}</p>
        <button data-id="${product.id}">Add to Cart</button>
      `;

    catalogContainer.appendChild(card);
  }
}
// Initialization
document.addEventListener("DOMContentLoaded", init);
function init() {
  showCatalog();
}
