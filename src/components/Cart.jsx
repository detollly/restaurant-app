import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CartItem from './CartItem';

function Cart({menuList, getItemDetails, quantities})
{
    const[total, setTotal] = useState(0); 

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


    return (
        <CartCSS>
            <div className='cart-header'>
                Total: {total}
            </div>

            <div className='cart-items'>
                {/* {selectedItems.forEach(item => <CartItem {...getItemDetails(item.id)} quantity={quantities[`${item.id}`]}/> )}  */}
            </div>

        </CartCSS>
    )
}

export default Cart; 

function getSum(list)
{
    let workingSum = 0;

    for (let i = 0; i < list.length; ++i)
        workingSum += list[i];

    return workingSum; 
}


const CartCSS = styled.div `







`