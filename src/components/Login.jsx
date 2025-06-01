import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // Added missing import

function Login({ setIsAuthenticated }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending login request:', { name });
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        name,
        password,
      });
      console.log('Login response:', { status: response.status, data: response.data });
      if (response.status === 200) {
        setIsAuthenticated(true);
        localStorage.setItem('token', response.data.token);
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid name or password');
      console.error('Login fetch error:', err);
    }
  };

  const handleSignupNavigation = () => {
    navigate('/signup');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center">Admin Login</h2>
          {error && <p className="text-error text-center">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Login
              </button>
            </div>
          </form>
          <div className="form-control mt-4">
            <button
              onClick={handleSignupNavigation}
              className="btn btn-primary w-full"
            >
              Sign Up
            </button>
          </div>
          <p className="text-center mt-2">
            Don't have an account?{' '}
            <Link to="/signup" className="link link-primary">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;