import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import DashboardCard from '../components/DashboardCard';
import './Dashboard.css';
import idliImage from '../assets/breakfasts/idli.jpg';
import dosaImage from '../assets/breakfasts/dosa.png';
import pongalImage from '../assets/breakfasts/pongal.jpg';
import upmaImage from '../assets/breakfasts/upma.jpg';


const Dashboard = () => {

const [dashboardData, setDashboardData] = useState({
  full_name: "Loading...",
  items: "",
  schedule_date: "",
  schedule_time: "",
  platform_name: "",
  schedule_status: ""
});

const [upcomingBreakfasts, setUpcomingBreakfasts] = useState([]);

useEffect(() => {
  axios
    .get("http://localhost:5000/user/dashboard")
    .then((res) => {
      setDashboardData(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

useEffect(() => {
  axios
    .get("http://localhost:5000/user/upcoming")
    .then((res) => {
      console.log("Upcoming:", res.data);
      setUpcomingBreakfasts(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

  return (
    <div className="dashboard">
      <div className="welcome-banner">
        <h1>
  Welcome{dashboardData.full_name ? `, ${dashboardData.full_name}` : ""} 👋
</h1>
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
            <div className="food-item">{dashboardData.items}</div>

<div className="breakfast-meta">
  <p>
  {new Date(dashboardData.schedule_date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  })}
</p>
  <p>
  {new Date(
    `1970-01-01T${dashboardData.schedule_time}`
  ).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  })}
</p>
  <p>{dashboardData.platform_name}</p>
</div>
            <div className="status status-scheduled">
  {dashboardData.schedule_status.charAt(0) +
 dashboardData.schedule_status.slice(1).toLowerCase()}
</div>
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
  {upcomingBreakfasts.map((item, index) => (
    <div className="schedule-item" key={index}>
      <div>
        <strong>{item.items}</strong>

        <p>
          {new Date(item.schedule_date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
          {" • "}
          {new Date(`1970-01-01T${item.schedule_time}`).toLocaleTimeString("en-US", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
})}
        </p>

        <p>{item.platform_name}</p>
      </div>
    </div>
  ))}
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