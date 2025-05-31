import { useState, useEffect } from 'react';

function ModalForm({ isOpen, onClose, OnSubmit, mode, productData }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    isactive: false,
  });

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && productData) {
        setFormData({
          name: productData.name || '',
          description: productData.description || '',
          price: productData.price || '',
          isactive: productData.isactive || false,
        });
      } else {
        // Reset form for 'add' mode or when no productData
        setFormData({
          name: '',
          description: '',
          price: '',
          isactive: false,
        });
      }
    }
  }, [isOpen, mode, productData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      price: parseFloat(formData.price),
    };
    OnSubmit(submitData);
    // No need to reset formData here; handled by useEffect on next open
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{mode === 'add' ? 'Add Product' : 'Edit Product'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter product name"
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
              className="textarea textarea-bordered w-full"
              placeholder="Enter product description"
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
              className="input input-bordered w-full"
              placeholder="Enter product price"
              step="0.01"
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
              {mode === 'add' ? 'Add' : 'Update'}
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalForm;