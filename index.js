<<<<<<< HEAD
const express = require("express");
require("./src/db/mongoose");
const cors = require('cors');
const path = require('path');

const productsRoute = require ('./src/routers/product.route.js')
// const Product = require("./models/product");

const app = express();
const port = process.env.PORT || 5000;

const publicPath = path.join(__dirname, 'client/build');
app.use(cors());
app.use(express.static(publicPath));

app.use(express.json());
app.use(productsRoute);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(publicPath, '/index.html'));
});

app.listen(port, () => {
  console.log("Server is up on port" + port);
});
=======
const express = require("express");
require("./src/db/mongoose");
const cors = require('cors');
const path = require('path');

const productsRoute = require ('./src/routers/product.route.js')
// const Product = require("./models/product");

const app = express();
const port = process.env.PORT || 5000;

const publicPath = path.join(__dirname, 'client/build');
app.use(cors());
app.use(express.static(publicPath));

app.use(express.json());
app.use(productsRoute);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log("Server is up on port" + port);
});
>>>>>>> c2507cc368eb311501cbedd5e983019c04d93604
