import React, { useState } from 'react';
import PlantInfo from './PlantInfo';
import Invoice from './Invoice';

const App = () => {
    const [cartItems, setCartItems] = useState([]); // Correctly initialized as an empty array

    console.log("Cart Items in App:", cartItems); // Debugging line to check cartItems

    return (
        <div>
            <PlantInfo cartItems={cartItems} setCartItems={setCartItems} />
            <Invoice cartItems={cartItems} />
        </div>
    );
};

export default App;