const db = require("../config/db");

const getAllFoods = (req, res) => {

    const sql = `
        SELECT *
        FROM food_items
        ORDER BY food_name;
    `;

    db.query(sql, (err, results) => {

        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Database Error"
            });
        }

        res.json(results);

    });

};

module.exports = {
    getAllFoods
};