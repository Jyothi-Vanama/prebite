const express = require("express");
const db = require("./config/db");
const walletRoutes = require("./routes/walletRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use("/wallet", walletRoutes);
app.use("/order", orderRoutes);
app.use("/schedule", scheduleRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
    res.send("PreBite Backend Running");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});