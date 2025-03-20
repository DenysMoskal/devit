import React from 'react';
import '../../styles/OrdersTable.css';
import LoadingSpinner from '../common/LoadingSpinner';
import EmptyState from '../common/EmptyState';
import ErrorMessage from '../common/ErrorMessage';
import TableHeader from './TableHeader';
import OrderRow from './OrderRow';

const OrdersTable = ({ user, orders, loading, error }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const renderContent = () => {
    if (loading) {
      return <LoadingSpinner />;
    }

    if (!user) {
      return <EmptyState message="Select a user to view orders" />;
    }

    if (error) {
      return <ErrorMessage message={error} />;
    }

    if (orders.length === 0) {
      return <EmptyState message="No orders found for this user" />;
    }

    return (
      <div className="table-container">
        <table className="orders-list">
          <TableHeader />
          <tbody>
            {orders.map((order) => (
              <OrderRow key={order._id} order={order} formatDate={formatDate} />
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="card orders-table">
      <h2 className="card-title">User Orders</h2>
      <div className="card-content">{renderContent()}</div>
    </div>
  );
};

export default OrdersTable;
