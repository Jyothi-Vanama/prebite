const db = require("../config/db");

const createOrder = (req, res) => {

    const { schedule_id } = req.body;

    const query = `
        INSERT INTO orders (schedule_id)
        VALUES (?)
    `;

    db.query(query, [schedule_id], (err, result) => {

        if (err) {
            console.log(err);
            res.send("Error creating order");
        } else {
            res.send("Order Created Successfully");
        }

    });

};

const getOrders = (req, res) => {

    const sql = `
    SELECT
        o.order_id,
        o.order_status,
        o.execution_time,

        s.schedule_date,
        s.platform_name,

        f.food_name AS item_name,
        si.quantity,

        f.price

    FROM orders o

    JOIN schedules s
        ON o.schedule_id = s.schedule_id

    JOIN schedule_items si
        ON s.schedule_id = si.schedule_id

    JOIN food_items f
        ON si.food_id = f.food_id

    ORDER BY o.order_id DESC;
    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

module.exports = {
    getOrders
};

const getOrderDetails = (req, res) => {

    const query = `
        SELECT
            o.order_id,
            o.order_status,
            s.schedule_date,
            s.schedule_time,
            s.platform_name,
            s.total_cost
        FROM orders o
        JOIN schedules s
            ON o.schedule_id = s.schedule_id
    `;

    db.query(query, (err, result) => {

        if (err) {
            console.log(err);
            res.send("Error fetching order details");
        } else {
            res.json(result);
        }

    });

};

const executeOrder = (req, res) => {

    const { order_id } = req.body;

    const orderQuery = `
        SELECT
            o.order_id,
            o.schedule_id,
            s.user_id,
            s.total_cost
        FROM orders o
        JOIN schedules s
            ON o.schedule_id = s.schedule_id
        WHERE o.order_id = ?
    `;
db.query(orderQuery, [order_id], (err, orderResult) => {

    if (err) {
        console.log(err);
        return res.send("Error fetching order");
    }

    if (orderResult.length === 0) {
        return res.send("Order not found");
    }
    const user_id = orderResult[0].user_id;
    const total_cost = orderResult[0].total_cost;

    const walletQuery = `
    SELECT * FROM wallet
    WHERE user_id = ?
`;
db.query(walletQuery, [user_id], (err, walletResult) => {

    if (err) {
        console.log(err);
        return res.send("Error fetching wallet");
    }

    const current_balance = walletResult[0].current_balance;
    if (current_balance < total_cost) {
    return res.send("Insufficient Balance");
}
const deductQuery = `
    UPDATE wallet
    SET current_balance = current_balance - ?
    WHERE user_id = ?
`;
db.query(deductQuery, [total_cost, user_id], (err) => {

    if (err) {
        console.log(err);
        return res.send("Error deducting money");
    }
    const transactionQuery = `
    INSERT INTO wallet_transactions
    (
        wallet_id,
        transaction_type,
        amount,
        description
    )
    VALUES (?, 'DEBIT', ?, 'Order Execution')
`;
db.query(
    transactionQuery,
    [walletResult[0].wallet_id, total_cost],
    (err) => {

        if (err) {
            console.log(err);
            return res.send("Error recording transaction");
        }
        const updateOrderQuery = `
    UPDATE orders
    SET order_status = 'COMPLETED',
        execution_time = NOW()
    WHERE order_id = ?
`;
db.query(updateOrderQuery, [order_id], (err) => {

    if (err) {
        console.log(err);
        return res.send("Error updating order");
    }
    res.send("Order Executed Successfully");

});

    }
);

});
});

});
};

module.exports = {
    createOrder,
    getOrders,
    getOrderDetails,
    executeOrder
};