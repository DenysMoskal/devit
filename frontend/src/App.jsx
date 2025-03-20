import React, { useState } from 'react';

import './styles/App.css';
import UserSelector from './components/user';
import OrderForm from './components/order';
import OrdersTable from './components/orders';
import { useUsersData } from './hooks/useUsersData';
import { useOrdersData } from './hooks/useOrdersData';

function App() {
  const [selectedUserId, setSelectedUserId] = useState(null);

  const { users, selectedUser, selectUser, refreshUserData } = useUsersData();

  const {
    orders,
    loading: ordersLoading,
    error: ordersError,
    refreshOrders,
  } = useOrdersData(selectedUserId);

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
    selectUser(userId);
  };

  const handleOrderCreated = async () => {
    await refreshOrders();
    if (selectedUserId) {
      await refreshUserData(selectedUserId);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Order Management System</h1>
      </header>
      <main className="app-content">
        <div className="app-grid">
          <div className="app-column">
            <UserSelector
              users={users}
              selectedUser={selectedUser}
              onUserSelect={handleUserSelect}
            />
            <OrderForm
              user={selectedUser}
              onOrderCreated={handleOrderCreated}
            />
          </div>
          <div className="app-column">
            <OrdersTable
              user={selectedUser}
              orders={orders}
              loading={ordersLoading}
              error={ordersError}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
