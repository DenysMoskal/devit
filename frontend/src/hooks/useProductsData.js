import { useState, useEffect, useCallback } from 'react';
import { productApi } from '../api/api';

export function useProductsData() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await productApi.getAllProducts();
      setProducts(response || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const selectProduct = useCallback(
    (productId) => {
      if (!productId) {
        setSelectedProduct(null);
        return null;
      }

      const product = products.find((p) => p._id === productId);
      setSelectedProduct(product || null);
      return product || null;
    },
    [products]
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    selectedProduct,
    loading,
    error,
    fetchProducts,
    selectProduct,
  };
}
