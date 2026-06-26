const db = require("../config/db");

const getUsers = (req, res) => {

    db.query("SELECT * FROM users", (err, result) => {

        if (err) {
            console.log(err);
            res.send("Error fetching users");
        } else {
            res.json(result);
        }

    });

};

const query = `
SELECT
    u.full_name,
    s.schedule_date,
    s.schedule_time,
    s.platform_name,
    s.schedule_status,
    GROUP_CONCAT(
        CONCAT(si.quantity, ' ', f.food_name)
        SEPARATOR ' + '
    ) AS items
FROM users u
JOIN schedules s
    ON u.user_id = s.user_id
JOIN schedule_items si
    ON s.schedule_id = si.schedule_id
JOIN food_items f
    ON si.food_id = f.food_id
WHERE s.schedule_status = 'SCHEDULED'
GROUP BY s.schedule_id
ORDER BY s.schedule_date, s.schedule_time
LIMIT 1;
`;

const getDashboard = (req, res) => {
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        res.json(result[0]);
    });
};

const getUpcomingBreakfasts = (req, res) => {

    const sql = `
        SELECT
            s.schedule_date,
            s.schedule_time,
            s.platform_name,
            GROUP_CONCAT(CONCAT(si.quantity,' ',f.food_name) SEPARATOR ' + ') AS items
        FROM schedules s
        JOIN schedule_items si
            ON s.schedule_id = si.schedule_id
        JOIN food_items f
            ON si.food_id = f.food_id
        WHERE s.schedule_status = 'SCHEDULED'
        GROUP BY s.schedule_id
        ORDER BY s.schedule_date, s.schedule_time
LIMIT 1, 2
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json(result);
        }
    });

};

module.exports = {
    getUsers,
    getDashboard,
    getUpcomingBreakfasts
};