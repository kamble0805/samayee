import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import "./Dashboard.css";

export default function Dashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalPayments: 0,
    totalRevenue: 0,
    recentPayments: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [students, payments] = await Promise.all([
          api.getStudents(token),
          api.getPayments(token)
        ]);

        // Calculate total revenue
        const totalRevenue = payments.reduce((sum, payment) => sum + parseFloat(payment.amount_paid), 0);

        // Get recent payments (last 5)
        const recentPayments = payments
          .sort((a, b) => new Date(b.transaction_date) - new Date(a.transaction_date))
          .slice(0, 5);

        setStats({
          totalStudents: students.length,
          totalPayments: payments.length,
          totalRevenue: totalRevenue,
          recentPayments: recentPayments
        });
      } catch (err) {
        setError("Failed to fetch dashboard data. Please try again.");
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <div className="container">
        <h1>School Management Dashboard</h1>
        
        {error && <div className="error-message">{error}</div>}

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>{stats.totalStudents}</h3>
              <p>Total Students</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <h3>{stats.totalPayments}</h3>
              <p>Total Payments</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>₹{stats.totalRevenue.toLocaleString()}</h3>
              <p>Total Revenue</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-content">
              <h3>{stats.totalStudents > 0 ? (stats.totalRevenue / stats.totalStudents).toFixed(0) : 0}</h3>
              <p>Avg. Revenue per Student</p>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/students" className="action-card">
              <div className="action-icon">➕</div>
              <h3>Add New Student</h3>
              <p>Register a new student in the system</p>
            </Link>

            <Link to="/payments" className="action-card">
              <div className="action-icon">💳</div>
              <h3>Record Payment</h3>
              <p>Record a new fee payment</p>
            </Link>

            <Link to="/students" className="action-card">
              <div className="action-icon">👀</div>
              <h3>View Students</h3>
              <p>Browse and manage student records</p>
            </Link>

            <Link to="/payments" className="action-card">
              <div className="action-icon">📋</div>
              <h3>Payment History</h3>
              <p>View all payment transactions</p>
            </Link>
          </div>
        </div>

        <div className="recent-activity">
          <h2>Recent Payments</h2>
          {stats.recentPayments.length === 0 ? (
            <div className="no-activity">No recent payments found.</div>
          ) : (
            <div className="activity-list">
              {stats.recentPayments.map(payment => (
                <div key={payment.id} className="activity-item">
                  <div className="activity-icon">💳</div>
                  <div className="activity-content">
                    <h4>₹{payment.amount_paid} - {payment.payment_mode}</h4>
                    <p>Student ID: {payment.student}</p>
                    <span className="activity-date">
                      {new Date(payment.transaction_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 