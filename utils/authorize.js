const jwt = require("jsonwebtoken");
User = require("../models/user");

const authorizeJWT = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.API_SECRET,
      async function (err, decode) {
        try {
        } catch (error) {
          res.status(500).send({
            message: error,
          });
        } 
        if (err) req.id = undefined;
        else req.id = decode.id;
        next();
      }
    );
  } else {
    req.id = undefined;
   res.status(401).send({error:"unauthorized"})
  }
};
module.exports = authorizeJWT;
