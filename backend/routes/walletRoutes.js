const express = require("express");

const router = express.Router();

const { addMoney } = require("../controllers/walletController");

router.post("/add-money", addMoney);

module.exports = router;