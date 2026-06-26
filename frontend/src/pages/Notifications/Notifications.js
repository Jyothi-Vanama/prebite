import React from "react";
import "./Notifications.css";

const notifications = [
  {
    id: 1,
    icon: "🍳",
    title: "Breakfast Scheduled",
    message: "Your breakfast has been scheduled successfully.",
    time: "Just now",
    unread: true,
  },
  {
  id: 2,
  icon: "💳",
  title: "Payment Successful",
  message: "₹125 has been deducted from your wallet.",
  time: "30 mins ago",
  unread: true,
},
  {
    id: 3,
    icon: "💰",
    title: "Refund Processed",
    message: "₹65 has been credited to your wallet.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 4,
    icon: "🛵",
    title: "Order Delivered",
    message: "Enjoy your breakfast! Your order has been delivered.",
    time: "2 days ago",
    unread: false,
  },
];

const Notifications = () => {
  return (
    <div className="notifications-page">

      <div className="notifications-header">
        <h1>Notifications</h1>

        <button className="mark-btn">
          Mark All Read
        </button>
      </div>

      <div className="notification-list">

        {notifications.map((item) => (

          <div
            key={item.id}
            className={`notification-card ${item.unread ? "unread" : ""}`}
          >

            <div className="notification-icon">
              {item.icon}
            </div>

            <div className="notification-content">

              <div className="notification-top">

                <h3>{item.title}</h3>

                <span className="notification-time">
                  {item.time}
                </span>

              </div>

              <p>{item.message}</p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Notifications;