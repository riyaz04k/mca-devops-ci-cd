const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Dummy product list
const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 800, img: "https://cdn.thewirecutter.com/wp-content/media/2024/11/cheapgaminglaptops-2048px-7981.jpg" },
  { id: 2, name: "Phone", category: "Mobiles", price: 500, img: "https://www.lifewire.com/thmb/XzxH-f88I5FObXkg60X6rmBCEYI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Image031-8c1279df682e44b8ad1494fe7f64298a.jpg" },
  { id: 3, name: "Headphones", category: "Accessories", price: 100, img: "https://in.static.webuy.com/product_images/Electronics/Headphones%20-%20Apple/SHEAAAPMOESBC_l.jpg" },
  { id: 4, name: "Smartwatch", category: "Wearables", price: 200, img: "https://5.imimg.com/data5/SELLER/Default/2020/12/KN/WP/OI/5388819/t500-smartwatch.jpg" }
];

// In-memory cart
let cart = [];

// Utility to filter products
function filterProducts(query) {
  if (!query) return products;
  query = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
  );
}

// Home Page with Search
app.get("/", (req, res) => {
  const searchQuery = req.query.q || "";
  const filteredProducts = filterProducts(searchQuery);

  let productCards = filteredProducts
    .map(
      (p) => `
      <div class="product">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p class="category">${p.category}</p>
        <p class="price">₹${p.price}</p>
        <a href="/add-to-cart/${p.id}" class="btn">Add to Cart</a>
      </div>
    `
    )
    .join("");

  res.send(`
    <html>
      <head>
        <title>Amazon Style Store</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; background: #f2f2f2; }
          .navbar { background: #131921; color: white; display: flex; align-items: center; padding: 10px 20px; }
          .navbar h1 { margin: 0; flex: 1; font-size: 22px; }
          .search-bar { flex: 2; display: flex; }
          .search-bar input { flex: 1; padding: 8px; border-radius: 4px 0 0 4px; border: none; font-size: 14px; }
          .search-bar button { background: #febd69; border: none; padding: 8px 14px; border-radius: 0 4px 4px 0; cursor: pointer; font-weight: bold; }
          .nav-links { flex: 1; text-align: right; }
          .nav-links a { margin-left: 20px; text-decoration: none; color: white; font-weight: bold; }
          .store { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; padding: 20px; }
          .product { background: white; border-radius: 5px; padding: 15px; text-align: center; box-shadow: 0 2px 6px rgba(0,0,0,0.1); }
          .product img { width: 100%; height: 160px; object-fit: cover; }
          .price { font-size: 1.2rem; font-weight: bold; color: #B12704; }
          .btn { display: inline-block; margin-top: 10px; text-decoration: none; background: #FFD814; padding: 8px 14px; border-radius: 4px; font-weight: bold; color: black; }
        </style>
      </head>
      <body>
        <div class="navbar">
          <h1>🛒 My Amazon Store</h1>
          <form class="search-bar" method="GET" action="/">
            <input type="text" name="q" value="${searchQuery}" placeholder="Search products...">
            <button type="submit">🔍 Search</button>
          </form>
          <div class="nav-links">
            <a href="/">Home</a>
            <a href="/cart">Cart (${cart.reduce((sum, item) => sum + item.qty, 0)})</a>
          </div>
        </div>
        <section class="store">${productCards || "<p>No products found 😞</p>"}</section>
      </body>
    </html>
  `);
});

// (Cart, Checkout, etc. remain same as before…)

