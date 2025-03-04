import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MenuItem = ({ id, name, description, price, category, image, 
    addItem, removeItem, getItemQuantity }) => {
    
    const [showDescription, setShowDescription] = useState(false);
    
    const toggleDescription = (e) => {
        e.preventDefault(); // Prevent Link navigation when clicking toggle
        setShowDescription(!showDescription);
    };
    
    return (
        <Product>
            <div className="product-content">
                <Link to={`/item/${id}`}>
                    <img src={image} alt={description} />
                    <h2>{name}</h2>
                    <p className="price">£{price}</p>
                    <p className="quantity">Qty: {getItemQuantity}</p>
                </Link>
                
                <button 
                    onClick={toggleDescription} 
                    className="toggle-description"
                >
                    {showDescription ? "Hide Details" : "Show Details"}
                </button>
                
                {showDescription && (
                    <div className="description-container">
                        <p className="description">{description}</p>
                    </div>
                )}
                
                <button onClick={addItem} className="add-to-cart">Add to Cart</button>
            </div>
        </Product>
    );
};

export default MenuItem;

/* Styling moved to bottom to reduce scroll time */
const Product = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
    width: 90%;
    margin: 10px;
    text-align: center;
    background: #fff;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;

    .product-content {
        display: flex;
        flex-direction: column;
    }

    img {
        width: 100%;
        max-width: 200px;
        height: 150px;
        margin: 20px auto;
    }

    h2 {
        margin: 0 0 10px;
        color: #333;
    }

    p {
        color: #777;
        margin-bottom: 10px;
    }

    .price {
        font-weight: bold;
        color: #333;
    }

    .description-container {
        padding: 0 15px 10px;
        margin-bottom: 10px;
        background-color: #f8f9fa;
        border-radius: 5px;
    }

    .description {
        font-style: italic;
        text-align: left;
        line-height: 1.4;
    }

    .toggle-description {
        background-color: transparent;
        color: #007bff;
        border: 1px solid #007bff;
        border-radius: 20px;
        padding: 5px 10px;
        margin: 5px auto 15px;
        cursor: pointer;
        font-size: 0.8rem;
        width: 120px;
    }

    .toggle-description:hover {
        background-color: #f0f8ff;
    }

    .add-to-cart {
        background-color: #007bff;
        color: white;
        padding: 15px 20px;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        transition: background-color 0.3s;
        margin-top: 5px;
    }

    .add-to-cart:hover {
        background-color: #0056b3;
    }

    &:hover {
        transform: translateY(-5px);
    }

    /* for Link - to remove link underline */
    a {
        text-decoration: none;
    }
`;