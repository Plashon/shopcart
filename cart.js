const cart = {};

document.querySelectorAll("#add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productName = button.getAttribute("data-product-name");
    const price = parseFloat(button.getAttribute("data-price"));
    if (!cart[productName]) {
      cart[productName] = { quantity: 1, price: price };
    } else {
      cart[productName].quantity++;
    }
    updateCartDisplay();
  });
});

function updateCartDisplay() {
  const cartElement = document.getElementById("cart");
  cartElement.innerHTML = "";

  let totalPrice = 0;
  for (const productName in cart) {
    const item = cart[productName];
    const itemTotalPrice = item.quantity * item.price;
    totalPrice += itemTotalPrice;
    const productElement = document.createElement("div");

    const productInfoElement = document.createElement("span");
    productInfoElement.textContent = `${productName}: ${item.quantity} x ฿${item.price} = ฿${itemTotalPrice}`;
    productElement.appendChild(productInfoElement);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("btn", "btn-warning");
    removeButton.addEventListener("click", () => {
      removeProduct(productName);
      updateCartDisplay();
    });
    productElement.appendChild(removeButton);

    cartElement.appendChild(productElement);
  }

  if (Object.keys(cart).length === 0) {
    cartElement.innerHTML = "<p>No items in cart.</p>";
  } else {
    const totalPriceElement = document.createElement("p");
    totalPriceElement.textContent = `Total Price: ฿${totalPrice}`;
    const placeOrderButton = document.createElement("button");
    placeOrderButton.textContent = "Place Order";
    placeOrderButton.classList.add("btn", "btn-success");
    cartElement.appendChild(totalPriceElement);

    const removeAllButton = document.createElement("button");
    removeAllButton.textContent = "Remove All";
    removeAllButton.classList.add("btn", "btn-danger");
    removeAllButton.addEventListener("click", () => {
      removeAllProducts();
      updateCartDisplay();
    });
    cartElement.appendChild(removeAllButton);
  }
}

function removeAllProducts() {
  for (const productName in cart) {
    delete cart[productName];
  }
}

function removeProduct(productName) {
  if (cart[productName].quantity > 1) {
    cart[productName].quantity--;
  } else {
    delete cart[productName];
  }
}



