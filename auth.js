// auth.js - WITH LOCALSTORAGE PERSISTENCE

let currentUser = null;
let userCart = [];
let allUsers = [];

const USER_DATA_KEY = "villainRising_allUsers";

// --- Utility Functions for LocalStorage ---
function loadUsers() {
  const savedUsers = localStorage.getItem(USER_DATA_KEY);
  if (savedUsers) {
    allUsers = JSON.parse(savedUsers);
  }
}

function saveUsers() {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(allUsers));
}

// --- Initialize: Load users from storage on startup ---
document.addEventListener("DOMContentLoaded", () => {
  loadUsers(); // Load existing user data
  setTimeout(() => {
    updateAuthUI();
    updateVaultDisplay();
  }, 50);
});

// Update UI based on auth state (unchanged)
function updateAuthUI() {
  const navRight = document.querySelector(".nav-right");
  if (!navRight) return;

  document.getElementById("authButton")?.remove();
  document.getElementById("userInfo")?.remove();

  if (currentUser) {
    const userInfo = document.createElement("div");
    userInfo.id = "userInfo";
    userInfo.className = "user-info";
    userInfo.innerHTML = `
      <div class="user-display">
        <span class="user-icon">👤</span>
        <span class="user-name">${currentUser.username}</span>
        <button class="logout-btn" onclick="handleLogout()">🚪 Logout</button>
      </div>
    `;
    navRight.insertBefore(userInfo, navRight.firstChild);
  } else {
    const authButton = document.createElement("button");
    authButton.id = "authButton";
    authButton.className = "auth-button";
    // Text will be updated by heroic-theme.js after initialization
    authButton.textContent = document.body.classList.contains("hero-theme")
      ? "🛡️ Access Sanctum"
      : "🔐 Login / Register";
    authButton.onclick = showAuthModal;
    navRight.insertBefore(authButton, navRight.firstChild);
  }
}

