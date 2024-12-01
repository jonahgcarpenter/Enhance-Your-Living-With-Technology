/**
 * Main Application Component for Smart Home
 * Author: Jonah Carpenter
 * Course: CSCI 354
 * 
 * 
 * Description:
 * This is the root component of the Smart Home application.
 * It handles the main routing logic and protected routes implementation.
 * The application uses React Router for navigation and implements
 * authentication-based route protection.
 * 
 * Components Overview:
 * - Homepage: Dashboard view for users
 * - CatalogPage: Display of available IoT devices
 * - DevicePage: Individual device management
 * - EcosystemPage: IoT ecosystem integration
 * - SecurityPage: Security settings and monitoring
 * - Authentication components (Login, Signup, ResetPass)
 */

import React from 'react';
import HomePage from './components/HomePage';
import CatalogPage from './components/CatalogPage';
import DevicePage from './components/DevicePage';
import EcosystemPage from './components/EcosystemPage';
import SecurityPage from './components/SecurityPage';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import ResetPass from './components/ResetPass';
import Signup from './components/Signup';

const App = () => {
  return (
    <>
      {/* Main routing configuration */}
      <Routes>
        {/* Public routes - Authentication related */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPass />} />

        {/* Protected routes - Require authentication */}
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/catalog" element={<ProtectedRoute><CatalogPage /></ProtectedRoute>} />
        <Route path="/devices" element={<ProtectedRoute><DevicePage /></ProtectedRoute>} />
        <Route path="/ecosystems" element={<ProtectedRoute><EcosystemPage /></ProtectedRoute>} />
        <Route path="/security" element={<ProtectedRoute><SecurityPage /></ProtectedRoute>} />
      </Routes>
    </>
  );
};

export default App;
