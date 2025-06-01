import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ onOpen, onSearch, onLogout }) => {
  return (
    <div className="navbar bg-base-100 shadow">
      <div className="flex-1">
        <Link to="/home" className="btn btn-ghost normal-case text-xl">Product Manager</Link>
      </div>
      <div className="flex-none gap-2">
        <Link to="/home" className="btn btn-ghost">Home</Link>
        <Link to="/about" className="btn btn-ghost">About</Link>
        <div className="form-control">
          <input
            type="text"
            placeholder="Search products..."
            onChange={(e) => onSearch(e.target.value)}
            className="input input-bordered"
          />
        </div>
        <button onClick={onOpen} className="btn btn-primary">
          Add Product
        </button>
        <button onClick={onLogout} className="btn btn-outline btn-error">
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavBar;