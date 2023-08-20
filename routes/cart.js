const router = require("express").Router();
const { getCart,addItem,incDecItem,deleteItem } = require("../controllers/cart");
router.route("/").get(getCart).post(addItem).put(incDecItem).delete(deleteItem);
module.exports=router