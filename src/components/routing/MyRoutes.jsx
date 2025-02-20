import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from "./pages/HomePage";
import MenuItems from "./pages/MenuItems";
import OrderPage from "./pages/OrderPage";
import CheckoutPage from "./pages/CheckoutPage";

const MyRoutes = () => {
    return(
        <>
        <Router>
            <Routes>
                <Route path="./pages/homepage" element={<Homepage/>}/>
                <Route path="./pages/menuitems" element={<MenuItems/>}/>
                <Route path="./pages/order" element={<OrderPage/>}/>
                <Route path="./pages/checkout" element={<CheckoutPage/>}/>
            </Routes>
        </Router>
        </>
    )
}

export default MyRoutes;