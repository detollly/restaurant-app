import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

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
                <h2>Your Order</h2>
                {!(total >= 0)? '' : <div className='total'>Total: £{total.toFixed(2)}</div>}
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

            {/* Checkout button at the bottom of the container */}
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
    width: 100%;
    height: 100%;
    background-color: #FAF9F6;
    padding: 20px;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-height: 90vh;
    overflow: hidden;
    border-radius: 8px;

    .cart-header {
        text-align: center;
        margin-bottom: 20px;
        
        h2 {
            font-size: 1.8em;
            color: #333;
            margin-bottom: 10px;
        }
        
        .total {
            font-size: 1.2em;
            font-weight: bold;
            color: #003366;
        }
    }

    .cart-items {
        flex-grow: 1;
        overflow-y: auto;
        padding-right: 10px;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        padding: 15px;
        margin-bottom: 20px;
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
        margin-top: 15px;
        padding-top: 15px;
        border-top: 1px solid #ddd;
    }

    .checkout-button button {
        padding: 10px 20px;
        background-color: #73A19E;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 1em;
        transition: background-color 0.2s;
    }

    .checkout-button button:hover {
        background-color: rgb(83, 121, 117);
    }
    
    @media (max-width: 768px) {
        .checkout-button {
            justify-content: center;
        }
        
        .checkout-button button {
            width: 100%;
        }
    }
`;