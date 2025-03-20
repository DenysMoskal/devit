import React from 'react';

const ProductSelect = ({ products, value, onChange, disabled }) => (
  <div className="form-group">
    <label htmlFor="productId">Product</label>
    <select
      id="productId"
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="select-input"
    >
      <option value="">Select a product</option>
      {products.map((product) => (
        <option key={product._id} value={product._id}>
          {product.name} - ${product.price} (in stock: {product.stock})
        </option>
      ))}
    </select>
  </div>
);

export default ProductSelect;
