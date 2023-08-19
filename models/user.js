const mongoose = require("mongoose");
const {cart,order}=require("./order")
const user = new mongoose.Schema({
name:String,
cart:cart,
orders:[order],
username:String,
password:String
});
module.exports = mongoose.model("user", user);