const express = require("express");

const router = express.Router();

const {
    getUsers,
    getDashboard,
    getUpcomingBreakfasts
} = require("../controllers/userController");

router.get("/", getUsers);
router.get("/dashboard", getDashboard);
router.get("/upcoming", getUpcomingBreakfasts);

module.exports = router;
