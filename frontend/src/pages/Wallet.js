import axios from "axios";
import { useEffect, useState } from "react";
import './Wallet.css';

const Wallet = () => {
  const [amount, setAmount] = useState(100);

  const [transactions, setTransactions] = useState([]);

const [wallet, setWallet] = useState({
  balance: 0
});

useEffect(() => {

  axios.get("http://localhost:5000/wallet")
    .then((res) => {
      setWallet(res.data);
    });

  axios.get("http://localhost:5000/wallet/transactions")
    .then((res) => {
      setTransactions(res.data);
    });

}, []);
const handleAddMoney = () => {

  axios.post("http://localhost:5000/wallet/add-money", {

    wallet_id: 1,
    amount: Number(amount)

  })

  .then(() => {

    return axios.get("http://localhost:5000/wallet");

  })

  .then((res) => {

    setWallet(res.data);

    alert("Money Added Successfully!");

  })

  .catch((err) => {

    console.log(err);

  });

};

  return (
    <div className="wallet-page">
      <h1>Wallet</h1>
      
      <div className="wallet-overview">
        <div className="card balance-card">
          <h3>Current Balance</h3>
          <div className="big-balance">₹{wallet.balance}</div>
        </div>
        <div className="card balance-card">
          <h3>Reserved</h3>
          <div className="big-balance reserved">₹{wallet.reserved}</div>
        </div>
        <div className="card balance-card">
          <h3>Available</h3>
          <div className="big-balance available">₹{wallet.available}</div>
        </div>
      </div>

      <div className="add-money card">
        <h2>Add Money</h2>
        <div className="amount-input">
          <span>₹</span>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
          />
        </div>
        <button
  className="btn btn-primary"
  onClick={handleAddMoney}
>
  Add ₹{amount} to Wallet
</button>
        <p className="note">Instant credit • No fees</p>
      </div>

      <div className="card">
        <h2>Transaction History</h2>
        <div className="transaction-list">
          {transactions.map((tx) => (
            <div key={tx.transaction_id} className="transaction-item">
              <div>
                <span className="icon">
  {tx.transaction_type === "CREDIT" ? "💰" : "🍳"}
</span>
                <strong>{tx.description}</strong>
                <div className="date">
  {new Date(tx.transaction_date).toLocaleDateString("en-GB")}
</div>
              </div>
              <div
  className={`amount ${
    tx.transaction_type === "CREDIT"? "credit" : "debit"
  }`}
>
  {tx.transaction_type === "CREDIT" ? "+" : "-"}₹{tx.amount}
</div>
              <div className={`status status-completed`}>{tx.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wallet;