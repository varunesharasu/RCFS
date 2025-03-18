// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Navbar.css';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const isLoggedIn = !!localStorage.getItem('token'); 
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
//       <Link to="/" className="nav-link">Home</Link>
//       <Link to="/rooms" className="nav-link">Rooms</Link>
//       <Link to="/about" className="nav-link">About</Link> {/* Added About Page */}
//       {isLoggedIn && <Link to="/dashboard" className="nav-link">Dashboard</Link>}
//       {!isLoggedIn && <Link to="/login" className="nav-link">Login</Link>}
//       {!isLoggedIn && <Link to="/register" className="nav-link">Register</Link>}
//       {isLoggedIn && <button className="logout-btn" onClick={handleLogout}>Logout</button>}
//     </nav>
//   );
// };

// export default Navbar;


// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import './Navbar.css';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [userData, setUserData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isScrolled, setIsScrolled] = useState(false);


//   useEffect(() => {
//     const fetchUserData = async () => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         try {
//           const response = await axios.get('http://localhost:5000/api/user', {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setUserData(response.data.user);
//         } catch (error) {
//           console.error('Error fetching user data:', error);
//           setUserData(null);
//         }
//       } else {
//         setUserData(null);
//       }
//       setIsLoading(false);
//     };

//     fetchUserData();
//   }, [location]); // Re-run on route changes

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setUserData(null);
//     navigate('/login');
//   };

//   if (isLoading) return <nav className="navbar">Loading...</nav>;

//   return (
//     <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
//       <Link to="/" className="nav-link">Home</Link>
//       <Link to="/rooms" className="nav-link">Rooms</Link>
//       <Link to="/about" className="nav-link">About</Link>
      
//       {userData ? (
//         <div className="user-section">
//           <Link to="/dashboard" className="nav-link">Dashboard</Link>
//           <div className="user-details">
//             <span>Logged in as: {userData.username}</span>
//             <button className="logout-btn" onClick={handleLogout}>Logout</button>
//           </div>
//         </div>
//       ) : (
//         <div className="auth-links">
//           <Link to="/login" className="nav-link">Login</Link>
//           <Link to="/register" className="nav-link">Register</Link>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('token');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navbarRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`navbar-container ${isScrolled ? 'scrolled' : ''}`} ref={navbarRef}>
      <div className="navbar-content">
        <div className="navbar-brand">
          <Link to="/" className="brand-link">
          <img src={require("../logo.png")} alt="Logo" className='brand-icon'/>

            <span className="brand-name">Royal Castle</span>
          </Link>
        </div>

        <button 
          className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`} 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <nav className={`navbar-links ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              >
                <span className="nav-icon">🏠</span>
                <span className="nav-text">Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/rooms" 
                className={`nav-link ${location.pathname === '/rooms' ? 'active' : ''}`}
              >
                <span className="nav-icon">🛏️</span>
                <span className="nav-text">Rooms</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/about" 
                className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
              >
                <span className="nav-icon">ℹ️</span>
                <span className="nav-text">About</span>
              </Link>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <Link 
                  to="/dashboard" 
                  className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                >
                  <span className="nav-icon">📊</span>
                  <span className="nav-text">Dashboard</span>
                </Link>
              </li>
            )}
          </ul>

          <div className="auth-section">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="auth-button login-button">
                  <span className="auth-icon">🔑</span>
                  <span>Login</span>
                </Link>
                <Link to="/register" className="auth-button register-button">
                  <span className="auth-icon">📝</span>
                  <span>Register</span>
                </Link>
              </>
            ) : (
              <button className="auth-button logout-button" onClick={handleLogout}>
                <span className="auth-icon">🚪</span>
                <span>Logout</span>
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
