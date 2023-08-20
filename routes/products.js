const router = require("express").Router();
const { getProducts, addProduct ,getProductById} = require("../controllers/products");
router.route("/").get(getProducts).post(addProduct);
router.route("/:id").get(getProductById)

module.exports = router;
