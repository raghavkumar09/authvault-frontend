import api from './axios';

export const registerApi = (data) => api.post('/auth/register', data);

export const verifyEmailApi = (token) => api.get(`/auth/verify-email/${token}`);

export const loginApi = (data) => api.post('/auth/login', data);

export const logoutApi = () => api.post('/auth/logout');

export const refreshTokenApi = () => api.post('/auth/refresh');

export const forgotPasswordApi = (email) => api.post('/auth/forgot-password', { email });

export const resetPasswordApi = (token, data) => api.post(`/auth/reset-password/${token}`, data);

export const getMeApi = () => api.get('/auth/me');
