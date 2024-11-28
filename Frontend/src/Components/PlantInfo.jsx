import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InfoBox from './InfoBox';
import useCart from './CartItem';
import MarketingBox from './MarketingBox';

const PlantInfo = () => {
    const { plantName } = useParams();
    const [data, setData] = useState(null);
    const { cart, addToCart, clearCart } = useCart();
    
    const addCart = async () => {
        if (!data) {
            console.error("No data available to add to cart.");
            return; // Exit if data is not available
        }

        console.log("Adding to cart:", data.name);
        const initialres = await fetch(`/api/plantprice?name=${data.name}`);
        const pricedata = JSON.parse(await initialres.json());
        

        addToCart({ name: data.name, price: pricedata.unit_price, quantity: 1 });
    };

    const handleClearCart = async () => { clearCart() };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/plant?name=${plantName}`);
                const datastring = await response.json();
                const data = JSON.parse(datastring)
                setData(data); // Set data once fetched
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        console.log("Current cart contents:", cart);
        fetchData();
    }, [plantName]);

    
    return (
        <div>
            <MarketingBox />
            <InfoBox 
                key={JSON.stringify(data)} 
                data={data} 
                onAddToCart={addCart} // Pass addToCart as a prop
            />
            <div className="flex justify-end mt-4">
                    <button 
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg"
                        onClick={handleClearCart}
                    >
                        Clear Cart
                    </button>
            </div>
        </div>
    );
};

export default PlantInfo;