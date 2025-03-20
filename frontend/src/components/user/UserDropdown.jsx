import React from 'react';

const UserDropdown = ({ users, onChange, disabled }) => (
  <select className="select-input" onChange={onChange} disabled={disabled}>
    <option value="">Select a user</option>
    {users.map((user) => (
      <option key={user._id} value={user._id}>
        {user.name} ({user.email})
      </option>
    ))}
  </select>
);

export default UserDropdown;
