import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await api.login(credentials);
      
      if (response.token) {
        setToken(response.token);
        setUser(response.user);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        return { success: true };
      } else {
        // Handle validation errors
        if (response.email) {
          return { success: false, error: `Email: ${response.email.join(', ')}` };
        }
        if (response.password) {
          return { success: false, error: `Password: ${response.password.join(', ')}` };
        }
        if (response.non_field_errors) {
          return { success: false, error: response.non_field_errors.join(', ') };
        }
        return { success: false, error: response.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const register = async (userData) => {
    try {
      console.log('Sending registration data:', userData);
      const response = await api.register(userData);
      console.log('Registration response:', response);
      
      if (response.message) {
        return { success: true, message: response.message };
      } else {
        // Handle validation errors
        if (response.username) {
          return { success: false, error: `Username: ${response.username.join(', ')}` };
        }
        if (response.email) {
          return { success: false, error: `Email: ${response.email.join(', ')}` };
        }
        if (response.password) {
          return { success: false, error: `Password: ${response.password.join(', ')}` };
        }
        if (response.non_field_errors) {
          return { success: false, error: response.non_field_errors.join(', ') };
        }
        return { success: false, error: response.message || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await api.logout(token);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };

  const updateProfile = async (userData) => {
    try {
      const response = await api.updateProfile(token, userData);
      if (response.id) {
        setUser(response);
        localStorage.setItem('user', JSON.stringify(response));
        return { success: true };
      } else {
        return { success: false, error: 'Profile update failed' };
      }
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: 'Profile update failed. Please try again.' };
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 