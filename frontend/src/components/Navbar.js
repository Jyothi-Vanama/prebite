import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="page-title">Good morning, Jyothi ☀️</h1>
      </div>
      
      <div className="navbar-right">
        <div className="search-bar">
          <input type="text" placeholder="Search breakfast items..." />
        </div>
        
        <div className="nav-actions">
          <button className="icon-btn">🛎️</button>
          <button className="icon-btn">🛍️</button>
          <div className="profile">
            <div className="avatar-small">👩‍🍳</div>
            <span>Jyothi</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;