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

// Home page with styled HTML
app.get('/', (req, res) => {
  let productRows = products.map(p => `
      <tr>
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>$${p.price}</td>
      </tr>
  `).join("");

  res.send(`
    <html>
      <head>
        <title>🛒 Simple E-commerce Store</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; background: #f4f4f9; }
          h1 { color: #2c3e50; }
          table { width: 60%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ccc; padding: 10px; text-align: left; }
          th { background: #3498db; color: white; }
          tr:nth-child(even) { background: #f9f9f9; }
          a { display: inline-block; margin-top: 20px; text-decoration: none; color: white; background: #27ae60; padding: 10px 15px; border-radius: 5px; }
          a:hover { background: #219150; }
        </style>
      </head>
      <body>
        <h1>🛒 Welcome to Simple E-commerce Store 🚀</h1>
        <p>Browse our products below:</p>
        <table>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Price</th>
          </tr>
          ${productRows}
        </table>
        <a href="/checkout">Proceed to Checkout</a>
      </body>
    </html>
  `);
});

// Get all products (JSON API)
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

