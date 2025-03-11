import React, { useState, useEffect } from "react";
import styled from 'styled-components'; 
import { Link } from 'react-router-dom';
import PaymentModal from './PaymentModal'; // Import the new PaymentModal component

export default function CheckoutPage() {
    const [itemDetails, setItemDetails] = useState([]);
    const [total, setTotal] = useState(0);
    const [cartItems, setCartItems] = useState(getCartItems());
    const [showFinaliseOrderModal, setShowFinaliseOrderModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('drinks'); // Default category
    const [missingItems, setMissingItems] = useState([]);
    const [orderFinalized, setOrderFinalized] = useState(false); // Track if order is finalized
    const [showPaymentModal, setShowPaymentModal] = useState(false); // New state for payment modal

    // Error handling
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false); 
    
    useEffect(() => {
        getItemDetails(); 
    }, []); 

    // Add this effect to recalculate the total whenever cartItems changes
    useEffect(() => {
        if (itemDetails.length > 0) {
            calculateTotal();
        }
    }, [cartItems, itemDetails]);

    async function getItemDetails() {
        try 
        {
            const response = await fetch('https://djevelyn.helioho.st/menu/items/all?key=123');

            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);

            const result = await response.json(); 

            setIsLoading(false); 

            setupList(result); 
        }
        catch (err) {

            setIsLoading(false);
            setIsError(true); 
            console.log(`Error: ${err.message}`); 

        }
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

    function calculateTotal() {
        let total = 0;
        Object.entries(cartItems).forEach(([id, qty]) => {
            const item = itemDetails[Number(id)];
            if (item) {
                total += item.price * qty;
            }
        });
        setTotal(total);
    }

    const handleIncreaseQuantity = (itemId) => {
        const updatedCart = { ...cartItems };
        updatedCart[itemId] = (updatedCart[itemId] || 0) + 1;
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleDecreaseQuantity = (itemId) => {
        const updatedCart = { ...cartItems };
        if (updatedCart[itemId] > 1) {
            updatedCart[itemId] -= 1;
        } else {
            delete updatedCart[itemId]; // Remove the item if quantity reaches 0
        }
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleOrder = () => {
        // Show payment modal when Order button is clicked
        setShowPaymentModal(true);
    };

    const handleShowFinaliseOrder = () => {
        // Fetch missing items for the selected category
        const missingItemsList = Object.values(itemDetails).filter(item => item.category === selectedCategory && !cartItems[item.id]);
        setMissingItems(missingItemsList);
        setShowFinaliseOrderModal(true);
    };

    const handleAddMissingItem = (itemId) => {
        handleIncreaseQuantity(itemId); // Add the item to the cart
    };

    const handleFinishOrder = () => {
        setShowFinaliseOrderModal(false); // Close the modal
        setOrderFinalized(true); // Set order as finalized to show the Order button
        console.log("Order finalised");
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value); // Update the selected category
        const missingItemsList = Object.values(itemDetails).filter(item => item.category === e.target.value && !cartItems[item.id]);
        setMissingItems(missingItemsList);
    };

    const handleClosePaymentModal = () => {
        setShowPaymentModal(false);
    };

    // Error rendering
    if (isLoading)
    {
        return (
        <div className='min-h-[300px] flex justify-center flex-center'> 
        Loading 
        </div>
        )
    }

    if (isError)
    {
        return (
        <div className='min-h-[300px] flex justify-center items-center'> 
        Unable to connect to server. Refresh page to try again. 
        </div>
        )
    }

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
                                {Object.entries(cartItems).map(([id, qty]) => {
                                    const itemId = Number.parseInt(id);
                                    let details = itemDetails[itemId];
                                    let name = details == undefined ? 'loading' : details.name;
                                    let price = details == undefined ? 'loading' : details.price;

                                    return (
                                        <li key={id}>
                                            <div className='item-name'> {name} </div>
                                            <div className='item-controls'>
                                                <div className='quantity-controls'>
                                                    <button className='quantity-button' onClick={() => handleDecreaseQuantity(itemId)}>-</button>
                                                    <span> {qty} </span>
                                                    <button className='quantity-button' onClick={() => handleIncreaseQuantity(itemId)}>+</button>
                                                </div>
                                                <div className='item-price'>£{(price * qty).toFixed(2)}</div>
                                            </div>
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
                        {/* Only show Order button if the order has been finalized */}
                        {orderFinalized ? (
                            <button id='order-button' onClick={handleOrder}> Order </button>
                        ) : (
                            <button id='finalise-order-button' onClick={handleShowFinaliseOrder}> Finalise Order </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal for finalising order */}
            {showFinaliseOrderModal && (
                <ModalOverlay>
                    <ModalContent>
                        <h3>Finalise Order</h3>
                        <div className='category-dropdown'>
                            <label htmlFor='category'>Select Category:</label>
                            <select id='category' value={selectedCategory} onChange={handleCategoryChange}>
                                <option value='drinks'>Drinks</option>
                                <option value='sides'>Sides</option>
                                <option value='dessert'>Desserts</option>
                            </select>
                        </div>
                        <ul>
                            {missingItems.map(item => (
                                <li key={item.id}>
                                    <div className='item-name'>{item.name}</div>
                                    <div className='item-price'>£{item.price.toFixed(2)}</div>
                                    <button className='add-item-button' onClick={() => handleAddMissingItem(item.id)}>Add</button>
                                </li>
                            ))}
                        </ul>
                        <button className='finish-order-button' onClick={handleFinishOrder}>Finish Order</button>
                        <button className='close-modal-button' onClick={() => setShowFinaliseOrderModal(false)}>Close</button>
                    </ModalContent>
                </ModalOverlay>
            )}

            {/* Payment Modal */}
            <PaymentModal 
                isOpen={showPaymentModal} 
                onClose={handleClosePaymentModal} 
                orderTotal={total} 
            />
        </CheckoutPageCSS>
    );
} 

function getCartItems() {
    let itemsString = localStorage.getItem('cart');
    let items = itemsString !== undefined && itemsString !== null ? JSON.parse(itemsString) : {};
    return items; 
}

const CheckoutPageCSS = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    margin: 10rem auto 5rem auto; /* Changed to auto on left and right for centering */
    width: 80%; /* Changed from 100% to 80% */
    max-width: 1200px; /* Added max-width to prevent it from getting too wide */
    min-height: calc(100vh - 10rem - 10rem);
    overflow: hidden;
    background-color: #FAF9F6;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    /* Existing CSS remains the same */
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
        padding: 0 20px; /* Added padding to prevent content from touching edges */
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
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
        }

        .item-name {
            font-weight: bold;
            color: #333;
            flex: 1;
        }

        .item-controls {
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .quantity-controls {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .quantity-button {
            padding: 5px 10px;
            background-color: #73A19E;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.2s;

            &:hover {
                background-color:rgb(83, 121, 117);
            }
        }

        .item-price {
            font-weight: bold;
            color: #003366;
            min-width: 80px;
            text-align: right;
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
            color: #003366;
        }
    }

    #button-container {
        display: flex;
        justify-content: space-between;
        gap: 10px;
    }

    #amend-order-button, #order-button, #finalise-order-button {
        padding: 10px 20px;
        background-color: #73A19E;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 1em;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
            background-color: rgb(83, 121, 117);
        }
    }

    #order-button {
        background-color: #73A19E;

        &:hover {
            background-color: rgb(83, 121, 117);
        }
    }

    #finalise-order-button {
        background-color: #FF7F50;

        &:hover {
            background-color:rgb(184, 89, 54);
        }
    }
    @media (max-width: 768px) {
        width: 90%;
        margin: 8rem auto 4rem auto;
        
        #button-container {
            flex-direction: column;
            
            button, a {
                width: 100%;
            }
        }
    }
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 400px;
    max-width: 90%;

    h3 {
        font-size: 1.5em;
        margin-bottom: 20px;
        color: #333;
    }

    .category-dropdown {
        margin-bottom: 20px;

        label {
            margin-right: 10px;
            font-weight: bold;
        }

        select {
            padding: 5px;
            border-radius: 4px;
            border: 1px solid #ccc;
        }
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
    }

    .item-name {
        font-weight: bold;
        color: #333;
    }

    .item-price {
        color: #003366;
    }

    .add-item-button {
        padding: 5px 10px;
        background-color: #73A19E;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
            background-color: rgb(83, 121, 117);
        }
    }

    .finish-order-button {
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #73A19E;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
            background-color: rgb(83, 121, 117);
        }
    }

    .close-modal-button {
        margin-top: 10px;
        padding: 10px 20px;
        background-color: #FF7F50;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
            background-color: rgb(184, 89, 54);
        }
    }
`;