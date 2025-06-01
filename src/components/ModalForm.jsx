import React, { useState } from 'react';

const ModalForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    isactive: false,
  });

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
      onSubmit(formData); // Call onSubmit with form data
    } else {
      console.error('onSubmit is not a function:', onSubmit);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          step="0.01"
          required
        />
        <label>
          <input
            type="checkbox"
            name="isactive"
            checked={formData.isactive}
            onChange={handleChange}
          />
          Active
        </label>
        <button type="submit">Add Product</button>
        <button type="button" onClick={() => onSubmit(null)}>Cancel</button>
      </form>
    </div>
  );
};

export default ModalForm;