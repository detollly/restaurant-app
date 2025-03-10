import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from "../pages/HomePage";
import OrderPage from "../pages/OrderPage";
import CheckoutPage from "../pages/CheckoutPage";
import ItemPage from "../pages/ItemPage";
import Header from "../Header";
import FeedbackPage from "../pages/FeedbackPage"

const MyRoutes = () => {
    return (
        <Router>
            <Header id='header'/>
            <Routes id='routes'>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/order" element={<OrderPage/>}/>
                <Route path="/checkout" element={<CheckoutPage/>}/>
                <Route path="/item/:itemId" element={<ItemPage/>}/> 
                <Route path="/feedback" element={<FeedbackPage/>}/>
            </Routes>

        </Router>
    );
}

export default MyRoutes;
