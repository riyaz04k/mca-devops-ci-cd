const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
<<<<<<< HEAD
app.get('/', (req, res) => res.send('Hello from CI/CD pipeline on AWS EC2! i am riyaz khan'));
=======
app.get('/', (req, res) => res.send('Hello from CI/CD pipeline on AWS EC2! from riyaz 1'));
>>>>>>> 934be85 (v2)
app.listen(port, () => console.log(`App running on port ${port}`));
