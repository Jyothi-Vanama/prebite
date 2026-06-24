import React, { useState } from 'react';
import './Wallet.css';

const Wallet = () => {
  const [amount, setAmount] = useState(100);

  const transactions = [
    { id: 1, type: 'Credit', amount: 500, date: '22 Jun 2026', status: 'Completed' },
    { id: 2, type: 'Debit', amount: 85, date: '22 Jun 2026', status: 'Completed' },
    { id: 3, type: 'Refund', amount: 65, date: '21 Jun 2026', status: 'Completed' },
    { id: 4, type: 'Debit', amount: 120, date: '20 Jun 2026', status: 'Completed' },
  ];

  return (
    <div className="wallet-page">
      <h1>Wallet</h1>
      
      <div className="wallet-overview">
        <div className="card balance-card">
          <h3>Current Balance</h3>
          <div className="big-balance">₹1,250</div>
        </div>
        <div className="card balance-card">
          <h3>Reserved</h3>
          <div className="big-balance reserved">₹450</div>
        </div>
        <div className="card balance-card">
          <h3>Available</h3>
          <div className="big-balance available">₹800</div>
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
        <button className="btn btn-primary">Add ₹{amount} to Wallet</button>
        <p className="note">Instant credit • No fees</p>
      </div>

      <div className="card">
        <h2>Transaction History</h2>
        <div className="transaction-list">
          {transactions.map(tx => (
            <div key={tx.id} className="transaction-item">
              <div>
                <strong>{tx.type}</strong>
                <div className="date">{tx.date}</div>
              </div>
              <div className={`amount ${tx.type.toLowerCase()}`}>
                {tx.type === 'Credit' || tx.type === 'Refund' ? '+' : '-'}₹{tx.amount}
              </div>
              <div className={`status status-${tx.status.toLowerCase()}`}>{tx.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wallet;