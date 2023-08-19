const mongoose = require("mongoose");
const product = new mongoose.Schema({
name:String,
price:Number,
category:String,
availability:Number
});
module.exports = mongoose.model("product", product);