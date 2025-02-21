import React from "react";
import styled from "styled-components";

const MenuItem = ({ id, name, description, price, category, img, 
    addItem, removeItem, getItemQuantity }) => {
    
    console.log(`Item ${id} name is ${name}`); 
    
    return (
        <Product>
            <img src={img} alt={description} />
            <h2>{name}</h2>
            <p>{price}</p>
            <p> qty: {getItemQuantity} </p>
            <button className="add-to-cart">Add to Cart</button>
        </Product>
    );
};

export default MenuItem;

/* Moved to bottom to reduce scroll time editing MenuItem */
const Product = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
    width: 60%;
    margin: 10px;
    text-align: center;
    background: #fff;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;

    img {
        width: 100%;
        max-width: 200px;
        height: auto;
        margin: 20px 0;
    }

    h2 {
        margin: 0 0 10px;
        color: #333;
    }

    p {
        color: #777;
        margin-bottom: 20px;
    }

    .add-to-cart {
        background-color: #007bff;
        color: white;
        padding: 15px 20px;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .add-to-cart:hover {
        background-color: #0056b3;
    }

    &:hover {
        transform: translateY(-5px);
    }
`;