// Show authentication modal
function showAuthModal() {
  const existingModal = document.getElementById("authModal");
  if (existingModal) existingModal.remove();

  const isHero = document.body.classList.contains("hero-theme");

  const modal = document.createElement("div");
  modal.id = "authModal";
  modal.className = "auth-modal";

  // Dynamic Text Lookups
  const title = isHero ? "🛡️ Celestial Login" : "🔐 Villain Login";
  const subtitle = isHero
    ? "Access your Sacred Sanctuary"
    : "Access your evil arsenal";
  const submitText = isHero ? "Ascend to Sanctuary" : "Enter The Vault";
  const emailPlaceholder = isHero
    ? "angel@celestial.com"
    : "villain@darkside.com";
  const usernamePlaceholder = isHero ? "Archangel117" : "DarkLord2024";

  modal.innerHTML = `
    <div class="auth-modal-overlay" onclick="closeAuthModal()"></div>
    <div class="auth-modal-content">
      <button class="auth-modal-close" onclick="closeAuthModal()">×</button>
      
      <div class="auth-header">
        <h2 id="authTitle">${title}</h2>
        <p id="authSubtitle">${subtitle}</p>
      </div>

      <div class="auth-tabs">
        <button class="auth-tab active" onclick="switchAuthMode('login')">Login</button>
        <button class="auth-tab" onclick="switchAuthMode('register')">Register</button>
      </div>

      <form id="authForm" onsubmit="handleAuthSubmit(event)">
        <div class="form-group">
          <label>📧 Email</label>
          <input type="email" id="authEmail" required placeholder="${emailPlaceholder}">
          <span class="error-message" id="emailError"></span>
        </div>

        <div class="form-group" id="usernameGroup" style="display: none;">
          <label>👤 Username</label>
          <input type="text" id="authUsername" placeholder="${usernamePlaceholder}">
          <span class="error-message" id="usernameError"></span>
        </div>

        <div class="form-group">
          <label>🔑 Password</label>
          <div class="password-input-wrapper">
            <input type="password" id="authPassword" required placeholder="••••••••">
            <button type="button" class="toggle-password" onclick="togglePasswordVisibility('authPassword')">
              👁️
            </button>
          </div>
          <span class="error-message" id="passwordError"></span>
        </div>

        <div class="form-group" id="confirmPasswordGroup" style="display: none;">
          <label>🔑 Confirm Password</label>
          <div class="password-input-wrapper">
            <input type="password" id="authConfirmPassword" placeholder="••••••••">
            <button type="button" class="toggle-password" onclick="togglePasswordVisibility('authConfirmPassword')">
              👁️
            </button>
          </div>
          <span class="error-message" id="confirmPasswordError"></span>
        </div>

        <button type="submit" class="auth-submit-btn" id="authSubmitBtn">
          ${submitText}
        </button>
      </form>

      <div class="auth-toggle">
        <p id="authToggleText">
          ${isHero ? "Seeking enlightenment?" : "Don't have an account?"} 
          <a href="#" onclick="switchAuthMode('register'); return false;">Register here</a>
        </p>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add("active"), 10);
}

// Close authentication modal (unchanged)
function closeAuthModal() {
  const modal = document.getElementById("authModal");
  if (modal) {
    modal.classList.remove("active");
    setTimeout(() => modal.remove(), 300);
  }
}

// Switch between login and register modes (Now fully dynamic)
function switchAuthMode(mode) {
  const isLogin = mode === "login";
  const isHero = document.body.classList.contains("hero-theme");

  // Dynamic Text Lookups
  const registerTitle = isHero ? "🌟 Join The Light" : "🦹‍♂️ Join The Dark Side";
  const loginTitle = isHero ? "🛡️ Celestial Login" : "🔐 Villain Login";
  const registerSubtitle = isHero
    ? "Create your heroic avatar"
    : "Create your villain account";
  const loginSubtitle = isHero
    ? "Access your Sacred Sanctuary"
    : "Access your evil arsenal";
  const registerBtnText = isHero ? "Join The Ascent" : "Join The Dark Side";
  const loginBtnText = isHero ? "Ascend to Sanctuary" : "Enter The Vault";

  document.getElementById("authTitle").textContent = isLogin
    ? loginTitle
    : registerTitle;
  document.getElementById("authSubtitle").textContent = isLogin
    ? loginSubtitle
    : registerSubtitle;

  const tabs = document.querySelectorAll(".auth-tab");
  tabs.forEach((tab, index) => {
    if ((isLogin && index === 0) || (!isLogin && index === 1)) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });

  document.getElementById("usernameGroup").style.display = isLogin
    ? "none"
    : "block";
  document.getElementById("confirmPasswordGroup").style.display = isLogin
    ? "none"
    : "block";

  document.getElementById("authSubmitBtn").textContent = isLogin
    ? loginBtnText
    : registerBtnText;

  document.getElementById("authToggleText").innerHTML = isLogin
    ? `${
        isHero ? "Seeking enlightenment?" : "Don't have an account?"
      } <a href="#" onclick="switchAuthMode('register'); return false;">Register here</a>`
    : `${
        isHero ? "Already ascended?" : "Already a villain?"
      } <a href="#" onclick="switchAuthMode('login'); return false;">Login here</a>`;

  clearAuthErrors();

  const usernameInput = document.getElementById("authUsername");
  if (!isLogin) {
    usernameInput.setAttribute("required", "required");
  } else {
    usernameInput.removeAttribute("required");
  }
}

// Handle form submission (unchanged)
function handleAuthSubmit(event) {
  event.preventDefault();
  clearAuthErrors();

  const email = document.getElementById("authEmail").value.trim();
  const username = document.getElementById("authUsername").value.trim();
  const password = document.getElementById("authPassword").value;
  const confirmPassword = document.getElementById("authConfirmPassword").value;
  const isLogin =
    document.querySelector(".auth-tab.active").textContent === "Login";

  let hasError = false;

  if (!validateEmail(email)) {
    showError("emailError", "Please enter a valid email");
    hasError = true;
  }

  if (!isLogin && !username) {
    showError("usernameError", "Username is required");
    hasError = true;
  }

  if (password.length < 6) {
    showError("passwordError", "Password must be at least 6 characters");
    hasError = true;
  }

  if (!isLogin && password !== confirmPassword) {
    showError("confirmPasswordError", "Passwords do not match");
    hasError = true;
  }

  if (hasError) return;

  if (isLogin) {
    performLogin(email, password);
  } else {
    performRegister(email, username, password);
  }
}

// Perform login (MODIFIED: loads cart)
function performLogin(email, password) {
  const user = allUsers.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    showError("emailError", "Invalid email or password");
    return;
  }

  currentUser = { email: user.email, username: user.username };

  // Load this user's cart (deep copy for cart items)
  userCart.length = 0; // Clear the reference array
  userCart.push(...(user.cart || []).map((item) => ({ ...item })));

  closeAuthModal();
  updateAuthUI();
  updateVaultDisplay();
  window.showNotification(
    `Welcome back, ${user.username}! Your evil plans await. 🗝️`
  );
}

// Perform registration (MODIFIED: saves users)
function performRegister(email, username, password) {
  if (allUsers.find((u) => u.email === email)) {
    showError("emailError", "This email is already registered");
    return;
  }

  const newUser = {
    email,
    username,
    password,
    cart: [],
    createdAt: new Date().toISOString(),
  };

  allUsers.push(newUser);
  saveUsers(); // Save the updated user list to local storage

  // Auto login
  currentUser = { email: newUser.email, username: newUser.username };
  userCart.length = 0; // Initialize empty cart

  closeAuthModal();
  updateAuthUI();
  updateVaultDisplay();
  window.showNotification(`Welcome to the dark side, ${username}! 🦹‍♂️`);
}

// Handle logout (MODIFIED: saves cart and users)
function handleLogout() {
  if (currentUser) {
    // Save current cart state back to user's record
    const user = allUsers.find((u) => u.email === currentUser.email);
    if (user) {
      // Perform a deep copy of the cart to save it correctly
      user.cart = [...userCart];
      saveUsers(); // Save the updated cart to local storage
    }
  }

  currentUser = null;
  userCart.length = 0; // Clear the userCart array after saving/logging out

  updateAuthUI();
  updateVaultDisplay();
  window.showNotification(
    "You have been logged out. Your progress is saved. 👋"
  );
}

// Add to vault with auth check (MODIFIED: saves cart)
function addToVaultWithAuth(product, price, icon) {
  if (!currentUser) {
    showAuthModal();
    window.showNotification(
      "Please login to add items to your vault 🔐",
      "error"
    );
    return;
  }

  userCart.push({ product, price: parseFloat(price), icon });

  // If logged in, find the user and save the cart immediately
  const user = allUsers.find((u) => u.email === currentUser.email);
  if (user) {
    user.cart = [...userCart];
    saveUsers();
  }

  updateVaultDisplay();
  window.showNotification(`${product} secured in vault! 🗝️`);
}

// Remove item from cart (MODIFIED: saves cart)
function removeFromUserCart(index) {
  if (index >= 0 && index < userCart.length) {
    const productName = userCart[index].product;
    userCart.splice(index, 1);

    // If logged in, update the cart in the user list and save it
    if (currentUser) {
      const user = allUsers.find((u) => u.email === currentUser.email);
      if (user) {
        user.cart = [...userCart];
        saveUsers();
      }
    }

    updateVaultDisplay();
    window.showNotification(`${productName} removed from vault 🗑️`);
  }
}

// Update vault display (MODIFIED: dynamic empty text)
function updateVaultDisplay() {
  const vaultContent = document.getElementById("vaultContent");
  const vaultCount = document.getElementById("vaultCount");
  const vaultFooter = document.getElementById("vaultFooter");
  const vaultTotal = document.getElementById("vaultTotal");

  if (!vaultContent) return;

  const isHero = document.body.classList.contains("hero-theme");

  if (userCart.length === 0) {
    vaultContent.innerHTML = `
      <div class="vault-empty">
        <div class="vault-empty-icon">🔒</div>
        <p class="vault-empty-text">
          ${
            isHero
              ? "Your sanctuary is empty.<br>Add items to begin your heroic journey."
              : "Your vault is empty.<br>Add items to begin your villain collection."
          }
        </p>
      </div>
    `;
    if (vaultFooter) vaultFooter.style.display = "none";
  } else {
    vaultContent.innerHTML = userCart
      .map(
        (item, index) => `
      <div class="vault-item">
        <div class="vault-item-icon">${item.icon || "🗝️"}</div>
        <div class="vault-item-details">
          <div class="vault-item-name">${item.product || item.name}</div>
          <div class="vault-item-price">$${(item.price || 0).toFixed(2)}</div>
          <div class="vault-item-controls">
            <button class="remove-btn" onclick="removeFromUserCart(${index})">🗑️</button>
          </div>
        </div>
      </div>
    `
      )
      .join("");

    if (vaultFooter) vaultFooter.style.display = "flex";
    const total = userCart.reduce((sum, item) => sum + (item.price || 0), 0);
    if (vaultTotal) vaultTotal.textContent = `$${total.toFixed(2)}`;
  }

  if (vaultCount) vaultCount.textContent = userCart.length;

  if (window.updateVault) {
    window.updateVault();
  }
}

// Utility functions (unchanged)
function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }
}

function clearAuthErrors() {
  const errorElements = document.querySelectorAll(".error-message");
  errorElements.forEach((el) => {
    el.textContent = "";
    el.style.display = "none";
  });
}

function togglePasswordVisibility(inputId) {
  const input = document.getElementById(inputId);
  const button =
    input.nextElementSibling.querySelector("button") ||
    input.nextElementSibling;

  if (input.type === "password") {
    input.type = "text";
    button.textContent = "🙈";
  } else {
    input.type = "password";
    button.textContent = "👁️";
  }
}

// Make functions globally accessible (CRITICAL for html onclicks)
window.showAuthModal = showAuthModal;
window.closeAuthModal = closeAuthModal;
window.switchAuthMode = switchAuthMode;
window.handleAuthSubmit = handleAuthSubmit;
window.handleLogout = handleLogout;
window.togglePasswordVisibility = togglePasswordVisibility;
window.removeFromUserCart = removeFromUserCart;
window.addToVaultWithAuth = addToVaultWithAuth;
window.addToVault = addToVaultWithAuth;
window.updateVaultDisplay = updateVaultDisplay;
window.userCart = userCart;
