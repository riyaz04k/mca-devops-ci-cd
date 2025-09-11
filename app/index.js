const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Dummy product list
const products = [
  { id: 1, name: "Laptop", price: 800, img: "https://cdn.thewirecutter.com/wp-content/media/2024/11/cheapgaminglaptops-2048px-7981.jpg" },
  { id: 2, name: "Phone", price: 500, img: "https://www.lifewire.com/thmb/XzxH-f88I5FObXkg60X6rmBCEYI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Image031-8c1279df682e44b8ad1494fe7f64298a.jpg" },
  { id: 3, name: "Headphones", price: 100, img: "https://in.static.webuy.com/product_images/Electronics/Headphones%20-%20Apple/SHEAAAPMOESBC_l.jpg" },
  { id: 4, name: "Smartwatch", price: 200, img: "https://istarmax.com/wp-content/uploads/2024/04/Starmax-Product-Range-Summer-2024-2.png" }
];

// In-memory cart
let cart = [];

// Home page - product store
app.get("/", (req, res) => {
  let productCards = products
    .map(
      (p) => `
      <div class="card">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>💲${p.price}</p>
        <a href="/add-to-cart/${p.id}">🛒 Add to Cart</a>
      </div>
    `
    )
    .join("");

  res.send(`
    <html>
      <head>
        <title>🛒 Simple E-commerce Store</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; background: #f4f4f9; text-align:center; }
          h1 { color: #2c3e50; }
          .store { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; margin-top: 20px; }
          .card { background: white; padding: 15px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); width: 200px; }
          .card img { width: 100%; border-radius: 5px; }
          .card h3 { margin: 10px 0; }
          .card a { display: inline-block; margin-top: 10px; text-decoration: none; color: white; background: #27ae60; padding: 8px 12px; border-radius: 5px; }
          .card a:hover { background: #219150; }
          .nav { margin-top: 20px; }
          .nav a { margin: 0 10px; text-decoration: none; color: #3498db; }
        </style>
      </head>
      <body>
        <h1>🚀 Welcome to Simple E-commerce Store</h1>
        <div class="nav">
          <a href="/">🏠 Home</a> |
          <a href="/cart">🛒 View Cart</a> |
          <a href="/checkout">✅ Checkout</a>
        </div>
        <div class="store">
          ${productCards}
        </div>
      </body>
    </html>
  `);
});

// Add to cart
app.get("/add-to-cart/:id", (req, res) => {
  const product = products.find((p) => p.id == req.params.id);
  if (product) cart.push(product);
  res.redirect("/cart");
});

// View cart
app.get("/cart", (req, res) => {
  if (cart.length === 0) {
    return res.send("<h2>🛒 Your cart is empty. <a href='/'>Go shopping</a></h2>");
  }

  let cartItems = cart
    .map((p) => `<li>${p.name} - 💲${p.price}</li>`)
    .join("");

  let total = cart.reduce((sum, p) => sum + p.price, 0);

  res.send(`
    <h2>🛒 Your Cart</h2>
    <ul>${cartItems}</ul>
    <h3>Total: 💲${total}</h3>
    <a href="/checkout">✅ Proceed to Checkout</a> | <a href="/">⬅ Back to Store</a>
  `);
});

// Checkout
app.get("/checkout", (req, res) => {
  cart = []; // Empty the cart after checkout
  res.send("✅ Checkout complete! Thank you for shopping with us.");
});

// API endpoint - JSON products
app.get("/products", (req, res) => {
  res.json(products);
});

// Start server
app.listen(port, "0.0.0.0", () => {
  console.log(`E-commerce app running on port ${port}`);
});

