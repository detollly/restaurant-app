import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from "../pages/HomePage";
import OrderPage from "../pages/OrderPage";
import CheckoutPage from "../pages/CheckoutPage";
import ItemPage from "../pages/ItemPage";
import Header from "../Header";
import BookingPage from "../pages/BookingPage";
import FeedbackPage from "../pages/FeedbackPage"

const MyRoutes = () => {
    return (
        <Router className='grid-rows-2 grid-cols-1'>
            <Header id='header'/>
            <div className='mt-24'> {/* mt-24 is Tailwind padding to match banner */}
            <Routes id='routes'> 
                <Route path="/" element={<Homepage/>}/>
                <Route path="/order" element={<OrderPage/>}/>
                <Route path="/checkout" element={<CheckoutPage/>}/>
                <Route path="/item/:itemId" element={<ItemPage/>}/> 
                <Route path="/book" element={<BookingPage/>}/>
                <Route path="/feedback" element={<FeedbackPage/>}/>
            </Routes>
            </div>
        </Router>
    );
}

export default MyRoutes;
