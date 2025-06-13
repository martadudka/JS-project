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
    // Add to Cart event listener
    const button = card.querySelector("button");
    button.addEventListener("click", function () {
      const id = parseInt(this.getAttribute("data-id"));
      addToCart(id);
    });

    catalogContainer.appendChild(card);
  }
}

// Adds a product to the cart
function addToCart(productId) {
  let found = false;

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity++;
      found = true;
      break;
    }
  }

  if (!found) {
    cart.push({ productId: productId, quantity: 1 });
  }

  updateCart();
  updateTotal();
}

// Updates cart HTML
function updateCart() {
  const cartContainer = document.getElementById("cart-items");
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.textContent = "Your cart is empty.";
    return;
  }

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    const product = productCatalog.find((p) => p.id === item.productId);
    if (!product) continue;

    const subtotal = product.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.innerHTML = `
      ${product.name} - Qty: ${item.quantity} - Subtotal: €${subtotal.toFixed(2)}
      <button data-id="${item.productId}">Remove</button>
    `;
    cartContainer.appendChild(cartItem);
  }

  // Attach event listeners to remove buttons
  const removeButtons = cartContainer.querySelectorAll("button");
  for (let btn of removeButtons) {
    btn.addEventListener("click", function () {
      const id = parseInt(this.getAttribute("data-id"));
      removeFromCart(id);
    });
  }
}

// Removes or decreases product quantity
function removeFromCart(productId) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      if (cart[i].quantity > 1) {
        cart[i].quantity--;
      } else {
        cart.splice(i, 1);
      }
      break;
    }
  }

  updateCart();
  updateTotal();
}

// Calculates and updates total price
function updateTotal() {
  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    const product = productCatalog.find((p) => p.id === item.productId);
    if (!product) continue;

    total += product.price * item.quantity;
  }

  document.getElementById("total-price").textContent = `Total: €${total.toFixed(2)}`;
}

// Initialization on DOM ready
document.addEventListener("DOMContentLoaded", function () {
  showCatalog();
  updateCart();
  updateTotal();

  // Clear cart button
  document.getElementById("clear-cart").addEventListener("click", function () {
    cart.length = 0;
    updateCart();
    updateTotal();
  });

  // Checkout button
  document.getElementById("checkout").addEventListener("click", function () {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    // Proceed with checkout (this is just a placeholder)
    alert("Proceeding to checkout...");
  });
});