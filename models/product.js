const mongoose = require("mongoose");
const product = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter all values for the product"],
  },
  price: {
    type: Number,
    required: [true, "please enter all values for the product"],
  },
  category:{
    type: mongoose.Schema.ObjectId,
    required: [true, "please enter all values for the product"],
  },
  availability: {
    type: Number,
    required: [true, "please enter all values for the product"],
  },
});
module.exports = mongoose.model("product", product);
