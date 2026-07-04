const db = require("../config/db");

const createSchedule = (req, res) => {

    console.log("Received Data:");
    console.log(req.body);

    const { user_id, day } = req.body;

const schedule_date = day.date;
const schedule_time = day.deliveryTime;
const platform_name = day.platform;
const food_cost = day.foodCost;
const total_cost = day.totalCost;
const items = day.items;
console.log("Items Received:");
console.log(items);

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

    const schedule_id = result.insertId;

    console.log("New Schedule ID:", schedule_id);

    const values = items.map((item) => [
    schedule_id,
    item.id,
    item.quantity,
    item.price
]);

const itemQuery = `
    INSERT INTO schedule_items
    (
        schedule_id,
        food_id,
        quantity,
        price_at_schedule_time
    )
    VALUES ?
`;

db.query(itemQuery, [values], (err) => {

    if (err) {
        console.log(err);
        return res.send("Error adding schedule items");
    }

    res.json({
        message: "Schedule Created Successfully"
    });

});

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