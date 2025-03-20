const validateStock = (orderItems, products) => {
  if (!orderItems || !products) {
    return false;
  }

  return orderItems.every((orderItem) => {
    const product = products.find((p) => p.id === orderItem.productId);
    return product && product.stock >= orderItem.quantity;
  });
};

// eslint-disable-next-line no-undef
module.exports = { validateStock };
