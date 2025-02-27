import React, { useState, useEffect } from "react";
import styled from 'styled-components'; 
import { Link } from 'react-router-dom'

export default function CheckoutPage()
{
    const [itemDetails, setItemDetails] = useState([1])
    const [total, setTotal] = useState(0);
    

    const items = getCartItems(); /* retrieved from localStorage */

    useEffect(() =>
    {
        /* get item details */ 
        getItemDetails(); 

    }, []); 

    async function getItemDetails()
    {
        const response = await fetch('https://djevelyn.helioho.st/menu/items/all?key=123');
        const result = await response.json(); 

        setupList(result); 
        calculateTotal(result); 
    }

    function setupList(givenObjectList)
    {
        let workingList = [];

        givenObjectList.forEach(object => 
        {
            const id = object.id; 

            workingList[id] = object; 
        }); 

        setItemDetails(workingList); 
        console.log('Set item details'); 
    }

    function calculateTotal(givenObjectList)
    {

    }

    return(
        <CheckoutPageCSS>

        <div id='orderInfoSection'>
            <div id='container'>
                <div id='order-summary-section'>
                    
                    <h3>Order Details</h3>

                    <div id='order-summary'>
                        
                        <ul>
                            {Object.entries(items).map(item => 
                            {
                                const id = Number.parseInt(item[0]);
                                const qty = item[1]; 
                                console.log(`id is ${id} and qty is ${qty}`); 

                                let details = itemDetails[id];
                                let name = details == undefined? 'loading' : details.name;
                                let price = details == undefined? 'loading' : details.price;

                                return (
                                    <li key={id}>

                                        <div className='item-name'> {name} </div>
                                        <br/>
                                        <div className='item-quantity'> qty:{qty} £{(price * qty).toFixed(2)} </div>

                                    </li>
                                );
                            })}
                        </ul>

                    </div>
                </div>

                <Link to='/order'> <button> Amend Order </button> </Link>

            </div>

        </div>

        </CheckoutPageCSS>
    )
} 

function getCartItems()
{
    let itemsString = localStorage.getItem('cart');
    let items = itemsString !== undefined && itemsString !== null? JSON.parse(itemsString) : {};

    return items; 
}

const CheckoutPageCSS = styled.div `

    box-sizing: border-box;

    display: grid;
    grid-template-columns: 50% 1fr;
    grid-template-areas: 'a b';

    * {
        /* border: solid 1px purple; /* for debugging */
    }

    #container {
        display: flex; 
        justify-content: center;
    }

    #order-info-section {

        grid-area: 'a';
        display: flex;

        justify-content: center;
    }

    #order-summary-section {

        width: 80%;
        height: auto;

        display: grid;
        grid-template-rows: 10% 1fr;
    }

    #order-summary {

        display: flex; 
        justify-content: center;

        width: 100%;

        background-color: palegoldenrod;

        font-size: larger;
    }

    #order-summary ul {
        list-style: none; 

        width: 100%;
    }

    #order-summary li {
        padding: 5%; 
    }

    .item-name {
        font-weight: bold;
    }

    .item-quantity {
        text-align: end;
    }




`
