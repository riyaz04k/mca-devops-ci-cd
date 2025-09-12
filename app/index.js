const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Dummy product list
const products = [
  { id: 1, name: "Laptop", price: 800, img: "https://cdn.thewirecutter.com/wp-content/media/2024/11/cheapgaminglaptops-2048px-7981.jpg" },
  { id: 2, name: "Phone", price: 500, img: "https://www.lifewire.com/thmb/XzxH-f88I5FObXkg60X6rmBCEYI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Image031-8c1279df682e44b8ad1494fe7f64298a.jpg" },
  { id: 3, name: "Headphones", price: 100, img: "https://in.static.webuy.com/product_images/Electronics/Headphones%20-%20Apple/SHEAAAPMOESBC_l.jpg" },
  { id: 4, name: "Smartwatch", price: 200, img: "https://5.imimg.com/data5/SELLER/Default/2020/12/KN/WP/OI/5388819/t500-smartwatch.jpg" }
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
        <p class="price">💲${p.price}</p>
        <a href="/add-to-cart/${p.id}" class="btn">🛒 Add to Cart</a>
      </div>
    `
    )
    .join("");

  res.send(`
    <html>
      <head>
        <title>🛒 Simple Riyaz's E-commerce Store</title>
        <style>
          body { font-family: 'Segoe UI', sans-serif; margin: 0; background: linear-gradient(135deg, #6a11cb, #2575fc); color: #fff; }
          header { padding: 20px; text-align: center; background: rgba(0,0,0,0.3); }
          header h1 { margin: 0; font-size: 2.5rem; }
          .nav { margin-top: 10px; }
          .nav a { margin: 0 15px; text-decoration: none; color: #ffdd59; font-weight: bold; }
          .store { display: flex; justify-content: center; gap: 25px; flex-wrap: wrap; padding: 30px; }
          .card { background: white; color: #333; padding: 15px; border-radius: 12px; box-shadow: 0 6px 12px rgba(0,0,0,0.2); width: 220px; transition: transform 0.2s; }
          .card:hover { transform: translateY(-8px); }
          .card img { width: 100%; height: 140px; object-fit: cover; border-radius: 8px; }
          .card h3 { margin: 10px 0; color: #2c3e50; }
          .price { font-size: 1.2rem; font-weight: bold; color: #27ae60; }
          .btn { display: inline-block; margin-top: 10px; text-decoration: none; color: white; background: #e67e22; padding: 8px 14px; border-radius: 6px; transition: 0.3s; }
          .btn:hover { background: #d35400; }
        </style>
      </head>
      <body>
        <header>
          <h1>🚀 Welcome to My Cool Riyaz's E-commerce Store</h1>
          <div class="nav">
            <a href="/">🏠 Home</a>
            <a href="/cart">🛒 Cart</a>
            <a href="/checkout">✅ Checkout</a>
          </div>
        </header>
        <section class="store">
          ${productCards}
        </section>
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
    return res.send(`
      <html><body style="text-align:center; font-family:Arial; background:#f8f9fa;">
      <h2>🛒 Your cart is empty.</h2>
      <a href="/" style="color:#3498db; text-decoration:none;">⬅ Go shopping</a>
      </body></html>
    `);
  }

  let cartItems = cart
    .map((p) => `<li>${p.name} - 💲${p.price}</li>`)
    .join("");

  let total = cart.reduce((sum, p) => sum + p.price, 0);

  res.send(`
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background: #f8f9fa; color:#333; text-align:center; padding:40px; }
          ul { list-style:none; padding:0; }
          li { background:#fff; margin:10px auto; padding:10px; border-radius:6px; width:250px; box-shadow:0 4px 6px rgba(0,0,0,0.1); }
          a { text-decoration:none; color:#fff; padding:10px 15px; border-radius:6px; background:#27ae60; margin:10px; display:inline-block; }
          a:hover { background:#219150; }
        </style>
      </head>
      <body>
        <h2>🛒 Your Cart</h2>
        <ul>${cartItems}</ul>
        <h3>Total: 💲${total}</h3>
        <a href="/checkout">✅ Checkout</a>
        <a href="/">⬅ Back to Store</a>
      </body>
    </html>
  `);
});

// Checkout
app.get("/checkout", (req, res) => {
  cart = []; // Empty the cart after checkout
  res.send(`
    <html><body style="font-family:Arial; text-align:center; padding:40px; background:#ecf0f1;">
      <h2>✅ Checkout complete!</h2>
      <p>🎉 Thank you for shopping with us.</p>
      <a href="/" style="color:#3498db; text-decoration:none;">⬅ Back to Home</a>
    </body></html>
  `);
});

// API endpoint - JSON products
app.get("/products", (req, res) => {
  res.json(products);
});

// Start server
app.listen(port, "0.0.0.0", () => {
  console.log(`✨ E-commerce app running on port ${port}`);
});

