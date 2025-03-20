import React from 'react';

const OrderRow = ({ order, formatDate }) => (
  <tr>
    <td className="id-cell" title={order._id}>
      {order._id.substring(0, 8)}...
    </td>
    <td>{order.productId?.name || 'Unknown product'}</td>
    <td>{order.quantity}</td>
    <td>${order.totalPrice}</td>
    <td>{formatDate(order.createdAt)}</td>
  </tr>
);

export default OrderRow;
