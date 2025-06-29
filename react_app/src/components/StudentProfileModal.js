import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './StudentProfileModal.css';

export default function StudentProfileModal({ student, isOpen, onClose }) {
  const { token } = useAuth();
  const [studentDetails, setStudentDetails] = useState(null);
  const [payments, setPayments] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStudentDetails = useCallback(async () => {
    if (!student) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const [details, paymentsData, summaryData] = await Promise.all([
        api.getStudent(token, student.id),
        api.getStudentPayments(token, student.id),
        api.getStudentPaymentSummary(token, student.id)
      ]);
      
      setStudentDetails(details);
      setPayments(paymentsData);
      setPaymentSummary(summaryData);
    } catch (err) {
      setError('Failed to fetch student details. Please try again.');
      console.error('Error fetching student details:', err);
    } finally {
      setLoading(false);
    }
  }, [student, token]);

  useEffect(() => {
    if (isOpen && student) {
      fetchStudentDetails();
    }
  }, [isOpen, student, fetchStudentDetails]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Student Profile</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        {loading ? (
          <div className="loading">Loading student details...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : studentDetails ? (
          <div className="modal-body">
            {/* Student Information */}
            <div className="profile-section">
              <h3>Student Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Full Name:</label>
                  <span>{studentDetails.full_name}</span>
                </div>
                <div className="info-item">
                  <label>Grade:</label>
                  <span>Grade {studentDetails.grade} ({studentDetails.board})</span>
                </div>
                <div className="info-item">
                  <label>Parent Name:</label>
                  <span>{studentDetails.parent_name}</span>
                </div>
                <div className="info-item">
                  <label>Primary Contact:</label>
                  <span>{studentDetails.parent_contact_primary}</span>
                </div>
                {studentDetails.parent_contact_secondary && (
                  <div className="info-item">
                    <label>Secondary Contact:</label>
                    <span>{studentDetails.parent_contact_secondary}</span>
                  </div>
                )}
                <div className="info-item">
                  <label>Admission Date:</label>
                  <span>{formatDate(studentDetails.admission_date)}</span>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            {paymentSummary && (
              <div className="profile-section">
                <h3>Fee Summary</h3>
                <div className="fee-summary">
                  <div className="fee-item">
                    <label>Total Fee:</label>
                    <span className="amount">{formatCurrency(paymentSummary.total_fee)}</span>
                  </div>
                  <div className="fee-item">
                    <label>Total Paid:</label>
                    <span className="amount paid">{formatCurrency(paymentSummary.total_paid)}</span>
                  </div>
                  <div className="fee-item">
                    <label>Balance:</label>
                    <span className={`amount ${paymentSummary.balance > 0 ? 'due' : 'paid'}`}>
                      {formatCurrency(paymentSummary.balance)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Payment History */}
            <div className="profile-section">
              <h3>Payment History ({payments.length})</h3>
              {payments.length === 0 ? (
                <div className="no-payments">No payments found.</div>
              ) : (
                <div className="payments-list">
                  {payments.map(payment => (
                    <div key={payment.id} className="payment-item">
                      <div className="payment-header">
                        <span className="payment-date">{formatDate(payment.transaction_date)}</span>
                        <span className={`payment-status ${payment.payment_status}`}>
                          {payment.payment_status_display}
                        </span>
                      </div>
                      <div className="payment-details">
                        <div className="payment-info">
                          <span className="payment-term">{payment.payment_term_display}</span>
                          <span className="payment-mode">{payment.payment_mode_display}</span>
                        </div>
                        <div className="payment-amounts">
                          <span className="amount-paid">{formatCurrency(payment.amount_paid)}</span>
                          {payment.amount_due > 0 && (
                            <span className="amount-due">Due: {formatCurrency(payment.amount_due)}</span>
                          )}
                        </div>
                      </div>
                      {payment.notes && (
                        <div className="payment-notes">
                          <strong>Notes:</strong> {payment.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
} 