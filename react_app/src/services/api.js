import axios from 'axios';

// Use environment variable for API URL, fallback to localhost for development
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Add request interceptor to include auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Token ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// API service for making HTTP requests to Django backend
const apiService = {
  // Authentication API
  register: async (userData) => {
    console.log('API: Sending registration request to:', `${API_BASE_URL}/api/register/`);
    console.log('API: Registration data:', userData);
    
    const response = await api.post('/api/register/', userData);
    
    console.log('API: Registration response status:', response.status);
    const data = response.data;
    console.log('API: Registration response data:', data);
    
    return data;
  },

  login: async (credentials) => {
    console.log('API: Sending login request to:', `${API_BASE_URL}/api/login/`);
    console.log('API: Login credentials:', credentials);
    
    const response = await api.post('/api/login/', credentials);
    
    console.log('API: Login response status:', response.status);
    const data = response.data;
    console.log('API: Login response data:', data);
    
    return data;
  },

  logout: async (token) => {
    const response = await api.post('/api/logout/');
    return response.data;
  },

  getProfile: async (token) => {
    const response = await api.get('/api/profile/');
    return response.data;
  },

  updateProfile: async (token, userData) => {
    const response = await api.put('/api/profile/', userData);
    return response.data;
  },

  // Students API
  getStudents: async (token) => {
    const response = await api.get('/api/students/');
    return response.data;
  },

  searchStudents: async (token, query) => {
    const response = await api.get('/api/students/search/', { params: { q: query } });
    return response.data;
  },

  getStudent: async (token, id) => {
    const response = await api.get(`/api/students/${id}/`);
    return response.data;
  },

  getStudentPayments: async (token, id) => {
    const response = await api.get(`/api/students/${id}/payments/`);
    return response.data;
  },

  getStudentPaymentSummary: async (token, id) => {
    const response = await api.get(`/api/students/${id}/payment_summary/`);
    return response.data;
  },

  addStudent: async (token, studentData) => {
    const response = await api.post('/api/students/', studentData);
    return response.data;
  },

  updateStudent: async (token, id, studentData) => {
    const response = await api.put(`/api/students/${id}/`, studentData);
    return response.data;
  },

  deleteStudent: async (token, id) => {
    const response = await api.delete(`/api/students/${id}/`);
    return response.data;
  },

  // Fee Structures API
  getFeeStructures: async (token) => {
    const response = await api.get('/api/fee-structures/');
    return response.data;
  },

  addFeeStructure: async (token, feeData) => {
    const response = await api.post('/api/fee-structures/', feeData);
    return response.data;
  },

  updateFeeStructure: async (token, id, feeData) => {
    const response = await api.put(`/api/fee-structures/${id}/`, feeData);
    return response.data;
  },

  deleteFeeStructure: async (token, id) => {
    const response = await api.delete(`/api/fee-structures/${id}/`);
    return response.data;
  },

  // Payments API
  getPayments: async (token) => {
    const response = await api.get('/api/payments/');
    return response.data;
  },

  addPayment: async (token, paymentData) => {
    const response = await api.post('/api/payments/', paymentData);
    return response.data;
  },

  updatePayment: async (token, id, paymentData) => {
    const response = await api.put(`/api/payments/${id}/`, paymentData);
    return response.data;
  },

  deletePayment: async (token, id) => {
    const response = await api.delete(`/api/payments/${id}/`);
    return response.data;
  },
};

export default apiService; 