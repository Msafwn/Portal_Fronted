import { axiosPublic, axiosPrivate, setAccessToken } from './apiClient';

/**
 * Authentication service using Axios directly
 */
export const authService = {
  // Login with email and password
  login: async (credentials) => {
    const response = await axiosPublic.post('/auth/login', credentials);
    const accessToken = response.data?.data?.accessToken;
    if (accessToken) {
      setAccessToken(accessToken);
    }
    return response.data;
  },

  // Register a new candidate or employer
  register: async (userData) => {
    const response = await axiosPublic.post('/auth/register', userData);
    const accessToken = response.data?.data?.accessToken;
    if (accessToken) {
      setAccessToken(accessToken);
    }
    return response.data;
  },

  // Get currently logged-in user profile
  getMe: async () => {
    const response = await axiosPrivate.get('/auth/me');
    return response.data;
  },

  // Update candidate / user profile
  updateProfile: async (profileData) => {
    const response = await axiosPrivate.put('/auth/profile', profileData);
    return response.data;
  },

  // Logout user and clear tokens
  logout: async () => {
    try {
      await axiosPrivate.post('/auth/logout');
    } finally {
      setAccessToken(null);
    }
  },

  // Refresh access token
  refreshToken: async () => {
    const response = await axiosPublic.post('/auth/refresh-token');
    const newAccessToken = response.data?.data?.accessToken;
    if (newAccessToken) {
      setAccessToken(newAccessToken);
    }
    return response.data;
  },
};

export default authService;
