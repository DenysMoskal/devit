/* eslint-disable no-undef */
/* global describe, test, expect */

const { calculateTotalPrice } = require('../utils/orderUtils');
const { validateStock } = require('../utils/stockUtils');
const { checkBalance } = require('../utils/balanceUtils');

describe('calculateTotalPrice', () => {
  test('should correctly calculate total price for multiple items', () => {
    const orderItems = [
      { productId: '1', quantity: 2, price: 10 },
      { productId: '2', quantity: 1, price: 15 },
    ];

    const expectedTotal = 35;
    expect(calculateTotalPrice(orderItems)).toBe(expectedTotal);
  });

  test('should return 0 for empty item list', () => {
    expect(calculateTotalPrice([])).toBe(0);
  });

  test('should correctly handle discounts', () => {
    const orderItems = [
      { productId: '1', quantity: 2, price: 10, discount: 0.1 },
      { productId: '2', quantity: 1, price: 15 },
    ];

    const expectedTotal = 33;
    expect(calculateTotalPrice(orderItems)).toBe(expectedTotal);
  });
});

describe('validateStock', () => {
  test('should return true if all items are in stock', () => {
    const orderItems = [
      { productId: '1', quantity: 2 },
      { productId: '2', quantity: 1 },
    ];

    const products = [
      { id: '1', stock: 5 },
      { id: '2', stock: 3 },
    ];

    expect(validateStock(orderItems, products)).toBe(true);
  });

  test('should return false if at least one item is out of stock', () => {
    const orderItems = [
      { productId: '1', quantity: 6 },
      { productId: '2', quantity: 1 },
    ];

    const products = [
      { id: '1', stock: 5 },
      { id: '2', stock: 3 },
    ];

    expect(validateStock(orderItems, products)).toBe(false);
  });

  test('should return false if product is not found', () => {
    const orderItems = [{ productId: '3', quantity: 1 }];

    const products = [
      { id: '1', stock: 5 },
      { id: '2', stock: 3 },
    ];

    expect(validateStock(orderItems, products)).toBe(false);
  });
});

describe('checkBalance', () => {
  test('should return true if user has enough funds', () => {
    const user = { balance: 100 };
    const totalPrice = 80;

    expect(checkBalance(user, totalPrice)).toBe(true);
  });

  test('should return false if user does not have enough funds', () => {
    const user = { balance: 50 };
    const totalPrice = 80;

    expect(checkBalance(user, totalPrice)).toBe(false);
  });

  test('should return true if order amount equals user balance', () => {
    const user = { balance: 100 };
    const totalPrice = 100;

    expect(checkBalance(user, totalPrice)).toBe(true);
  });
});

describe('Order Process Integration', () => {
  test('should successfully process order if all conditions are met', () => {
    const user = { id: 'user1', balance: 100 };
    const orderItems = [
      { productId: '1', quantity: 2, price: 20 },
      { productId: '2', quantity: 1, price: 30 },
    ];
    const products = [
      { id: '1', stock: 5, price: 20 },
      { id: '2', stock: 3, price: 30 },
    ];

    const totalPrice = calculateTotalPrice(orderItems);
    const isStockValid = validateStock(orderItems, products);
    const isBalanceEnough = checkBalance(user, totalPrice);

    expect(totalPrice).toBe(70);
    expect(isStockValid).toBe(true);
    expect(isBalanceEnough).toBe(true);
  });

  test('should reject order if stock is insufficient', () => {
    const orderItems = [
      { productId: '1', quantity: 10, price: 20 },
      { productId: '2', quantity: 1, price: 30 },
    ];
    const products = [
      { id: '1', stock: 5, price: 20 },
      { id: '2', stock: 3, price: 30 },
    ];

    const isStockValid = validateStock(orderItems, products);

    expect(isStockValid).toBe(false);
  });

  test('should reject order if funds are insufficient', () => {
    const user = { id: 'user1', balance: 50 };
    const orderItems = [
      { productId: '1', quantity: 2, price: 20 },
      { productId: '2', quantity: 1, price: 30 },
    ];

    const totalPrice = calculateTotalPrice(orderItems);
    const isBalanceEnough = checkBalance(user, totalPrice);

    expect(totalPrice).toBe(70);
    expect(isBalanceEnough).toBe(false);
  });
});
