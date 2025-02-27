import React, { useEffect, useState } from "react";
import styled from 'styled-components'
import Menu from "../Menu";

const OrderPage = () => {

    /* The order page holds a list of all selected items as an id value*/ 
    const [selectedItems, setSelectedItems] = useState([]); 
    const [quantities, setQuantities] = useState({}); 
    const [cartLoadAttempted, setCartLoadAttempted] = useState(false); 


    /* Load cart values */
    useEffect(() =>
    {
        const cart = localStorage.getItem('cart')
        
        if (cart !== undefined && Object.keys(quantities).length == 0)
        {
            /* Set starting values */
            const cartSelectedItems = getSelectedItemsFromQuantities( cart );
            console.log(`cartSelectedItems = ${cartSelectedItems}`); 

            setSelectedItems( [...cartSelectedItems] );   
            
            /* set - as useState is asyncronous */
            const workingQuantities = calculateQuantities(cartSelectedItems); 
            localStorage.setItem('cart',  JSON.stringify(workingQuantities) ); 
        }

        setCartLoadAttempted(true); 

    }, []);

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
        if (cartLoadAttempted === false)
            return; 

        /* update quantities */
        calculateQuantities(selectedItems); 

    }, [selectedItems]); /* Reasoning for useEffect (see at bottom of page) [1] */

    useEffect(() => 
    {
        if (cartLoadAttempted === false)
            return; 

        localStorage.setItem('cart',  JSON.stringify(quantities) ); 

    }, [quantities]);

    function calculateQuantities(givenSelectedItems)
    {
        /* Get unique elements in selectedItems list */
        const uniqueItems = givenSelectedItems.filter(onlyUnique);

        /* Get count of each */
        let workingQuantities = {};

        for (let i = 0; i < uniqueItems.length; ++i)
        {
            const uniqueItem = uniqueItems[i];
            let count = 0;

            for (let j = 0; j < givenSelectedItems.length; ++j)
            {
                const selectedItem = givenSelectedItems[j];

                if (uniqueItem === selectedItem)
                    ++count; 
            }

            workingQuantities[`${uniqueItem}`] = count; 
        }

        console.log(JSON.stringify(workingQuantities));

        setQuantities({...workingQuantities});
        return { ...workingQuantities};
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


function getSelectedItemsFromQuantities(quantities)
{
    const objectQuantities = JSON.parse(quantities); 
    const entries = objectQuantities === undefined? [] : Object.entries(objectQuantities);
    let workingSelectedItems = [];

    entries.forEach(entry => 
    {
        const id = Number.parseInt(entry[0]);
        const amount = entry[1];

        for (let i = 0; i < amount; ++i)
            workingSelectedItems.push(id);
    });

    return workingSelectedItems; 
}


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