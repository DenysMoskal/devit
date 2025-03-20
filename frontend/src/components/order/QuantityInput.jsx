import React from 'react';

const QuantityInput = ({ value, onChange, disabled }) => (
  <div className="form-group">
    <label htmlFor="quantity">Quantity</label>
    <input
      type="number"
      id="quantity"
      min="1"
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="number-input"
    />
  </div>
);

export default QuantityInput;
