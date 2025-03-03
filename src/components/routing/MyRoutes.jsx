import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from "../pages/HomePage";
import OrderPage from "../pages/OrderPage";
import CheckoutPage from "../pages/CheckoutPage";
import ItemPage from "../pages/ItemPage";
import Banner from "../Banner";

const MyRoutes = () => {
    return (
        <Router>
            <Banner/>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/order" element={<OrderPage/>}/>
                <Route path="/checkout" element={<CheckoutPage/>}/>
                <Route path="/item/:itemId" element={<ItemPage/>}/> 
            </Routes>
        </Router>
    );
}

export default MyRoutes;
