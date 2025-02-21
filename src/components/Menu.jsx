import React , {useEffect, useState} from "react";
import styled from 'styled-components';
import MenuItem from "./MenuItem";


const Menu = ({addItem, removeItem, getItemQuantity}) => {

    const [menuList, setMenuList] = useState([]); /* Why a useState? See [1] at end of the page */

    async function getMenuItems()
    {
        fetch('https://djevelyn.helioho.st/menu/all?key=123') /* Retrieve from API call */
        .then(response => response.json())
        .then(data => { setMenuList(data) } );
    }

    /* Adjustment made - only getMenuItems on setup or change */
    useEffect(() => 
    {
        getMenuItems(); 

    }, []);

    return(
        <MenuCSS>
            <h2> Menu Items </h2>  
            
            {menuList.map(object => <MenuItem {...object}
                addItem={() => { addItem(object.id) }}
                removeItem={() => { removeItem(object.id) }}
                getItemQuantity={ getItemQuantity(object.id) }
            />)} {/* What does this display? [2] */}
        </MenuCSS>
    )
} 

export default Menu


/* Do styling here */
/* Could sort into a grid, or a flexbox */
const MenuCSS = styled.div `

    .menuItemCards{
        display: grid; 
        grid-template-columns: 50% 50%;
        grid-template-rows: auto;
    }


`

/* List to get if you cannot connect to online database */
function getOfflineList()
{
    const backupList = [
        {id: 1, name: 'Burger', description:'Cheese Burger', price: 10.00, category: 'mains', img: ''}
    ];

    return backupList;
}


/* Notes 

[1] (Dylan) -- useState -- 

The idea behind reactive programming is that a variable can represent the end of a chain of logic.

Think about an Excel spreadsheet. You might set the values of some cells i.e. A2 = 10.
Other cells are defined with a function A3 = A1 + A2.
Changes to A1 or A2 update the value of A3 without having to manually update that variable.

Setting a useState variable is kind of the same logic.
We can define a variable - like 'menuList'.
If we use the 'setMenuList' function to change that variable it it updated !everywhere it is used! .

We use the menuList variable in the return statement - menuList.map(...).
If menu list is changed this method is recalculated - and the display will update. 
This is instead of us changing menuList, then manually running methods everywhere it is used. 

A useState variable is like a constant variable. 
You don't get a duplicate, you get a reference to the original.



[2] (Dylan) -- Mapping --

A mapping function is being performed with menuList

menuList is retrieved from 'https://djevelyn.helioho.st/menu/...'. 
It is received as as list of Javascript objects, like so:

[ {id:1, name:'Burger', description:'A cheese burger'} , {id:2, name:'Pasta', description:'Spaghetti Bolognese'} ...]

The map function for a list goes through each [element] of the list, performs a [function] on it, and 
returns a list of the results.

An example mapping could be:

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const listSquared = list.map(element => element * element); // using an arrow function*
listSquared would then be [1, 4, 9, 16 ...(etc.)]

* This is the shortned syntax for an arrow function. If you're not doing a statement across
multiple lines you can just do 'i => i * 2', which means the same thing as (i) => { return i * 2 }

A mapped list would have the same number of elements as the original list. 

So what we're doing here is taking JSON objects - {id:1, name:'Burger', description:'A cheese burger'}
And mapping them to <MenuItem> components.
These <MenuItem> components are customized by the props being passed.

The way you would do this is:

menuList.map(object => <MenuItem id={object.id} name={object.name} ../>)

but there is a shorthand - 'unpacking' the elements of object by using ...object
*/