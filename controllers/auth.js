var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var User = require("../models/user");
const register = async (req, res) => {
  try {
    const user = new User({
      name: req.body.username,
      cart: { items: [], total: 0 },
      password: bcrypt.hashSync(req.body.password, 8),
    });

    await user.save();
    res.status(200).send({ msg: "User registered successfully" });
  } catch (error) {
    res.status(500).send({ err: "An error occurred" });
  }
};

const login = async (req, res) => {
  try {
    let user = await User.findOne({
      name: req.body.username,
    });
    if (!user) {
      return res.status(404).send({
        message: "User Not found.",
      });
    } else {
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid Password!",
        });
      } else {
        var token = jwt.sign(
          {
            id: user._id,
          },
          process.env.API_SECRET,
          {
            expiresIn: "2 days",
          }
        );
        jw="JWT " + token
        res.cookie("authorization", jw, {
          maxAge: 1000 * 60 * 60 * 24 * 2,
          httpOnly: true,
        });

        res.status(200).send({
          user: {
            id: user._id,
            name: user.name,
          },
          message: "Login successful",
          accessToken: token,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: "An error occurred" });
  }
};
module.exports = { register, login };
