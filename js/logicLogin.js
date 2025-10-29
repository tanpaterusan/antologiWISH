// --- Configuration ---
const USERS = [
  { username: "admin", password: "password123", role: "admin" },
  { username: "user", password: "user123", role: "user" },
  // You can add more users here!
];

// --- DOM Elements ---
const loginForm = document.getElementById("loginForm");
const adminDashboard = document.getElementById("adminDashboard");
const userDashboard = document.getElementById("userDashboard");
const messageEl = document.getElementById("message");
const logoutBtn1 = document.getElementById("logoutBtn");
const logoutBtn2 = document.getElementById("logoutBtn2");

// Key for storing the user's role in local storage
const ROLE_KEY = "userRole";
const IS_LOGGED_IN_KEY = "isLoggedIn";

// --- Functions ---

// 1. Check Login Status and Show Dashboard
const checkLoginStatus = () => {
  // Check if the user is marked as logged in and has a role
  const isLoggedIn = localStorage.getItem(IS_LOGGED_IN_KEY);
  const role = localStorage.getItem(ROLE_KEY);

  // Hide all main sections by default
  loginForm.style.display = "none";
  adminDashboard.style.display = "none";
  userDashboard.style.display = "none";

  if (isLoggedIn === "true" && role) {
    // User is logged in, show the appropriate dashboard
    if (role === "admin") {
      adminDashboard.style.display = "block";
    } else if (role === "user") {
      userDashboard.style.display = "block";
    }
  } else {
    // Not logged in, show the login form
    loginForm.style.display = "block";
  }
};

// 2. Handle Login Attempt
const handleLogin = (event) => {
  event.preventDefault();

  const usernameInput = document.getElementById("username").value.trim();
  const passwordInput = document.getElementById("password").value.trim();
  messageEl.textContent = ""; // Clear previous messages

  // Find the user in the USERS array
  const user = USERS.find(
    (u) => u.username === usernameInput && u.password === passwordInput
  );

  if (user) {
    // --- SUCCESSFUL LOGIN ---

    // 1. Store login status and role
    localStorage.setItem(IS_LOGGED_IN_KEY, "true");
    localStorage.setItem(ROLE_KEY, user.role);

    // 2. Redirect the user to page1.html
    window.location.href = "menu_admin/indexAdmin.html"; // <<< THIS IS THE KEY CHANGE

    // Note: The form reset is no longer needed since we are redirecting
  } else {
    // Failure: Display error message
    messageEl.textContent = "Invalid username or password.";
  }
};

// // 2. Handle Login Attempt (Modified)
// const handleLogin = (event) => {
//     event.preventDefault();

//     const usernameInput = document.getElementById('username').value.trim();
//     const passwordInput = document.getElementById('password').value.trim();
//     messageEl.textContent = '';

//     const user = USERS.find(u => u.username === usernameInput && u.password === passwordInput);

//     if (user) {
//         // 1. Store login status and role
//         localStorage.setItem(IS_LOGGED_IN_KEY, 'true');
//         localStorage.setItem(ROLE_KEY, user.role);

//         // 2. Determine the correct destination page
//         let destination = 'menu_user/index.html'; // Default for 'user'
//         if (user.role === 'admin') {
//             destination = 'menu_admin/indexAdmin.html';
//         }
//         // Note: You can add an 'else if (user.role === 'user')' if needed, but a default works.

//         // 3. Redirect the user
//         window.location.href = destination;
//     } else {
//         // Failure: Display error message
//         messageEl.textContent = 'Invalid username or password.';
//     }
// };

// 3. Handle Logout
const handleLogout = () => {
  // Remove login status and role from localStorage
  localStorage.removeItem(IS_LOGGED_IN_KEY);
  localStorage.removeItem(ROLE_KEY);

  // Re-render the UI (which will show the login form)
  checkLoginStatus();
};

// --- Event Listeners ---
loginForm.addEventListener("submit", handleLogin);
logoutBtn1.addEventListener("click", handleLogout);
logoutBtn2.addEventListener("click", handleLogout);

// --- Initialization ---
// Check login status when the page first loads or reloads
document.addEventListener("DOMContentLoaded", checkLoginStatus);
