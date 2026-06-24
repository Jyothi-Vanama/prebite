import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '🏠' },
    { path: '/wallet', label: 'Wallet', icon: '💰' },
    { path: '/schedule', label: 'Schedule Breakfast', icon: '🍳' },
    { path: '/orders', label: 'Orders', icon: '📋' },
  ];

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🍳</span>
          <span className="logo-text">PreBite</span>
        </div>
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '←' : '→'}
        </button>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-info">
          <div className="avatar">👩‍🍳</div>
          <div>
            <div className="user-name">Jyothi</div>
            <div className="user-role">Student</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;