import Product from '../models/Product.js';
import User from '../models/User.js';
import { products } from '../static/products.js';
import { users } from '../static/users.js';
import mongoose from 'mongoose';

export const seedDatabase = async () => {
  try {
    const usersCount = await User.countDocuments();
    const productsCount = await Product.countDocuments();

    if (usersCount > 0 && productsCount > 0) {
      console.log('Database already seeded');
      return;
    }

    const createdUsers = await User.create(users);
    console.log(`Created ${createdUsers.length} users`);

    const createdProducts = await Product.create(products);
    console.log(`Created ${createdProducts.length} products`);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};
