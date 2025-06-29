import axios from 'axios';

// API base URL for development
const API_BASE_URL = 'http://localhost:8000';

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
    const response = await api.post('/api/accounts/register/', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/api/accounts/login/', credentials);
    return response.data;
  },

  logout: async (token) => {
    const response = await api.post('/api/accounts/logout/');
    return response.data;
  },

  getProfile: async (token) => {
    const response = await api.get('/api/accounts/profile/');
    return response.data;
  },

  updateProfile: async (token, userData) => {
    const response = await api.put('/api/accounts/profile/', userData);
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