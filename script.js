// script.js - Centralized Effect Handling with Complete Carousel Logic

// --- DOM ELEMENTS ---
const hamburger = document.querySelector(".hamburger");
const navLink = document.querySelector(".nav-link");
const effectTrigger = document.getElementById("effectTrigger");
const glitchOverlay = document.getElementById("glitchOverlay");
const staticNoise = document.getElementById("staticNoise");
const vaultIcon = document.getElementById("vaultIcon");
const vaultPanel = document.getElementById("vaultPanel");
const vaultOverlay = document.getElementById("vaultOverlay");
const vaultClose = document.getElementById("vaultClose");

// --- HAMBURGER MENU & KEYBOARD ---
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

// --- VAULT PANEL FUNCTIONS ---
function openVault(e) {
  if (e) e.stopPropagation();
  if (!vaultPanel || !vaultOverlay) return;
  vaultPanel.classList.add("open");
  vaultOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
  if (window.updateVaultDisplay) window.updateVaultDisplay();
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

if (vaultIcon) vaultIcon.addEventListener("click", openVault);
if (vaultClose) vaultClose.addEventListener("click", closeVault);
if (vaultOverlay) vaultOverlay.addEventListener("click", closeVault);

// Keyboard accessibility for vault
if (vaultIcon) {
  vaultIcon.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openVault();
    }
  });
}

