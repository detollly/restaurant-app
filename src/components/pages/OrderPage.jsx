import React, { useState } from "react";
import styled from 'styled-components'
import Menu from "../Menu";

const OrderPage = () => {

    /* The order page holds a list of all selected items as an id value*/ 
    const [selectedItems, setSelectedItems] = useState([]); 


    /* These items will be passed as PROPS to each MenuItem and Basket */
    /* Menu.jsx and Basket.jsx will be children of OrderPage */


    /* ADDING AND REMOVING  (START) */
    function addItem(itemId) 
    {
        setSelectedItems([...selectedItems, itemId]);
    }

    function removeItem(itemId)
    {
        /* Get index of item ID */
        const index = selectedItems.indexOf(itemId);

        /* If missing (i.e. -1) return */
        if (index < 0)
            return;

        /* Remove entry at present index */
        let copyList = selectedItems;
        copyList.splice(index, 1); /* Remove element at index */
        setSelectedItems( [...copyList] );
    }

    function getItemQuantity(itemId)
    {
        let count = 0;

        for (let i = 0; i < selectedItems.length; ++i)
        {
            const currentId = selectedItems[i]; /* ID at current index */

            if (currentId === itemId) /* match found */
            {
                ++count; 
            }
        }

        return count; 
    }
    /* ADDING AND REMOVING  (END) */











    return(
        <OrderPageCSS>

            {/* <Menu/> and <Basket/> will go here */}
            <Menu addItem={addItem} removeItem={removeItem} getItemQuantity={getItemQuantity} />
            {/* Basket will have 'removeItem' and 'getItemQuantity' */}

        </OrderPageCSS>
    )
} 

export default OrderPage


/* Adjust styles here */
const OrderPageCSS = styled.div`

    box-sizing:







`