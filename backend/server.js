const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const walletRoutes = require("./routes/walletRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const foodRoutes = require("./routes/foodRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/wallet", walletRoutes);
app.use("/order", orderRoutes);
app.use("/schedule", scheduleRoutes);
app.use("/user", userRoutes);
console.log(foodRoutes);
app.use("/api/foods", foodRoutes);
app.get("/", (req, res) => {
    res.send("PreBite Backend Running");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});