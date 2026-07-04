import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Wallet from './pages/Wallet';
import ScheduleBreakfast from './pages/ScheduleBreakfastV2';
import Orders from './pages/Orders';
import './styles/App.css';
import Notifications from "./pages/Notifications/Notifications";
import BreakfastMenu from "./pages/BreakfastMenu";

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <div className="page-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/schedule" element={<ScheduleBreakfast />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/breakfast-menu" element={<BreakfastMenu />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;