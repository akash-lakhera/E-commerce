// this model will use a single document to store all the categories in an array
const mongoose=require("mongoose")
const category=new mongoose.Schema({
    category:[]
})

module.exports=mongoose.model("category", category)