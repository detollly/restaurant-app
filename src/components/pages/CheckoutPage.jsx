import React, { useState, useEffect } from "react";
import styled from 'styled-components'; 
import { Link } from 'react-router-dom';

export default function CheckoutPage() {
    const [itemDetails, setItemDetails] = useState([1]);
    const [total, setTotal] = useState(0);

    const items = getCartItems(); /* retrieved from localStorage */

    useEffect(() => {
        /* get item details */ 
        getItemDetails(); 
    }, []); 

    async function getItemDetails() {
        const response = await fetch('https://djevelyn.helioho.st/menu/items/all?key=123');
        const result = await response.json(); 
        setupList(result); 
        calculateTotal(result); 
    }

    function setupList(givenObjectList) {
        let workingList = [];
        givenObjectList.forEach(object => {
            const id = object.id; 
            workingList[id] = object; 
        }); 
        setItemDetails(workingList); 
        console.log('Set item details'); 
    }

    function calculateTotal(givenObjectList) {
        let total = 0;
        Object.entries(items).forEach(([id, qty]) => {
            const item = givenObjectList.find(item => item.id === Number(id));
            if (item) {
                total += item.price * qty;
            }
        });
        setTotal(total);
    }

    // Placeholder function for the "Order" button
    const handleOrder = () => {
        console.log("Order button clicked");
        // Add functionality here if needed
    };

    return (
        <CheckoutPageCSS>
            <div id='header'>
                <h1>Checkout</h1>
            </div>

            <div id='orderInfoSection'>
                <div id='container'>
                    <div id='order-summary-section'>
                        <h3>Order Details</h3>
                        <div id='order-summary'>
                            <ul>
                                {Object.entries(items).map(([id, qty]) => {
                                    const itemId = Number.parseInt(id);
                                    let details = itemDetails[itemId];
                                    let name = details == undefined ? 'loading' : details.name;
                                    let price = details == undefined ? 'loading' : details.price;

                                    return (
                                        <li key={id}>
                                            <div className='item-name'> {name} </div>
                                            <div className='item-quantity'> qty: {qty} £{(price * qty).toFixed(2)} </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div id='total-section'>
                            <div className='total-label'>Total:</div>
                            <div className='total-amount'>£{total.toFixed(2)}</div>
                        </div>
                    </div>

                    <div id='button-container'>
                        <Link to='/order'> 
                            <button id='amend-order-button'> Amend Order </button> 
                        </Link>
                        <button id='order-button' onClick={handleOrder}> Order </button>
                    </div>
                </div>
            </div>
        </CheckoutPageCSS>
    );
} 

function getCartItems() {
    let itemsString = localStorage.getItem('cart');
    let items = itemsString !== undefined && itemsString !== null ? JSON.parse(itemsString) : {};
    return items; 
}

const CheckoutPageCSS = styled.div`
    position: relative;
    margin: 2rem auto;
    max-width: 900px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    #header {
        text-align: center;
        margin-bottom: 20px;
        h1 {
            font-size: 2em;
            color: #333;
        }
    }

    #container {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    #order-summary-section {
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    #order-summary {
        ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        li {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
        }

        .item-name {
            font-weight: bold;
            color: #333;
        }

        .item-quantity {
            color: #666;
        }
    }

    #total-section {
        display: flex;
        justify-content: space-between;
        padding: 20px 0;
        font-size: 1.2em;
        font-weight: bold;
        border-top: 2px solid #eee;
        margin-top: 20px;

        .total-label {
            color: #333;
        }

        .total-amount {
            color: #007bff;
        }
    }

    #button-container {
        display: flex;
        justify-content: space-between;
        gap: 10px;
    }

    #amend-order-button, #order-button {
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 1em;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
            background-color: #0056b3;
        }
    }

    #order-button {
        background-color: #28a745;

        &:hover {
            background-color: #218838;
        }
    }
`;