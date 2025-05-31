import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import ModalForm from './components/ModalForm';
import NavBar from './components/NavBar';
import TableList from './components/TableList';
import Login from './components/Login';
import Signup from './components/Signup';
import axios from 'axios';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [productData, setProductData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const fetchProducts = async () => {
    try {
      console.log('Fetching products with token:', localStorage.getItem('token'));
      const response = await axios.get('/api/products', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTableData(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', {
        message: err.message,
        response: err.response ? err.response.data : null,
        status: err.response ? err.response.status : null,
      });
      setError(err.response?.data?.error || err.response?.data?.message || 'Failed to fetch products');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  const handleOpen = (mode, product = null) => {
    setIsOpen(true);
    setModalMode(mode);
    setProductData(mode === 'add' ? null : product); // Ensure productData is null for 'add' mode
  };

  const handleSubmit = async (newProductData) => {
    try {
      if (modalMode === 'add') {
        console.log('Sending product data:', newProductData);
        const response = await axios.post('/api/products', newProductData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        console.log('Product added:', response.data);
        setTableData((prevData) => [...prevData, response.data]);
      } else {
        console.log('Updating product with ID:', productData.id);
        const response = await axios.put(`/api/products/${productData.id}`, newProductData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        console.log('Product updated:', response.data);
        setTableData((prevData) =>
          prevData.map((product) => (product.id === productData.id ? response.data : product))
        );
      }
      setError(null);
      setIsOpen(false);
      setProductData(null); // Clear productData after submission
    } catch (error) {
      console.error('Error in handleSubmit:', {
        message: error.message,
        response: error.response ? error.response.data : null,
      });
      setError(error.response?.data?.message || 'Failed to save product');
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-base-200">
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <>
                  <NavBar
                    onOpen={() => handleOpen('add')}
                    onSearch={setSearchTerm}
                    setIsAuthenticated={setIsAuthenticated}
                  />
                  {error && <p className="text-error text-center mt-4">{error}</p>}
                  <TableList
                    setTableData={setTableData}
                    tableData={tableData}
                    handleOpen={handleOpen}
                    searchTerm={searchTerm}
                  />
                  <ModalForm
                    isOpen={isOpen}
                    OnSubmit={handleSubmit}
                    onClose={() => {
                      setIsOpen(false);
                      setProductData(null); // Clear productData on close
                    }}
                    mode={modalMode}
                    productData={productData}
                  />
                </>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;