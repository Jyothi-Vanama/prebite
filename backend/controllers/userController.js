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

module.exports = {
    getUsers
};