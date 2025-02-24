import React from 'react';
import styled from 'styled-components';

const CartItem = ({ name, price, quantity, removeAction }) => {
    return (
        <CartItemCSS>
            <div className="item-info">
                <h3>{name}</h3>
                <p>Price: £{price.toFixed(2)}</p>
                <p>Quantity: {quantity}</p>
            </div>
            <button onClick={removeAction}>Remove</button>
        </CartItemCSS>
    );
};

export default CartItem;

const CartItemCSS = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding: 10px 0;

    .item-info {
        flex: 1;
    }

    h3 {
        margin: 0;
        font-size: 1.2em;
    }

    p {
        margin: 5px 0;
        color: #555;
    }

    button {
        background-color: #ff4d4d;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;

        &:hover {
            background-color: #ff1a1a;
        }
    }
`;