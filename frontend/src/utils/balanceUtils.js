const checkBalance = (user, totalPrice) => {
  if (
    !user ||
    typeof user.balance !== 'number' ||
    typeof totalPrice !== 'number'
  ) {
    return false;
  }

  return user.balance >= totalPrice;
};

// eslint-disable-next-line no-undef
module.exports = { checkBalance };
