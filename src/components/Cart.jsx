import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CartItem from './CartItem';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Cart = ({ getItemDetails, quantities, removeItem, menuList }) => {
    const [total, setTotal] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);

    // Update the total whenever quantities change
    useEffect(() => {
        setTotal(getTotal());
    }, [quantities, menuList]);

    // Calculate the total price of items in the cart
    const getTotal = () => {
        let workingTotal = 0;
        const quantityEntries = Object.entries(quantities);

        for (let i = 0; i < quantityEntries.length; ++i) {
            const quantityInfo = quantityEntries[i];
            const itemId = Number.parseInt(quantityInfo[0]);
            const { price } = getItemDetails(itemId);
            const quantity = quantityInfo[1];
            workingTotal += quantity * price;
        }

        return workingTotal;
    };

    // Update selectedItems whenever quantities change
    useEffect(() => {
        setSelectedItems(Object.keys(quantities));
    }, [quantities]);

    return (
        <CartCSS>
            <div className='cart-header'>
                {!(total >= 0)? '' : 'Total: £' + total.toFixed(2)}
            </div>

            <div className='cart-items'>
                <ul>
                    {selectedItems.map(id => {
                        const itemId = Number.parseInt(id);
                        const itemDetails = getItemDetails(itemId);

                        // Ensure the item exists before rendering
                        if (!itemDetails || !itemDetails.name) {
                            return null; // Skip rendering if item details are not found
                        }

                        return (
                            <li key={id}>
                                <CartItem
                                    {...itemDetails}
                                    quantity={quantities[id]}
                                    removeAction={() => removeItem(itemId)}
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Add the checkout button at the bottom of the container */}
            <div className="checkout-button">
                <Link to="/checkout">
                    <button>Checkout</button>
                </Link>
            </div>
        </CartCSS>
    );
};

export default Cart;

const CartCSS = styled.div`
    box-sizing: border-box;
    border: 1px purple solid; /* debugging */
    width: 100%;
    height: 100%;
    background-color: #f8f9fa;
    padding: 20px;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column; /* Stack children vertically */
    justify-content: space-between; /* Push header to top, items in the middle, and button to bottom */
    max-height: 90vh; /* Limit the height to 90% of the viewport height */
    overflow: hidden; /* Prevent the entire cart from scrolling */

    .cart-header {
        font-size: 1.5em;
        font-weight: bold;
        margin-bottom: 20px;
    }

    .cart-items {
        flex-grow: 1; /* Allow this section to take up remaining space */
        overflow-y: auto; /* Add scroll if items overflow */
        padding-right: 10px; /* Add padding to prevent scrollbar overlap */
    }

    .cart-items ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    .cart-items li {
        margin-bottom: 10px;
    }

    .checkout-button {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
        padding-top: 20px; /* Add padding to separate button from items */
        border-top: 1px solid #ddd; /* Optional: Add a border to separate button from items */
    }

    .checkout-button button {
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1em;
    }

    .checkout-button button:hover {
        background-color: #0056b3;
    }
`;