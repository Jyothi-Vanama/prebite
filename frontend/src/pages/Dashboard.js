import React from 'react';
//import DashboardCard from '../components/DashboardCard';
import './Dashboard.css';
import idliImage from '../assets/breakfasts/idli.jpg';
import dosaImage from '../assets/breakfasts/dosa.png';
import pongalImage from '../assets/breakfasts/pongal.jpg';
import upmaImage from '../assets/breakfasts/upma.jpg';


const Dashboard = () => {
  const nextBreakfast = {
  items: "Masala Dosa + Filter Coffee",
  day: "Tomorrow",
  time: "7:15 AM",
  platform: "Swiggy",
  status: "Scheduled"
};

  return (
    <div className="dashboard">
      <div className="welcome-banner">
        <h1>PreBite Dashboard</h1>
        <p>Organized • Convenient • Scheduled</p>
      </div>

      <div className="popular-breakfasts">
  <h2>Popular Breakfasts</h2>

  <div className="breakfast-cards">

    <div
  className="breakfast-card"
  onClick={() => alert("Schedule Idli")}
>
  <img src={idliImage} alt="Idli" className="breakfast-image" />

  <h3>Idli</h3>

  <p>Healthy & Light</p>
</div>

    <div
  className="breakfast-card"
  onClick={() => alert("Schedule Dosa")}
>
  <img src={dosaImage} alt="Dosa" className="breakfast-image" />

  <h3>Dosa</h3>

  <p>Crispy & Delicious</p>
</div>

    <div
  className="breakfast-card"
  onClick={() => alert("Schedule Pongal")}
>
  <img src={pongalImage} alt="Pongal" className="breakfast-image" />

  <h3>Pongal</h3>

  <p>South Indian Favorite</p>
</div>

    <div
  className="breakfast-card"
  onClick={() => alert("Schedule Upma")}
>
  <img src={upmaImage} alt="Upma" className="breakfast-image" />

  <h3>Upma</h3>

  <p>Quick Morning Meal</p>
</div>

  </div>
</div>

      <div className="dashboard-grid">
        {/* Today's Breakfast */}
        <div className="card today-breakfast">
          <h2> Next Scheduled Breakfast</h2>
          <div className="breakfast-details">
            <div className="food-item">{nextBreakfast.items}</div>

<div className="breakfast-meta">
  <p>{nextBreakfast.day}</p>
  <p>{nextBreakfast.time}</p>
  <p>{nextBreakfast.platform}</p>
</div>
            <div className="status status-scheduled">Scheduled</div>
          </div>
          <div className="hero-actions">
  <button className="btn btn-primary">
    Modify
  </button>

  <button className="btn btn-secondary">
    Cancel
  </button>
</div>
        </div>

        {/* Wallet Summary 
        <div className="wallet-section">
          <DashboardCard title="Wallet Balance" amount="₹1,250" />
          <div className="two-cards">
          </div>
        </div> 
        */}

        {/* Upcoming Schedules */}
        <div className="card upcoming">
          <h2>Upcoming Breakfasts (2)</h2>
          <div className="schedule-list">
            <div className="schedule-item">
  <div>
    <strong> 1 Dosa + Tea</strong>
    <p> Tomorrow •  7:30 AM</p>
    <p> Zomato</p>
  </div>
</div>
            <div className="schedule-item">
  <div>
    <strong> 2 Pongal + Coffee</strong>
    <p> Thu, 25 Jun •  8:00 AM</p>
    <p> Swiggy</p>
  </div>
</div>
          </div>
        </div>

        {/* Recent Orders */}
        {/* Recent Activity */}
{/*<div className="card recent-orders">
  <h2>📜 Recent Activity</h2>

  <div className="order-list">

    <div className="order-item">
      <span>🍳 Breakfast Scheduled</span>
      <span>2h ago</span>
    </div>

    <div className="order-item">
      <span>💰 Refund Processed</span>
      <span>Yesterday</span>
    </div>

    <div className="order-item">
      <span>✅ Order Executed</span>
      <span>21 Jun</span>
    </div>

  </div>
</div>*/}
      </div>
    </div>
  );
};

export default Dashboard;