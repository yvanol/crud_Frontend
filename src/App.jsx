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
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [productData, setProductData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await axios.get(`${import.meta.env.VITE_API_URL}/api/products`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setIsAuthenticated(true);
          await fetchProducts();
        } catch (err) {
          console.error('Token verification failed:', err);
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };
    verifyAuth();
  }, []);

  const fetchProducts = async () => {
    try {
      console.log('Fetching products with token:', localStorage.getItem('token'));
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`, {
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
      setError(err.response?.data?.message || 'Failed to fetch products');
    }
  };

  const handleOpen = (mode, product = null) => {
    setModalMode(mode);
    setProductData(product);
    setIsOpen(true);
  };

  const handleSubmit = async (newProductData) => {
    if (!newProductData) {
      setIsOpen(false);
      setProductData(null);
      return;
    }
    try {
      if (modalMode === 'add') {
        console.log('Sending product data:', newProductData);
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/products`, newProductData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        console.log('Product added:', response.data);
        setTableData((prevData) => [...prevData, response.data]);
      } else {
        console.log('Updating product with ID:', productData.id);
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/products/${productData.id}`, newProductData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        console.log('Product updated:', response.data);
        setTableData((prevData) =>
          prevData.map((product) => (product.id === productData.id ? response.data : product))
        );
      }
      setError(null);
      setIsOpen(false);
      setProductData(null);
    } catch (err) {
      console.error('Error in handleSubmit:', {
        message: err.message,
        response: err.response ? err.response.data : null,
      });
      setError(err.response?.data?.message || 'Failed to save product');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setTableData([]);
  };

  if (isLoading) {
    return <div className="min-h-screen bg-base-200 flex items-center justify-center">Loading...</div>;
  }

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
                    onLogout={handleLogout}
                    setIsAuthenticated={setIsAuthenticated}
                  />
                  {error && <p className="text-error text-center mt-4">{error}</p>}
                  <TableList
                    setTableData={setTableData}
                    tableData={tableData}
                    handleOpen={handleOpen}
                    searchTerm={searchTerm}
                  />
                  {isOpen && (
                    <ModalForm
                      isOpen={isOpen}
                      onSubmit={handleSubmit}
                      onClose={() => {
                        setIsOpen(false);
                        setProductData(null);
                      }}
                      mode={modalMode}
                      productData={productData}
                    />
                  )}
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