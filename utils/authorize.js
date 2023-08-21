const jwt = require("jsonwebtoken");
User = require("../models/user");

const authorizeJWT = (req, res, next) => {

  if (
    req.cookies &&
    req.cookies.authorization &&
    req.cookies.authorization.split(" ")[0] === "JWT"
  ) {
  
    jwt.verify(
      req.cookies.authorization.split(" ")[1],
      process.env.API_SECRET,
      async function (err, decode) {
        try {
        } catch (error) {
          res.status(500).send({
            message: error,
          });
        } 
        if (err) req._id = undefined;
        else req._id = decode.id;
        next();
      }
    );
  } else {
    req._id = undefined;
   res.status(401).send({error:"unauthorized"})
  }
};
module.exports = authorizeJWT;
