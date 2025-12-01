// script.js - Fixed Version

// Hamburger menu toggle
const hamburger = document.querySelector(".hamburger");
const navLink = document.querySelector(".nav-link");

if (hamburger && navLink) {
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    const isActive = hamburger.classList.toggle("active");
    navLink.classList.toggle("active");
    hamburger.setAttribute("aria-expanded", isActive);
    document.body.style.overflow = isActive ? "hidden" : "";
  });

  document.addEventListener("click", (e) => {
    if (!navLink.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove("active");
      navLink.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });
}

// Glitch effect - stays on until toggled off
const glitchTrigger = document.getElementById("glitchTrigger");
const glitchOverlay = document.getElementById("glitchOverlay");
const staticNoise = document.getElementById("staticNoise");

if (glitchTrigger && glitchOverlay && staticNoise) {
  glitchTrigger.addEventListener("click", (e) => {
    e.stopPropagation();

    // Toggle glitch effects (stays on until clicked again)
    const isActive = glitchOverlay.classList.toggle("active");
    staticNoise.classList.toggle("active");

    // Apply glitch to all text elements
    const glitchText = document.querySelector(".glitch-text");
    if (glitchText) {
      glitchText.classList.toggle("active");
    }

    // Apply glitch to navbar elements
    const navLinks = document.querySelectorAll(".nav-link a, .logo");
    navLinks.forEach((link) => {
      link.classList.toggle("glitch-active");
    });

    // Update button text
    glitchTrigger.textContent = isActive ? "⚡ STOP HACK" : "⚡ HACK SITE";
  });
}

// Vault panel functions
const vaultIcon = document.getElementById("vaultIcon");
const vaultPanel = document.getElementById("vaultPanel");
const vaultOverlay = document.getElementById("vaultOverlay");
const vaultClose = document.getElementById("vaultClose");

function openVault(e) {
  if (e) e.stopPropagation();

  if (!vaultPanel || !vaultOverlay) return;

  vaultPanel.classList.add("open");
  vaultOverlay.classList.add("active");
  document.body.style.overflow = "hidden";

  // Update vault content when opened
  if (window.updateVaultDisplay) {
    window.updateVaultDisplay();
  }

  // Focus first interactive element for accessibility
  setTimeout(() => {
    const firstButton = vaultPanel.querySelector("button:not([disabled])");
    if (firstButton) firstButton.focus();
  }, 300);
}

function closeVault(e) {
  if (e) e.stopPropagation();

  if (!vaultPanel || !vaultOverlay) return;

  vaultPanel.classList.remove("open");
  vaultOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

// Attach vault event listeners
if (vaultIcon) {
  vaultIcon.addEventListener("click", openVault);
}

if (vaultClose) {
  vaultClose.addEventListener("click", closeVault);
}

if (vaultOverlay) {
  vaultOverlay.addEventListener("click", closeVault);
}

// Universal Notification System: Uses styles from auth-styles.css
function showNotification(message, type = "success") {
  // Use existing notification if present, or create a new one
  let notification = document.querySelector(".auth-notification");
  if (notification) {
    notification.remove(); // Remove old one immediately to prevent stacking conflicts
  }

  notification = document.createElement("div");
  // Use the CSS class defined in auth-styles.css
  notification.className = `auth-notification auth-notification-${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => notification.classList.add("show"), 10);

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}
// Expose the universal notification function globally
window.showNotification = showNotification;

// Carousel with touch support (assuming .carousel-container is in index.html)
let touchStartX = 0;
let touchEndX = 0;

const carouselContainer = document.querySelector(".carousel-container");
if (carouselContainer) {
  carouselContainer.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  carouselContainer.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      document.getElementById("nextBtn")?.click();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      document.getElementById("prevBtn")?.click();
    }
  }
}

// Lazy load video
const heroVideo = document.getElementById("heroVideo");
if (heroVideo) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          heroVideo.play().catch(() => {
            console.log("Video autoplay prevented");
          });
        } else {
          heroVideo.pause();
        }
      });
    },
    { threshold: 0.5 }
  );

  const heroSection = document.querySelector(".hero-section");
  if (heroSection) observer.observe(heroSection);

  // Fallback handler is now inline in index.html for robustness
  heroVideo.addEventListener("error", () => {
    console.error("Video failed to load");
    const fallback = document.getElementById("videoFallback");
    if (fallback) {
      fallback.style.display = "block";
      heroVideo.style.display = "none";
      heroVideo.parentElement.querySelector(".video-overlay").style.display =
        "block";
    }
  });
}

// Smooth scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const navbarHeight = 80;
      const targetPosition = target.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (vaultPanel?.classList.contains("open")) {
      closeVault();
    }
    // Check for authModal using its ID, which is created by auth.js
    if (document.getElementById("authModal")?.classList.contains("active")) {
      if (window.closeAuthModal) window.closeAuthModal();
    }
  }
});

// Add aria-live region for cart updates
const cartAnnouncer = document.createElement("div");
cartAnnouncer.setAttribute("aria-live", "polite");
cartAnnouncer.setAttribute("aria-atomic", "true");
cartAnnouncer.className = "sr-only";
cartAnnouncer.style.cssText = `
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  border: 0;
`;
document.body.appendChild(cartAnnouncer);

function announceCartUpdate(message) {
  cartAnnouncer.textContent = message;
  // Clear after a short delay so screen readers announce changes
  setTimeout(() => (cartAnnouncer.textContent = ""), 1000);
}

// Update vault function (called from auth.js after any cart change)
function updateVault() {
  if (window.updateVaultDisplay) {
    window.updateVaultDisplay();
  }

  const count = window.userCart ? window.userCart.length : 0;
  announceCartUpdate(
    `Vault updated. ${count} item${count !== 1 ? "s" : ""} in vault.`
  );
}
window.updateVault = updateVault;

// Performance optimization - throttle scroll events
// NOTE: This function is defined but not currently used. It is good practice to keep it.
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Email signup handler
const emailSignupForm = document.getElementById("emailSignupForm");
if (emailSignupForm) {
  emailSignupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = emailSignupForm.querySelector(".email-input");
    if (emailInput && emailInput.value) {
      window.showNotification(
        `Welcome to the dark side, ${emailInput.value}! 📧`
      );
      emailInput.value = "";
    }
  });
}

// Checkout handler
const checkoutBtn = document.getElementById("checkoutBtn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    if (window.userCart && window.userCart.length > 0) {
      window.showNotification("Checkout feature coming soon! 🛒");
      // Future: implement checkout logic
    }
  });
}

// Expose other functions globally
window.openVault = openVault;
window.closeVault = closeVault;
