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

module.exports = {
    addMoney
};