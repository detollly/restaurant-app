import React , {useState} from "react";
import styled from 'styled-components';

const MenuItems = () => {

    /* */

    let menu;

    async function getMenuItems()
    {
        fetch('https://djevelyn.helioho.st/menu/all')
        .then(response => response.json())
        .then(data => { menu = data; } );


        for (let i = 0; i < menu.length; ++i)
        {
            //<Component id={menu[i].id} name={menu[i].name}/> 
        }
    }


    
    const Menu = [
        { id: 1, name: '', description: '.' },
        { id: 2, name: '', description: '.' },
        { id: 3, name: '', description: '.' },
        { id: 4, name: '', description: '.' },
        { id: 5, name: '', description: '.' },
      ];

    return(
        <>
        <h1>Menu Items</h1>
        </>
    )
} 

export default MenuItems