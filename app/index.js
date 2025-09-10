const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Dummy product list
const products = [
  { id: 1, name: "Laptop", price: 800 },
  { id: 2, name: "Phone", price: 500 },
  { id: 3, name: "Headphones", price: 100 },
  { id: 4, name: "Smartwatch", price: 200 }
];

// Home page
app.get('/', (req, res) => {
  res.send(`
    <h1>🛒 Welcome to Riyaz's Simple E-commerce Store 🚀</h1>
    <p>Available endpoints:</p>
    <ul>
      <li><a href="/products">/products</a> → View products</li>
      <li><a href="/checkout">/checkout</a> → Simulate checkout</li>
    </ul>
  `);
});

// Get all products
app.get('/products', (req, res) => {
  res.json(products);
});

// Checkout simulation
app.get('/checkout', (req, res) => {
  res.send("✅ Checkout complete! Thank you for shopping.");
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`E-commerce app running on port ${port}`);
});

