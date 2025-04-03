import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import video from "../videos/biomorph.mp4";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import logotr from "../../images/logotr-isolated.png";

import { BackendContext } from "../../App";


// importing all the carousel images
const carouselImages = [
  require("../carousel/pic1.jpg"),
  require("../carousel/pic2.jpg"),
  require("../carousel/pic4.webp"),
  require("../carousel/pic5.webp"),
];

const testimonialData = [
  {
    title: "Amazing Experience",
    description:
      "The 3D-printed dishes were a perfect fusion of art and taste.",
    author: "Thoria Monika",
    role: "Food Critic",
    rating: 5,
  },
  {
    title: "Revolutionary Dining",
    description:
      "Never thought sustainable food could be this exciting and delicious.",
    author: "Dylan Anatoly",
    role: "Tech Enthusiast",
    rating: 5,
  },
  {
    title: "Mind-Blowing Innovation",
    description: "Each dish tells a story through texture and flavor.",
    author: "Zakaria Janete",
    role: "Food Blogger",
    rating: 4,
  },
  {
    title: "Future of Food",
    description: "Sustainable dining redefined with cutting-edge technology.",
    author: "Prabesh",
    role: "Restaurant Reviewer",
    rating: 5,
  },
];

const StarRating = ({ rating }) => (
  <div className="star-rating">
    {[...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={index < rating ? "star filled" : "star"}
        width="16"
        height="16"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const HomePage = () => {

  const fauxFetch = useContext(BackendContext);

  const navigate = useNavigate();
  const [customerReviews, setCustomerReviews] = useState([]);

  useEffect(() => {
    fetchCustomerReviews();
  }, []);

  const fetchCustomerReviews = async () => {
    try {
      const response = await fauxFetch(
        "/menu/feedback/all"
      );
      const data = await response.json();
      const sortedReviews = data.sort((a, b) => {
        const dateComparison = new Date(b.date) - new Date(a.date);
        if (dateComparison === 0) {
          return b.rating - a.rating;
        }
        return dateComparison;
      });
      setCustomerReviews(sortedReviews);
    } catch (error) {
      console.error("Error fetching customer reviews:", error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: "0",
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <HomePageCSS>
      {/* Video Section */}
      <section className="video-section">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay">
          <img src={logotr} alt=""/>
          <h1>BioMorph Bistro</h1>
          <h2>A Culinary Illusion, Naturally Printed</h2>
          <h3>
            Step into BioMorph Bistro, where innovation meets nature with
            3D-printed organic meals, crafted from sustainably sourced
            ingredients to nourish both body and planet.
          </h3>
          <div className="button-container">
            <button
              className="explore-button"
              onClick={() => navigate("/order")}
            >
              Explore Menu
            </button>
            <button
              className="explore-button"
              onClick={() => navigate("/booking")}
            >
              Reserve Now
            </button>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="carousel-section">
        <h2 className="carousel-title">Chefs Special - Crafted with Care</h2>
        <Slider {...settings}>
          {carouselImages.map((image, index) => (
            <div key={index} className="carousel-slide">
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </section>

      {/* Testimonials Grid Section */}
      <section className="testimonials-section">
        <h2>Critics Reviews</h2>
        <div className="testimonials-grid">
          {testimonialData.map((item, index) => (
            <div key={index} className="testimonial-card">
              <h3>{item.title}</h3>
              <StarRating rating={item.rating} />
              <p className="description">{item.description}</p>
              <p className="author">{item.author}</p>
              <p className="role">{item.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="customer-reviews-section">
        <h2>And Here's What Our Customers Think</h2>
        <div className="reviews-grid">
          {customerReviews.length > 0 ? (
            customerReviews.slice(0, 6).map((review, index) => (
              <div key={index} className="review-card">
                <StarRating rating={Number(review.rating)} />
                <p className="review-text">{review.comments}</p>
                <div className="review-footer">
                  <div className="footer-left">
                    <p className="reviewer-name">{review.customer_name}</p>
                    <p className="visit-date">
                      Visited:{" "}
                      {new Date(review.visit_date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-reviews-message">
              No customer reviews yet. Be the first to share your experience!
            </div>
          )}
        </div>
      </section>
    </HomePageCSS>
  );
};

export default HomePage;

const HomePageCSS = styled.div`
  .video-section {
    position: relative;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }

  .hero-video {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    text-align: center;
    color: white;
  }

  .overlay img {
    width: 10%;
    height: auto; 
  }

  .overlay h1 {
    margin-bottom: 1rem;
    font-size: 6rem;
    font-weight: 200;
    letter-spacing: 0.2em;

    @media (max-width: 768px) {
      font-size: 3.5rem;
      letter-spacing: 0.15em;
    }

    @media (max-width: 480px) {
      font-size: 2.8rem;
      letter-spacing: 0.2em;
      word-spacing: 0.2em;
      padding: 0 0.5rem;
    }
  }

  .overlay h2 {
    margin-bottom: 1rem;
    font-size: 2rem;
    font-weight: 300;
    letter-spacing: 0.1em;

    @media (max-width: 768px) {
      font-size: 1.75rem;
      letter-spacing: 0.08em;
    }

    @media (max-width: 480px) {
      font-size: 1.5rem;
      letter-spacing: 0.1em;
      padding: 0 1rem;
    }
  }

  .overlay h3 {
    margin-top: 1rem;
    max-width: 48rem;
    font-size: 1.125rem;
    font-weight: 300;
    letter-spacing: 0.05em;

    @media (max-width: 768px) {
      font-size: 1.1rem;
      max-width: 90%;
      margin: 1rem auto;
      letter-spacing: 0.05em;
    }

    @media (max-width: 480px) {
      font-size: 1rem;
      max-width: 95%;
      padding: 0 1rem;
      line-height: 1.6;
    }
  }

  .button-container {
    display: flex;
    gap: 2rem;
    margin-top: 2rem;

    @media (max-width: 480px) {
      flex-direction: column;
      gap: 1rem;
      width: 80%;
    }
  }

  .explore-button {
    margin-top: 0; // Override the previous margin-top
    padding: 1rem 2.5rem;
    font-size: 1.125rem;
    font-weight: 300;
    letter-spacing: 0.1em;
    color: white;
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    z-index: 1;

    &:before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0%;
      background: #5e7269;
      transition: height 0.3s ease;
      z-index: -1;
    }

    &:hover {
      border-color: #5e7269;
      transform: translateY(-2px);
      box-shadow: 0 0 20px rgba(94, 114, 105, 0.6);

      &:before {
        height: 100%;
      }
    }
  }

  .carousel-section {
    position: relative;
    padding: 4rem 0;
    background: linear-gradient(
      to bottom,
      white,
      rgba(167, 196, 179, 0.1),
      white
    );

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        to bottom,
        rgba(94, 114, 105, 0.05),
        rgba(167, 196, 179, 0.08),
        rgba(94, 114, 105, 0.05)
      );
      pointer-events: none;
    }

    .carousel-title {
      text-align: center;
      font-size: 2.8rem; // Updated from 2.2rem to match other section titles
      font-weight: 200;
      color: #5e7269;
      margin-bottom: 4rem; // Increased from 2.5rem to match other sections
      letter-spacing: 0.15em; // Updated from 0.08em to match other sections
      position: relative;

      &:after {
        content: "";
        position: absolute;
        bottom: -15px; // Adjusted from -12px to match other sections
        left: 50%;
        transform: translateX(-50%);
        width: 60px; // Increased from 40px to match other sections
        height: 2px; // Increased from 1px to match other sections
        background-color: #5e7269;
      }

      @media (max-width: 768px) {
        font-size: 1.8rem;
      }
    }

    .carousel-slide {
      position: relative;
      z-index: 1;
      height: 50vh;
      padding: 0 1rem;
      opacity: 0.6; // Changed from 0.8 to 0.6
      transition: all 0.3s ease;
      transform: scale(0.85); // Smaller initial scale for side images

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 4px; // Reduced from 10px
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
    }

    .slick-center .carousel-slide {
      opacity: 1;
      transform: scale(1.2); // Increased from 1.05
    }

    .slick-dots {
      bottom: -2.5rem;

      li button:before {
        color: #819d8d;
      }

      li.slick-active button:before {
        color: #5e7269;
      }
    }

    .slick-prev,
    .slick-next {
      z-index: 1;
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.1) !important;
      backdrop-filter: blur(4px);
      border-radius: 50%;
      transition: all 0.3s ease;

      &:before {
        color: #5e7269;
        font-size: 24px;
        opacity: 0.8;
        transition: opacity 0.3s ease;
      }

      &:hover {
        background: rgba(255, 255, 255, 0.2) !important;

        &:before {
          opacity: 1;
        }
      }
    }

    .slick-prev {
      left: 25px;
    }

    .slick-next {
      right: 25px;
    }
  }

  .testimonials-section {
    position: relative;
    background: #819d8d;
    padding: 4rem 2rem;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        135deg,
        rgba(129, 157, 141, 0.95),
        rgba(108, 136, 120, 0.97)
      );
    }

    h2 {
      text-align: center;
      font-size: 2.8rem;
      font-weight: 200;
      color: #ffffff;
      margin-bottom: 4rem;
      letter-spacing: 0.15em;
      position: relative;

      &:after {
        content: "";
        position: absolute;
        bottom: -15px;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 2px;
        background-color: #ffffff;
      }
    }
  }

  .testimonials-grid {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .testimonial-card {
    text-align: center;
    background: rgba(255, 255, 255, 0.08);
    padding: 2rem;
    border-radius: 10px;
    transition: all 0.3s ease;
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(8px);
    box-shadow: 0 4px 6px rgba(74, 94, 85, 0.15),
      0 0 15px rgba(129, 157, 141, 0.15);

    &:hover {
      transform: translateY(-5px);
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.25);
      box-shadow: 0 8px 20px rgba(74, 94, 85, 0.25),
        0 0 30px rgba(129, 157, 141, 0.35);
      animation: cardGlow 2s ease-in-out infinite alternate;
    }

    @keyframes cardGlow {
      from {
        box-shadow: 0 8px 20px rgba(74, 94, 85, 0.25),
          0 0 30px rgba(129, 157, 141, 0.35);
      }
      to {
        box-shadow: 0 8px 25px rgba(74, 94, 85, 0.3),
          0 0 40px rgba(129, 157, 141, 0.4), 0 0 50px rgba(129, 157, 141, 0.25);
      }
    }

    .star-rating {
      display: flex;
      justify-content: center;
      gap: 0.25rem;
      margin: 0.5rem 0 1rem;

      .star {
        fill: rgba(255, 217, 0, 0.4); // Changed to yellow with opacity

        &.filled {
          fill: #ffd700; // Changed to gold
        }
      }
    }

    h3 {
      color: #ffffff;
      font-size: 1.5rem;
      margin-bottom: 1rem;
      font-weight: 200;
      letter-spacing: 0.2em;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .description {
      color: #ffffff;
      margin-bottom: 1.5rem;
      line-height: 1.6;
      font-weight: 300;
    }

    .author {
      color: #ffffff;
      font-weight: 300;
      margin-bottom: 0.25rem;
      letter-spacing: 0.1em;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .role {
      color: rgba(255, 255, 255, 0.9);
      font-size: 0.875rem;
      font-weight: 300;
    }
  }

  .customer-reviews-section {
    padding: 6rem 2rem;
    background: linear-gradient(to bottom, #f8f9fa, #fff);

    h2 {
      text-align: center;
      font-size: 2.8rem;
      font-weight: 200;
      color: #5e7269;
      margin-bottom: 4rem;
      letter-spacing: 0.15em;
      position: relative;

      &:after {
        content: "";
        position: absolute;
        bottom: -15px;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 2px;
        background-color: #5e7269;
      }
    }

    .reviews-grid {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2.5rem;
      align-items: stretch;
      padding: 0 1rem;
    }

    .review-card {
      background: white;
      padding: 2.5rem;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(94, 114, 105, 0.1);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      display: flex;
      flex-direction: column;
      border: 1px solid rgba(94, 114, 105, 0.1);

      .star-rating {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        margin-bottom: 1.5rem;

        svg {
          width: 26px;
          height: 26px;
          flex-shrink: 0;

          &.star {
            fill: rgba(255, 217, 0, 0.15);
          }

          &.filled {
            fill: #ffd700;
            filter: drop-shadow(0 2px 4px rgba(255, 215, 0, 0.2));
          }
        }
      }

      .review-text {
        margin: 1rem 0;
        color: #2c3e50;
        line-height: 1.8;
        font-style: italic;
        font-size: 1.1rem;
        flex-grow: 1;
        position: relative;
        padding: 0 0.5rem; // Changed from padding-left
      }

      .review-footer {
        margin-top: auto;
        padding-top: 1.5rem;
        border-top: 1px solid rgba(94, 114, 105, 0.1);

        .footer-left {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .reviewer-name {
          color: #5e7269;
          font-weight: 600;
          font-size: 1.2rem;
          letter-spacing: 0.05em;
        }

        .visit-date {
          color: #94a3b8;
          font-size: 0.9rem;
          font-style: italic;
          letter-spacing: 0.03em;
        }
      }

      &:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(94, 114, 105, 0.15);
        border-color: rgba(94, 114, 105, 0.2);
      }
    }

    .no-reviews-message {
      grid-column: 1 / -1;
      text-align: center;
      padding: 4rem;
      font-size: 1.3rem;
      color: #5e7269;
      font-style: italic;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(94, 114, 105, 0.1);
      border: 1px solid rgba(94, 114, 105, 0.1);
      max-width: 800px;
      margin: 2rem auto;
    }
  }
`;
