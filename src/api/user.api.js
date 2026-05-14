import api from './axios';

export const getUsersApi = (params) => api.get('/users', { params });

export const getUserByIdApi = (id) => api.get(`/users/${id}`);

export const updateProfileApi = (data) => api.put('/users/profile', data);

export const uploadAvatarApi = (formData) =>
  api.post('/users/profile/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const deleteUserApi = (id) => api.delete(`/users/${id}`);

export const changeUserRoleApi = (id, role) => api.patch(`/users/${id}/role`, { role });
