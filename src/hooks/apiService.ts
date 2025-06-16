"use client";

import axios from 'axios';

// API base URL
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user  = JSON.parse(userData);
      if (user?.token) {
        config.headers.Authorization = `Bearer ${user?.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('userData');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);
// API functions
export const postData = async (endpoint: string, data: any, headers?: any) => {
  try {
    const response = await api.post(endpoint, data, { headers });
    return response.data;
  } catch (error:any) {
    throw  error?.response?.data || error;
  }
};

export const getData = async (endpoint: string, params?: any) => {
  try {
    const response = await api.get(endpoint, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteData = async (endpoint: string, data?: any) => {
  try {
    const response = await api.delete(endpoint, { data });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const putData = async (endpoint: string, data: any, params?: any) => {
  try {
    const response = await api.put(endpoint, data, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Local storage functions
export const setItem = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting item in localStorage:', error);
  }
};

export const getItem = (key: string) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error getting item from localStorage:', error);
    return null;
  }
};

export const removeItem = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing item from localStorage:', error);
  }
};

export default api; 