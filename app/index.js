// Updated Animated & Attractive Online Store
// Full Express.js App with Enhanced UI, Animations & Modern Styling

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Dummy Products
const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 800, img: "https://cdn.thewirecutter.com/wp-content/media/2024/11/cheapgaminglaptops-2048px-7981.jpg" },
  { id: 2, name: "Phone", category: "Mobiles", price: 500, img: "https://www.lifewire.com/thmb/XzxH-f88I5FObXkg60X6rmBCEYI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Image031-8c1279df682e44b8ad1494fe7f64298a.jpg" },
  { id: 3, name: "Headphones", category: "Accessories", price: 100, img: "https://in.static.webuy.com/product_images/Electronics/Headphones%20-%20Apple/SHEAAAPMOESBC_l.jpg" },
  { id: 4, name: "Smartwatch", category: "Wearables", price: 200, img: "https://5.imimg.com/data5/SELLER/Default/2020/12/KN/WP/OI/5388819/t500-smartwatch.jpg" }
];

let cart = [];

function renderStore(productsToShow) {
  let items = productsToShow
    .map(
      (p) => `
      <div class="product">
        <img src="${p.img}" alt="${p.name}" class="fade-in">
        <h3>${p.name}</h3>
        <p class="category">${p.category}</p>
        <p class="price">₹${p.price}</p>
        <a href="/add-to-cart/${p.id}" class="btn add">
          Add to Cart
        </a>
      </div>`
    )
    .join("");

  return `
  <html>
    <head>
      <title>Modern Online Store</title>
      <style>
        body {
          font-family: 'Poppins', sans-serif;
          margin: 0;
          background: linear-gradient(120deg, #f1f5f9, #e2e8f0);
          animation: fadeBg 10s infinite alternate;
        }

        @keyframes fadeBg {
          0% { background: #f1f5f9; }
          100% { background: #e2e8f0; }
        }

        .navbar {
          background: #0f172a;
          color: white;
          padding: 15px 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        .navbar h1 {
          font-size: 1.8rem;
          margin: 0;
          animation: slideIn 1s ease-out;
        }

        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .search-bar input {
          padding: 10px;
          border-radius: 6px 0 0 6px;
          border: none;
          width: 250px;
        }

        .search-bar button {
          padding: 10px 15px;
          border: none;
          background: #fbbf24;
          border-radius: 0 6px 6px 0;
          cursor: pointer;
        }

        .nav-links a {
          color: white;
          text-decoration: none;
          margin-left: 20px;
          font-weight: bold;
          transition: 0.3s;
        }
        .nav-links a:hover {
          color: #fbbf24;
        }

        .container {
          display: flex;
        }

        .sidebar {
          width: 240px;
          background: #ffffff;
          padding: 20px;
          box-shadow: 2px 0 10px rgba(0,0,0,0.1);
        }
        .sidebar a:hover {
          color: #ef4444;
        }

        .store {
          flex: 1;
          padding: 20px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 25px;
        }

        .product {
          background: #fff;
          padding: 15px;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transform: scale(1);
          transition: 0.3s;
        }

        .product:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 18px rgba(0,0,0,0.15);
        }

        .fade-in {
          animation: fadeIn 1.2s ease-in;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .btn {
          background: #facc15;
          padding: 10px 15px;
          border-radius: 6px;
          display: inline-block;
          text-decoration: none;
          color: #000;
          font-weight: 600;
          transition: 0.3s;
        }

        .btn:hover { background: #eab308; }

      </style>
    </head>

    <body>
      <div class="navbar">
        <h1>🔥 Animated Online Store</h1>
        <form action="/search" method="get" class="search-bar">
          <input type="text" name="q" placeholder="Search products...">
          <button>🔍</button>
        </form>
        <div class="nav-links">
          <a href="/">Home</a>
          <a href="/cart">Cart (${cart.length})</a>
          <a href="/checkout">Checkout</a>
        </div>
      </div>

      <div class="container">
        <aside class="sidebar">
          <h3>Categories</h3>
          <ul>
            <li><a href="/">All Products</a></li>
            <li><a href="/category/Electronics">Electronics</a></li>
            <li><a href="/category/Mobiles">Mobiles</a></li>
            <li><a href="/category/Accessories">Accessories</a></li>
            <li><a href="/category/Wearables">Wearables</a></li>
          </ul>
        </aside>

        <section class="store">
          ${items || "<p>No items found</p>"}
        </section>
      </div>
    </body>
  </html>`;
}

app.get("/", (req, res) => res.send(renderStore(products)));
app.get("/category/:c", (req, res) => res.send(renderStore(products.filter(p => p.category === req.params.c))));
app.get("/search", (req, res) => res.send(renderStore(products.filter(p => p.name.toLowerCase().includes(req.query.q?.toLowerCase() || "")))));

app.get("/add-to-cart/:id", (req, res) => {
  let item = products.find(p => p.id == req.params.id);
  if (item) cart.push(item);
  res.redirect("/cart");
});

app.get("/cart", (req, res) => {
  let total = cart.reduce((a, b) => a + b.price, 0);
  let list = cart.map(i => `<li>${i.name} - ₹${i.price}</li>`).join("");
  res.send(`<h1>Your Cart</h1><ul>${list}</ul><h2>Total: ₹${total}</h2><a href="/checkout">Checkout</a>`);
});

app.get("/checkout", (req, res) => {
  cart = [];
  res.send(`<h1>Order Successful 🎉</h1><a href="/">Back to Store</a>`);
});

app.listen(port, () => console.log("Server running on port " + port));

