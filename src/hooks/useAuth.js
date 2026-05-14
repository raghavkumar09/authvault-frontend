import { useState } from 'react';
import { toast } from 'react-hot-toast';
import useAuthStore from '../store/authStore';
import * as authApi from '../api/auth.api';

const useAuth = () => {
  const { user, login, logout, updateUser } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (data) => {
    setLoading(true);
    try {
      const res = await authApi.registerApi(data);
      toast.success(res.data.message || 'Registration successful!');
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      const res = await authApi.loginApi(data);
      const { accessToken, user: userData } = res.data.data;
      login(userData, accessToken);
      toast.success('Logged in successfully!');
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await authApi.logoutApi();
      logout();
      toast.success('Logged out successfully');
    } catch (err) {
      console.error('Logout error:', err);
      logout(); // Force local logout anyway
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, handleRegister, handleLogin, handleLogout, updateUser };
};

export default useAuth;
