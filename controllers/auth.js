var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var User = require("../models/user");
const register = async (req, res) => {
  try {
    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      role: req.body.role,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    await user.save();
    res.status(200).send({ msg: "User registered successfully" });
  } catch (error) {
    res.status(500).send({ err: "An error occurred" });
  }
};

const login = (req, res) => {
  try {
    let user = User.findOne({
      username: req.body.username,
    });
    if (!user) {
      return res.status(404).send({
        message: "User Not found.",
      });
    }
    else{
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
          );
         
          if (!passwordIsValid) {
            return res.status(401)
              .send({
                message: "Invalid Password!"
              });
          }
          else{
            var token = jwt.sign({
                id: user.id
              }, process.env.API_SECRET, {
                expiresIn: "2 days"
              });
              res.status(200)
        .send({
          user: {
            id: user._id,
            name:user.name
          },
          message: "Login successful",
          accessToken: token,
        });
          }
    

    }
  } catch (error) {
    resres.status(500).send({ err: "An error occurred" });
  }
};
module.exports={register,login}