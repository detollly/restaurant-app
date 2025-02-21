import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CartItem from './CartItem';
import downArrow from '../images/arrow-drop-down-icon-md.png'
import upArrow from '../images/arrow-drop-up-icon-md.png'

function Cart({getItemDetails, quantities, removeItem})
{
    const[displayItems, setDisplayItems] = useState(false); 
    const[total, setTotal] = useState(0); 
    const[selectedItems, setSelectedItems] = useState([]); 

    useEffect(() =>
    {

        setTotal ( getTotal() ); 

    }, [quantities]); /* If quantities change, total changes */

    function getTotal()
    {
        let workingTotal = 0;

        /* get Quantities object as list of key-value pairs */
        const quantityEntries = Object.entries(quantities); 

        for (let i = 0; i < quantityEntries.length; ++i)
        {
            const quantityInfo = quantityEntries[i];

            /* turn ID into a number, then use the get price details  */
            const { price } = getItemDetails(Number.parseInt(quantityInfo[0]));

            /* get quantity from key-value pair */
            const quantity = quantityInfo[1]

            workingTotal += quantity * price; 
        }

        return workingTotal; 
    }

    useEffect(() => 
    {

        console.log(Object.keys(quantities)); 
        setSelectedItems(Object.keys(quantities)); 

    }, [quantities]); 
    
    return (
        <CartCSS>
        
            <div className='cart-header'>
                Total: {total}
            </div>

            <div id='displayToggleContainer' onClick={() => setDisplayItems(!displayItems)}>
                <img id='displayToggle' src={displayItems? downArrow : upArrow}></img>
            </div>

            <div className='cart-items'>
                <ul>
                    {displayItems? selectedItems.map(id => <li key={id}> <CartItem {...getItemDetails(Number.parseInt(id))} quantity={quantities[id]} removeAction={() => {removeItem(Number.parseInt(id))}}/> </li> ) : <> </>}
                </ul>
            </div>

        </CartCSS>
    )
}

export default Cart; 


const CartCSS = styled.div `

    #displayToggle {
        max-width: 60px;
        max-height: 60px;
    }





`