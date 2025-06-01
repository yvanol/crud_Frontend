import axios from 'axios';
import { useState } from 'react';

export default function TableList({ handleOpen, searchTerm, tableData, setTableData }) {
  const [error, setError] = useState(null);

  const filteredData = tableData.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setTableData((prevData) => prevData.filter((product) => product.id !== id));
      } catch (err) {
        setError(err.message);
        console.error('Error deleting product:', err);
      }
    }
  };

  return (
    <>
      {error && <p className="text-error text-center">{error}</p>}
      <div className="overflow-x-auto mt-10 flex justify-center">
        <table className="table w-full max-w-4xl">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="hover">
            {filteredData.map((product) => (
              <tr key={product.id}>
                <th>{product.id}</th>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>
                  <button
                    className={`btn rounded-full w-20 ${
                      product.isactive ? 'btn-primary' : 'btn-outline btn-primary'
                    }`}
                  >
                    {product.isactive ? 'Available' : 'Sold'}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleOpen('edit', product)}
                    className="btn btn-secondary"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="btn btn-accent"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}