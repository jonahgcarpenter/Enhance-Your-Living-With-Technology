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
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/catalog" element={<ProtectedRoute><CatalogPage /></ProtectedRoute>} />
        <Route path="/devices" element={<ProtectedRoute><DevicePage /></ProtectedRoute>} />
        <Route path="/ecosystems" element={<ProtectedRoute><EcosystemPage /></ProtectedRoute>} />
        <Route path="/security" element={<ProtectedRoute><SecurityPage /></ProtectedRoute>} />
        <Route path="/reset-password" element={<ResetPass />} />
      </Routes>
    </>
  );
};

export default App;
