// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navigation from "./components/Navigation";
import StudentPage from "./pages/StudentPage";
import PaymentPage from "./pages/PaymentPage";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import "./App.css";

function App() {
  return (
    <AuthProvider>
    <Router>
        <div className="App">
      <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <>
                  <Navigation />
                  <main className="main-content">
                    <Dashboard />
                  </main>
                </>
              </ProtectedRoute>
            } />
            
            <Route path="/students" element={
              <ProtectedRoute>
                <>
                  <Navigation />
                  <main className="main-content">
                    <StudentPage />
                  </main>
                </>
              </ProtectedRoute>
            } />
            
            <Route path="/payments" element={
              <ProtectedRoute>
                <>
                  <Navigation />
                  <main className="main-content">
                    <PaymentPage />
                  </main>
                </>
              </ProtectedRoute>
            } />
            
            {/* Redirect to login for unknown routes */}
            <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
        </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
