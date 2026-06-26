const express = require("express");

const router = express.Router();

const {
    addMoney,
    getWallet,
    getTransactions
} = require("../controllers/walletController");


router.post("/add-money", addMoney);

router.get("/", getWallet);

router.get("/transactions", getTransactions);

module.exports = router;