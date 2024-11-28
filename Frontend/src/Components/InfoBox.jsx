import React, { useState } from 'react';

const UNKNOWN_VALUE = 'Unknown';

const InfoBox = ({ data, onAddToCart }) => {
    let jsonData;
    if (typeof data === 'string') {
        jsonData = JSON.parse(data); // Parse the data string into a JSON object
    } else {
        jsonData = data;
    }

    const keyMapping = {
        name: 'Plant Name',
        water: 'Water Requirement',
        sunlight: 'Lighting Conditions',
        lifespan: 'Life Span (years)',
        height: 'Height (m)',
        fruit_nut: 'Produces Fruit/Nuts?',
        soil_ph: 'Soil pH',
        temperature: 'Optimal Temperature (°C)',
        fertilizer: 'Recommended Fertilizer',
        pest: 'Common Pests',
        comp_plants: 'Companion Plants',
    };

    if (!data) return null; // Check if data is null or undefined

    const [counter, setCounter] = useState(0); // State for the counter

    const handleAddToCart = () => {
        if (jsonData.name) {
            // If counter is 0, add the item with quantity 1
            if (counter === 0) {
                setCounter(1); // Set counter to 1
                onAddToCart({ name: jsonData.name, quantity: 1 }); // Add 1 unit to cart
            }
        }
    };

    const incrementCounter = () => {
        setCounter((prev) => {
            const newQuantity = prev + 1;
            onAddToCart({ name: jsonData.name, quantity: newQuantity }); // Update cart with new quantity
            return newQuantity;
        });
    };

    const decrementCounter = () => {
        if (counter > 0) {
            setCounter((prev) => {
                const newQuantity = prev - 1;
                if (newQuantity > 0) {
                    onAddToCart({ name: jsonData.name, quantity: newQuantity }); // Update cart with new quantity
                } else {
                    // If the new quantity is 0, we might want to remove the item from the cart
                    // You may implement a function to remove the item from the cart if needed
                    // onRemoveFromCart({ name: jsonData.name });
                }
                return newQuantity;
            });
        }
    };

    return (
        <div className="bg-black/50 rounded-md p-4 opacity-50 ml-9 mr-9 font-bold">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.keys(jsonData).map(key => (
                    <div
                        key={key}
                        className="bg-white text-[#659e38] rounded-md p-4 transition-colors duration-300 hover:bg-[#659e38] hover:text-white"
                    >
                        <span className="font-bold">{keyMapping[key] || key}:</span> {jsonData[key] ?? UNKNOWN_VALUE}
                    </div>
                ))}
            </div>

            {/* Counter and Add to Cart Button */}
            <div className="mt-4 flex items-center">
                {counter > 0 ? (
                    <div className="flex items-center space-x-2">
                        {/* <button
                            onClick={decrementCounter}
                            className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400"
                        >
                            -
                        </button> */}
                        <span className="text-lg">{counter}</span>
                        <button
                            onClick={incrementCounter}
                            className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400"
                        >
                            +
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleAddToCart}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add to Cart
                    </button>
                )}
            </div>
        </div>
    );
};

export default InfoBox;