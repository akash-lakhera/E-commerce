const User = require("../models/user");

const placeOrder = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req._id },
      {
        $push: {
          orders: {
            items: "$cart.items",
            total: "$cart.total",
            status: "placed",
          },
        },
        $set: { "cart.items": [],"cart.total":0 },
      }
    );
    res.status(200).send({msg:"order placed"})
  } catch (error) {
    res.status(500).send({err:"something went wrong please place the order again"})
  }
};
module.exports = placeOrder;
