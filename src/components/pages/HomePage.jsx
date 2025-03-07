import React from "react";
import styled from 'styled-components';

const HomePage = () => {

    return(
        <HomePageCSS>
            <div className="body">
                <h1>BioMorph Bistro</h1>
                <h2>A Culinary Illusion, Naturally Printed</h2>
                <p>Step into a world where innovation meets nature. At Biomorph Bistro, we craft delicious, 3D-printed organic meals using sustainably sourced, natural ingredients. Inspired by the intelligence of mycelium networks, our menu is designed to nourish both body and planet, offering nutrient-rich, eco-friendly cuisine that supports gut health, immunity, and sustainable living. </p>
                <p>Experience a fusion of science and flavor, where every bite is a step towards a healthier, greener future. Join us in redefining food—one biomorphic creation at a time!</p>
                <p>[placeholder for video]</p>
                <p>Explore our innovative and natural menu</p>
                <p>[placeholder for explore menu button]</p>
            </div>
            <div className="banner">    
            </div>      
        </HomePageCSS>

        )
} 

export default HomePage

const HomePageCSS = styled.div`

.body {
    margin: 10rem 3rem;
    background-color: transparent;
    }

`;