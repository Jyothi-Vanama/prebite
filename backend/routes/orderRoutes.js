const express = require("express");

const router = express.Router();

const {
    createOrder,
    getOrders,
    getOrderDetails,
    executeOrder
} = require("../controllers/orderController");

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/details", getOrderDetails);
router.post("/execute", executeOrder);

module.exports = router;