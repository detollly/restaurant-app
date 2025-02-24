import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CartItem from './CartItem';

const Cart = ({ getItemDetails, quantities, removeItem }) => {
    const [total, setTotal] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);

    // Update the total whenever quantities change
    useEffect(() => {
        setTotal(getTotal());
    }, [quantities]);

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
                Total: £{total.toFixed(2)}
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
        </CartCSS>
    );
};

export default Cart;

const CartCSS = styled.div`
    position: fixed;
    right: 0;
    top: 0;
    width: 300px;
    height: 100vh;
    background-color: #f8f9fa;
    padding: 20px;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    overflow-y: auto;

    .cart-header {
        font-size: 1.5em;
        font-weight: bold;
        margin-bottom: 20px;
    }

    .cart-items ul {
        list-style-type: none;
        padding: 0;
    }

    .cart-items li {
        margin-bottom: 10px;
    }
`;