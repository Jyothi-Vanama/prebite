import React, { useState } from 'react';
import './Orders.css';

const Orders = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

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

      <div className="orders-stats">


  <div className="stat-card">
    <h3>Total Orders</h3>
    <p>{orders.length}</p>
  </div>

  <div className="stat-card">
    <h3>Scheduled</h3>
    <p>{orders.filter(o => o.status === "Scheduled").length}</p>
  </div>

  <div className="stat-card">
    <h3>Completed</h3>
    <p>{orders.filter(o => o.status === "Completed").length}</p>
  </div>

  <div className="stat-card">
    <h3>Refunded</h3>
    <p>{orders.filter(o => o.status === "Refunded").length}</p>
  </div>

<div className="stat-card">
  <h3>Cancelled</h3>
  <p>{orders.filter(o => o.status === "Cancelled").length}</p>
</div>

</div>
<div className="upcoming-card">
  <h3>🚀 Upcoming Delivery</h3>

  <div className="upcoming-item">
    <p><strong>Dosa + Coffee</strong></p>
    <p>Tomorrow • 7:30 AM</p>
    <p>Swiggy</p>
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
              <tr
  key={order.id}
  onClick={() => setSelectedOrder(order)}
  style={{ cursor: "pointer" }}
>
                <td><strong>{order.id}</strong></td>
                <td>{order.date}</td>
                <td>{order.items}</td>
                <td>₹{order.amount}</td>
                <td>
  <span
    className={
      order.platform === "Swiggy"
        ? "platform-badge swiggy"
        : "platform-badge zomato"
    }
  >
    {order.platform === "Swiggy"
      ? "🟧 Swiggy"
      : "🔴 Zomato"}
  </span>
</td>
                <td><span className={`status status-${order.status.toLowerCase()}`}>{order.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedOrder && (
  <div className="modal-overlay">
    <div className="modal-content">

      <h2>Order Details</h2>

      <p><strong>Order ID:</strong> {selectedOrder.id}</p>
      <p><strong>Items:</strong> {selectedOrder.items}</p>
      <p><strong>Date:</strong> {selectedOrder.date}</p>
      <p><strong>Platform:</strong> {selectedOrder.platform}</p>
      <p><strong>Status:</strong> {selectedOrder.status}</p>
      <p><strong>Amount:</strong> ₹{selectedOrder.amount}</p>

      <button
        className="btn btn-primary"
        onClick={() => setSelectedOrder(null)}
      >
        Close
      </button>

    </div>
  </div>
)}
    </div>
  );
};

export default Orders;