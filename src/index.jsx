import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Ensure the App component exists in `src/App.jsx`
import './styles.css'; // Optional: Only include if `index.css` exists

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Ensure your `index.html` has a <div id="root"></div>
);
