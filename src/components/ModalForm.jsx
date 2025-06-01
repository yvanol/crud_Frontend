import React, { useState, useEffect } from 'react';

const ModalForm = ({ isOpen, onSubmit, onClose, mode, productData }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    isactive: false,
  });

  // Prefill form data when productData changes
  useEffect(() => {
    if (productData && mode === 'edit') {
      setFormData({
        name: productData.name || '',
        description: productData.description || '',
        price: productData.price ? productData.price.toString() : '',
        isactive: productData.isactive || false,
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        isactive: false,
      });
    }
  }, [productData, mode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSubmit === 'function') {
      onSubmit({
        ...formData,
        price: parseFloat(formData.price) || 0,
      });
    } else {
      console.error('onSubmit is not a function:', onSubmit);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{mode === 'edit' ? 'Edit Product' : 'Add Product'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="textarea textarea-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              step="0.01"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Active</span>
              <input
                type="checkbox"
                name="isactive"
                checked={formData.isactive}
                onChange={handleChange}
                className="checkbox"
              />
            </label>
          </div>
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              {mode === 'edit' ? 'Update' : 'Add'} Product
            </button>
            <button type="button" onClick={onClose} className="btn btn-outline">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;