const router = require("express").Router();
const { getCategories, addCategories } = require("../controllers/category");
router.route("/").get(getCategories).post(addCategories);

module.exports = router;
