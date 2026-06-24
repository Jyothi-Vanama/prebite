import React, { useState } from 'react';
import './ScheduleBreakfast.css';
import idliImage from '../assets/breakfasts/idli.jpg';
import dosaImage from '../assets/breakfasts/dosa.png';
import pongalImage from '../assets/breakfasts/pongal.jpg';
import upmaImage from '../assets/breakfasts/upma.jpg';
import coffeeImage from '../assets/breakfasts/coffee.jpg';
import teaImage from '../assets/breakfasts/tea.jpg';

const foodItems = [
  { id: 1, name: "Idli", price: 40, image: idliImage },
  { id: 2, name: "Dosa", price: 60, image: dosaImage },
  { id: 3, name: "Pongal", price: 55, image: pongalImage },
  { id: 4, name: "Upma", price: 45, image: upmaImage },
  { id: 5, name: "Coffee", price: 25, image: coffeeImage },
  { id: 6, name: "Tea", price: 20, image: teaImage }
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
                {selectedFoods.find(f => f.id === food.id) && (
  <div className="selected-badge">✓ Selected</div>
)}
                {food.image ? (
  <img src={food.image} alt={food.name} className="food-image" />
) : (
  <div className="food-emoji">{food.emoji}</div>
)}
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

         <div className="backup-section">
  <h3>Backup Preferences</h3>

  <div className="form-group">
    <label>Backup Food 1</label>
    <select>
      <option value="">Select Backup Food</option>
      <option>Idli</option>
      <option>Dosa</option>
      <option>Pongal</option>
      <option>Upma</option>
    </select>
  </div>

  <div className="form-group">
    <label>Backup Food 2</label>
    <select>
      <option value="">Select Backup Food</option>
      <option>Idli</option>
      <option>Dosa</option>
      <option>Pongal</option>
      <option>Upma</option>
    </select>
  </div>
</div>

        </div> {/* end of selection-panel */}

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