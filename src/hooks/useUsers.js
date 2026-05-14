import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { getUsersApi, deleteUserApi, changeUserRoleApi } from '../api/user.api';

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 9, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchUsers = useCallback(async (page = 1, searchQuery = search) => {
    setLoading(true);
    try {
      const { data } = await getUsersApi({ page, limit: 9, search: searchQuery });
      setUsers(data.data);
      if (data.pagination) setPagination(data.pagination);
    } catch (err) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      fetchUsers(1, search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search, fetchUsers]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchUsers(newPage);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUserApi(id);
      toast.success('User deleted successfully');
      fetchUsers(pagination.page); // Refresh current page
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete user');
      return false;
    }
  };

  const handleChangeRole = async (id, role) => {
    try {
      await changeUserRoleApi(id, role);
      toast.success(`Role updated to ${role}`);
      fetchUsers(pagination.page);
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change role');
      return false;
    }
  };

  return {
    users,
    pagination,
    loading,
    search,
    setSearch,
    handlePageChange,
    handleDeleteUser,
    handleChangeRole,
    refresh: () => fetchUsers(pagination.page)
  };
};

export default useUsers;
