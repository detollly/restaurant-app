import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PaymentModal = ({ isOpen, onClose, orderTotal }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: ""
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [countdown, setCountdown] = useState(5);

  // Validate form data
  useEffect(() => {
    const { name, phone, address, cardNumber, cardExpiry, cardCvc } = formData;
    
    // Simple validation - check if all fields have values
    // You could add more specific validation rules as needed
    const isValid = 
      name.trim() !== "" && 
      phone.trim() !== "" && 
      address.trim() !== "" && 
      cardNumber.trim() !== "" && 
      cardExpiry.trim() !== "" && 
      cardCvc.trim() !== "";
    
    setIsFormValid(isValid);
  }, [formData]);

  // Handle countdown and redirect after payment completion
  useEffect(() => {
    if (isPaymentComplete && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isPaymentComplete && countdown === 0) {
      navigate('/');
    }
  }, [isPaymentComplete, countdown, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle payment submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      // Here you would normally process the payment
      setIsPaymentComplete(true);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        {!isPaymentComplete ? (
          <>
            <h2>Payment Details</h2>
            <p className="total-amount">Total: £{orderTotal.toFixed(2)}</p>
            
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="John Doe"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  placeholder="0123456789"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="address">Delivery Address</label>
                <textarea 
                  id="address" 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange} 
                  placeholder="123 Main St, City, Postcode"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="cardNumber">Card Number</label>
                <input 
                  type="text" 
                  id="cardNumber" 
                  name="cardNumber" 
                  value={formData.cardNumber} 
                  onChange={handleChange} 
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  required
                />
              </FormGroup>
              
              <FormRow>
                <FormGroup>
                  <label htmlFor="cardExpiry">Expiry Date</label>
                  <input 
                    type="text" 
                    id="cardExpiry" 
                    name="cardExpiry" 
                    value={formData.cardExpiry} 
                    onChange={handleChange} 
                    placeholder="MM/YY"
                    maxLength="5"
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <label htmlFor="cardCvc">CVC</label>
                  <input 
                    type="text" 
                    id="cardCvc" 
                    name="cardCvc" 
                    value={formData.cardCvc} 
                    onChange={handleChange} 
                    placeholder="123"
                    maxLength="3"
                    required
                  />
                </FormGroup>
              </FormRow>
              
              <ButtonGroup>
                <CancelButton type="button" onClick={onClose}>
                  Cancel
                </CancelButton>
                <SubmitButton 
                  type="submit" 
                  disabled={!isFormValid}
                  className={isFormValid ? "active" : ""}
                >
                  Complete Payment
                </SubmitButton>
              </ButtonGroup>
            </form>
          </>
        ) : (
          <SuccessMessage>
            <h2>Payment Complete</h2>
            <p>Thank you for ordering!</p>
            <p className="redirect-message">
              Redirecting to homepage in {countdown} seconds...
            </p>
          </SuccessMessage>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

// Styled components
const ModalOverlay = styled.div`
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
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  width: 450px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  
  h2 {
    margin-top: 0;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .total-amount {
    font-size: 1.2rem;
    font-weight: bold;
    color: #007bff;
    text-align: center;
    margin-bottom: 20px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: 600;
    color: #333;
  }
  
  input, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    
    &:focus {
      outline: none;
      border-color: #007bff;
    }
  }
  
  textarea {
    resize: vertical;
    min-height: 60px;
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: 15px;
  
  ${FormGroup} {
    flex: 1;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: #f8f9fa;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #e9ecef;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #ccc;
  color: #666;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: not-allowed;
  transition: all 0.2s;
  
  &.active {
    background-color: #28a745;
    color: white;
    cursor: pointer;
    
    &:hover {
      background-color: #218838;
    }
  }
`;

const SuccessMessage = styled.div`
  text-align: center;
  
  h2 {
    color: #28a745;
  }
  
  p {
    font-size: 18px;
    margin-bottom: 20px;
  }
  
  .redirect-message {
    font-size: 14px;
    color: #6c757d;
    margin-top: 30px;
  }
`;

export default PaymentModal;