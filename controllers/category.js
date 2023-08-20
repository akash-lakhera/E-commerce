const Category = require("../models/category");

const getCategories = async (req, res, next) => {
  const categories = await Category.findOne({}, { _id: 0 });
  res.status(200).send({ categories: categories.category });
};
const addCategories = async (req, res, next) => {
  try {
    await Category.updateOne(
      {},
      {
        $push: {
          category: {
            name: req.body.category.name,
            desc: req.body.category.desc,
          },
        },
      }
    );
    res.status(200).send({ msg: "category added" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: "something went wrong try again" });
  }
};

module.exports = { getCategories, addCategories };
