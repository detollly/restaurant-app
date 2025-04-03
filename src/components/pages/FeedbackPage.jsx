import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { BackendContext } from '../../App';

function FeedbackPage() {

  const fauxFetch = useContext(BackendContext); 

  const [formData, setFormData] = useState({customer_name: '', customer_email: '', rating: '', comments: '', visit_date: ''}); 

  // 0 no submission, 1 successful submission, -1 failed submission
  const [submitState, setSubmitState] = useState(0);

  const submitFeedback = (event) => {
    event.preventDefault(); /* Prevent from going to HTTP response with page reload */

    fauxFetch('/menu/feedback/add', 
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      }
    )
    .then(response => {
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      else
        
      setSubmitState(1); 
    })
    .catch(err => {
      setSubmitState(-1);
      console.log(`Error: ${err.message}`); 
    });
  }

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  if (submitState === 1) {
    return (
      <FeedbackPageCSS>
        <div className='flex-center'>
          <h1>Thanks for your feedback!</h1>
        </div>
      </FeedbackPageCSS>
    )
  } else if (submitState === -1) {
    return (
      <FeedbackPageCSS>
        <div className='flex-center'>
          <h1>There was an error submitting feedback. Refresh page to try again.</h1>
        </div>
      </FeedbackPageCSS>
    )
  }

  return (
    <FeedbackPageCSS>
      <div id='header'>
        <h1>Share Your Dining Experience</h1>
      </div>

      <div id='feedbackSection'>
        <div id='container'>
          <form onSubmit={submitFeedback} method="POST">
            <div className="form-group">
              <label htmlFor="name">Your Name:</label>
              <input 
                type="text" 
                id="name" 
                name="customer_name" 
                onChange={handleChange}
                required 
              /> 
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address:</label>
              <input 
                type="email" 
                id="email" 
                name="customer_email" 
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="rating">Rating:</label>
              <select 
                id="rating" 
                name="rating" 
                onChange={handleChange}
                required 
              >
                <option value="">Select a rating</option>
                <option value={5}>5 - Excellent</option>
                <option value={4}>4 - Very Good</option>
                <option value={3}>3 - Good</option>
                <option value={2}>2 - Fair</option>
                <option value={1}>1 - Poor</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="comments">Comments:</label>
              <textarea 
                id="comments" 
                name="comments" 
                rows="4"
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="visit_date">Date of Visit:</label>
              <input 
                type="date" 
                id="visit_date" 
                name="visit_date" 
                onChange={handleChange}
              />
            </div>

            <div className="button-container">
              <button type="submit" id="submit-button">
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </FeedbackPageCSS>
  );
}

const FeedbackPageCSS = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 10rem auto 5rem auto;
  width: 80%;
  max-width: 1200px;
  min-height: calc(100vh - 10rem - 10rem);
  overflow: hidden;
  background-color: #FAF9F6;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  #header {
    text-align: center;
    margin-bottom: 20px;
    h1 {
      font-size: 2em;
      color: #333;
    }
  }

  #container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 20px;
  }

  #feedbackSection {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 0 20px 20px 20px;
  }

  form {
    width: 100%;
  }

  .form-group {
    margin-bottom: 20px;
  }

  label {
    display: block;
    font-weight: bold;
    color: #333;
    margin-bottom: 8px;
  }

  input, select, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 4px;
    font-size: 1em;
    transition: border 0.2s;

    &:focus {
      outline: none;
      border-color: #73A19E;
      box-shadow: 0 0 0 2px rgba(115, 161, 158, 0.2);
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }

  .button-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }

  #submit-button {
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

  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;
    padding: 40px;
  }
  
  @media (max-width: 768px) {
    width: 90%;
    margin: 8rem auto 4rem auto;
    
    .button-container {
      flex-direction: column;
      
      button {
        width: 100%;
      }
    }
  }
`;

export default FeedbackPage;