import axios from 'axios';

console.log('API URL:', import.meta.env.VITE_API_URL);

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// Request Interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login'; // redirect to login
    }

    if (status === 403) {
      window.location.href = '/forbidden';
    }

    if (status === 500) {
      console.error('Server error');
    }

    const message =
      error.response?.data?.message || error.message || 'Something went wrong';

    return Promise.reject(new Error(message));
  }
);

export default axiosClient;