// --- UNIVERSAL NOTIFICATION SYSTEM ---
function showNotification(message, type = "success") {
  let notification = document.querySelector(".auth-notification");
  if (notification) notification.remove();

  notification = document.createElement("div");
  notification.className = `auth-notification auth-notification-${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => notification.classList.add("show"), 10);
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}
window.showNotification = showNotification;

// --- GLITCH/DIVINE EFFECT LOGIC (NOW CENTRALIZED) ---

// 1. Glitch Effect (Villain Theme)
function toggleGlitchEffect() {
  if (!glitchOverlay || !staticNoise) return;

  const isActive = glitchOverlay.classList.toggle("active");
  staticNoise.classList.toggle("active");

  const glitchText = document.querySelector(".glitch-text");
  if (glitchText) glitchText.classList.toggle("active");

  const navLinks = document.querySelectorAll(".nav-link a, .logo");
  navLinks.forEach((link) => {
    link.classList.toggle("glitch-active");
  });

  if (effectTrigger) {
    effectTrigger.textContent = isActive ? "⚡ STOP HACK" : "⚡ HACK SITE";
  }
}

// 2. Divine Effect (Heroic Theme)
function toggleDivineEffect() {
  const divineOverlay = document.getElementById("divineOverlay");
  const holyGlow = document.getElementById("holyGlow");

  if (!divineOverlay || !holyGlow) return;

  const isActive = divineOverlay.classList.toggle("active");
  holyGlow.classList.toggle("active");

  const glitchText = document.querySelector(".glitch-text");
  if (glitchText) glitchText.classList.toggle("divine-active");

  const navLinks = document.querySelectorAll(".nav-link a, .logo");
  navLinks.forEach((link) => {
    link.classList.toggle("divine-glow-active");
  });

  if (effectTrigger) {
    effectTrigger.textContent = isActive ? "✨ CEASE LIGHT" : "✨ SUMMON LIGHT";
  }
}

// Helper to remove all effects when switching themes
function clearAllEffects() {
  // Clear Glitch
  if (glitchOverlay) glitchOverlay.classList.remove("active");
  if (staticNoise) staticNoise.classList.remove("active");
  const glitchText = document.querySelector(".glitch-text");
  if (glitchText) glitchText.classList.remove("active");
  document
    .querySelectorAll(".glitch-active")
    .forEach((el) => el.classList.remove("glitch-active"));

  // Clear Divine
  const divineOverlay = document.getElementById("divineOverlay");
  const holyGlow = document.getElementById("holyGlow");
  if (divineOverlay) divineOverlay.classList.remove("active");
  if (holyGlow) holyGlow.classList.remove("active");
  if (glitchText) glitchText.classList.remove("divine-active");
  document
    .querySelectorAll(".divine-glow-active")
    .forEach((el) => el.classList.remove("divine-glow-active"));
}
window.clearAllEffects = clearAllEffects;

// 3. Centralized Effect Trigger Handler
function handleEffectToggle(e) {
  e.stopPropagation();
  const isHero = document.body.classList.contains("hero-theme");

  clearAllEffects();

  if (isHero) {
    setTimeout(toggleDivineEffect, 50);
  } else {
    setTimeout(toggleGlitchEffect, 50);
  }
}

if (effectTrigger) {
  effectTrigger.addEventListener("click", handleEffectToggle);
}

// --- ACCESSIBILITY (Screen Reader Announcements) ---
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

function updateVault() {
  if (window.updateVaultDisplay) window.updateVaultDisplay();
  const count = window.userCart ? window.userCart.length : 0;
  announceCartUpdate(
    `Vault updated. ${count} item${count !== 1 ? "s" : ""} in vault.`
  );
}
window.updateVault = updateVault;

// --- PRODUCT CAROUSEL LOGIC (COMPLETE IMPLEMENTATION) ---
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("carousel");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const indicators = document.getElementById("indicators");

  if (!carousel || !prevBtn || !nextBtn) return; // Guard clause - exit if carousel doesn't exist

  const cards = Array.from(carousel.children);
  if (cards.length === 0) return; // No cards to display

  let currentIndex = 0;
  let cardsToShow = getCardsToShow();
  let totalSlides = Math.ceil(cards.length / cardsToShow);

  // Determine how many cards to show based on screen width
  function getCardsToShow() {
    const width = window.innerWidth;
    if (width <= 480) return 1;
    if (width <= 768) return 2;
    if (width <= 1200) return 3;
    return 4;
  }

  // Create indicator dots
  function createIndicators() {
    if (!indicators) return;
    indicators.innerHTML = ""; // Clear existing
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("div");
      dot.className = `indicator ${i === 0 ? "active" : ""}`;
      dot.addEventListener("click", () => goToSlide(i));
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      dot.setAttribute("role", "button");
      dot.setAttribute("tabindex", "0");
      indicators.appendChild(dot);
    }
  }

  // Update carousel position and visual state
  function updateCarousel(animate = true) {
    if (!carousel || cards.length === 0) return;

    const cardWidth = cards[0].offsetWidth;
    const gap = parseFloat(getComputedStyle(carousel).gap) || 32; // Get gap from CSS
    const offset = -(currentIndex * cardsToShow * (cardWidth + gap));

    if (animate) {
      carousel.style.transition = "transform 0.5s ease-in-out";
    } else {
      carousel.style.transition = "none";
    }

    carousel.style.transform = `translateX(${offset}px)`;

    // Update indicator dots
    if (indicators) {
      Array.from(indicators.children).forEach((dot, idx) => {
        dot.classList.toggle("active", idx === currentIndex);
        dot.setAttribute(
          "aria-current",
          idx === currentIndex ? "true" : "false"
        );
      });
    }

    // Update button states
    if (prevBtn) {
      prevBtn.disabled = currentIndex === 0;
      prevBtn.setAttribute("aria-disabled", currentIndex === 0);
    }
    if (nextBtn) {
      nextBtn.disabled = currentIndex >= totalSlides - 1;
      nextBtn.setAttribute("aria-disabled", currentIndex >= totalSlides - 1);
    }
  }

  // Navigate to specific slide
  function goToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
    updateCarousel();
  }

  // Previous button
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });
  }

  // Next button
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentIndex < totalSlides - 1) {
        currentIndex++;
        updateCarousel();
      }
    });
  }

  // Keyboard navigation for carousel
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && prevBtn && !prevBtn.disabled) {
      prevBtn.click();
    } else if (e.key === "ArrowRight" && nextBtn && !nextBtn.disabled) {
      nextBtn.click();
    }
  });

  // Handle window resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const newCardsToShow = getCardsToShow();
      if (newCardsToShow !== cardsToShow) {
        cardsToShow = newCardsToShow;
        totalSlides = Math.ceil(cards.length / cardsToShow);
        currentIndex = Math.min(currentIndex, totalSlides - 1);
        createIndicators();
        updateCarousel(false); // Don't animate on resize
      } else {
        updateCarousel(false);
      }
    }, 250);
  });

  // Touch/Swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  carousel.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true }
  );

  function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance for swipe
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0 && nextBtn && !nextBtn.disabled) {
        // Swipe left - next
        nextBtn.click();
      } else if (diff < 0 && prevBtn && !prevBtn.disabled) {
        // Swipe right - previous
        prevBtn.click();
      }
    }
  }

  // Initialize
  createIndicators();
  updateCarousel(false);
});

// --- EMAIL SIGNUP FORM HANDLER ---
document.addEventListener("DOMContentLoaded", () => {
  const emailForms = document.querySelectorAll(".signup-form");

  emailForms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = form.querySelector(".email-input");
      const email = emailInput.value.trim();

      if (email && /\S+@\S+\.\S+/.test(email)) {
        showNotification(
          "✉️ Successfully subscribed! Welcome to the dark side.",
          "success"
        );
        emailInput.value = "";
      } else {
        showNotification("⚠️ Please enter a valid email address.", "error");
      }
    });
  });
});

// --- SMOOTH SCROLL FOR ANCHOR LINKS ---
document.addEventListener("DOMContentLoaded", () => {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href === "#" || href === "") return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

// --- LAZY LOAD IMAGES (PERFORMANCE OPTIMIZATION) ---
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".product-image");

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("loaded");
            imageObserver.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "50px",
      }
    );

    images.forEach((img) => imageObserver.observe(img));
  }
});

// --- PREVENT HORIZONTAL SCROLL ---
document.addEventListener("DOMContentLoaded", () => {
  // Remove any accidental horizontal scroll
  document.body.style.overflowX = "hidden";
  document.documentElement.style.overflowX = "hidden";
});
