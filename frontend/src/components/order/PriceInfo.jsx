import React from 'react';

const PriceInfo = ({ product, quantity }) => (
  <div className="price-info">
    <p>Price per unit: ${product.price}</p>
    <p>Total price: ${product.price * quantity}</p>
  </div>
);

export default PriceInfo;
