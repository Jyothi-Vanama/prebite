const db = require("../config/db");

const addMoney = (req, res) => {

    const { wallet_id, amount } = req.body;

    const transactionQuery = `
        INSERT INTO wallet_transactions
        (wallet_id, transaction_type, amount, description)
        VALUES
        (?, 'CREDIT', ?, 'Wallet Recharge')
    `;

    db.query(transactionQuery, [wallet_id, amount], (err) => {

        if (err) {
            console.log(err);
            return res.send("Error adding transaction");
        }

        const walletQuery = `
            UPDATE wallet
            SET current_balance = current_balance + ?
            WHERE wallet_id = ?
        `;

        db.query(walletQuery, [amount, wallet_id], (err) => {

            if (err) {
                console.log(err);
                return res.send("Error updating wallet");
            }

            res.send("Money Added Successfully");

        });

    });

};

const getWallet = (req, res) => {

    const sql = `
        SELECT
            current_balance AS balance,
            reserved_amount AS reserved,
            (current_balance - reserved_amount) AS available
        FROM wallet
        LIMIT 1
    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            return res.send(err);
        }

        res.json(result[0]);

    });

};

const getTransactions = (req, res) => {

    const sql = `
        SELECT
    transaction_id,
    transaction_type,
    amount,
    description,
    transaction_date
FROM wallet_transactions
ORDER BY transaction_date DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            return res.send(err);
        }

        res.json(result);

    });

};

module.exports = {
    addMoney,
    getWallet,
    getTransactions
};

