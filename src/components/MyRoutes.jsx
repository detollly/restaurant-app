import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from "./pages/HomePage";
import SecondPage from "./pages/SecondPage";

const MyRoutes = () => {
    return(
        <>
        <Router>
            <Routes>
                <Route path="./pages/HomePage" element={<Homepage/>}/>
                <Route path="./pages/SecondPage" element={<SecondPage/>}/>
            </Routes>
        </Router>
        </>
    )
}

export default MyRoutes