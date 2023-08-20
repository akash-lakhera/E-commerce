const express = require("express");
const app = express();
mongoose = require("mongoose");

const { register, login } = require("./controllers/auth");
const cartRoutes=require("./routes/cart")
const authorize = require("./utils/authorize");
require("dotenv").config(); //initialize environment variables

const port = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/register", register);
app.post("/login", login);
app.use("/cart",authorize,cartRoutes)
app.get("/test", authorize, (req, res) => {
  res.send("hey");
});

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
