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

// Event listener for form submission
document.getElementById('signup').addEventListener('submit', submitSignup);

function submitSignup(e) {
  e.preventDefault();

  // Get values
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  // Create a new user with Firebase Authentication
  firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
          alert("Signup successful!");
          console.log("User created:", userCredential.user);
      })
      .catch((error) => {
          console.error("Error signing up:", error.message);
          alert("Error: " + error.message);
      });
}
