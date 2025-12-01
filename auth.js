let currentUser = null;
let userCart = [];
let allUsers = []; // Store all registered users in memory

// Initialize on page load: Use a slight delay to ensure the DOM elements (like .nav-right) are fully processed by index.html.
document.addEventListener("DOMContentLoaded", () => {
  // Use setTimeout to defer execution slightly, helping stability.
  setTimeout(() => {
    updateAuthUI();
    updateVaultDisplay();
  }, 50);
});

// Update UI based on auth state
function updateAuthUI() {
  const navRight = document.querySelector(".nav-right");
  if (!navRight) return;

  // Remove existing auth elements
  document.getElementById("authButton")?.remove();
  document.getElementById("userInfo")?.remove();

  if (currentUser) {
    // Show user info and logout
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
    // Prepend user info, ensuring it's before the vault icon if present
    navRight.insertBefore(userInfo, navRight.firstChild);
  } else {
    // Show login button
    const authButton = document.createElement("button");
    authButton.id = "authButton";
    authButton.className = "auth-button";
    authButton.textContent = "🔐 Login / Register";
    authButton.onclick = showAuthModal;
    navRight.insertBefore(authButton, navRight.firstChild);
  }
}

// Show authentication modal
function showAuthModal() {
  const existingModal = document.getElementById("authModal");
  if (existingModal) existingModal.remove();

  const modal = document.createElement("div");
  modal.id = "authModal";
  modal.className = "auth-modal";
  modal.innerHTML = `
    <div class="auth-modal-overlay" onclick="closeAuthModal()"></div>
    <div class="auth-modal-content">
      <button class="auth-modal-close" onclick="closeAuthModal()">×</button>
      
      <div class="auth-header">
        <h2 id="authTitle">🔐 Villain Login</h2>
        <p id="authSubtitle">Access your evil arsenal</p>
      </div>

      <div class="auth-tabs">
        <button class="auth-tab active" onclick="switchAuthMode('login')">Login</button>
        <button class="auth-tab" onclick="switchAuthMode('register')">Register</button>
      </div>

      <form id="authForm" onsubmit="handleAuthSubmit(event)">
        <div class="form-group">
          <label>📧 Email</label>
          <input type="email" id="authEmail" required placeholder="villain@darkside.com">
          <span class="error-message" id="emailError"></span>
        </div>

        <div class="form-group" id="usernameGroup" style="display: none;">
          <label>👤 Username</label>
          <input type="text" id="authUsername" placeholder="DarkLord2024">
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
          Enter The Vault
        </button>
      </form>

      <div class="auth-toggle">
        <p id="authToggleText">
          Don't have an account? 
          <a href="#" onclick="switchAuthMode('register'); return false;">Register here</a>
        </p>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  // Short delay for CSS transition hook
  setTimeout(() => modal.classList.add("active"), 10);
}

// Close authentication modal
function closeAuthModal() {
  const modal = document.getElementById("authModal");
  if (modal) {
    modal.classList.remove("active");
    // Wait for the CSS transition to finish before removing from DOM
    setTimeout(() => modal.remove(), 300);
  }
}

// Switch between login and register modes
function switchAuthMode(mode) {
  const isLogin = mode === "login";

  document.getElementById("authTitle").textContent = isLogin
    ? "🔐 Villain Login"
    : "🦹‍♂️ Join The Dark Side";
  document.getElementById("authSubtitle").textContent = isLogin
    ? "Access your evil arsenal"
    : "Create your villain account";

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
    ? "Enter The Vault"
    : "Join The Dark Side";

  document.getElementById("authToggleText").innerHTML = isLogin
    ? 'Don\'t have an account? <a href="#" onclick="switchAuthMode(\'register\'); return false;">Register here</a>'
    : 'Already a villain? <a href="#" onclick="switchAuthMode(\'login\'); return false;">Login here</a>';

  clearAuthErrors();

  const usernameInput = document.getElementById("authUsername");
  if (!isLogin) {
    usernameInput.setAttribute("required", "required");
  } else {
    usernameInput.removeAttribute("required");
  }
}

// Handle form submission
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

// Perform login
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
  // Use the global window.showNotification for consistent UI/UX
  window.showNotification(
    `Welcome back, ${user.username}! Your evil plans await. 🗝️`
  );
}

// Perform registration
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

  // Auto login
  currentUser = { email: newUser.email, username: newUser.username };
  userCart.length = 0; // Initialize empty cart

  closeAuthModal();
  updateAuthUI();
  updateVaultDisplay();
  // Use the global window.showNotification for consistent UI/UX
  window.showNotification(`Welcome to the dark side, ${username}! 🦹‍♂️`);
}

// Handle logout
function handleLogout() {
  if (currentUser) {
    // Save current cart state back to user's record
    const user = allUsers.find((u) => u.email === currentUser.email);
    if (user) {
      // Perform a deep copy of the cart to save it correctly
      user.cart = [...userCart];
    }
  }

  currentUser = null;
  userCart.length = 0; // Clear the userCart array after saving/logging out

  updateAuthUI();
  updateVaultDisplay();
  // Use the global window.showNotification for consistent UI/UX
  window.showNotification(
    "You have been logged out. Your progress is saved. 👋"
  );
}

// Update vault display
function updateVaultDisplay() {
  const vaultContent = document.getElementById("vaultContent");
  const vaultCount = document.getElementById("vaultCount");
  const vaultFooter = document.getElementById("vaultFooter");
  const vaultTotal = document.getElementById("vaultTotal");

  if (!vaultContent) return;

  if (userCart.length === 0) {
    vaultContent.innerHTML = `
      <div class="vault-empty">
        <div class="vault-empty-icon">🔒</div>
        <p class="vault-empty-text">
          Your vault is empty.<br>Add items to begin your villain collection.
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

    if (vaultFooter) vaultFooter.style.display = "flex"; // Changed to flex for proper alignment
    const total = userCart.reduce((sum, item) => sum + (item.price || 0), 0);
    if (vaultTotal) vaultTotal.textContent = `$${total.toFixed(2)}`;
  }

  if (vaultCount) vaultCount.textContent = userCart.length;

  // Also call window.updateVault if it exists (defined in script.js for ARIA updates)
  if (window.updateVault) {
    window.updateVault();
  }
}

// Remove item from cart
function removeFromUserCart(index) {
  if (index >= 0 && index < userCart.length) {
    const productName = userCart[index].product;
    userCart.splice(index, 1);
    updateVaultDisplay();
    // Use the global window.showNotification for consistent UI/UX
    window.showNotification(`${productName} removed from vault 🗑️`);
  }
}

// Add to vault with auth check
function addToVaultWithAuth(product, price, icon) {
  if (!currentUser) {
    showAuthModal();
    // Use the global window.showNotification for consistent UI/UX
    window.showNotification(
      "Please login to add items to your vault 🔐",
      "error"
    );
    return;
  }

  userCart.push({ product, price: parseFloat(price), icon });
  updateVaultDisplay();

  // Use the global window.showNotification for consistent UI/UX
  window.showNotification(`${product} secured in vault! 🗝️`);
}

// Utility functions (moved to be globally accessible if they weren't already)
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

// This notification function will be REMOVED as it conflicts with script.js's notification.
// We are ensuring the notification in script.js is used universally.
// The next section will update script.js to expose its superior notification system.

// Make functions globally accessible (CRITICAL for index.html onclicks)
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
window.userCart = userCart; // Expose for script.js
// NOTE: We are intentionally *not* defining showNotification her
