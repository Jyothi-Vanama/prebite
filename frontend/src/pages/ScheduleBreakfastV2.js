import React, { useState, useEffect } from 'react';
import './ScheduleBreakfast.css';
import { FaTrash } from 'react-icons/fa';
import idliImage from '../assets/breakfasts/idli.jpg';
import dosaImage from '../assets/breakfasts/dosa.png';
import pongalImage from '../assets/breakfasts/pongal.jpg';
import upmaImage from '../assets/breakfasts/upma.jpg';
import coffeeImage from '../assets/breakfasts/coffee.jpg';
import teaImage from '../assets/breakfasts/tea.jpg';

const foodItems = [
  { id: 1, name: 'Idli', price: 40, image: idliImage },
  { id: 2, name: 'Dosa', price: 60, image: dosaImage },
  { id: 3, name: 'Pongal', price: 55, image: pongalImage },
  { id: 4, name: 'Upma', price: 45, image: upmaImage },
  { id: 5, name: 'Coffee', price: 25, image: coffeeImage },
  { id: 6, name: 'Tea', price: 20, image: teaImage },
];

const ScheduleBreakfast = () => {
  const [planner, setPlanner] = useState([]);
  const [fromDate, setFromDate] = useState('2026-06-24');
  const [toDate, setToDate] = useState('2026-06-24');
  const [platform, setPlatform] = useState('Swiggy');
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchTexts, setSearchTexts] = useState({});
  const [activeDay, setActiveDay] = useState(0);

  const schedulingFee = 20;

  useEffect(() => {
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const generatedPlanner = [];
    let current = new Date(start);

    while (current <= end) {
      generatedPlanner.push({
        date: current.toISOString().split('T')[0],
        items: [],
        platform,
        deliveryTime: '07:30',
      });
      current.setDate(current.getDate() + 1);
    }

    setPlanner(generatedPlanner);
    setActiveDay(0);
  }, [fromDate, toDate, platform]);

  const plannerTotal = planner.reduce((total, day) => {
    const dayTotal = day.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return total + dayTotal;
  }, 0);

  const grandTotal = plannerTotal + schedulingFee;
  const hasBreakfast = planner.some((day) => day.items.length > 0);

  return (
    <div className="schedule-page">
      <h1>Schedule Your Breakfast</h1>

      <div className="schedule-container">
        <div className="selection-panel">
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
                max={new Date(new Date(fromDate).getTime() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
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

          <h2>Breakfast Planner</h2>

          <div className="planner-container">
            {planner.map((day, index) => (
              <div
                key={day.date}
                className={`planner-card ${activeDay === index ? 'active-day' : ''}`}
                
              >
                <h3
                  className="planner-header"
                  onClick={() => setActiveDay(activeDay === index ? -1 : index)}
                >
                  <span>
                    {activeDay === index ? '▼' : '▶'}{' '}
                    {new Date(day.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </h3>

                {activeDay === index && (
                  <div className="planner-details">
                    <div className="form-group">
                      <label>Platform</label>
                      <select
                        value={day.platform}
                        onChange={(e) => {
                          const updatedPlanner = [...planner];
                          updatedPlanner[index].platform = e.target.value;
                          setPlanner(updatedPlanner);
                        }}
                      >
                        <option value="Swiggy">Swiggy</option>
                        <option value="Zomato">Zomato</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Delivery Time</label>
                      <input
                        type="time"
                        value={day.deliveryTime}
                        min="06:00"
                        max="10:30"
                        step="300"
                        onChange={(e) => {
                          const updatedPlanner = [...planner];
                          updatedPlanner[index].deliveryTime = e.target.value;
                          setPlanner(updatedPlanner);
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <div className="selected-foods">
                        <h4>Selected Breakfast Items</h4>

                        {day.items.length === 0 ? (
                          <div className="empty-state">
                            No breakfast selected.
                            <br />
                            Search above to add breakfast items.
                          </div>
                        ) : (
                          day.items.map((item, itemIndex) => (
                            <div key={`${item.id}-${itemIndex}`} className="selected-food-card">
                              <div className="food-info">
                                <div className="food-header">
                                  <img
                                    src={foodItems.find((food) => food.id === item.id)?.image}
                                    alt={item.name}
                                    className="selected-food-image"
                                  />
                                  <div>
                                    <h4>{item.name}</h4>
                                    <p>₹{item.price} each</p>
                                    <small>Item Total: ₹{item.price * item.quantity}</small>
                                  </div>
                                </div>
                              </div>

                              <div className="food-actions">
                                <button
                                  disabled={item.quantity === 1}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const updatedPlanner = [...planner];
                                    if (updatedPlanner[index].items[itemIndex].quantity > 1) {
                                      updatedPlanner[index].items[itemIndex].quantity -= 1;
                                      setPlanner(updatedPlanner);
                                    }
                                  }}
                                >
                                  −
                                </button>

                                <span>{item.quantity}</span>

                                <button
                                  disabled={item.quantity >= 5}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const updatedPlanner = [...planner];
                                    updatedPlanner[index].items[itemIndex].quantity += 1;
                                    setPlanner(updatedPlanner);
                                  }}
                                >
                                  +
                                </button>

                                <button
                                  className="remove-btn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const updatedPlanner = [...planner];
                                    updatedPlanner[index].items = updatedPlanner[index].items.filter(
                                      (_item, currentIndex) => currentIndex !== itemIndex
                                    );
                                    setPlanner(updatedPlanner);
                                  }}
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <label>Search Breakfast</label>
                    <input
                    className="search-input"
                      type="text"
                      placeholder="Search breakfast..."
                      value={searchTexts[day.date] || ''}
                      onChange={(e) => setSearchTexts({ ...searchTexts, [day.date]: e.target.value })}
                    />

                    {(searchTexts[day.date] || '') !== '' && (
                      <div className="search-results">
                        {foodItems
                          .filter((food) => food.name.toLowerCase().includes((searchTexts[day.date] || '').toLowerCase()))
                          .map((food) => (
                            <div
                              key={food.id}
                              className="search-item"
                              onClick={(e) => {
                                e.stopPropagation();
                                const updatedPlanner = [...planner];
                                const alreadyExists = updatedPlanner[index].items.some((item) => item.id === food.id);

                                if (!alreadyExists) {
                                  updatedPlanner[index].items.push({
                                    id: food.id,
                                    name: food.name,
                                    price: food.price,
                                    quantity: 1,
                                  });
                                  setPlanner(updatedPlanner);
                                }

                                setSearchTexts({ ...searchTexts, [day.date]: '' });
                              }}
                            >
                              {food.name}
                              <span>₹{food.price}</span>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="summary-panel">
          <div className="cost-summary card">
            <h2>Order Summary</h2>
            {planner.map((day, index) => {
              const dayTotal = day.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

              if (day.items.length === 0) return null;

              return (
                <div key={`${day.date}-${index}`} className="summary-day">
                  <h4>
                    {new Date(day.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </h4>

                  <p className="summary-platform">Platform: {day.platform}</p>
                  <p className="summary-time">Delivery: {day.deliveryTime}</p>

                  {day.items.map((item, itemIndex) => (
                    <div key={`${item.id}-${itemIndex}`} className="summary-item">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}

                  <div className="summary-item day-total">
                    <strong>Day Total</strong>
                    <strong>₹{dayTotal}</strong>
                  </div>
                  <hr />
                </div>
              );
            })}

            <p>Subtotal: ₹{plannerTotal.toFixed(2)}</p>
            <p>Scheduling Fee: ₹{schedulingFee.toFixed(2)}</p>
            <hr />
            <p>
              <strong>Grand Total:</strong> ₹{grandTotal.toFixed(2)}
            </p>

            <button
              className="btn btn-primary schedule-btn"
              disabled={!hasBreakfast}
              onClick={() => setShowSuccess(true)}
            >
              Schedule Breakfast
              <br />
              {new Date(fromDate).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}{' '}
              {'- '}
              {new Date(toDate).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
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

            {planner
              .filter((day) => day.items.length > 0)
              .map((day, index) => (
                <div
                  key={`${day.date}-${index}`}
                  style={{ textAlign: 'left', marginTop: '10px', marginBottom: '14px' }}
                >
                  <strong style={{ color: '#FF7A30' }}>
                    {new Date(day.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </strong>
                  {day.items.map((item, itemIndex) => (
                    <div key={`${item.id}-${itemIndex}`}>
                      • {item.name} × {item.quantity}
                    </div>
                  ))}
                </div>
              ))}

            <hr />
            <p>
              <strong>Platform:</strong> {platform}
            </p>
            <p>
              <strong>Grand Total:</strong> ₹{grandTotal}
            </p>

            <button className="btn btn-primary" style={{ marginBottom: '12px' }} onClick={() => setShowSuccess(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleBreakfast;