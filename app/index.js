const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello from CI/CD pipeline on AWS EC2! I am Riyaz Khan S 33🚀'));

app.listen(port, '0.0.0.0', () => console.log(`App running on port ${port}`));
