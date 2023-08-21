const router = require("express").Router();
const { particularOrder,allOrders } = require("../controllers/orders");
router.route("/").get(allOrders)
router.route("/:id").get(particularOrder)

module.exports = router;