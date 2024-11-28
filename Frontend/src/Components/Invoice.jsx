// import React, { useState } from 'react';

// const InvoiceState = () => {
//     const [cartItems, setCartItems] = useState([
//         { id: 1, name: 'Item 1', price: 10, quantity: 2 },
//         { id: 2, name: 'Item 2', price: 15, quantity: 1 },
//     ]);

//     const increaseQuantity = (id) => {
//         setCartItems(cartItems.map(item =>
//             item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//         ));
//     };

//     const decreaseQuantity = (id) => {
//         setCartItems(cartItems.map(item =>
//             item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
//         ));
//     };

//     const total = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//     return (
//         <div className="p-4 bg-white shadow-md rounded-lg">
//             <h2 className="text-2xl font-bold mb-4">Invoice</h2>
//             <table className="w-full">
//                 <thead>
//                     <tr className="bg-gray-100 text-left">
//                         <th className="py-2 px-4">Item</th>
//                         <th className="py-2 px-4">Price</th>
//                         <th className="py-2 px-4">Quantity</th>
//                         <th className="py-2 px-4">Total</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {cartItems.map((item) => (
//                         <tr key={item.id} className="border-b">
//                             <td className="py-2 px-4">{item.name}</td>
//                             <td className="py-2 px-4">${item.price}</td>
//                             <td className="py-2 px-4 flex justify-center items-center">
//                                 <button
//                                     className="bg-red-500 text-white px-2 py-1 rounded mr-2"
//                                     onClick={() => decreaseQuantity(item.id)}
//                                 >
//                                     -
//                                 </button>
//                                 <span className="mx-2">{item.quantity}</span>
//                                 <button
//                                     className="bg-green-500 text-white px-2 py-1 rounded"
//                                     onClick={() => increaseQuantity(item.id)}
//                                 >
//                                     +
//                                 </button>
//                             </td>
//                             <td className="py-2 px-4">${(item.price * item.quantity).toFixed(2)}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//                 <tfoot>
//                     <tr className="bg-gray-100 text-left">
//                         <td colSpan="3" className="py-2 px-4">Gross Total:</td>
//                         <td className="py-2 px-4">${total.toFixed(2)}</td>
//                     </tr>
//                 </tfoot>
//             </table>
//         </div>
//     );
// };

// const Invoice = () => {
//     return (
//         <div className="max-w-lg mx-auto my-8">
//             <h1 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h1>
//             <InvoiceState />  {/* Only the Invoice component is used */}
//         </div>
//     );
// };

// export default Invoice;

import React from 'react';
import jsPDF from 'jspdf';
import useCart from './CartItem';
import image64 from '../base64image.json';

const InvoiceState = () => {
    const { cart, addToCart, updateCart, removeFromCart, clearCart } = useCart();

    const increaseQuantity = (item) => {
        updateCart(item.id, { quantity: item.quantity + 1 });
    };

    const decreaseQuantity = (item) => {
        if (item.quantity > 0) {
            updateCart(item.id, { quantity: item.quantity - 1 });
        }
    };

    const deleteItem = (id) => {
        removeFromCart(id);
    };

    const handleClearCart = () => {
        clearCart();
    };

    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleGenerateInvoice = () => {
        const doc = new jsPDF();
        const logo = image64.image64; // Your Base64 logo string here
        const logoWidth = 50;
        const logoHeight = 50;

        // Set up header
        doc.setFontSize(22);
        doc.text('Grow Nursery Pvt. Ltd.', 14, 20);
        doc.setFontSize(12);
        doc.text('Nitte, Near NMAMIT Campus', 14, 30);
        doc.text('Udupi, Karnataka, 574110', 14, 35);
        doc.text('Phone: (123) 456-7890', 14, 40);
        doc.text('Email: info@grownursery.com', 14, 45);
        doc.line(10, 50, 200, 50);

        // Add the logo to the top right
        doc.addImage(logo, 'PNG', 150, 10, logoWidth, logoHeight);

        // Add Invoice Title
        doc.setFontSize(18);
        doc.text('Invoice', 14, 60);
        doc.setFontSize(12);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 60);
        
        // Add Table Headers
        doc.text('Item', 14, 70);
        doc.text('Price', 80, 70);
        doc.text('Quantity', 110, 70);
        doc.text('Total', 140, 70);
        
        doc.line(10, 75, 200, 75);

        let y = 80;

        // Add each item in the cart to the PDF
        cart.forEach(item => {
            doc.text(item.name, 14, y);
            doc.text(`$${item.price.toFixed(2)}`, 80, y);
            doc.text(`${item.quantity}`, 110, y);
            doc.text(`$${(item.price * item.quantity).toFixed(2)}`, 140, y);
            y += 10;
        });

        // Add total
        doc.setFontSize(12);
        doc.text('Gross Total:', 110, y);
        doc.text(`$${total.toFixed(2)}`, 140, y);

        doc.line(10, y + 5, 200, y + 5);
        doc.save('invoice.pdf');
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Your Shopping Cart</h2>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
                <thead>
                    <tr className="bg-gray-300 text-gray-700 text-sm uppercase tracking-wide">
                        <th className="py-3 px-4">Item</th>
                        <th className="py-3 px-4">Price</th>
                        <th className="py-3 px-4">Quantity</th>
                        <th className="py-3 px-4">Total</th>
                        <th className="py-3 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item) => (
                        <tr key={item.id} className="even:bg-gray-100 hover:bg-gray-200 transition-colors">
                            <td className="py-3 px-4 text-gray-800 font-medium">{item.name}</td>
                            <td className="py-3 px-4 text-gray-600">${item.price.toFixed(2)}</td>
                                                        <td className="py-3 px-4 flex justify-center items-center space-x-2">
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold px-3 py-1 rounded-full transition duration-150"
                                    onClick={() => decreaseQuantity(item)}
                                >
                                    -
                                </button>
                                <span className="font-semibold">{item.quantity}</span>
                                <button
                                    className="bg-green-500 hover:bg-green-600 text-white font-bold px-3 py-1 rounded-full transition duration-150"
                                    onClick={() => increaseQuantity(item)}
                                >
                                    +
                                </button>
                            </td>
                            <td className="py-3 px-4 text-gray-600">${(item.price * item.quantity).toFixed(2)}</td>
                            <td className="py-3 px-4">
                                <button
                                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-150"
                                    onClick={() => deleteItem(item.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr className="bg-gray-300 text-gray-700">
                        <td colSpan="3" className="py-3 px-4 font-semibold text-right">Gross Total:</td>
                        <td className="py-3 px-4 font-bold text-lg">${total.toFixed(2)}</td>
                        <td className="py-3 px-4 text-right space-x-2">
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-150"
                                onClick={handleGenerateInvoice}
                            >
                                Generate Invoice
                            </button>
                            <button
                                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-150"
                                onClick={handleClearCart}
                            >
                                Clear Cart
                            </button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

const Invoice = () => {
    return (
        <div className="max-w-4xl mx-auto my-8 p-6 bg-gradient-to-r from-gray-100 to-gray-200 shadow-lg rounded-xl">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Shopping Cart</h1>
            <InvoiceState />  {/* Only the Invoice component is used */}
        </div>
    );
};

export default Invoice;