const express = require("express");
const app = express();
mongoose = require("mongoose");

const {register,login}=require("./controllers/auth")

require("dotenv").config(); //initialize environment variables

const port = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/register",register)
app.post("/login")
mongoose.connect("process.env").then(
  app.listen(port, () => {
    console.log("server is running on " + port);
  })
).catch((err)=>{
console.log(err)
})
