const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Dummy product list
const products = [
  {
    id: 1,
    name: "Laptop",
    category: "Electronics",
    price: 800,
    img: "https://cdn.thewirecutter.com/wp-content/media/2024/11/cheapgaminglaptops-2048px-7981.jpg"
  },
  {
    id: 2,
    name: "Phone",
    category: "Mobiles",
    price: 500,
    img: "https://www.lifewire.com/thmb/XzxH-f88I5FObXkg60X6rmBCEYI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Image031-8c1279df682e44b8ad1494fe7f64298a.jpg"
  },
  {
    id: 3,
    name: "Headphones",
    category: "Accessories",
    price: 100,
    img: "https://in.static.webuy.com/product_images/Electronics/Headphones%20-%20Apple/SHEAAAPMOESBC_l.jpg"
  },
  {
    id: 4,
    name: "Smartwatch",
    category: "Wearables",
    price: 200,
    img: "https://5.imimg.com/data5/SELLER/Default/2020/12/KN/WP/OI/5388819/t500-smartwatch.jpg"
  }
];

// In-memory cart
let cart = [];

// Function to render store
function renderStore(productsToShow) {
  let productCards = productsToShow
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

  return `
    <html>
      <head>
        <title>Amazon Store</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; background: #f2f2f2; }

          .navbar {
            background: #131921;
            color: white;
            display: flex;
            align-items: center;
            padding: 10px 20px;
          }
          .navbar h1 { margin: 0; font-size: 1.8rem; flex: 1; }
          .search-bar { flex: 2; display: flex; }
          .search-bar input {
            flex: 1; padding: 10px; border: none; font-size: 1rem;
          }
          .search-bar button {
            background: #febd69; border: none; padding: 10px 15px; cursor: pointer;
          }
          .nav-links { flex: 1; text-align: right; }
          .nav-links a {
            margin-left: 20px; text-decoration: none; color: white; font-weight: bold;
          }

          .container { display: flex; }

          .sidebar {
            width: 220px; background: white; padding: 20px;
            box-shadow: 2px 0 6px rgba(0,0,0,0.1);
          }
          .sidebar h3 { margin-bottom: 15px; color: #333; }
          .sidebar ul { list-style: none; padding: 0; }
          .sidebar li { margin: 10px 0; }
          .sidebar a { text-decoration: none; color: #007185; font-weight: bold; }
          .sidebar a:hover { color: #C7511F; }

          .store {
            flex: 1;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 20px;
            padding: 20px;
          }

          .product {
            background: white;
            border-radius: 5px;
            padding: 15px;
            text-align: center;
            box-shadow: 0 2px 6px rgba(0,0,0,0.1);
            transition: transform 0.2s;
          }
          .product:hover { transform: scale(1.05); }
          .product img { width: 100%; height: 180px; object-fit: cover; }
          .product h3 { margin: 10px 0; }
          .category { font-size: 0.9rem; color: #007185; }
          .price { font-size: 1.2rem; font-weight: bold; color: #B12704; }

          .btn {
            display: inline-block; margin-top: 10px;
            text-decoration: none; color: black;
            background: #FFD814; padding: 8px 14px;
            border-radius: 4px; font-weight: bold;
          }
          .btn:hover { background: #F7CA00; }
        </style>
      </head>
      <body>
        <div class="navbar">
          <h1>🛒Online Store Amazon</h1>
          <form action="/search" method="get" class="search-bar">
            <input type="text" name="q" placeholder="Search for products...">
            <button type="submit">🔍</button>
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
            ${productCards || "<p>No products found 😢</p>"}
          </section>
        </div>
      </body>
    </html>
  `;
}

// Home
app.get("/", (req, res) => {
  res.send(renderStore(products));
});

// Category
app.get("/category/:cat", (req, res) => {
  const category = req.params.cat;
  res.send(renderStore(products.filter((p) => p.category === category)));
});

// Search
app.get("/search", (req, res) => {
  const query = (req.query.q || "").toLowerCase();
  const results = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
  );
  res.send(renderStore(results));
});

// Add to cart
app.get("/add-to-cart/:id", (req, res) => {
  const product = products.find((p) => p.id == req.params.id);
  if (product) cart.push(product);
  res.redirect("/cart");
});

// Remove from cart
app.get("/remove-from-cart/:id", (req, res) => {
  const id = parseInt(req.params.id);
  cart = cart.filter((item) => item.id !== id);
  res.redirect("/cart");
});

// Cart page
app.get("/cart", (req, res) => {
  if (cart.length === 0) {
    return res.send(`
      <html><body style="text-align:center; font-family:Arial; background:#f8f9fa; padding:40px;">
      <h2>🛒 Your cart is empty.</h2>
      <a href="/" style="background:#FFD814; padding:10px 20px; text-decoration:none; color:black; border-radius:4px;">⬅ Continue Shopping</a>
      </body></html>
    `);
  }

  let items = cart
    .map(
      (p) => `
      <li>
        ${p.name} - ₹${p.price}
        <a href="/remove-from-cart/${p.id}" style="color:red; margin-left:10px;">❌ Remove</a>
      </li>`
    )
    .join("");

  let total = cart.reduce((sum, p) => sum + p.price, 0);

  res.send(`
    <html>
    <body style="font-family:Arial; background:#fff; padding:40px;">
      <h2>🛒 Shopping Cart</h2>
      <ul>${items}</ul>
      <h3>Total: ₹${total}</h3>
      <a href="/checkout" class="btn" style="background:#FFD814; padding:10px 20px; text-decoration:none;">Checkout</a>
      <a href="/" class="btn" style="background:#FFD814; padding:10px 20px; text-decoration:none;">⬅ Continue Shopping</a>
    </body>
    </html>
  `);
});

// Checkout
app.get("/checkout", (req, res) => {
  cart = [];
  res.send(`
    <html><body style="font-family:Arial; text-align:center; padding:50px; background:#e8f5e9;">
      <h2>✅ Order placed successfully!</h2>
      <p>Your order will be delivered soon.</p>
      <a href="/" style="background:#FFD814; padding:12px 20px; border-radius:4px; text-decoration:none; color:black;">⬅ Back to Home</a>
    </body></html>
  `);
});

// Products API
app.get("/products", (req, res) => {
  res.json(products);
});

// Start server
app.listen(port, "0.0.0.0", () => {
  console.log(`✨ Amazon-style store running on port ${port}`);
});

