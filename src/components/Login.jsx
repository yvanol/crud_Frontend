import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login({ setIsAuthenticated }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending login request:', { name, password });
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password }),
      });
      const data = await response.json();
      console.log('Login response:', { status: response.status, data });
      if (response.ok) {
        setIsAuthenticated(true);
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        setError(data.message || 'Invalid name or password');
        console.log('Login error response:', data);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
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