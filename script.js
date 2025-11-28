// ===========================================
// UNIFIED VAULT SYSTEM WITH LOCALSTORAGE
// ===========================================

// Video pause when not visible (performance boost)
const heroVideo = document.getElementById("heroVideo");
if (heroVideo) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        heroVideo.play();
      } else {
        heroVideo.pause();
      }
    });
  });
  observer.observe(document.querySelector(".hero-section"));
}

// ===========================================
// HAMBURGER MENU FUNCTIONALITY
// ===========================================
const hamburger = document.querySelector(".hamburger");
const navLink = document.querySelector(".nav-link");

hamburger.addEventListener("click", () => {
  const isActive = hamburger.classList.toggle("active");
  navLink.classList.toggle("active");
  hamburger.setAttribute("aria-expanded", isActive);
});

const navLinks = document.querySelectorAll(".nav-link a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLink.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

// Smooth scroll effect
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ===========================================
// GLITCH EFFECT FUNCTIONALITY
// ===========================================
const glitchTrigger = document.getElementById("glitchTrigger");
const glitchOverlay = document.getElementById("glitchOverlay");
const staticNoise = document.getElementById("staticNoise");
const glitchText = document.querySelector(".glitch-text");
let glitchActive = false;
let shakeInterval;

glitchTrigger.addEventListener("click", (e) => {
  e.stopPropagation();
  glitchActive = !glitchActive;

  if (glitchActive) {
    glitchOverlay.classList.add("active");
    staticNoise.classList.add("active");
    if (glitchText) glitchText.classList.add("active");

    glitchTrigger.textContent = "🛑 STOP HACK";
    glitchTrigger.style.background =
      "linear-gradient(135deg, rgb(0, 139, 0), rgb(20, 220, 60))";
    glitchTrigger.style.borderColor = "rgba(0, 255, 0, 0.6)";
    glitchTrigger.style.boxShadow = "0 5px 20px rgba(0, 255, 0, 0.4)";

    shakeInterval = setInterval(() => {
      const sections = document.querySelectorAll(
        ".hero-section, .featured-section, .featured-products, .testimonials-section, .categories-section"
      );
      sections.forEach((section) => {
        if (section) section.classList.add("glitch-shake");
      });

      setTimeout(() => {
        sections.forEach((section) => {
          if (section) section.classList.remove("glitch-shake");
        });
      }, 500);
    }, 600);
  } else {
    glitchOverlay.classList.remove("active");
    staticNoise.classList.remove("active");
    if (glitchText) glitchText.classList.remove("active");
    clearInterval(shakeInterval);

    glitchTrigger.textContent = "⚡ HACK SITE";
    glitchTrigger.style.background =
      "linear-gradient(135deg, rgb(139, 0, 0), rgb(220, 20, 60))";
    glitchTrigger.style.borderColor = "rgba(255, 0, 0, 0.6)";
    glitchTrigger.style.boxShadow = "0 5px 20px rgba(255, 0, 0, 0.4)";
  }
});

// ===========================================
// UNIFIED VAULT SYSTEM WITH LOCALSTORAGE
// ===========================================

// Load vault from localStorage
let vault = JSON.parse(localStorage.getItem("villainVault")) || [];

const vaultIcon = document.getElementById("vaultIcon");
const vaultPanel = document.getElementById("vaultPanel");
const vaultOverlay = document.getElementById("vaultOverlay");
const vaultClose = document.getElementById("vaultClose");
const vaultCount = document.getElementById("vaultCount");
const vaultContent = document.getElementById("vaultContent");
const vaultFooter = document.getElementById("vaultFooter");
const vaultTotal = document.getElementById("vaultTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

// Save vault to localStorage
function saveVault() {
  localStorage.setItem("villainVault", JSON.stringify(vault));
}

// Open vault
function openVault(e) {
  if (e) e.stopPropagation();
  vaultPanel.classList.add("open");
  vaultOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Close vault
function closeVault(e) {
  if (e) e.stopPropagation();
  vaultPanel.classList.remove("open");
  vaultOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

vaultIcon.addEventListener("click", openVault);
vaultClose.addEventListener("click", closeVault);
vaultOverlay.addEventListener("click", closeVault);

// Prevent vault panel clicks from closing it
vaultPanel.addEventListener("click", (e) => {
  e.stopPropagation();
});

// Add to vault
function addToVault(product, price, icon) {
  const existingItem = vault.find((item) => item.product === product);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    vault.push({ product, price: parseFloat(price), icon, quantity: 1 });
  }

  saveVault();
  updateVault();
  showAddedNotification(product);
}

// Update vault display
function updateVault() {
  vaultCount.textContent = vault.reduce((sum, item) => sum + item.quantity, 0);

  if (vault.length === 0) {
    vaultContent.innerHTML = `
      <div class="vault-empty">
        <div class="vault-empty-icon">🔒</div>
        <p class="vault-empty-text">Your vault is empty.<br>Add items to begin your villain collection.</p>
      </div>
    `;
    vaultFooter.style.display = "none";
  } else {
    vaultContent.innerHTML = vault
      .map(
        (item) => `
      <div class="vault-item">
        <div class="vault-item-icon">🗝️</div>
        <div class="vault-item-details">
          <div class="vault-item-name">${item.product}</div>
          <div class="vault-item-price">$${item.price.toFixed(2)}</div>
          <div class="vault-item-controls">
            <div class="quantity-control">
              <button class="quantity-btn" onclick="changeQuantity('${
                item.product
              }', -1)">−</button>
              <span class="quantity-display">${item.quantity}</span>
              <button class="quantity-btn" onclick="changeQuantity('${
                item.product
              }', 1)">+</button>
            </div>
            <button class="remove-btn" onclick="removeFromVault('${
              item.product
            }')">🗑️</button>
          </div>
        </div>
      </div>
    `
      )
      .join("");

    vaultFooter.style.display = "block";
    const total = vault.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    vaultTotal.textContent = `$${total.toFixed(2)}`;
  }
}

// Change quantity
window.changeQuantity = function (product, change) {
  const item = vault.find((i) => i.product === product);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      vault = vault.filter((i) => i.product !== product);
    }
    saveVault();
    updateVault();
  }
};

// Remove from vault
window.removeFromVault = function (product) {
  vault = vault.filter((item) => item.product !== product);
  saveVault();
  updateVault();
};

// Show added notification
function showAddedNotification(product) {
  const notification = document.createElement("div");
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: linear-gradient(135deg, rgb(139, 0, 0), rgb(220, 20, 60));
    color: white;
    padding: 15px 25px;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(255, 0, 0, 0.5);
    z-index: 3000;
    font-weight: bold;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = `${product} secured in vault! 🗝️`;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// Add event listeners to all "Secure Item" buttons
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", function () {
    const product = this.dataset.product;
    const price = this.dataset.price;
    const icon = this.dataset.icon;
    addToVault(product, price, icon);

    // Button animation
    this.style.transform = "scale(0.95)";
    setTimeout(() => (this.style.transform = ""), 100);
  });
});

