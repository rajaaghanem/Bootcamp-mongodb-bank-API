const mongoose = require("mongoose");
const validator = require("validator");


const User = mongoose.model("User", {
    passID: {
      type: String,
      required: true,
      unique: true,
    },
    cash: {
      type: Number,
      required: true,
      default: 0,
    },
    credit: {
        type: Number,
        required: true,
        default: 0,
    }
  });


module.exports= User;