// script.js - Centralized Effect Handling

// --- DOM ELEMENTS ---
const hamburger = document.querySelector(".hamburger");
const navLink = document.querySelector(".nav-link");
// Renamed glitchTrigger to effectTrigger here to match HTML
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

  effectTrigger.textContent = isActive ? "⚡ STOP HACK" : "⚡ HACK SITE";
}

// 2. Divine Effect (Heroic Theme)
function toggleDivineEffect() {
  // Overlays are created dynamically in the theme JS but toggled here
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

  effectTrigger.textContent = isActive ? "✨ CEASE LIGHT" : "✨ SUMMON LIGHT";
}

// Helper to remove all effects when switching themes
function clearAllEffects() {
  // Clear Glitch
  glitchOverlay.classList.remove("active");
  staticNoise.classList.remove("active");
  document.querySelector(".glitch-text")?.classList.remove("active");
  document
    .querySelectorAll(".glitch-active")
    .forEach((el) => el.classList.remove("glitch-active"));

  // Clear Divine
  document.getElementById("divineOverlay")?.classList.remove("active");
  document.getElementById("holyGlow")?.classList.remove("active");
  document.querySelector(".glitch-text")?.classList.remove("divine-active");
  document
    .querySelectorAll(".divine-glow-active")
    .forEach((el) => el.classList.remove("divine-glow-active"));
}
window.clearAllEffects = clearAllEffects; // Expose for theme JS

// 3. Centralized Effect Trigger Handler
function handleEffectToggle(e) {
  e.stopPropagation();
  const isHero = document.body.classList.contains("hero-theme");

  // Clear the opposite effect first for a clean switch before toggling the intended effect
  clearAllEffects();

  // Now toggle the correct effect based on the current theme
  if (isHero) {
    // Need a slight timeout to ensure clearAllEffects runs first
    setTimeout(toggleDivineEffect, 50);
  } else {
    setTimeout(toggleGlitchEffect, 50);
  }
}

// Attach listener to the common effectTrigger button
if (effectTrigger) {
  effectTrigger.addEventListener("click", handleEffectToggle);
}

// --- ACCESSIBILITY ---
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

// ... rest of script.js (smooth scroll, lazy load, etc.) remains the same ...
