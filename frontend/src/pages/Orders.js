import './Orders.css';
import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
        .get("http://localhost:5000/order")
        .then((res) => {
            setOrders(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
}, []);

  const filteredOrders = orders.filter((order) => {

  const matchesSearch =
    order.item_name.toLowerCase().includes(search.toLowerCase()) ||
    (`#PB${2400 + order.order_id}`)
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === "All" ||
    order.order_status.toUpperCase() === statusFilter.toUpperCase();

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
            <option value="SCHEDULED">Scheduled</option>
<option value="COMPLETED">Completed</option>
<option value="CANCELLED">Cancelled</option>
            <option value="REFUNDED">Refunded</option>
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
    <p>{orders.filter(
  o => o.order_status?.toUpperCase() === "SCHEDULED"
).length}</p>
  </div>

  <div className="stat-card">
    <h3>Completed</h3>
    <p>{orders.filter(
  o => o.order_status?.toUpperCase() === "COMPLETED"
).length}</p>
  </div>

  <div className="stat-card">
    <h3>Refunded</h3>
    <p>{orders.filter(o => o.order_status?.toUpperCase() === "REFUNDED").length}</p>
  </div>

<div className="stat-card">
  <h3>Cancelled</h3>
  <p>{orders.filter(o => o.order_status?.toUpperCase() === "CANCELLED").length}</p>
</div>

</div>
<div className="upcoming-card">

  <div className="upcoming-header">
    <h3>🚀 Upcoming Delivery</h3>
    <span className="upcoming-status">Scheduled</span>
  </div>

  <h2 className="upcoming-food">🥞 Dosa + Coffee</h2>

  <div className="upcoming-details">
    <div>📅 <span>Tomorrow</span></div>
    <div>🕢 <span>7:30 AM</span></div>
    <div>🛵 <span>Swiggy</span></div>
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

  {filteredOrders.length > 0 ? (

    filteredOrders.map(order => (

      <tr
        key={order.id}
        onClick={() => setSelectedOrder(order)}
        style={{ cursor: "pointer" }}
      >

        <td><strong>#PB{2400 + order.order_id}</strong></td>

        <td>
  {new Date(order.schedule_date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })}
</td>

        <td>
  {order.quantity} {order.item_name}
</td>

        <td>₹{order.price * order.quantity}</td>

        <td>
          <span
            className={
              order.platform_name === "Swiggy"
                ? "platform-badge swiggy"
                : "platform-badge zomato"
            }
          >
            {order.platform_name === "Swiggy"
              ? "🟧 Swiggy"
              : "🔴 Zomato"}
          </span>
        </td>

        <td>
          <span
  className={`status status-${order.order_status.toLowerCase()}`}
>
  {order.order_status}
</span>
        </td>

      </tr>

    ))

  ) : (

    <tr>

      <td colSpan="6" className="empty-orders">
        <h3>No Orders Found</h3>

        <p>Try another search or filter.</p>

      </td>

    </tr>

  )}

</tbody>
        </table>
      </div>
      {selectedOrder && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>Order Details</h2>

      <div className="detail-row">
        <span>Order ID</span>
        <strong>#PB{2400 + selectedOrder.order_id}</strong>
      </div>

      <div className="detail-row">
        <span>Date</span>
        <strong>{selectedOrder.schedule_date}</strong>
      </div>

      <div className="detail-row">
        <span>Items</span>
        <strong>{selectedOrder.quantity} {selectedOrder.item_name}</strong>
      </div>

      <div className="detail-row">
        <span>Platform</span>
        <span
          className={
            selectedOrder.platform_name === "Swiggy"
              ? "platform-badge swiggy"
              : "platform-badge zomato"
          }
        >
          {selectedOrder.platform_name}
        </span>
      </div>

      <div className="detail-row">
        <span>Status</span>
        <span className={`status status-${selectedOrder.order_status.toLowerCase()}`}>
          {selectedOrder.order_status}
        </span>
      </div>

      <hr />

      <div className="detail-total">
        <span>Total Amount</span>
        <strong>₹{selectedOrder.price * selectedOrder.quantity}</strong>
      </div>

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