import React from 'react';
import '../../styles/UserSelector.css';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import UserDropdown from './UserDropdown';
import UserDetails from './UserDetails';

const UserSelector = ({
  users,
  selectedUser,
  onUserSelect,
  loading,
  error,
}) => {
  const handleUserChange = (e) => {
    const userId = e.target.value;
    onUserSelect(userId);
  };

  return (
    <div className="card user-selector">
      <h2 className="card-title">Select User</h2>
      <div className="card-content">
        {error && <ErrorMessage message={error} />}

        <UserDropdown
          users={users}
          onChange={handleUserChange}
          disabled={loading}
        />

        {loading ? (
          <LoadingSpinner />
        ) : (
          selectedUser && <UserDetails user={selectedUser} />
        )}
      </div>
    </div>
  );
};

export default UserSelector;
