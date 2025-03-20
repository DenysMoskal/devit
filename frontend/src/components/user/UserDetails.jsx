import React from 'react';

const UserDetails = ({ user }) => (
  <div className="user-details">
    <hr className="divider" />
    <h3>User Information</h3>
    <p>
      <strong>Name:</strong> {user.name}
    </p>
    <p>
      <strong>Email:</strong> {user.email}
    </p>
    <p>
      <strong>Balance:</strong> ${user.balance}
    </p>
  </div>
);

export default UserDetails;
