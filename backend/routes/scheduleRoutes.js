const express = require("express");

const router = express.Router();

const {
    createSchedule,
    addScheduleItem,
    getSchedules,
    getScheduleItems
} = require("../controllers/scheduleController");

router.post("/", createSchedule);
router.post("/item", addScheduleItem);
router.get("/", getSchedules);
router.get("/items", getScheduleItems);
module.exports = router;