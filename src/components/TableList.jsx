import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalForm from "./ModalForm";

const TableList = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Handle adding a product
  const handleAddProduct = async (formData) => {
    if (!formData) {
      setShowModal(false); // Close modal on cancel
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_API_URL}/api/products`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowModal(false);
      // Refresh products
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  return (
    <div>
      <h2>Products</h2>
      <button onClick={() => setShowModal(true)}>Add Product</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>{product.isactive ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && <ModalForm onSubmit={handleAddProduct} />}
    </div>
  );
};

export default TableList;