import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from "../pages/HomePage";
import OrderPage from "../pages/OrderPage";
import CheckoutPage from "../pages/CheckoutPage";
import ItemPage from "../pages/ItemPage";
import Header from "../Header";
import BookATable from "../pages/BookATable";

const MyRoutes = () => {
    return (
        <Router>
            <Header id='header'/>
            <Routes id='routes'>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/order" element={<OrderPage/>}/>
                <Route path="/checkout" element={<CheckoutPage/>}/>
                <Route path="/item/:itemId" element={<ItemPage/>}/> 
                <Route path="/book" element={<BookATable/>}/>
            </Routes>
        </Router>
    );
}

export default MyRoutes;
