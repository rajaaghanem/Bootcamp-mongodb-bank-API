const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL, (error, client) => {
  if (error) {
    return console.log("unable to connect to database");
  }
  console.log("connected correctly");
});
