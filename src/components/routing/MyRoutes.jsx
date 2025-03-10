import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from "../pages/HomePage";
import OrderPage from "../pages/OrderPage";
import CheckoutPage from "../pages/CheckoutPage";
import ItemPage from "../pages/ItemPage";
import Header from "../Header";
import Footer from "../Footer";

const MyRoutes = () => {
    return (
        <Router>
            <Header id='header'/>
            <Routes id='routes'>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/order" element={<OrderPage/>}/>
                <Route path="/checkout" element={<CheckoutPage/>}/>
                <Route path="/item/:itemId" element={<ItemPage/>}/> 
            </Routes>
            <Footer id='footer'/>
        </Router>
    );
}

export default MyRoutes;
