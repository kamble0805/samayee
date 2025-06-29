const API_BASE_URL = 'http://localhost:8000';

// API service for making HTTP requests to Django backend
const api = {
  // Authentication API
  register: async (userData) => {
    console.log('API: Sending registration request to:', `${API_BASE_URL}/api/register/`);
    console.log('API: Registration data:', userData);
    
    const response = await fetch(`${API_BASE_URL}/api/register/`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    console.log('API: Registration response status:', response.status);
    const data = await response.json();
    console.log('API: Registration response data:', data);
    
    return data;
  },

  login: async (credentials) => {
    console.log('API: Sending login request to:', `${API_BASE_URL}/api/login/`);
    console.log('API: Login credentials:', credentials);
    
    const response = await fetch(`${API_BASE_URL}/api/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    console.log('API: Login response status:', response.status);
    const data = await response.json();
    console.log('API: Login response data:', data);
    
    return data;
  },

  logout: async (token) => {
    const response = await fetch(`${API_BASE_URL}/api/logout/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  getProfile: async (token) => {
    const response = await fetch(`${API_BASE_URL}/api/profile/`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
    return response.json();
  },

  updateProfile: async (token, userData) => {
    const response = await fetch(`${API_BASE_URL}/api/profile/`, {
      method: 'PUT',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  // Students API
  getStudents: async (token) => {
    const response = await fetch(`${API_BASE_URL}/api/students/`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
    return response.json();
  },

  searchStudents: async (token, query) => {
    const response = await fetch(`${API_BASE_URL}/api/students/search/?q=${encodeURIComponent(query)}`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
    return response.json();
  },

  getStudent: async (token, id) => {
    const response = await fetch(`${API_BASE_URL}/api/students/${id}/`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
    return response.json();
  },

  getStudentPayments: async (token, id) => {
    const response = await fetch(`${API_BASE_URL}/api/students/${id}/payments/`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
    return response.json();
  },

  getStudentPaymentSummary: async (token, id) => {
    const response = await fetch(`${API_BASE_URL}/api/students/${id}/payment_summary/`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
    return response.json();
  },

  addStudent: async (token, studentData) => {
    const response = await fetch(`${API_BASE_URL}/api/students/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });
    return response.json();
  },

  updateStudent: async (token, id, studentData) => {
    const response = await fetch(`${API_BASE_URL}/api/students/${id}/`, {
      method: 'PUT',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });
    return response.json();
  },

  deleteStudent: async (token, id) => {
    const response = await fetch(`${API_BASE_URL}/api/students/${id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
    return response.ok;
  },

  // Fee Structures API
  getFeeStructures: async (token) => {
    const response = await fetch(`${API_BASE_URL}/api/fee-structures/`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
    return response.json();
  },

  addFeeStructure: async (token, feeData) => {
    const response = await fetch(`${API_BASE_URL}/api/fee-structures/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feeData),
    });
    return response.json();
  },

  updateFeeStructure: async (token, id, feeData) => {
    const response = await fetch(`${API_BASE_URL}/api/fee-structures/${id}/`, {
      method: 'PUT',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feeData),
    });
    return response.json();
  },

  deleteFeeStructure: async (token, id) => {
    const response = await fetch(`${API_BASE_URL}/api/fee-structures/${id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
    return response.ok;
  },

  // Payments API
  getPayments: async (token) => {
    const response = await fetch(`${API_BASE_URL}/api/payments/`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
    return response.json();
  },

  addPayment: async (token, paymentData) => {
    const response = await fetch(`${API_BASE_URL}/api/payments/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });
    return response.json();
  },

  updatePayment: async (token, id, paymentData) => {
    const response = await fetch(`${API_BASE_URL}/api/payments/${id}/`, {
      method: 'PUT',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });
    return response.json();
  },

  deletePayment: async (token, id) => {
    const response = await fetch(`${API_BASE_URL}/api/payments/${id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
    return response.ok;
  },
};

export default api; 