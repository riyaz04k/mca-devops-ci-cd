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

// Find cart item by product ID
function findCartItem(id) {
  return cart.find((item) => item.id === id);
}

// Add product to cart
app.get("/add-to-cart/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);
  if (product) {
    let cartItem = findCartItem(id);
    if (cartItem) {
      cartItem.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
  }
  res.redirect("/cart");
});

// Increase quantity
app.get("/cart/increase/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let cartItem = findCartItem(id);
  if (cartItem) cartItem.qty += 1;
  res.redirect("/cart");
});

// Decrease quantity
app.get("/cart/decrease/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let cartItem = findCartItem(id);
  if (cartItem) {
    cartItem.qty -= 1;
    if (cartItem.qty <= 0) {
      cart = cart.filter((item) => item.id !== id);
    }
  }
  res.redirect("/cart");
});

// Remove item completely
app.get("/remove-from-cart/:id", (req, res) => {
  const id = parseInt(req.params.id);
  cart = cart.filter((item) => item.id !== id);
  res.redirect("/cart");
});

// Home Page
app.get("/", (req, res) => {
  let productCards = products
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
          .navbar h1 { flex: 1; margin: 0; }
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
          <div class="nav-links">
            <a href="/">Home</a>
            <a href="/cart">Cart (${cart.reduce((sum, item) => sum + item.qty, 0)})</a>
          </div>
        </div>
        <section class="store">${productCards}</section>
      </body>
    </html>
  `);
});

// Cart Page
app.get("/cart", (req, res) => {
  if (cart.length === 0) {
    return res.send(`
      <html><body style="text-align:center; font-family:Arial; background:#f8f9fa; padding:40px;">
      <h2>🛒 Your cart is empty.</h2>
      <a href="/" style="background:#FFD814; padding:10px 20px; text-decoration:none; color:black; border-radius:4px;">⬅ Continue Shopping</a>
      </body></html>
    `);
  }

  let cartItems = cart
    .map(
      (item) => `
        <li>
          <img src="${item.img}" alt="${item.name}" style="width:60px; vertical-align:middle; border-radius:4px; margin-right:10px;">
          ${item.name} - ₹${item.price} × ${item.qty} = ₹${item.price * item.qty}
          <a href="/cart/increase/${item.id}" style="margin-left:10px;">➕</a>
          <a href="/cart/decrease/${item.id}" style="margin-left:5px;">➖</a>
          <a href="/remove-from-cart/${item.id}" style="color:red; margin-left:10px;">❌ Remove</a>
        </li>
      `
    )
    .join("");

  let total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  res.send(`
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background:#fff; padding:40px; }
          ul { list-style:none; padding:0; }
          li { margin:15px 0; font-size:1.1rem; }
          img { vertical-align: middle; }
          .total { font-size:1.3rem; font-weight:bold; color:#B12704; margin:20px 0; }
          .btn { text-decoration:none; padding:12px 20px; background:#FFD814; color:black; border-radius:4px; font-weight:bold; margin-right:10px; }
        </style>
      </head>
      <body>
        <h2>🛒 Shopping Cart</h2>
        <ul>${cartItems}</ul>
        <div class="total">Total: ₹${total}</div>
        <a href="/checkout" class="btn">Proceed to Checkout</a>
        <a href="/" class="btn">⬅ Continue Shopping</a>
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
      <p>📦 Thank you for shopping with us. Your order will be delivered soon.</p>
      <a href="/" style="background:#FFD814; padding:12px 20px; border-radius:4px; text-decoration:none; color:black; font-weight:bold;">⬅ Back to Home</a>
    </body></html>
  `);
});

// API endpoint
app.get("/products", (req, res) => {
  res.json(products);
});

// Start server
app.listen(port, "0.0.0.0", () => {
  console.log(`✨ Amazon-style store running on port ${port}`);
});

