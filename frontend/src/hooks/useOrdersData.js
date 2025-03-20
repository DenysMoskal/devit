import { useState, useEffect, useCallback } from 'react';
import { orderApi } from '../api/api';

export function useOrdersData(userId) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshOrders = useCallback(async () => {
    if (!userId) {
      setOrders([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await orderApi.getUserOrders(userId);
      setOrders(response.data || []);
      return response.data;
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    refreshOrders();
  }, [userId, refreshOrders]);

  return {
    orders,
    loading,
    error,
    refreshOrders,
  };
}
