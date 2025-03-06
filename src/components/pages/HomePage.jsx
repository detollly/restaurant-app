import React from "react";
import styled from 'styled-components';
import { Carousel } from 'react-bootstrap';

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

                {/* Bootstrap Carousel component. Optional !!! */}

                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="../../images/image1.jpg"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>First Slide Label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="../../images/image2.jpg"
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                            <h3>Second Slide Label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="../../images/image3.jpg"
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h3>Third Slide Label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>    
            </div>      
        </HomePageCSS>

        )
} 

export default HomePage

const HomePageCSS = styled.div`

.body {
    margin: 5rem 3rem;
    background-color: transparent;
    }

`;