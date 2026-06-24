const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Jyo13@mysql",
    database: "prebite"
});

connection.connect((err) => {
    if (err) {
        console.log("Database connection failed");
        console.log(err);
    } else {
        console.log("Connected to MySQL");
    }
});

module.exports = connection;