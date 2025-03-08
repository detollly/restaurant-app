import React from "react";
import styled from "styled-components";
import video from "../videos/biomorph.mp4";

const HomePage = () => {
  return (
    <HomePageCSS>
      {/* Video Hero Section */}
      <section className="video-section">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay">
          <h1>BioMorph Bistro</h1>
          <h2>A Culinary Illusion, Naturally Printed</h2>
        </div>
      </section>

      <div className="body">
        <p>
          Step into a world where innovation meets nature. At Biomorph Bistro,
          we craft delicious, 3D-printed organic meals using sustainably
          sourced, natural ingredients. Inspired by the intelligence of mycelium
          networks, our menu is designed to nourish both body and planet,
          offering nutrient-rich, eco-friendly cuisine that supports gut health,
          immunity, and sustainable living.{" "}
        </p>
        <p>
          Experience a fusion of science and flavor, where every bite is a step
          towards a healthier, greener future. Join us in redefining food—one
          biomorphic creation at a time!
        </p>
        <p>[placeholder for video]</p>
        <p>Explore our innovative and natural menu</p>
        <p>[placeholder for explore menu button]</p>
      </div>
      <div className="banner"></div>
    </HomePageCSS>
  );
};

export default HomePage;

const HomePageCSS = styled.div`
  .video-section {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  .hero-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    text-align: center;
  }

  h1 {
    font-size: 4rem;
    font-weight: 200;
    margin-bottom: 1rem;
    letter-spacing: 0.2em;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 300;
    letter-spacing: 0.1em;
  }

  .body {
    margin: 10rem 3rem;
  }
`;
