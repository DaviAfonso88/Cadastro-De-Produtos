document.addEventListener("DOMContentLoaded", () => {
  // Get references to the form, product list container, product list, and new product button
  const registerForm = document.getElementById("register-form");
  const productListContainer = document.getElementById(
    "product-list-container"
  );
  const productList = document.getElementById("product-list");
  const newProductButton = document.getElementById("new-product-button");

  // Initialize an empty array to store products
  let products = JSON.parse(localStorage.getItem("products")) || [];

  // Display products on page load
  displayProducts();

  // Event listener for form submission
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get values from form inputs
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const value = parseFloat(document.getElementById("value").value);
    const available = document.getElementById("available").value;

    // Create a new product object
    const newProduct = {
      name,
      description,
      value,
      available,
    };

    // Add the new product to the products array and sort by value
    products.push(newProduct);
    products.sort((a, b) => a.value - b.value);
    localStorage.setItem("products", JSON.stringify(products)); // Store the updated product list in localStorage
    displayProducts(); // Update the displayed product list

    // Reset the form
    registerForm.reset();
  });

  // Event listener for the new product button
  newProductButton.addEventListener("click", function () {
    productListContainer.classList.add("hidden"); // Hide the product list container
  });

  // Function to display products in the product list
  function displayProducts() {
    productList.innerHTML = ""; // Clear the current product list

    products.forEach((product, index) => {
      const productItem = document.createElement("div");
      productItem.classList.add("product__item");

      const nameSpan = document.createElement("span");
      nameSpan.textContent = `Nome: ${product.name}`;

      const valueSpan = document.createElement("span");
      valueSpan.textContent = `Valor: R$ ${product.value.toFixed(2)}`;

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete__button");
      deleteButton.innerHTML = '<i class="ri-delete-bin-line"></i>';
      deleteButton.addEventListener("click", () => {
        deleteProduct(index); // Delete the product when the button is clicked
      });

      productItem.appendChild(nameSpan);
      productItem.appendChild(valueSpan);
      productItem.appendChild(deleteButton);
      productList.appendChild(productItem);
    });

    // Toggle the visibility of the product list container based on the number of products
    if (products.length === 0) {
      productListContainer.classList.add("hidden");
    } else {
      productListContainer.classList.remove("hidden");
    }
  }

  // Function to delete a product from the product list
  function deleteProduct(index) {
    products.splice(index, 1); // Remove the product from the array
    localStorage.setItem("products", JSON.stringify(products)); // Update the stored product list in localStorage
    displayProducts(); // Update the displayed product list
  }
});
