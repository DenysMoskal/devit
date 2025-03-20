import { useState, useEffect, useCallback } from 'react';
import { userApi } from '../api/api';

export function useUsersData() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await userApi.getAllUsers();
      setUsers(response || []);
      return response;
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshUserData = useCallback(
    async (userId) => {
      if (!userId) return;

      try {
        const updatedUser = await userApi.getUserById(userId);

        setUsers((prevUsers) =>
          prevUsers.map((user) => (user._id === userId ? updatedUser : user))
        );

        if (selectedUser && selectedUser._id === userId) {
          setSelectedUser(updatedUser);
        }

        return updatedUser;
      } catch (err) {
        console.error('Error refreshing user data:', err);
      }
    },
    [selectedUser]
  );

  const selectUser = useCallback(
    (userId) => {
      if (!userId) {
        setSelectedUser(null);
        return null;
      }

      const user = users.find((u) => u._id === userId);
      setSelectedUser(user || null);
      return user || null;
    },
    [users]
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    selectedUser,
    loading,
    error,
    fetchUsers,
    selectUser,
    refreshUserData,
  };
}
