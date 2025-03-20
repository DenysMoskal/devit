import React from 'react';

const SubmitButton = ({ submitting, disabled }) => (
  <button type="submit" className="submit-button" disabled={disabled}>
    {submitting ? 'Processing...' : 'Place Order'}
  </button>
);

export default SubmitButton;
