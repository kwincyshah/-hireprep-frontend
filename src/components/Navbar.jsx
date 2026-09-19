import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const categories = [
  { name: 'Accountancy', path: '/category/accountancy' },
  { name: 'Mechanical Engineering', path: '/category/mechanical-engineering' },
  { name: 'Digital Marketing', path: '/category/digital-marketing' },
  { name: 'Sales Executive', path: '/category/sales-executive' },
  { name: 'Manager', path: '/category/manager' }
];

function Navbar({ showCategoryDropdown, setShowCategoryDropdown }) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/';
  };

  const handleCategoryClick = (path) => {
    setShowCategoryDropdown(false);
    navigate(path);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li onClick={() => navigate('/home')}>Home</li>
        <li onClick={() => navigate('/home#about')}>About Us</li>
        <li
          className="navbar-category"
          onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
        >
          Category
          {showCategoryDropdown && (
            <ul className="category-dropdown">
              {categories.map((cat) => (
                <li key={cat.name} onClick={() => handleCategoryClick(cat.path)}>
                  {cat.name.toUpperCase()}
                </li>
              ))}
            </ul>
          )}
        </li>
        <li onClick={() => navigate('/home#contact')}>Contact</li>
      </ul>

      <div className="navbar-profile">
        <div
          className="profile-icon"
          onClick={() => setShowProfileDropdown(!showProfileDropdown)}
        >
          👤
        </div>
        {showProfileDropdown && (
          <ul className="profile-dropdown">
            <li onClick={handleLogout}>Logout</li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;