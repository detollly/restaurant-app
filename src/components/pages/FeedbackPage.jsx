import React, { useState } from 'react';

function FeedbackPage() {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <form action="http://djevelyn.helioho.st/menu/feedback/add" method="POST" className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-indigo-800 mb-8">Share Your Dining Experience</h2>

        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name:</label>
          <input 
            type="text" 
            id="name" 
            name="customer_name" 
            required 
            className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          /> 
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address:</label>
          <input 
            type="email" 
            id="email" 
            name="customer_email" 
            className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating:</label>
          <select 
            id="rating" 
            name="rating" 
            required 
            className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          >
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Very Good</option>
            <option value="3">3 - Good</option>
            <option value="2">2 - Fair</option>
            <option value="1">1 - Poor</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="comments" className="block text-sm font-medium text-gray-700">Comments:</label>
          <textarea 
            id="comments" 
            name="comments" 
            rows="4" 
            className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-y"
          ></textarea>
        </div>

        <div className="space-y-2">
          <label htmlFor="visit_date" className="block text-sm font-medium text-gray-700">Date of Visit:</label>
          <input 
            type="date" 
            id="visit_date" 
            name="visit_date" 
            className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
        </div>

        <div className="pt-4">
          <button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-black font-bold py-3 px-6 rounded-md shadow transition-colors duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
}

export default FeedbackPage;