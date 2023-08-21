const { Cart } = require("../models/order");
const User = require("../models/user");

const getCart = async (req, res, next) => {
  try {
    data = await User.findOne({ _id: req.id }, { cart: 1, _id: 0 });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send({ err: "An error occurred" });
  }
};

const addItem = async (req, res, next) => {
  try {
    let flag = false;
    let item = req.body.item;
    let data = await User.findOne(
      { _id: req._id },
      { "cart.items": 1, _id: 0 }
    );
    data.cart.forEach((element) => {
      if (element._id === item._id) {
        flag = true;
      }
    });
    if (flag)
      await User.findOneAndUpdate(
        { _id: req.id, "cart.items._id": item._id },
        { $inc: { "cart.items.$.value": 1 } }
      );
    else
      User.findOneAndUpdate(
        { _id: req.id },
        {
          $push: {
            "cart.items": {
              _id: item._id,
              price: item.price,
              number: 1,
              category: item.category,
            },
          },
        }
      );
  } catch (error) {
    res.status(500).send({ err: "An error occurred" });
  }
};

const incDecItem = async (req, res, next) => {
  try {
    let item = req.body.item;

    if (change.type == "dec") {
      await User.findOneAndUpdate(
        { _id: req.id, "cart.items._id": item._id },
        { $inc: { "cart.items.$.value": -1 } }
      );
      res.status.send({ msg: "decremented" });
    } else {
      await User.findOneAndUpdate(
        { _id: req._id, "cart.items._id": item._id },
        { $inc: { "cart.items.$.value": 1 } }
      );
      res.status.send({ msg: "incremented" });
    }
  } catch (error) {}
};

const deleteItem = async (req, res) => {
  try {
    let item = req.body.item;
    await User.findOneAndUpdate(
      { _id: item.id },
      { $pull: { "cart.items": { _id: item._id } } }
    );
    res.status.send({ msg: "item deleted" });
  } catch (error) {}
};

module.exports = { addItem, incDecItem, deleteItem, getCart };
