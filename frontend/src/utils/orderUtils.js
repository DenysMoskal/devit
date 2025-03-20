const calculateTotalPrice = (orderItems) => {
  if (!orderItems || orderItems.length === 0) {
    return 0;
  }

  return orderItems.reduce((total, item) => {
    const itemPrice = item.price * item.quantity;
    const discountMultiplier = item.discount ? 1 - item.discount : 1;
    return total + itemPrice * discountMultiplier;
  }, 0);
};

// eslint-disable-next-line no-undef
module.exports = { calculateTotalPrice };
