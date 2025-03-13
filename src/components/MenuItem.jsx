import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function MenuItem({ id, name, description, price, category, image, addItem, removeItem, getItemQuantity = 0 })
{
    const [showDescription, setShowDescription] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);

    const toggleDescription = (e) => {
      e.preventDefault();
      setShowDescription(!showDescription);
    };

    useEffect(() => {
          const handleResize = () => {
              setIsLargeScreen(window.innerWidth >= 768);
          };
  
          window.addEventListener('resize', handleResize);
  
          return () => window.removeEventListener('resize', handleResize);
      }, []);
    
    return (
      <div className="relative flex flex-col rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-1 w-full bg-white" 
           style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center', height: isLargeScreen? "420px" : "315px" }}>
        <div className="flex flex-col h-full bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4">
          <Link to={`/item/${id}`} className="flex-1 flex flex-col text-white">
            <div className="mt-auto">
              <span className="inline-block bg-yellow-500 text-black text-xs font-semibold px-2 py-1 rounded-full mb-2">
                {category}
              </span>
              <h2 className="text-xl font-bold mb-1">{name}</h2>
              <p className="text-lg font-medium">£{price.toFixed(2)}</p>
              <p className="text-sm opacity-90">Qty: {getItemQuantity}</p>
            </div>
          </Link>
          
          <button 
            onClick={toggleDescription} 
            className="mt-2 self-start px-3 py-1 text-xs border border-white/50 text-white rounded-full hover:bg-white/10 transition-colors"
          >
            {showDescription ? "Hide Details" : "Show Details"}
          </button>
          
          {showDescription && (
            <div className="mt-2 p-3 bg-white/90 backdrop-blur-sm rounded-md text-black">
              <p className="text-sm italic text-left">{description}</p>
            </div>
          )}
          
          <div className="mt-3">
            {getItemQuantity > 0 ? (
              <div className="flex items-center justify-center space-x-3">
                <button 
                  onClick={removeItem} 
                  className="w-10 h-10 flex items-center justify-center bg-white text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                >
                  <span className="text-xl">-</span>
                </button>
                <span className="text-white font-semibold">{getItemQuantity}</span>
                <button 
                  onClick={addItem} 
                  className="w-10 h-10 flex items-center justify-center bg-white text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                >
                  <span className="text-xl">+</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={addItem} 
                className="w-full py-3 bg-teal-700 text-white rounded-full hover:bg-teal-600 transition-colors font-medium"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };