const db = require("../config/db");

const createSchedule = (req, res) => {

    const {
        user_id,
        schedule_date,
        schedule_time,
        platform_name,
        food_cost,
        total_cost
    } = req.body;

    const query = `
        INSERT INTO schedules
        (
            user_id,
            schedule_date,
            schedule_time,
            platform_name,
            food_cost,
            total_cost
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        query,
        [
            user_id,
            schedule_date,
            schedule_time,
            platform_name,
            food_cost,
            total_cost
        ],
        (err, result) => {

            if (err) {
                console.log(err);
                res.send("Error creating schedule");
            } else {
                res.send("Schedule Created Successfully");
            }

        }
    );

};

const addScheduleItem = (req, res) => {

    const {
        schedule_id,
        food_id,
        quantity,
        price_at_schedule_time
    } = req.body;

    const query = `
        INSERT INTO schedule_items
        (
            schedule_id,
            food_id,
            quantity,
            price_at_schedule_time
        )
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        query,
        [
            schedule_id,
            food_id,
            quantity,
            price_at_schedule_time
        ],
        (err, result) => {

            if (err) {
                console.log(err);
                res.send("Error adding schedule item");
            } else {
                res.send("Schedule Item Added Successfully");
            }

        }
    );

};

const getSchedules = (req, res) => {

    db.query("SELECT * FROM schedules", (err, result) => {

        if (err) {
            console.log(err);
            res.send("Error fetching schedules");
        } else {
            res.json(result);
        }

    });

};

const getScheduleItems = (req, res) => {

    const query = `
        SELECT
            si.schedule_id,
            f.food_name,
            si.quantity,
            si.price_at_schedule_time
        FROM schedule_items si
        JOIN food_items f
            ON si.food_id = f.food_id
    `;

    db.query(query, (err, result) => {

        if (err) {
            console.log(err);
            res.send("Error fetching schedule items");
        } else {
            res.json(result);
        }

    });

};

module.exports = {
    createSchedule,
    addScheduleItem,
    getSchedules,
    getScheduleItems
};