import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = getAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Successfully created account
      console.log('Account created successfully');
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="page">
      <div className="page__content">
        <div className="auth-container">
          <header className="header">
            <h2 className="header__title">Sign Up</h2>
          </header>
          
          <div className="form">
            {error && <p className="alert alert--danger">{error}</p>}
            <form onSubmit={handleSignup}>
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
                <label>Password:</label>
                <input
                  className="form__input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form__button-group">
                <button className="btn btn--primary" type="submit">Create Account</button>
              </div>
            </form>
            <div className="form__footer">
              <p>Already have an account? <button className="btn btn--link" onClick={() => navigate('/login')}>Login here</button></p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
