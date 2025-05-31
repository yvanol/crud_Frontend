import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      console.log('Sending signup request:', { name, password });
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password }),
      });
      const data = await response.json();
      console.log('Signup response:', { status: response.status, data });
      if (response.ok) {
        setSuccess('User created successfully! Redirecting to login...');
        setName('');
        setPassword('');
        setTimeout(() => navigate('/login'), 1000);
      } else {
        setError(data.message || 'Failed to create user');
        console.log('Signup error response:', data);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Signup fetch error:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center">Create Admin Account</h2>
          {error && <p className="text-error text-center">{error}</p>}
          {success && <p className="text-success text-center">{success}</p>}
          <form onSubmit={handleSignup} className="space-y-4">
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
                Sign Up
              </button>
            </div>
          </form>
          <p className="text-center mt-4">
            Already have an account?{' '}
            <Link to="/login" className="link link-primary">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;