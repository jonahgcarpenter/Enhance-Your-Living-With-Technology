import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';
import App from './App.jsx';
import Login from './components/Login';
import Signup from './components/Signup';
import HomePage from './components/HomePage';
import CatalogPage from './components/CatalogPage';
import DevicePage from './components/DevicePage';
import EcosystemPage from './components/EcosystemPage';
import SecurityPage from './components/SecurityPage';
import ResetPass from './components/ResetPass';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/catalog" element={<ProtectedRoute><CatalogPage /></ProtectedRoute>} />
      <Route path="/devices" element={<ProtectedRoute><DevicePage /></ProtectedRoute>} />
      <Route path="/ecosystems" element={<ProtectedRoute><EcosystemPage /></ProtectedRoute>} />
      <Route path="/security" element={<ProtectedRoute><SecurityPage /></ProtectedRoute>} />
      <Route path="/reset-password" element={<ResetPass />} />
    </Route>
  ),
  {
    basename: '/~jgcarpe2/CS354/Project7/dist'
  }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
