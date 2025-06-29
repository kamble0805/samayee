import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navigation.css";

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/">🏫 Samayee Casses</Link>
        </div>
        
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            📊 Dashboard
          </Link>
          <Link 
            to="/students" 
            className={`nav-link ${isActive('/students') ? 'active' : ''}`}
          >
            👥 Students
          </Link>
          <Link 
            to="/payments" 
            className={`nav-link ${isActive('/payments') ? 'active' : ''}`}
          >
            💰 Payments
          </Link>
        </div>

        <div className="nav-profile">
          <div 
            className="profile-menu"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="profile-avatar">
              {user?.first_name?.charAt(0) || 'U'}
            </div>
            <span className="profile-name">
              {user ? `${user.first_name} ${user.last_name}` : 'User'}
            </span>
            <span className="profile-arrow">▼</span>
          </div>
          
          {showProfileMenu && (
            <div className="profile-dropdown">
              <div className="profile-info">
                <p><strong>{user?.email}</strong></p>
                <p className="user-type">{user?.user_type}</p>
              </div>
              <div className="profile-actions">
                <button onClick={handleLogout} className="logout-btn">
                  🚪 Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 