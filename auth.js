// Authentication State
let currentUser = null;
let userCart = [];

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  initializeAuth();
  updateAuthUI();
  loadUserCart();
});

// Initialize authentication
function initializeAuth() {
  const savedUser = JSON.parse(
    localStorage.getItem("villainCurrentUser") || "null"
  );
  if (savedUser) {
    currentUser = savedUser;
  }
}

// Load user's cart
function loadUserCart() {
  if (currentUser) {
    userCart = JSON.parse(
      localStorage.getItem(`villainCart_${currentUser.email}`) || "[]"
    );
    updateVaultDisplay();
  }
}

// Save user's cart
function saveUserCart() {
  if (currentUser) {
    localStorage.setItem(
      `villainCart_${currentUser.email}`,
      JSON.stringify(userCart)
    );
  }
}

// Update UI based on auth state
function updateAuthUI() {
  const navRight = document.querySelector(".nav-right");

  // Remove existing auth button if present
  const existingAuthBtn = document.getElementById("authButton");
  if (existingAuthBtn) existingAuthBtn.remove();

  const existingUserInfo = document.getElementById("userInfo");
  if (existingUserInfo) existingUserInfo.remove();

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
  // Remove existing modal if present
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
          <label>🔒 Password</label>
          <div class="password-input-wrapper">
            <input type="password" id="authPassword" required placeholder="••••••••">
            <button type="button" class="toggle-password" onclick="togglePasswordVisibility('authPassword')">
              👁️
            </button>
          </div>
          <span class="error-message" id="passwordError"></span>
        </div>

        <div class="form-group" id="confirmPasswordGroup" style="display: none;">
          <label>🔒 Confirm Password</label>
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
  setTimeout(() => modal.classList.add("active"), 10);
}

// Close authentication modal
function closeAuthModal() {
  const modal = document.getElementById("authModal");
  if (modal) {
    modal.classList.remove("active");
    setTimeout(() => modal.remove(), 300);
  }
}

// Switch between login and register modes
function switchAuthMode(mode) {
  const isLogin = mode === "login";

  // Update title
  document.getElementById("authTitle").textContent = isLogin
    ? "🔐 Villain Login"
    : "🦹‍♂️ Join The Dark Side";
  document.getElementById("authSubtitle").textContent = isLogin
    ? "Access your evil arsenal"
    : "Create your villain account";

  // Update tabs
  const tabs = document.querySelectorAll(".auth-tab");
  tabs.forEach((tab, index) => {
    if ((isLogin && index === 0) || (!isLogin && index === 1)) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });

  // Show/hide fields
  document.getElementById("usernameGroup").style.display = isLogin
    ? "none"
    : "block";
  document.getElementById("confirmPasswordGroup").style.display = isLogin
    ? "none"
    : "block";

  // Update submit button
  document.getElementById("authSubmitBtn").textContent = isLogin
    ? "Enter The Vault"
    : "Join The Dark Side";

  // Update toggle text
  document.getElementById("authToggleText").innerHTML = isLogin
    ? 'Don\'t have an account? <a href="#" onclick="switchAuthMode(\'register\'); return false;">Register here</a>'
    : 'Already a villain? <a href="#" onclick="switchAuthMode(\'login\'); return false;">Login here</a>';

  // Clear errors
  clearAuthErrors();

  // Set required attribute on username
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

  // Validate
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
  const users = JSON.parse(localStorage.getItem("villainUsers") || "[]");
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    showError("emailError", "Invalid email or password");
    return;
  }

  currentUser = { email: user.email, username: user.username };
  localStorage.setItem("villainCurrentUser", JSON.stringify(currentUser));

  closeAuthModal();
  updateAuthUI();
  loadUserCart();
  showNotification(`Welcome back, ${user.username}! Your evil plans await. 🗝️`);
}

// Perform registration
function performRegister(email, username, password) {
  const users = JSON.parse(localStorage.getItem("villainUsers") || "[]");

  if (users.find((u) => u.email === email)) {
    showError("emailError", "This email is already registered");
    return;
  }

  const newUser = {
    email,
    username,
    password, // In production, this should be hashed
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  localStorage.setItem("villainUsers", JSON.stringify(users));

  // Auto login
  currentUser = { email: newUser.email, username: newUser.username };
  localStorage.setItem("villainCurrentUser", JSON.stringify(currentUser));

  closeAuthModal();
  updateAuthUI();
  loadUserCart();
  showNotification(`Welcome to the dark side, ${username}! 🦹‍♂️`);
}

// Handle logout
function handleLogout() {
  if (currentUser) {
    saveUserCart();
  }

  currentUser = null;
  userCart = [];
  localStorage.removeItem("villainCurrentUser");

  updateAuthUI();
  updateVaultDisplay();
  showNotification("You have been logged out. Your progress is saved. 💀");
}

// Integrate with existing vault system
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
    vaultFooter.style.display = "none";
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

    vaultFooter.style.display = "block";
    const total = userCart.reduce((sum, item) => sum + (item.price || 0), 0);
    vaultTotal.textContent = `$${total.toFixed(2)}`;
  }

  vaultCount.textContent = userCart.length;
}

// Remove item from cart
function removeFromUserCart(index) {
  userCart.splice(index, 1);
  saveUserCart();
  updateVaultDisplay();
  showNotification("Item removed from vault 🗑️");
}

// Override existing addToVault function
function addToVaultWithAuth(product, price, icon) {
  if (!currentUser) {
    showAuthModal();
    showNotification("Please login to add items to your vault 🔐");
    return;
  }

  userCart.push({ product, price: parseFloat(price), icon });
  saveUserCart();
  updateVaultDisplay();
  showNotification(`${product} secured in vault! 🗝️`);
}

// Utility functions
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
  const button = input.nextElementSibling;

  if (input.type === "password") {
    input.type = "text";
    button.textContent = "🙈";
  } else {
    input.type = "password";
    button.textContent = "👁️";
  }
}

function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "auth-notification";
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => notification.classList.add("show"), 10);

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Make functions globally accessible
window.showAuthModal = showAuthModal;
window.closeAuthModal = closeAuthModal;
window.switchAuthMode = switchAuthMode;
window.handleAuthSubmit = handleAuthSubmit;
window.handleLogout = handleLogout;
window.togglePasswordVisibility = togglePasswordVisibility;
window.removeFromUserCart = removeFromUserCart;
window.addToVaultWithAuth = addToVaultWithAuth;
