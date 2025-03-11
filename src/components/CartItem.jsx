import React from 'react';
import styled from 'styled-components';

const CartItem = ({ name, price, quantity, removeAction }) => {
    return (
        <CartItemCSS>
            <div className="item-info">
                <div className="item-name">{name}</div>
                <div className="item-price">£{price.toFixed(2)}</div>
            </div>
            <div className="item-controls">
                <div className="quantity-display">
                    <span>Qty: {quantity}</span>
                </div>
                <button onClick={removeAction}>Remove</button>
            </div>
        </CartItemCSS>
    );
};

export default CartItem;

const CartItemCSS = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #eee;

    .item-info {
        flex: 1;
    }

    .item-name {
        font-weight: bold;
        color: #333;
        margin-bottom: 5px;
    }

    .item-price {
        color: #003366;
        font-weight: bold;
    }

    .item-controls {
        display: flex;
        align-items: center;
        gap: 15px;
    }

    .quantity-display {
        color: #555;
        font-weight: bold;
    }

    button {
        background-color: #FF7F50;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    button:hover {
        background-color: rgb(184, 89, 54);
    }
    
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        
        .item-controls {
            margin-top: 10px;
            width: 100%;
            justify-content: space-between;
        }
    }
`;