// FULLY UPDATED — CLEAN, RESPONSIVE & PERFECTLY FITTING PAGE
// Modern, Animated Online Store (Express.js)
// ⚡ Fully mobile‑responsive
// 🎨 Smooth animations
// 📦 Beautiful product cards
// 🧭 Clean navigation
// 💯 Everything fits perfectly — no overflow or breaks

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// PRODUCT LIST
const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 800, img: "https://cdn.thewirecutter.com/wp-content/media/2024/11/cheapgaminglaptops-2048px-7981.jpg" },
  { id: 2, name: "Phone", category: "Mobiles", price: 500, img: "https://www.lifewire.com/thmb/XzxH-f88I5FObXkg60X6rmBCEYI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Image031-8c1279df682e44b8ad1494fe7f64298a.jpg" },
  { id: 3, name: "Headphones", category: "Accessories", price: 100, img: "https://in.static.webuy.com/product_images/Electronics/Headphones%20-%20Apple/SHEAAAPMOESBC_l.jpg" },
  { id: 4, name: "Smartwatch", category: "Wearables", price: 200, img: "https://5.imimg.com/data5/SELLER/Default/2020/12/KN/WP/OI/5388819/t500-smartwatch.jpg" }
];

let cart = [];

function renderPage(content) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Animated Store</title>

    <style>
      body {
        margin: 0;
        font-family: "Poppins", sans-serif;
        background: #f7f7f7;
      }

      /* NAVBAR */
      .navbar {
        background: #111827;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 25px;
        position: sticky;
        top: 0;
        z-index: 999;
      }
      .navbar h1 {
        margin: 0;
        font-size: 22px;
      }

      .nav-links a {
        color: white;
        margin-left: 15px;
        text-decoration: none;
        font-size: 15px;
        transition: 0.3s;
      }
      .nav-links a:hover {
        color: #FCD34D;
      }

      /* SEARCH BAR */
      .search-bar {
        display: flex;
      }
      .search-bar input {
        padding: 8px;
        border-radius: 6px 0 0 6px;
        border: none;
        width: 180px;
      }
      .search-bar button {
        padding: 8px 12px;
        background: #FCD34D;
        border: none;
        border-radius: 0 6px 6px 0;
        cursor: pointer;
      }

      /* LAYOUT */
      .container {
        display: flex;
        flex-wrap: wrap;
      }

      .sidebar {
        width: 240px;
        min-height: 100vh;
        background: #ffffff;
        padding: 20px;
        box-shadow: 2px 0 10px rgba(0,0,0,0.1);
      }
      .sidebar a {
        text-decoration: none;
        display: block;
        padding: 10px 0;
        color: #374151;
        font-weight: 600;
        transition: 0.3s;
      }
      .sidebar a:hover {
        color: #DC2626;
      }

      /* PRODUCT GRID */
      .store {
        flex: 1;
        padding: 25px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 20px;
      }

      .product {
        background: white;
        border-radius: 10px;
        padding: 15px;
        text-align: center;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        transition: 0.3s;
      }
      .product:hover {
        transform: translateY(-6px);
        box-shadow: 0 8px 18px rgba(0,0,0,0.15);
      }
      .product img {
        width: 100%;
        height: 160px;
        object-fit: cover;
        border-radius: 8px;
      }

      .btn {
        background: #FDE047;
        padding: 8px 12px;
        border-radius: 6px;
        display: inline-block;
        text-decoration: none;
        color: #000;
        margin-top: 10px;
        font-weight: 600;
      }
      .btn:hover {
        background: #FACC15;
      }

      /* MOBILE FIX: Sidebar stacks correctly */
      @media (max-width: 900px) {
        .sidebar {
          width: 100%;
          min-height: auto;
        }
        .container {
          flex-direction: column;
        }
      }
    </style>
  </head>

  <body>
    <div class="navbar">
      <h1>🛒 Animated Store</h1>
      <form class="search-bar" action="/search">
        <input type="text" name="q" placeholder="Search...">
        <button>🔍</button>
      </form>
      <div class="nav-links">
        <a href="/">Home</a>
        <a href="/cart">Cart (${cart.length})</a>
        <a href="/checkout">Checkout</a>
      </div>
    </div>

    ${content}
  </body>
  </html>`;
}

function renderStore(items) {
  let cards = items.map(
    p => `
      <div class="product">
        <img src="${p.img}" />
        <h3>${p.name}</h3>
        <p>${p.category}</p>
        <p><b>₹${p.price}</b></p>
        <a class="btn" href="/add/${p.id}">Add to Cart</a>
      </div>
    `
  ).join("");

  return renderPage(`
    <div class="container">
      <aside class="sidebar">
        <h3>Categories</h3>
        <a href="/">All</a>
        <a href="/category/Electronics">Electronics</a>
        <a href="/category/Mobiles">Mobiles</a>
        <a href="/category/Accessories">Accessories</a>
        <a href="/category/Wearables">Wearables</a>
      </aside>

      <section class="store">
        ${cards}
      </section>
    </div>
  `);
}

// ROUTES
app.get("/", (req, res) => res.send(renderStore(products)));
app.get("/category/:c", (req, res) => res.send(renderStore(products.filter(p => p.category === req.params.c))));
app.get("/search", (req, res) => {
  let q = req.query.q?.toLowerCase() || "";
  res.send(renderStore(products.filter(p => p.name.toLowerCase().includes(q))));
});

app.get("/add/:id", (req, res) => {
  let p = products.find(x => x.id == req.params.id);
  if (p) cart.push(p);
  res.redirect("/cart");
});

app.get("/cart", (req, res) => {
  let total = cart.reduce((a,b)=>a+b.price,0);
  let items = cart.map(i => `<li>${i.name} - ₹${i.price}</li>`).join("");

  res.send(renderPage(`
    <div style="padding:30px;">
      <h2>Your Cart</h2>
      <ul>${items}</ul>
      <h3>Total: ₹${total}</h3>
      <a class="btn" href="/checkout">Checkout</a>
    </div>
  `));
});

app.get("/checkout", (req, res) => {
  cart = [];
  res.send(renderPage(`<div style="padding:40px;"><h2>Order Successful ✔️</h2></div>`));
});

app.listen(port, () => console.log("Running on port " + port));

