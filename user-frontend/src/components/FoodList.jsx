import React, { useState, useEffect } from 'react';
import FoodItems from './FoodItems';

const FoodList = ({ onAddToCart }) => {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await fetch('http://localhost:3000/meals'); // Adjust the URL if your server runs on a different port
                if (!response.ok) {
                    throw new Error('Failed to fetch meals');
                }
                const data = await response.json();
                setMeals(data);
            } catch (error) {
                console.error('Error fetching the meals data:', error);
            }
        };

        fetchMeals();
    }, []);

    return (
        <div className="meal-item" id='meals'>
            {meals.map((item) => (
                <FoodItems key={item.id} item={item} onAddToCart={onAddToCart} />
            ))}
        </div>
    );
};

export default FoodList;