// Checkout button
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    alert(
      "🦹‍♂️ Proceeding to secure checkout... Your evil plans are coming together!"
    );
  });
}

// Initialize vault display on page load
updateVault();

// Add CSS animations for notification
const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ===========================================
// CAROUSEL FUNCTIONALITY
// ===========================================
const carousel = document.getElementById("carousel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const indicatorsContainer = document.getElementById("indicators");

if (carousel && prevBtn && nextBtn && indicatorsContainer) {
  let currentIndex = 0;
  const productCards = carousel.querySelectorAll(".product-card");
  const totalProducts = productCards.length;
  const itemsPerPage = 5;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  // Create indicators
  function createIndicators() {
    indicatorsContainer.innerHTML = "";
    for (let i = 0; i < totalPages; i++) {
      const indicator = document.createElement("span");
      indicator.classList.add("indicator");
      if (i === 0) indicator.classList.add("active");
      indicator.addEventListener("click", () => goToPage(i));
      indicatorsContainer.appendChild(indicator);
    }
  }

  // Update carousel position
  function updateCarousel() {
    const offset = -currentIndex * (100 / itemsPerPage);
    carousel.style.transform = `translateX(${offset}%)`;

    // Update indicators
    document.querySelectorAll(".indicator").forEach((ind, i) => {
      ind.classList.toggle("active", i === currentIndex);
    });
  }

  // Go to specific page
  function goToPage(page) {
    currentIndex = page;
    updateCarousel();
  }

  // Next page
  function nextPage() {
    currentIndex = (currentIndex + 1) % totalPages;
    updateCarousel();
  }

  // Previous page
  function prevPage() {
    currentIndex = (currentIndex - 1 + totalPages) % totalPages;
    updateCarousel();
  }

  // Event listeners
  nextBtn.addEventListener("click", nextPage);
  prevBtn.addEventListener("click", prevPage);

  // Initialize
  createIndicators();
}

// Override the addToVault function to use authentication
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", function () {
    const product = this.dataset.product;
    const price = this.dataset.price;
    const icon = this.dataset.icon;

    // Use the auth-aware function instead
    addToVaultWithAuth(product, price, icon);

    // Button animation
    this.style.transform = "scale(0.95)";
    setTimeout(() => (this.style.transform = ""), 100);
  });
});
