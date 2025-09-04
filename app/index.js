// index.js
const express = require('express');
<<<<<<< HEAD
const chalk = require('chalk'); // For colorful console logs

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to log requests
app.use((req, res, next) => {
  console.log(
    chalk.blue(`[INFO] ${new Date().toISOString()} - ${req.method} ${req.url}`)
  );
  next();
});

// Basic route
app.get('/', (req, res) => {
  res.send('<h1 style="color:green;">🚀 Welcome to the MCA DevOps App! 🚀</h1>');
  console.log(chalk.green('[SUCCESS] Sent response for / route'));
});

// Another colorful route
app.get('/hello', (req, res) => {
  res.send('<h2 style="color:orange;">👋 Hello from Node.js + Docker! 👋</h2>');
  console.log(chalk.yellow('[HELLO] /hello route accessed'));
});

// Start server
app.listen(PORT, () => {
  console.log(chalk.magenta(`🌟 Server is running on http://localhost:${PORT}`));
});
=======
const chalk = require('chalk');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(chalk.green('Hello from CI/CD pipeline on AWS EC2! I am Riyaz Khan'));
});

app.listen(port, () => {
    console.log(chalk.blue(`App running on port ${port}`));
});

>>>>>>> 7a98fb3 (v3)
