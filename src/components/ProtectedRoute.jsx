/**
 * @component ProtectedRoute
 * @description Higher-order component that protects routes from unauthorized access
 * 
 * Features:
 * - Authentication state monitoring
 * - Automatic redirect to login
 * - Handles logout state
 * - Loading state management
 * 
 * @param {ReactNode} children - The components to render if authenticated
 * @returns {ReactNode} Protected route content or redirect
 * 
 * Note: Uses Firebase Auth to manage authentication state
 */

import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const ProtectedRoute = ({ children }) => {
  const auth = getAuth();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isLoggingOut = localStorage.getItem('isLoggingOut') === 'true';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, [auth]);

  if (!authChecked) {
    return null; // or a loading spinner
  }

  if (!isAuthenticated && !isLoggingOut) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;