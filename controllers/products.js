const Products = require("../models/product");
const getProducts = async (req, res, next) => {
  try {
    let query;
    let category = req.query.category;
    if (!category) query = {};
    else query = { category: category };

    let data = await Products.find(query);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({});
  }
};
const addProduct = async (req, res, next) => {
  try {
    let product = req.body.product;
    await Products.create(product);
    res.status(200).send({ msg: "Product added" });
  } catch (error) {
    console.log(error);
    res.status(500).send({});
  }
};

const getProductById = async (req, res, next) => {
  try {
    let data = await Products.findOne({ _id: req.param.id });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({});
  }
};
module.exports = { getProducts, addProduct ,getProductById };
