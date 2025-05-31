import { Link, useNavigate } from 'react-router-dom';

export default function NavBar({ onOpen, onSearch, setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    onSearch(searchValue);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="navbar bg-base-100 shadow-md rounded-full p-2 pt-10 flex items-center justify-between">
      <div className="navbar flex-grow flex items-center justify-center">
        <Link to="/" className="text-xl pl-10">Product Management</Link>
        <div className="form-control mx-2">
          <input
            type="text"
            placeholder="Search"
            onChange={handleSearchChange}
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <button onClick={onOpen} className="btn btn-primary">Add Product</button>
        <button onClick={handleLogout} className="btn btn-ghost ml-2">Logout</button>
      </div>
    </div>
  );
}