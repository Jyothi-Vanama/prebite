import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BreakfastMenu.css";

import dosa from "../assets/breakfasts/dosa.png";
import idli from "../assets/breakfasts/idli.jpg";
import pongal from "../assets/breakfasts/pongal.jpg";
import upma from "../assets/breakfasts/upma.jpg";
import coffee from "../assets/breakfasts/coffee.jpg";
import tea from "../assets/breakfasts/tea.jpg";
import poha from "../assets/breakfasts/poha.jpg";

function BreakfastMenu() {

  const [searchTerm, setSearchTerm] = useState("");
  const [foods, setFoods] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    // Simulate an API call to fetch breakfast foods
    const fetchFoods = async () => {
      try {
        // Replace this with your actual API endpoint
        const response = await axios.get("http://localhost:5000/api/foods");
        setFoods(response.data);
      } catch (error) {
        console.error("Error fetching breakfast foods:", error);
      }
    };

    fetchFoods();
  }, []);

  const filteredFoods = foods.filter((food) => {
  const matchesSearch = food.food_name
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesCategory =
    category === "All" || food.category === category;

  return matchesSearch && matchesCategory;
});

  return (

<div className="breakfast-page">

<div className="menu-header">

<h1>🍳 Breakfast Menu</h1>

<p>Discover breakfast options available for scheduling</p>

</div>

<div className="search-box">

<input
type="text"
placeholder="Search breakfast..."
value={searchTerm}
onChange={(e)=>setSearchTerm(e.target.value)}
/>

<select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="category-dropdown"
>
  <option>All</option>
  <option>Breakfast</option>
  <option>Beverages</option>
</select>

</div>

<div className="food-grid">

{filteredFoods.map(food=>(

<div className="food-card" key={food.id}>

<img src={food.image} alt={food.food_name}/>

<h3>{food.food_name}</h3>

<p className="price">₹{food.price}</p>

<span className="category">
    {food.category}
</span>

<div className="availability">
    🟢 Available
</div>

</div>

))}

</div>

</div>

  );

}

export default BreakfastMenu;