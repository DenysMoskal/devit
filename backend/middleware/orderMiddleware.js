import mongoose from 'mongoose';

export const calculateTotalPrice = async function (next) {
  if (this.isModified('quantity') || this.isNew) {
    try {
      const Product = mongoose.model('Product');
      const product = await Product.findById(this.productId);

      if (!product) {
        return next(new Error('Product not found'));
      }

      this.totalPrice = product.price * this.quantity;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
};
