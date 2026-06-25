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

const [quantities, setQuantities] = useState(
  Object.fromEntries(
    foodItems.map(food => [food.id, 0])
  )
);
const [fromDate, setFromDate] = useState("2026-06-24");
const [toDate, setToDate] = useState("2026-06-24");
const [time, setTime] = useState("07:30");
const [platform, setPlatform] = useState("Swiggy");
const [showSuccess, setShowSuccess] = useState(false);

  const totalFoodCost = foodItems.reduce(
  (sum, food) => sum + food.price * quantities[food.id],
  0
);
  const schedulingFee = 20;
  const total = totalFoodCost + schedulingFee;

  const days =
  Math.floor(
    (new Date(toDate) - new Date(fromDate)) /
    (1000 * 60 * 60 * 24)
  ) + 1;

const grandTotal = (totalFoodCost * days) + schedulingFee;

  return (
    <div className="schedule-page">
      <h1>Schedule Your Breakfast</h1>
      
      <div className="schedule-container">
        {/* Left Side - Selection */}
        <div className="selection-panel">
          {/* <h2>Choose Items</h2>
          <div className="food-grid">
            {foodItems.map(food => (
              <div
  key={food.id}
  className={`food-card ${
    quantities[food.id] > 0 ? "selected" : ""
  }`}
>

                {food.image ? (
  <img src={food.image} alt={food.name} className="food-image" />
) : (
  <div className="food-emoji">{food.emoji}</div>
)}
                <div className="food-name">{food.name}</div>
<div className="food-price">₹{food.price}</div>

    <div className="quantity-controls">

  <button
    disabled={quantities[food.id] === 0}
    onClick={(e) => {
      e.stopPropagation();
      if (quantities[food.id] > 0) {
        setQuantities({
          ...quantities,
          [food.id]: quantities[food.id] - 1
        });
      }
    }}
  >
    −
  </button>

  <span>{quantities[food.id]}</span>

  <button
    onClick={(e) => {
      e.stopPropagation();
      setQuantities({
        ...quantities,
        [food.id]: quantities[food.id] + 1
      });
    }}
  >
    +
  </button>

</div>
  </div>
            ))}
          </div> */}

          <div className="form-row">
            <div className="form-group">
              <label>Schedule From</label>
              <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Schedule To</label>
              <input
  type="date"
  value={toDate}
  min={fromDate}
  max={
    new Date(
      new Date(fromDate).getTime() + 6 * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .split("T")[0]
  }
  onChange={(e) => setToDate(e.target.value)}
/>
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
            {foodItems.some(food => quantities[food.id] > 0) ? (
              <>
                {foodItems
                  .filter(food => quantities[food.id] > 0)
                  .map(food => (
                    <div key={food.id} className="summary-item">
                      <span>{food.name} × {quantities[food.id]}</span>
                      <span>₹{food.price * quantities[food.id]}</span>
                    </div>
                  ))}

                <hr />

<div className="summary-item">
  <span><strong>Per Day Cost</strong></span>
  <span><strong>₹{totalFoodCost}</strong></span>
</div>

<div className="summary-item">
  <span>Duration</span>
  <span>{days} Days</span>
</div>

<div className="summary-item">
  <span><strong>Breakfast Total</strong></span>
  <span><strong>₹{totalFoodCost * days}</strong></span>
</div>

<hr />

<div className="summary-item">
  <span>One-Time Scheduling Fee</span>
  <span>₹{schedulingFee}</span>
</div>

<div className="total">
  <strong>Grand Total</strong>
  <strong>₹{grandTotal}</strong>
</div>
              </>
            ) : (
              <p>Select items to see summary</p>
            )}
            
            <button
  className="btn btn-primary schedule-btn"
  onClick={() => setShowSuccess(true)}
>
  Schedule Breakfast
  <br />
  {new Date(fromDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })}
  {" - "}
  {new Date(toDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })}
</button>
          </div>
        </div>
      </div>
      {showSuccess && (
  <div className="modal-overlay">
    <div className="success-modal">

      <div className="success-icon">✅</div>

      <h2>Breakfast Scheduled!</h2>

      <p>Your breakfast has been scheduled successfully.</p>

      <hr />

      <p>
        <strong>Duration:</strong><br />
        {new Date(fromDate).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
        {" - "}
        {new Date(toDate).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </p>

      <p>
        <strong>Platform:</strong> {platform}
      </p>

      <p>
        <strong>Grand Total:</strong> ₹{grandTotal}
      </p>

      <button
        className="btn btn-primary"
        onClick={() => setShowSuccess(false)}
      >
        Close
      </button>

    </div>
  </div>
)}
    </div>
  );
};

export default ScheduleBreakfast;