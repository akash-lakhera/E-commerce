const express = require("express");
const app = express();
mongoose = require("mongoose");

const cookie=require("cookie-parser")
const { register, login } = require("./controllers/auth");// authentication controllers
const orderPlace=require("./controllers/orderPlace")// middleware to place the current order

// importing all routers for routes
const cartRoutes=require("./routes/cart")
const categoryRoutes=require("./routes/category")
const orderRoutes=require("./routes/orders")
const productRoutes=require("./routes/products")
//routes imports end


const authorize = require("./utils/authorize");// Middleware for protected routes
require("dotenv").config(); //initialize environment variables

const port = process.env.PORT || 4000;
app.use(express.json());
app.use(cookie())
app.use(express.urlencoded({ extended: true }));
app.post("/register", register);
app.post("/login", login);
app.use("/cart",authorize,cartRoutes)
app.use("/orders",authorize,orderRoutes)
app.use("/categories",categoryRoutes)
app.use("/products",productRoutes)
app.post("/placeOrder",authorize,orderPlace)
app.get("/test",authorize,(req,res)=>{
  res.status(200).send("yellow")
})
app.get("/some",(req,res)=>{
  res.set({"authorization":"hererererer"})
  res.status(200).send("done")
})
mongoose
  .connect(process.env.MONGO)
  .then(
    // start the server if database is connected
    () =>
      app.listen(port, () => {
        console.log("server is running on " + port);
      })
  )
  .catch((err) => {
    console.log(err);
  });
