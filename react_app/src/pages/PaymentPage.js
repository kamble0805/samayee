import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import "./PaymentPage.css";

export default function PaymentPage() {
  const { token } = useAuth();
  const [payments, setPayments] = useState([]);
  const [students, setStudents] = useState([]);
  const [feeStructures, setFeeStructures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [paymentSummary, setPaymentSummary] = useState(null);
  const [form, setForm] = useState({
    student: "",
    payment_mode: "Cash",
    payment_term: "Term 1",
    amount_paid: "",
    amount_due: "",
    due_date: "",
    transaction_id: "",
    notes: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    setPaymentSummary(null);
    
    try {
      const paymentData = {
        ...form,
        student: parseInt(form.student),
        amount_paid: parseFloat(form.amount_paid),
        amount_due: form.amount_due ? parseFloat(form.amount_due) : null,
        due_date: form.due_date || null,
      };
      
      const response = await api.addPayment(token, paymentData);
      
      // Show payment summary if available
      if (response.payment_summary) {
        setPaymentSummary(response.payment_summary);
        setSuccessMessage(`Payment recorded successfully! ${response.payment_summary.student_name} has ₹${response.payment_summary.balance_due} remaining.`);
      } else {
        setSuccessMessage("Payment recorded successfully!");
      }
      
      const updatedPayments = await api.getPayments(token);
      setPayments(updatedPayments);
      setForm({
        student: "",
        payment_mode: "Cash",
        payment_term: "Term 1",
        amount_paid: "",
        amount_due: "",
        due_date: "",
        transaction_id: "",
        notes: "",
      });
    } catch (err) {
      setError("Failed to add payment. Please try again.");
      console.error("Error adding payment:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      try {
        await api.deletePayment(token, id);
        const updatedPayments = await api.getPayments(token);
        setPayments(updatedPayments);
      } catch (err) {
        setError("Failed to delete payment. Please try again.");
        console.error("Error deleting payment:", err);
      }
    }
  };

  const getStudentName = (studentId) => {
    const student = students.find(s => s.id === studentId);
    return student ? `${student.first_name} ${student.last_name}` : "Unknown Student";
  };

  const getFeeAmount = (studentId) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return 0;
    
    const feeStructure = feeStructures.find(f => 
      f.grade === student.grade && f.board === student.board
    );
    return feeStructure ? feeStructure.fee_amount : 0;
  };

  const getTermAmount = (studentId) => {
    const totalFee = getFeeAmount(studentId);
    return totalFee / 4; // Each term is 1/4 of the total annual fee
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'status-paid';
      case 'Partial': return 'status-partial';
      case 'Pending': return 'status-pending';
      case 'Overdue': return 'status-overdue';
      default: return '';
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [paymentsData, studentsData, feeStructuresData] = await Promise.all([
          api.getPayments(token),
          api.getStudents(token),
          api.getFeeStructures(token)
        ]);
        
        setPayments(paymentsData);
        setStudents(studentsData);
        setFeeStructures(feeStructuresData);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  if (loading && payments.length === 0) {
    return <div className="loading">Loading payments...</div>;
  }

  return (
    <div className="payment-page">
      <div className="container">
        <h2>Payment Management</h2>
        
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <div className="form-section">
          <h3>Record New Payment</h3>
          <form onSubmit={handleSubmit} className="payment-form">
            <div className="form-row">
              <div className="form-group">
                <label>Student *</label>
                <select name="student" value={form.student} onChange={handleChange} required>
                  <option value="">Select Student</option>
                  {students.map(student => (
                    <option key={student.id} value={student.id}>
                      {student.first_name} {student.last_name} - Grade {student.grade} ({student.board})
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Payment Term *</label>
                <select name="payment_term" value={form.payment_term} onChange={handleChange} required>
                  <option value="Term 1">Term 1 (Months 1-3)</option>
                  <option value="Term 2">Term 2 (Months 4-6)</option>
                  <option value="Term 3">Term 3 (Months 7-9)</option>
                  <option value="Term 4">Term 4 (Months 10-12)</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Payment Mode *</label>
                <select name="payment_mode" value={form.payment_mode} onChange={handleChange} required>
                  <option value="Cash">Cash</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Online">Online</option>
                </select>
              </div>
              <div className="form-group">
                <label>Due Date</label>
                <input
                  name="due_date"
                  type="date"
                  value={form.due_date}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Amount Paid (₹) *</label>
                <input
                  name="amount_paid"
                  type="number"
                  step="0.01"
                  placeholder="Enter amount"
                  value={form.amount_paid}
                  onChange={handleChange}
                  required
                />
                {form.student && (
                  <small className="fee-info">
                    Term Fee: ₹{getTermAmount(parseInt(form.student))} | 
                    Annual Fee: ₹{getFeeAmount(parseInt(form.student))}
                  </small>
                )}
              </div>
              <div className="form-group">
                <label>Amount Due (₹)</label>
                <input
                  name="amount_due"
                  type="number"
                  step="0.01"
                  placeholder="Auto-calculated"
                  value={form.amount_due}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Transaction ID</label>
                <input
                  name="transaction_id"
                  placeholder="Transaction ID (for online payments)"
                  value={form.transaction_id}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Notes</label>
                <input
                  name="notes"
                  placeholder="Additional notes"
                  value={form.notes}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? "Recording Payment..." : "Record Payment"}
            </button>
          </form>
        </div>

        {/* Payment Summary Section */}
        {paymentSummary && (
          <div className="payment-summary-section">
            <h3>Payment Summary</h3>
            <div className="summary-card">
              <div className="summary-header">
                <h4>{paymentSummary.student_name}</h4>
                <span className="term-badge">{paymentSummary.current_term}</span>
              </div>
              <div className="summary-details">
                <div className="summary-row">
                  <span>Amount Just Paid:</span>
                  <span className="amount-paid">₹{paymentSummary.amount_just_paid}</span>
                </div>
                <div className="summary-row">
                  <span>Term Fee:</span>
                  <span>₹{paymentSummary.term_fee}</span>
                </div>
                <div className="summary-row">
                  <span>Total Annual Fee:</span>
                  <span>₹{paymentSummary.total_fee}</span>
                </div>
                <div className="summary-row">
                  <span>Total Paid So Far:</span>
                  <span>₹{paymentSummary.total_paid}</span>
                </div>
                <div className="summary-row total-due">
                  <span><strong>Total Due Amount:</strong></span>
                  <span className={`balance-amount ${paymentSummary.balance_due > 0 ? 'outstanding' : 'paid'}`}>
                    <strong>₹{paymentSummary.balance_due}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="payments-section">
          <h3>Payment History ({payments.length})</h3>
          {loading && <div className="loading">Loading...</div>}
          
          {payments.length === 0 && !loading ? (
            <div className="no-payments">No payments found.</div>
          ) : (
            <div className="payments-table">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Student</th>
                    <th>Term</th>
                    <th>Amount Paid</th>
                    <th>Amount Due</th>
                    <th>Status</th>
                    <th>Mode</th>
                    <th>Transaction ID</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map(payment => (
                    <tr key={payment.id}>
                      <td>{new Date(payment.transaction_date).toLocaleDateString()}</td>
                      <td>{getStudentName(payment.student)}</td>
                      <td>{payment.payment_term_display}</td>
                      <td>₹{payment.amount_paid}</td>
                      <td>₹{payment.amount_due || 0}</td>
                      <td>
                        <span className={`payment-status ${getStatusColor(payment.payment_status)}`}>
                          {payment.payment_status_display}
                        </span>
                      </td>
                      <td>
                        <span className={`payment-mode ${payment.payment_mode.toLowerCase()}`}>
                          {payment.payment_mode}
                        </span>
                      </td>
                      <td>{payment.transaction_id || "-"}</td>
                      <td>
                        <button 
                          onClick={() => handleDelete(payment.id)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 