import React, { useState } from 'react';
import { orderApi } from '../../api/api';
import '../../styles/OrderForm.css';
import { useProductsData } from '../../hooks/useProductsData';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import ProductSelect from './ProductSelect';
import QuantityInput from './QuantityInput';
import PriceInfo from './PriceInfo';
import SubmitButton from './SubmitButton';

const OrderForm = ({ user, onOrderCreated }) => {
  const {
    products,
    selectedProduct,
    loading,
    error: productsError,
    fetchProducts,
    selectProduct,
  } = useProductsData();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formValues, setFormValues] = useState({
    productId: '',
    quantity: 1,
  });

  const handleProductChange = (e) => {
    const productId = e.target.value;
    selectProduct(productId);
    setFormValues({
      ...formValues,
      productId,
      quantity: 1,
    });
    setError(null);
  };

  const handleQuantityChange = (e) => {
    const quantity = Math.max(1, parseInt(e.target.value, 10) || 1);
    setFormValues({
      ...formValues,
      quantity,
    });
    setError(null);
  };

  const validateForm = () => {
    if (!user) {
      setError('Please select a user');
      return false;
    }

    if (!formValues.productId) {
      setError('Please select a product');
      return false;
    }

    if (selectedProduct && formValues.quantity > selectedProduct.stock) {
      setError(`Maximum available quantity: ${selectedProduct.stock}`);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);
    setError(null);

    try {
      const orderData = {
        userId: user._id,
        productId: formValues.productId,
        quantity: formValues.quantity,
      };

      await orderApi.createOrder(orderData);

      setFormValues({
        productId: '',
        quantity: 1,
      });
      selectProduct(null);

      await fetchProducts();
      await onOrderCreated();

      alert('Order created successfully!');
    } catch (err) {
      setError(err.error || 'Error creating order');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card order-form">
      <h2 className="card-title">Create Order</h2>
      <div className="card-content">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {error && <ErrorMessage message={error} />}
            {productsError && <ErrorMessage message={productsError} />}
            <form onSubmit={handleSubmit}>
              <ProductSelect
                products={products}
                value={formValues.productId}
                onChange={handleProductChange}
                disabled={!user || submitting}
              />

              <QuantityInput
                value={formValues.quantity}
                onChange={handleQuantityChange}
                disabled={!user || !selectedProduct || submitting}
              />

              {selectedProduct && (
                <PriceInfo
                  product={selectedProduct}
                  quantity={formValues.quantity}
                />
              )}

              <SubmitButton
                submitting={submitting}
                disabled={!user || !selectedProduct || submitting}
              />
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderForm;
