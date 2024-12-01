import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import firebaseConfig from '../secrets/firebase';
import Footer from './Footer';

/**
 * @component Login
 * @description Handles user authentication using Firebase
 * 
 * Features:
 * - Email/password authentication
 * - Form validation
 * - Loading states
 * - Success/error messages
 * - Auto-redirect for authenticated users
 * 
 * Security features:
 * - Firebase authentication integration
 * - Session management
 * - Protected route redirection
 * - Loading state prevention of double submission
 */

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Check if user is already logged in
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple submissions
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Add delay before showing success
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess('Login successful! Redirecting...');
      
      // Wait longer before redirecting
      setTimeout(() => {
        setLoading(false);
        navigate('/');
      }, 2000);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="page__content">
        <div className="auth-container">
          <header className="header">
            <h2 className="header__title">Login</h2>
          </header>
          
          <div className="form">
            {error && <p className="alert alert--danger" style={{ margin: '1rem 0' }}>{error}</p>}
            {success && <p className="alert alert--success" style={{ margin: '1rem 0' }}>{success}</p>}
            <form onSubmit={handleLogin}>
              <div className="form__group">
                <label>Email:</label>
                <input
                  className="form__input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form__group">
                <label>Password:</label>
                <input
                  className="form__input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form__button-group">
                <button 
                  className="btn btn--primary" 
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>
            <div className="form__footer">
              <p>Don't have an account? <button className="btn btn--link" onClick={() => navigate('/signup')}>Sign Up</button></p>
              <p>Forgot your password? <button className="btn btn--link" onClick={() => navigate('/reset-password')}>Reset Password</button></p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
