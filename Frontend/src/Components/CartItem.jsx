import React, { useState, useEffect } from 'react';
import PlantInfo from './PlantInfo';
import Invoice from './Invoice';

// const CartItem = () => {
//     const [cartItems, setCartItems] = useState([]); // Initialize cartItems as an empty array

//     return (
//         <div>
//             <PlantInfo cartItems={cartItems} setCartItems={setCartItems} />
//             <Invoice cartItems={cartItems} />
//         </div>
//     );
// };

// export default CartItem;

const useCart = () => {
    const [cart, setCart] = useState(() => {
        // Load cart from local storage if available, else set it as an empty array
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
      });
    
      // Whenever the cart changes, save it to local storage
      useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
      }, [cart]);

      const generateId = () => {
        return Date.now() + Math.random().toString(36).substr(2, 9);
      };
    
      // Add item to cart
      const addToCart = (item) => {
        const newItem = { ...item, id: generateId() };
        setCart((prevCart) => [...prevCart, newItem]);
      };

      const updateCart = (id, updatedProperties) => {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === id ? { ...item, ...updatedProperties } : item
          )
        );
      };
    
      // Remove item from cart
      const removeFromCart = (itemId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
      };
    
      // Clear all items from the cart
      const clearCart = () => {
        setCart([]);
      };
    
      return {
        cart,
        addToCart,
        updateCart,
        removeFromCart,
        clearCart,
      };
    };
    
    export default useCart;