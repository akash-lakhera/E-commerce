const mongoose = require("mongoose");
const cart = new mongoose.Schema({
items:[],
total:Number,
});
const order = new mongoose.Schema({
    items:[],
    total:Number,
    status:String
    });
module.exports = {cart,order}