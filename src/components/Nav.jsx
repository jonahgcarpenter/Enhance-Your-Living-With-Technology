/**
 * @component Nav
 * @description Main navigation component with responsive design
 * 
 * Features:
 * - Responsive hamburger menu
 * - Dynamic route links
 * - Animated menu transitions
 * - Logout functionality
 * - Click outside to close
 * 
 * Implementation details:
 * - Uses CSS transitions for smooth animations
 * - Manages body scroll during menu open
 * - Handles authentication state
 * - Provides visual feedback during logout
 */

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from 'firebase/auth';

const Nav = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.nav')) {
        closeMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
  }, [isMenuOpen]);

  const handleLogout = async () => {
    if (loading) return;
    setLoading(true);
    try {
      localStorage.setItem('isLoggingOut', 'true');
      await signOut(auth);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess('Logout successful! Redirecting...');
      
      setTimeout(() => {
        setLoading(false);
        navigate('/login');
        setTimeout(() => {
          localStorage.removeItem('isLoggingOut');
        }, 100);
      }, 2000);
    } catch (error) {
      console.error('Error signing out:', error);
      localStorage.removeItem('isLoggingOut');
      setLoading(false);
    }
  };

  return (
    <>
      {success && (
        <div className="alert alert--success" style={{ 
          margin: '0', 
          textAlign: 'center',
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          zIndex: 1000
        }}>
          {success}
        </div>
      )}
      <nav className="nav">
        <div className="nav__content">
          <div className="nav__logo">
            {/* Optional: Add your logo/brand here */}
          </div>
          
          <button 
            className={`hamburger-menu ${isMenuOpen ? 'is-open' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <div className={`nav__links ${isMenuOpen ? 'nav__links--open' : ''}`}>
            <Link className="nav__link" to="/" onClick={closeMenu}>Home</Link>
            <Link className="nav__link" to="/devices" onClick={closeMenu}>Devices</Link>
            <Link className="nav__link" to="/ecosystems" onClick={closeMenu}>Ecosystems</Link>
            <Link className="nav__link" to="/security" onClick={closeMenu}>Security</Link>
            <Link className="nav__link" to="/catalog" onClick={closeMenu}>Catalog</Link>
            <button 
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
                closeMenu();
              }} 
              className="btn btn--danger mobile-logout"
              disabled={loading}
            >
              {loading ? 'Logging out...' : 'Logout'}
            </button>
          </div>
          
          <button 
            onClick={handleLogout} 
            className="btn btn--danger desktop-logout"
            disabled={loading}
          >
            {loading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Nav;
