import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom' // [1]


/* This page will display the full details of a MenuItem when clicked */
export default function ItemPage()
{
    const { itemId } = useParams(); 

    const [{id, name, description, price, category, image}, setInfo] = useState([]);

    useEffect(() => 
    {
        getItemInfo(); 

    }, []); /* Get item info on first render */ 

    
    async function getItemInfo()
    {
        const response = await fetch (`https://djevelyn.helioho.st/menu/id/${itemId}`);
        const data = await response.json(); 

        setInfo(data); 
    }



    return (
        <> 
            {/* Placeholder display. This information will have to be formatted. */}

            Item {id} <br/>
            {name} <br/>
            {description} <br/>
            {price} <br/>
            {category} <br/>
            <img src={image} alt=""/> <br/>
        </>
    );

}

// Notes

/* [1] - Dylan - useParams

useParams is a hook provided by 'react-router-dom'
From it we can get the params that exist in the url.

You can give two types of parameters in a url

1)
'/info/:id' -> This defines an endpoint at page. 'id' will be available to the 'info' page as a parameter.

For example:

'www.website.com/info/3' -> This will take you to the info page of 'website', with access to '3' as a parameter.
You can commonly use this to change the contents of a page based on a page number. 

2)
Is a query parameter, i.e.

'www.website.com/profile?username=JohnDoe'

This information can also be accessed - in this case the value of 'username' can be pulled and found to be 'JohnDoe'
You could use this for specific purposes, like looking up and displaying JohnDoe's data from a database. 

*/

