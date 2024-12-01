/**
 * @component ResetPass
 * @description Handles password reset functionality using Firebase Authentication
 * 
 * Features:
 * - Current password verification
 * - New password validation
 * - Password confirmation matching
 * - Success/error message display
 * - Automatic redirect after success
 * 
 * Security measures:
 * - Re-authentication before password change
 * - Password confirmation check
 * - Error handling for invalid credentials
 */

import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, updatePassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const ResetPass = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const auth = getAuth();

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    try {
      // First verify the current credentials
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        currentPassword
      );
      
      // Then update the password
      await updatePassword(userCredential.user, newPassword);
      setMessage('Password updated successfully!');
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        setError('Invalid email or password');
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div className="page">
      <div className="page__content">
        <div className="auth-container">
          <header className="header">
            <h2 className="header__title">Change Password</h2>
          </header>
          
          <div className="form">
            {message && <p className="alert alert--success">{message}</p>}
            {error && <p className="alert alert--danger">{error}</p>}
            <form onSubmit={handlePasswordChange}>
              <div className="form__group">
                <label>Email:</label>
                <input
                  className="form__input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form__group">
                <label>Current Password:</label>
                <input
                  className="form__input"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form__group">
                <label>New Password:</label>
                <input
                  className="form__input"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form__group">
                <label>Confirm New Password:</label>
                <input
                  className="form__input"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form__button-group">
                <button className="btn btn--primary" type="submit">Change Password</button>
              </div>
            </form>
            <div className="form__footer">
              <p>Remember your password? <button className="btn btn--link" onClick={() => navigate('/login')}>Back to Login</button></p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPass;
