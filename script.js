// hamburger menu toggle
const hamburger = document.querySelector(".hamburger");
const navLink = document.querySelector(".nav-link");

if (hamburger && navLink) {
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    const isActive = hamburger.classList.toggle("active");
    navLink.classList.toggle("active");
    hamburger.setAttribute("aria-expanded", isActive);

    // Prevent body scroll when menu is open
    document.body.style.overflow = isActive ? "hidden" : "";
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navLink.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove("active");
      navLink.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });
}

//Auto-stop glitch effect after 5 seconds
const glitchTrigger = document.getElementById("glitchTrigger");
let glitchTimeout;

if (glitchTrigger) {
  glitchTrigger.addEventListener("click", (e) => {
    e.stopPropagation();

    // Clear existing timeout
    if (glitchTimeout) clearTimeout(glitchTimeout);

    // Auto-stop after 5 seconds
    if (glitchActive) {
      glitchTimeout = setTimeout(() => {
        glitchTrigger.click(); // Toggle off
      }, 5000);
    }
  });
}

// Add loading states to buttons
function addLoadingState(button) {
  button.classList.add("loading");
  button.disabled = true;
  const originalText = button.textContent;
  button.textContent = "Loading...";

  return () => {
    button.classList.remove("loading");
    button.disabled = false;
    button.textContent = originalText;
  };
}

//vault animation
function openVault(e) {
  if (e) e.stopPropagation();

  // Add opening animation class
  vaultPanel.style.display = "flex";

  // Trigger reflow for animation
  void vaultPanel.offsetWidth;

  vaultPanel.classList.add("open");
  vaultOverlay.classList.add("active");
  document.body.style.overflow = "hidden";

  // Focus first interactive element for accessibility
  setTimeout(() => {
    const firstButton = vaultPanel.querySelector("button:not([disabled])");
    if (firstButton) firstButton.focus();
  }, 300);
}

// Debounced cart save
let saveTimeout;
function saveVault() {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    localStorage.setItem("villainVault", JSON.stringify(vault));
  }, 500); // Save after 500ms of inactivity
}

//error handling for vault operations
function addToVault(product, price, icon) {
  try {
    const existingItem = vault.find((item) => item.product === product);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      vault.push({
        product,
        price: parseFloat(price),
        icon,
        quantity: 1,
      });
    }

    saveVault();
    updateVault();
    showAddedNotification(product);
  } catch (error) {
    console.error("Failed to add item to vault:", error);
    showNotification("Failed to add item. Please try again.", "error");
  }
}

//Enhanced notification system
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${
      type === "error"
        ? "linear-gradient(135deg, rgb(180, 0, 0), rgb(120, 0, 0))"
        : "linear-gradient(135deg, rgb(139, 0, 0), rgb(220, 20, 60))"
    };
    color: white;
    padding: 15px 25px;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(255, 0, 0, 0.5);
    z-index: 10000;
    font-weight: bold;
    animation: slideIn 0.3s ease;
    max-width: 300px;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

//carousel with touch support
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
      // Swipe left - next
      document.getElementById("nextBtn")?.click();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right - prev
      document.getElementById("prevBtn")?.click();
    }
  }
}

//Lazy load video
const heroVideo = document.getElementById("heroVideo");
if (heroVideo) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          heroVideo.play().catch(() => {
            // Auto-play failed, show fallback
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

  // Add error handling
  heroVideo.addEventListener("error", () => {
    console.error("Video failed to load");
    // Hide video container or show fallback image
    heroVideo.style.display = "none";
  });
}

// Form validation
const authForm = document.getElementById("authForm");
if (authForm) {
  authForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = authForm.querySelector('button[type="submit"]');
    const removeLoading = addLoadingState(submitBtn);

    try {
      await handleAuthSubmit(e);
    } catch (error) {
      showNotification("Authentication failed. Please try again.", "error");
    } finally {
      removeLoading();
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

// Prevent cart duplication on page load
let isCartLoaded = false;

function initializeCart() {
  if (isCartLoaded) return;

  vault = JSON.parse(localStorage.getItem("villainVault")) || [];
  updateVault();
  isCartLoaded = true;
}

// Call on DOMContentLoaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeCart);
} else {
  initializeCart();
}

// keyboard navigation
document.addEventListener("keydown", (e) => {
  // Close modals with Escape key
  if (e.key === "Escape") {
    if (vaultPanel?.classList.contains("open")) {
      closeVault();
    }
    if (document.getElementById("authModal")?.classList.contains("active")) {
      closeAuthModal();
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
  setTimeout(() => (cartAnnouncer.textContent = ""), 1000);
}

// Update the updateVault function to include announcements
const originalUpdateVault = updateVault;
updateVault = function () {
  originalUpdateVault();
  const count = vault.reduce((sum, item) => sum + item.quantity, 0);
  announceCartUpdate(
    `Cart updated. ${count} item${count !== 1 ? "s" : ""} in cart.`
  );
};

// Performance optimization - throttle scroll events
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

// Apply to any scroll listeners
window.addEventListener(
  "scroll",
  throttle(() => {
    // Your scroll logic here
  }, 100)
);
