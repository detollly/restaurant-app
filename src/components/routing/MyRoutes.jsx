import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from "../pages/HomePage";
import OrderPage from "../pages/OrderPage";
import CheckoutPage from "../pages/CheckoutPage";
import ItemPage from "../pages/ItemPage";
import Banner from "../Banner";
import styled from 'styled-components'

const MyRoutes = () => {
    return (
        <Router>
            <MyRoutesCSS>
                <Banner id='banner'/>
                <Routes id='routes'>
                    <Route path="/" element={<Homepage/>}/>
                    <Route path="/order" element={<OrderPage/>}/>
                    <Route path="/checkout" element={<CheckoutPage/>}/>
                    <Route path="/item/:itemId" element={<ItemPage/>}/> 
                </Routes>
            </MyRoutesCSS>
        </Router>
    );
}

export default MyRoutes;

const MyRoutesCSS = styled.div `

    width: 100%; 
    height: 100%;

    display: grid; 
    grid-template-rows: 15% 1fr;

    grid-template-areas:
     'banner'
     'routes'; 

    #banner {
        grid-area: banner;
    }

    #route {
        grid-area: routes;
    }

`
