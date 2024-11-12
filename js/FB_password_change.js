// Initialize Firebase (use your configuration if different)
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

// Event listener for password change form submission
document.getElementById('password-change-form').addEventListener('submit', changePassword);

function changePassword(e) {
    e.preventDefault();

    // Get email, current password, and new password values
    const email = document.getElementById('email').value;
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;

    // Sign in the user with email and current password to reauthenticate
    const credential = firebase.auth.EmailAuthProvider.credential(email, currentPassword);
    firebase.auth().signInWithEmailAndPassword(email, currentPassword)
        .then((userCredential) => {
            // Reauthenticate with current credentials
            userCredential.user.reauthenticateWithCredential(credential)
                .then(() => {
                    // Update the user's password
                    return userCredential.user.updatePassword(newPassword);
                })
                .then(() => {
                    showAlert("Password changed successfully!", "success");
                })
                .catch((error) => {
                    console.error("Error updating password:", error.message);
                    showAlert("Error: " + error.message, "error");
                });
        })
        .catch((error) => {
            console.error("Reauthentication failed:", error.message);
            showAlert("Reauthentication failed: " + error.message, "error");
        });
}

// Function to display alert messages
function showAlert(message, type) {
    const alertBox = document.getElementById('alert');
    alertBox.textContent = message;
    alertBox.className = `alert ${type === "success" ? "success" : "error"}`;
    alertBox.style.display = "block";
}
