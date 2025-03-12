import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


// Mock data for available tables
const mockTableData = {
  // Each day has available tables for different time slots
  // Format: { date: { timeSlot: availableTables } }
  "2025-03-10": {
    "18:00": 8,
    "20:30": 5,
  },
  "2025-03-11": {
    "18:00": 10,
    "20:30": 7,
  },
  "2025-03-12": {
    "18:00": 6,
    "20:30": 4,
  },
  "2025-03-13": {
    "18:00": 9,
    "20:30": 6,
  },
  "2025-03-14": {
    "18:00": 12,
    "20:30": 8,
    "21:00": 5,
  },
  "2025-03-15": {
    "18:00": 15,
    "20:00": 10,
    "22:00": 7,
  },
  "2025-03-16": {
    "18:00": 15,
    "20:00": 10,
    "22:00": 7,
  },
};

// Helper function to get day of week
const getDayOfWeek = (dateString) => {
  const date = new Date(dateString);
  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6 ? "weekend" : "weekday";
};

// Helper function to generate time slots based on day of week
const generateTimeSlots = (dateString) => {
  const dayType = getDayOfWeek(dateString);
  
  if (dayType === "weekend") {
    return ["18:00", "20:00", "22:00"]; // 2-hour slots on weekends
  } else {
    return ["18:00", "20:30"]; // 2.5-hour slots on weekdays
  }
};

// Helper function to calculate tables needed
const calculateTablesNeeded = (partySize) => {
  return Math.ceil(partySize / 4); // Each table seats 4 people
};

// Helper function to check if tables are available
const areTablesAvailable = (date, time, tablesNeeded) => {
  if (!mockTableData[date] || !mockTableData[date][time]) {
    return false;
  }
  return mockTableData[date][time] >= tablesNeeded;
};

const BookingPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    partySize: 2,
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
    cateringRequest: false,
    joinWaitlist: false,
    acceptedTerms: false,
  });
  
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [tablesNeeded, setTablesNeeded] = useState(1);
  const [tablesAvailable, setTablesAvailable] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  
  // Set minimum date to today
  const today = new Date().toISOString().split("T")[0];
  
  // Update available time slots when date changes
  useEffect(() => {
    if (formData.date) {
      setAvailableTimeSlots(generateTimeSlots(formData.date));
      // Reset time when date changes
      setFormData(prev => ({...prev, time: ""}));
    }
  }, [formData.date]);
  
  // Update tables needed when party size changes
  useEffect(() => {
    const tables = calculateTablesNeeded(formData.partySize);
    setTablesNeeded(tables);
    
    // Check if tables are available
    if (formData.date && formData.time) {
      const available = areTablesAvailable(formData.date, formData.time, tables);
      setTablesAvailable(available);
    }
  }, [formData.partySize, formData.date, formData.time]);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    
    // Clear error when field is updated
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.date) errors.date = "Please select a date";
    if (!formData.time) errors.time = "Please select a time";
    if (!formData.name.trim()) errors.name = "Name is required";
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    // UK Phone validation
    const ukPhoneRegex = /^(?:(?:\+44\s?|0)7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/;
    if (!formData.phone.trim() || !ukPhoneRegex.test(formData.phone)) {
      errors.phone = "Please enter a valid UK mobile number (e.g., 07123 456 789 or +44 7123 456 789)";
    }
    
    // Terms and conditions validation
    if (!formData.acceptedTerms) {
      errors.acceptedTerms = "You must accept the terms and conditions";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Modal state for booking confirmation
  const [showModal, setShowModal] = useState(false);
  
  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setBookingConfirmed(true);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitted(true);
      
      // Simulate API call with timeout
      setTimeout(() => {
        setShowModal(true);
        // In a real app, this would be an API call to save the booking
        console.log("Booking submitted:", formData);
      }, 1500);
    }
  };
  
  // Reset form
  const handleReset = () => {
    setFormData({
      date: "",
      time: "",
      partySize: 2,
      name: "",
      email: "",
      phone: "",
      specialRequests: "",
      cateringRequest: false,
      joinWaitlist: false,
      acceptedTerms: false,
    });
    setFormErrors({});
    setIsSubmitted(false);
    setBookingConfirmed(false);
  };
  
  // Return to home
  const handleReturnHome = () => {
    navigate("/");
  };
  
  return (
    <BookATableCSS>
      <div id='header'>
        <h1>Reserve Your Experience</h1>
      </div>
      
      <div className="bg-gradient-to-br from-[#f5f7f6] to-[#e8efeb] py-15 px-4 pt-10">
      <div className="max-w-2xl mx-auto bg-white/90 rounded-xl shadow-xl backdrop-blur-sm border border-white/20 p-8 md:p-10">
        
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="bg-white/70 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-light tracking-wide text-[#73A19E] mb-4 pb-2 border-b border-[#73A19E]/20">
                Select Date & Time
              </h2>
              <p className="text-sm text-gray-600 mb-4 italic">
                Time slots are {getDayOfWeek(formData.date) === "weekend" ? "2 hours" : "2.5 hours"} in duration
                {formData.date ? ` on ${new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long' })}s` : ""}
              </p>
              
              <div className="mb-5">
                <label htmlFor="date" className="block mb-2 font-normal text-[#73A19E]">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  min={today}
                  value={formData.date}
                  onChange={handleChange}
                  className={`w-full p-3 border ${formErrors.date ? 'border-red-500' : 'border-[#73A19E]/30'} rounded-md bg-white/80 text-base transition-all focus:outline-none focus:border-[#73A19E] focus:ring-2 focus:ring-[#73A19E]/20`}
                />
                {formErrors.date && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {formErrors.date}
                  </span>
                )}
              </div>
              
              <div className="mb-5">
                <label htmlFor="time" className="block mb-2 font-normal text-[#73A19E]">
                  Time
                </label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  disabled={!formData.date}
                  className={`w-full p-3 border ${formErrors.time ? 'border-red-500' : 'border-[#73A19E]/30'} rounded-md bg-white/80 text-base transition-all focus:outline-none focus:border-[#73A19E] focus:ring-2 focus:ring-[#73A19E]/20 ${!formData.date ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  <option value="">Select a time</option>
                  {availableTimeSlots.map(time => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                {formErrors.time && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {formErrors.time}
                  </span>
                )}
              </div>
              
              <div className="mb-5">
                <label htmlFor="partySize" className="block mb-2 font-normal text-[#73A19E]">
                  Number of Guests
                </label>
                <input
                  type="number"
                  id="partySize"
                  name="partySize"
                  min="1"
                  max="20"
                  value={formData.partySize}
                  onChange={handleChange}
                  className="w-full p-3 border border-[#73A19E]/30 rounded-md bg-white/80 text-base transition-all focus:outline-none focus:border-[#73A19E] focus:ring-2 focus:ring-[#73A19E]/20"
                />
                <span className="text-sm text-gray-600 mt-2 block">
                  {tablesNeeded > 1 
                    ? `${tablesNeeded} tables will be combined for your party` 
                    : "1 table will be reserved for your party"}
                </span>
              </div>
              
              {!tablesAvailable && formData.date && formData.time && (
                <div className="bg-amber-50/50 rounded-md p-4 mt-4 border-l-3 border-amber-500">
                  <p className="text-amber-800 mb-3">
                    We're sorry, but we don't have enough tables available for your party at this time.
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="joinWaitlist"
                      name="joinWaitlist"
                      checked={formData.joinWaitlist}
                      onChange={handleChange}
                      className="h-4 w-4 text-[#73A19E] focus:ring-[#73A19E]/20"
                    />
                    <label htmlFor="joinWaitlist" className="text-amber-800">
                      Join our waitlist and we'll notify you if a table becomes available
                    </label>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-white/70 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-light tracking-wide text-[#73A19E] mb-4 pb-2 border-b border-[#73A19E]/20">
                Your Information
              </h2>
              
              <div className="mb-5">
                <label htmlFor="name" className="block mb-2 font-normal text-[#73A19E]">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-3 border ${formErrors.name ? 'border-red-500' : 'border-[#73A19E]/30'} rounded-md bg-white/80 text-base transition-all focus:outline-none focus:border-[#73A19E] focus:ring-2 focus:ring-[#73A19E]/20`}
                />
                {formErrors.name && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {formErrors.name}
                  </span>
                )}
              </div>
              
              <div className="mb-5">
                <label htmlFor="email" className="block mb-2 font-normal text-[#73A19E]">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 border ${formErrors.email ? 'border-red-500' : 'border-[#73A19E]/30'} rounded-md bg-white/80 text-base transition-all focus:outline-none focus:border-[#73A19E] focus:ring-2 focus:ring-[#73A19E]/20`}
                />
                {formErrors.email && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {formErrors.email}
                  </span>
                )}
              </div>
              
              <div className="mb-5">
                <label htmlFor="phone" className="block mb-2 font-normal text-[#73A19E]">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="For SMS confirmation"
                  className={`w-full p-3 border ${formErrors.phone ? 'border-red-500' : 'border-[#73A19E]/30'} rounded-md bg-white/80 text-base transition-all focus:outline-none focus:border-[#73A19E] focus:ring-2 focus:ring-[#73A19E]/20`}
                />
                {formErrors.phone && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {formErrors.phone}
                  </span>
                )}
              </div>
            </div>
            
            <div className="bg-white/70 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-light tracking-wide text-[#73A19E] mb-4 pb-2 border-b border-[#73A19E]/20">
                Special Requests
              </h2>
              
              <div className="mb-5">
                <label htmlFor="specialRequests" className="block mb-2 font-normal text-[#73A19E]">
                  Dietary Preferences or Seating Requests
                </label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  placeholder="Tell us about any dietary restrictions or seating preferences..."
                  rows="3"
                  className="w-full p-3 border border-[#73A19E]/30 rounded-md bg-white/80 text-base transition-all focus:outline-none focus:border-[#73A19E] focus:ring-2 focus:ring-[#73A19E]/20 resize-y"
                />
              </div>
              
            <div className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  id="cateringRequest"
                  name="cateringRequest"
                  checked={formData.cateringRequest}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#73A19E] focus:ring-[#73A19E]/20"
                />
                <label htmlFor="cateringRequest" className="text-gray-700">
                  I'm interested in off-site catering for a private function
                </label>
              </div>
            </div>
            
            <div className="bg-white/70 rounded-lg p-6 shadow-sm mt-6">
              <div className="flex items-start gap-2 mt-4">
                <input
                  type="checkbox"
                  id="acceptedTerms"
                  name="acceptedTerms"
                  checked={formData.acceptedTerms}
                  onChange={handleChange}
                  className={`h-4 w-4 mt-1 text-[#73A19E] focus:ring-[#73A19E]/20 ${formErrors.acceptedTerms ? 'border-red-500' : ''}`}
                />
                <div>
                  <label htmlFor="acceptedTerms" className="text-gray-700">
                    I accept the <a href="#" className="text-[#73A19E] underline">terms and conditions</a>
                  </label>
                  {formErrors.acceptedTerms && (
                    <span className="text-red-500 text-sm mt-1 block">
                      {formErrors.acceptedTerms}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button 
                type="submit" 
                className={`booking-button ${(!tablesAvailable && !formData.joinWaitlist) ? 'opacity-60 cursor-not-allowed' : ''}`}
                disabled={!tablesAvailable && !formData.joinWaitlist}
              >
                {tablesAvailable ? "Book Your Table" : "Join Waitlist"}
              </button>
              <button 
                type="button" 
                className="py-3 px-6 rounded-md text-base font-normal tracking-wide text-[#73A19E] bg-transparent border border-[#73A19E] transition-all hover:bg-[#73A19E]/10"
                onClick={handleReset}
              >
                Reset Form
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mt-6 text-center italic">
              Note: Your reservation request will be reviewed by our staff. 
              You will receive an SMS confirmation once your booking is approved.
            </p>
          </form>
        ) : (
          <div className="text-center">
            {!bookingConfirmed ? (
              <div className="flex flex-col items-center justify-center p-8">
                <div className="w-12 h-12 border-3 border-[#73A19E]/30 border-t-[#73A19E] rounded-full animate-spin mb-4"></div>
                <p className="text-gray-700">Processing your request...</p>
              </div>
            ) : (
              <>
                <div className="bg-emerald-50/60 rounded-lg p-8 mb-8">
                  <h2 className="text-3xl font-light tracking-wide text-[#73A19E] mb-4">
                    {tablesAvailable 
                      ? "Reservation Request Received" 
                      : "You've Been Added to Our Waitlist"}
                  </h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {tablesAvailable 
                      ? `Thank you for your reservation request, ${formData.name}. Our team will review your request and send a confirmation to your mobile number.` 
                      : `Thank you for joining our waitlist, ${formData.name}. We'll notify you via SMS if a table becomes available for your party.`}
                  </p>
                  
                  <div className="bg-white rounded-md p-6 my-6 text-left shadow-sm">
                    <h3 className="text-xl font-normal text-[#73A19E] mb-4">Your Details</h3>
                    <ul className="space-y-3">
                      <li><span className="font-semibold">Date:</span> {new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</li>
                      <li><span className="font-semibold">Time:</span> {formData.time}</li>
                      <li><span className="font-semibold">Party Size:</span> {formData.partySize} people</li>
                      <li><span className="font-semibold">Contact:</span> {formData.phone}</li>
                      {formData.specialRequests && (
                        <li><span className="font-semibold">Special Requests:</span> {formData.specialRequests}</li>
                      )}
                      {formData.cateringRequest && (
                        <li><span className="font-semibold">Catering:</span> Interested in off-site catering</li>
                      )}
                    </ul>
                  </div>
                  
                  <p className="text-gray-600 italic">
                    A member of our team will be in touch shortly to confirm your reservation.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    className="make-another-button"
                    onClick={handleReset}
                  >
                    Make Another Reservation
                  </button>
                  <button 
                    className="return-home-button"
                    onClick={handleReturnHome}
                  >
                    Return to Home
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      </div>
      
      {/* Booking Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Booking Confirmation</h2>
              <button className="close-button" onClick={handleCloseModal}>×</button>
            </div>
            <div className="modal-body">
              <p>
                Thank you for your booking request. We will shortly send you a confirmation via text message and email.
                Please have one of these available on your arrival.
              </p>
            </div>
            <div className="modal-footer">
              <button className="confirm-button" onClick={handleCloseModal}>
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </BookATableCSS>
  );
};

export default BookingPage;

const BookATableCSS = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    margin: 10rem auto 5rem auto;
    width: 45%; 
    max-width: 1200px;
    min-height: calc(100vh - 10rem - 10rem);
    overflow: hidden;
    background-color: #FAF9F6;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    #header {
        text-align: center;
        
        h1 {
            font-size: 2em;
            color: #333;
            background-color: #eff3f1;
        }
    }
    
    h2, h3 {
        font-size: 1.5em; 
        color: #333;
    }
    
    .booking-button, .make-another-button, .return-home-button, .confirm-button {
        padding: 10px 20px;
        background-color: #73A19E;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 1em;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
            background-color: rgb(83, 121, 117);
        }
    }
    
    .return-home-button {
        background-color: transparent;
        color: #73A19E;
        border: 1px solid #73A19E;
        
        &:hover {
            background-color: rgba(115, 161, 158, 0.1);
        }
    }

    /* Modal Styles */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal-content {
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        width: 400px;
        max-width: 90%;
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
        
        h2 {
            font-size: 1.5em;
            margin: 0;
        }
        
        .close-button {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
        }
    }

    .modal-body {
        margin-bottom: 20px;
    }

    .modal-footer {
        display: flex;
        justify-content: flex-end;
    }

    .confirm-button {
        background-color: #73A19E;
        
        &:hover {
            background-color: rgb(83, 121, 117);
        }
    }
    
    // Display on mobile
    @media (max-width: 768px) {
        width: 90%;
        margin: 8rem auto 4rem auto;

        #header {
          
          h1 {
              font-size: 1em;
              background-color: #eff3f1;
          }
        }

        h2, h3 {
          font-size: 1em; 
        }
        
        .flex-col {
            flex-direction: column;
        }
        
        button {
            width: 100%;
        }
    }
`;