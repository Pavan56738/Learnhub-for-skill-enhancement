import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Button from '../common/Button';
import './PaymentPage.css';

const PaymentPage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state?.course;

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  if (!course) {
    navigate('/student');
    return null;
  }

  const handleChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
  };

  // const handlePayment = (e) => {
  //   e.preventDefault();

  //   // Simple validation
  //   if (!paymentData.cardNumber || !paymentData.cardName || !paymentData.expiryDate || !paymentData.cvv) {
  //     alert('Please fill in all payment details');
  //     return;
  //   }

  //   //Update user's purchased courses
  //   const users = JSON.parse(localStorage.getItem('users') || '[]');
  //   const userIndex = users.findIndex(u => u.id === user.id);
    
  //   if (userIndex !== -1) {
  //     if (!users[userIndex].purchasedCourses) {
  //       users[userIndex].purchasedCourses = [];
  //     }
      
  //     if (!users[userIndex].purchasedCourses.includes(course._id)) {
  //       users[userIndex].purchasedCourses.push(course._id);
  //       localStorage.setItem('users', JSON.stringify(users));
        
  //       alert('Payment successful! Course unlocked.');
  //       navigate('/student');
  //     } else {
  //       alert('You have already purchased this course.');
  //       navigate('/student');
  //     }
  //   }
  // };
  const handlePayment = async (e) => {
  e.preventDefault();

  if (
    !paymentData.cardNumber ||
    !paymentData.cardName ||
    !paymentData.expiryDate ||
    !paymentData.cvv
  ) {
    alert("Please fill in all payment details");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in");
      return;
    }

    // 🔥 ENROLL STUDENT (this is the REAL action)
    const res = await fetch(
      `http://localhost:5000/api/courses/${course._id}/enroll`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await res.json();
    console.log("Enroll response:", data);

    if (data.success) {
      alert("Payment successful! Course unlocked.");
      navigate("/student");
    } else {
      alert(data.message || "Enrollment failed");
    }
  } catch (error) {
    console.error(error);
    alert("Server error during payment");
  }
};


  return (
    <div className="payment-page">
      <Navbar role="student" onLogout={onLogout} />
      
      <div className="payment-container">
        <div className="payment-card">
          <h1>Complete Payment</h1>
          
          <div className="course-summary">
            <h2>{course.title}</h2>
            <p className="course-educator">By {course.educator}</p>
            <div className="price-section">
              <span className="label">Total Amount:</span>
              <span className="amount">₹{course.price}</span>
            </div>
          </div>

          <form onSubmit={handlePayment} className="payment-form">
            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={paymentData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                maxLength="16"
              />
            </div>

            <div className="form-group">
              <label>Cardholder Name</label>
              <input
                type="text"
                name="cardName"
                value={paymentData.cardName}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={paymentData.expiryDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  maxLength="5"
                />
              </div>

              <div className="form-group">
                <label>CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={paymentData.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  maxLength="3"
                />
              </div>
            </div>

            <div className="payment-actions">
              <Button type="button" variant="secondary" onClick={() => navigate('/student')}>
                Cancel
              </Button>
              <Button type="submit">Pay ₹{course.price}</Button>
            </div>
          </form>

          <p className="payment-note">
            🔒 This is a demo payment page. No actual payment will be processed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
