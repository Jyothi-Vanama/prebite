import React from 'react';
import DashboardCard from '../components/DashboardCard';
import './Dashboard.css';

const Dashboard = () => {
  const todaysBreakfast = {
    items: "2 Idli + 1 Coffee",
    time: "7:15 AM",
    platform: "Swiggy",
    status: "Scheduled"
  };

  return (
    <div className="dashboard">
      <div className="welcome-banner">
        <h1>Good Morning, Jyothi ☀️</h1>
        <p>Ready to plan your perfect breakfast?</p>
      </div>

      <div className="dashboard-grid">
        {/* Today's Breakfast */}
        <div className="card today-breakfast">
          <h2>Today's Breakfast</h2>
          <div className="breakfast-details">
            <div className="food-item">{todaysBreakfast.items}</div>
            <div className="meta">
              <span>🕒 {todaysBreakfast.time}</span>
              <span>📦 {todaysBreakfast.platform}</span>
            </div>
            <div className="status status-scheduled">Scheduled</div>
          </div>
          <button className="btn btn-primary">Modify Order</button>
        </div>

        {/* Wallet Summary */}
        <div className="wallet-section">
          <DashboardCard title="Current Balance" amount="₹1,250" />
          <div className="two-cards">
            <DashboardCard title="Reserved" amount="₹450" subtitle="For scheduled orders" />
            <DashboardCard title="Available" amount="₹800" subtitle="Can be used now" />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <a href="/schedule" className="btn btn-primary">Schedule Breakfast</a>
            <a href="/wallet" className="btn btn-secondary">Add Money</a>
            <a href="/orders" className="btn btn-secondary">View All Orders</a>
          </div>
        </div>

        {/* Upcoming Schedules */}
        <div className="card upcoming">
          <h2>Upcoming Schedules</h2>
          <div className="schedule-list">
            <div className="schedule-item">
              <div>Tomorrow • 7:30 AM</div>
              <div>1 Dosa + Tea • Zomato</div>
            </div>
            <div className="schedule-item">
              <div>Thu, 25 Jun • 8:00 AM</div>
              <div>2 Pongal + Coffee • Swiggy</div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="card recent-orders">
          <h2>Recent Orders</h2>
          <div className="order-list">
            <div className="order-item">
              <span>22 Jun • 2 Idli</span>
              <span className="amount">₹85</span>
            </div>
            <div className="order-item">
              <span>21 Jun • Pongal</span>
              <span className="amount">₹65</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;