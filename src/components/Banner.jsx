import React from  'react'
import styled from 'styled-components'

import NavBar from './routing/NavBar';


export default function Banner()
{






    return (
        <BannerCSS>

            <div id='logo-section'>
                
            </div>

            <div id='nav-section'>
                <NavBar/>
            </div>

        </BannerCSS>
    );
}

const BannerCSS = styled.div `

    width: 100%;
    height: 15%;

    box-sizing: border-box;
    border: 1px solid purple; /* for debugging */

    display: grid;

    grid-template-columns: 25% 1fr;
    grid-template-areas: 'logo nav';


    #nav-section {
        grid-area: nav;
    }

    #logo-section {
        grid-area: logo;
    }

`
