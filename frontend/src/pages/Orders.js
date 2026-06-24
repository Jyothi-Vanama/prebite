import React, { useState } from 'react';
import './Orders.css';

const Orders = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const orders = [
    { id: "#PB2401", date: "22 Jun 2026", items: "2 Idli + Coffee", amount: 105, platform: "Swiggy", status: "Completed" },
    { id: "#PB2402", date: "21 Jun 2026", items: "Dosa", amount: 60, platform: "Zomato", status: "Scheduled" },
    { id: "#PB2403", date: "20 Jun 2026", items: "Pongal", amount: 55, platform: "Swiggy", status: "Refunded" },
    { id: "#PB2404", date: "19 Jun 2026", items: "Upma + Tea", amount: 65, platform: "Zomato", status: "Cancelled" },
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.items.toLowerCase().includes(search.toLowerCase()) || 
                         order.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1>My Orders</h1>
        
        <div className="filters">
          <input 
            type="text" 
            placeholder="Search orders..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>
      </div>

      <div className="card">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Platform</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td><strong>{order.id}</strong></td>
                <td>{order.date}</td>
                <td>{order.items}</td>
                <td>₹{order.amount}</td>
                <td>{order.platform}</td>
                <td><span className={`status status-${order.status.toLowerCase()}`}>{order.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;