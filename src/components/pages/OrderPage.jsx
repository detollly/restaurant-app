import React, { useEffect, useState } from "react";
import styled from 'styled-components'
import Menu from "../Menu";

const OrderPage = () => {

    /* The order page holds a list of all selected items as an id value*/ 
    const [selectedItems, setSelectedItems] = useState([]); 
    const [quantities, setQuantities] = useState({}); 


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

    useEffect(() => 
    {
        /* Update quantities */
        calculateQuantities(); 

    }, [selectedItems]); /* Reasoning for useEffect (see at bottom of page) [1] */

    function calculateQuantities()
    {
        /* Get unique elements in selectedItems list */
        const uniqueItems = selectedItems.filter(onlyUnique);

        /* Get count of each */
        let workingQuantities = {};

        for (let i = 0; i < uniqueItems.length; ++i)
        {
            const uniqueItem = uniqueItems[i];
            let count = 0;

            for (let j = 0; j < selectedItems.length; ++j)
            {
                const selectedItem = selectedItems[j];

                if (uniqueItem === selectedItem)
                    ++count; 
            }

            workingQuantities[`${uniqueItem}`] = count; 
        }

        console.log(JSON.stringify(workingQuantities));

        setQuantities({...workingQuantities});
    }

    function getItemQuantity(itemId)
    {
        const quantity = quantities[`${itemId}`];

        if (quantity === undefined) /* There is no quantity */
            return 0;
        else
            return quantity; 
    }

    /* ADDING AND REMOVING  (END) */











    return(
        <OrderPageCSS>

            {/* <Menu/> and <Basket/> will go here */}

            <Menu addItem={addItem} removeItem={removeItem} getItemQuantity={getItemQuantity} quantities={quantities} />
            {/* Basket will have 'removeItem' and 'getItemQuantity' */}

        </OrderPageCSS>
    )
} 

export default OrderPage


/* Adjust styles here */
const OrderPageCSS = styled.div`

    box-sizing: border-box;



`


/* Get only unique: https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates */
function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  }



/* Notes:

[1] (Dylan) -- useEffect --

The contents of a functional component are run whenever that component is rendered.

const OrderPage = () => 
{
    // The code here is run
    
    return ( 
    // then HTML (& CSS) is returned here to display it 
    )
}

Some code doesn't need to be run everytime the component is rendered.
It could be expensive (in terms of time) to do so - like making a fetch.

You can use the useEffect hook

useEffect(function, [conditions]);

Which says 'run this method only if the conditions change'.

useEffect(function, []); <- Empty conditions only runs the function once when the component is create
useEffect(function, [name]); <- Runs the function when whenever the value of name changes


The usage here in the code above is to say:

Whenever the contents of selectedItems changes, recalculate the quantities of all items. 

*/