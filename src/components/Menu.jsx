import React , {useState} from "react";
import styled from 'styled-components';
import MenuItem from "./MenuItem";


const Menu = ({addItem, removeItem, getItemQuantity}) => {

    const [menuList, setMenuList] = useState([]); 

    async function getMenuItems()
    {
        fetch('https://djevelyn.helioho.st/menu/all') /* Retrieve from database call */
        .then(response => response.json())
        .then(data => { setMenuList(data) } );
    }

    getMenuItems(); 

    return(
        <MenuCSS>
            <h2> Menu Items </h2>

            {/* NOTE: */}
            {/* Map menuList to items. {...i} opens the item to just be {i.id, i.name ...} */}
            {/* Otherwise would read as (i => MenuItem id={i.id} name={i.name} ...) */}

            {menuList.map(i => <MenuItem {...i} />)} 

        </MenuCSS>
    )
} 

export default Menu


/* Do styling here */
/* Could sort into a grid, or a flexbox */
const MenuCSS = styled.div `




`