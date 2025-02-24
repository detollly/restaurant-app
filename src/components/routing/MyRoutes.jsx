import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "./NavBar";
import Homepage from "../pages/HomePage";
import OrderPage from "../pages/OrderPage";
import CheckoutPage from "../pages/CheckoutPage";

const MyRoutes = () => {
    return (
        <Router>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/order" element={<OrderPage/>}/>
                <Route path="/checkout" element={<CheckoutPage/>}/>
            </Routes>
        </Router>
    );
}

export default MyRoutes;
