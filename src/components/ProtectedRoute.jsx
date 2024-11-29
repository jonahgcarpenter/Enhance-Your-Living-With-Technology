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