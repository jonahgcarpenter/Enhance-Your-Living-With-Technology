const firebaseConfig = {
  apiKey: "AIzaSyCAeysvoz2Cbew2OwvuDnm5ERn21JKhJY4",
  authDomain: "csci-354-project-44dbc.firebaseapp.com",
  databaseURL: "https://csci-354-project-44dbc-default-rtdb.firebaseio.com",
  projectId: "csci-354-project-44dbc",
  storageBucket: "csci-354-project-44dbc.appspot.com",
  messagingSenderId: "890408551469",
  appId: "1:890408551469:web:248b4310ee581a2a63e4a4",
  measurementId: "G-WL6TBE3KPH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference the login form and add an event listener
document.getElementById('login').addEventListener('submit', submitLogin);

function submitLogin(e) {
  e.preventDefault();

  // Get values from the input fields
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Sign in with Firebase Authentication
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Successful login
      alert("Login successful!");

      // Redirect to index.html
      window.location.href = "index.html";
    })
    .catch((error) => {
      // Handle errors here
      console.error("Login error:", error.message);
      showAlert(error.message, "error"); // Display error in alert box
    });
}

// Function to show alert messages
function showAlert(message, type) {
  const alertBox = document.getElementById('alert');
  alertBox.textContent = message;
  alertBox.className = `alert ${type}`;
  alertBox.style.display = "block";
}
