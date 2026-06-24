import React, { useState } from 'react';
import './ScheduleBreakfast.css';

const foodItems = [
  { id: 1, name: "Idli", price: 40, emoji: "🧇" },
  { id: 2, name: "Dosa", price: 60, emoji: "🥞" },
  { id: 3, name: "Pongal", price: 55, emoji: "🍚" },
  { id: 4, name: "Upma", price: 45, emoji: "🥣" },
  { id: 5, name: "Coffee", price: 25, emoji: "☕" },
  { id: 6, name: "Tea", price: 20, emoji: "🍵" },
];

const ScheduleBreakfast = () => {
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState("2026-06-24");
  const [time, setTime] = useState("07:30");
  const [platform, setPlatform] = useState("Swiggy");

  const toggleFood = (food) => {
    if (selectedFoods.find(f => f.id === food.id)) {
      setSelectedFoods(selectedFoods.filter(f => f.id !== food.id));
    } else {
      setSelectedFoods([...selectedFoods, food]);
    }
  };

  const totalFoodCost = selectedFoods.reduce((sum, food) => sum + food.price * quantity, 0);
  const schedulingFee = 20;
  const total = totalFoodCost + schedulingFee;

  return (
    <div className="schedule-page">
      <h1>Schedule Your Breakfast</h1>
      
      <div className="schedule-container">
        {/* Left Side - Selection */}
        <div className="selection-panel">
          <h2>Choose Items</h2>
          <div className="food-grid">
            {foodItems.map(food => (
              <div 
                key={food.id} 
                className={`food-card ${selectedFoods.find(f => f.id === food.id) ? 'selected' : ''}`}
                onClick={() => toggleFood(food)}
              >
                <div className="food-emoji">{food.emoji}</div>
                <div className="food-name">{food.name}</div>
                <div className="food-price">₹{food.price}</div>
              </div>
            ))}
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input 
              type="number" 
              min="1" 
              value={quantity} 
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label>Platform</label>
            <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
              <option value="Swiggy">Swiggy</option>
              <option value="Zomato">Zomato</option>
            </select>
          </div>

          <div className="backup">
            <h3>Backup Preferences</h3>
            <input type="text" placeholder="Backup 1 (optional)" />
            <input type="text" placeholder="Backup 2 (optional)" />
          </div>
        </div>

        {/* Right Side - Summary */}
        <div className="summary-panel">
          <div className="cost-summary card">
            <h2>Order Summary</h2>
            {selectedFoods.length > 0 ? (
              <>
                {selectedFoods.map(food => (
                  <div key={food.id} className="summary-item">
                    <span>{food.name} × {quantity}</span>
                    <span>₹{food.price * quantity}</span>
                  </div>
                ))}
                <hr />
                <div className="summary-item">
                  <span>Scheduling Fee</span>
                  <span>₹{schedulingFee}</span>
                </div>
                <div className="total">
                  <strong>Total</strong>
                  <strong>₹{total}</strong>
                </div>
              </>
            ) : (
              <p>Select items to see summary</p>
            )}
            
            <button className="btn btn-primary schedule-btn">
              Schedule for {time} on {date}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleBreakfast;