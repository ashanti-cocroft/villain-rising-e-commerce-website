// heroic-theme.js - Pure Theme State Manager (Final Polished Version)

const THEME_KEY = "siteTheme";
const body = document.body;

// Video Asset Paths (Must match the filenames in your project structure)
const VIDEO_PATHS = {
  villain: "videos/villian-rising.mp4",
  hero: "videos/heavens-gates.mp4",
};

// Initialize theme system on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem(THEME_KEY) || "villain";

  // Find the static theme toggle button
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Apply saved theme
  if (savedTheme === "hero") {
    applyTheme("hero", false); // Apply without animation on load
  } else {
    updateThemeContent(false); // Initialize villain content/button text
  }
});

function toggleTheme(e) {
  if (e) e.stopPropagation();

  const isCurrentlyHero = body.classList.contains("hero-theme");
  const newTheme = isCurrentlyHero ? "villain" : "hero";

  // Clear any active visual effects immediately before theme change
  if (window.clearAllEffects) {
    window.clearAllEffects();
  }

  applyTheme(newTheme, true);
}

function applyTheme(theme, animate = true) {
  const isHero = theme === "hero";

  // Save preference
  localStorage.setItem(THEME_KEY, theme);

  // Apply transition class
  if (animate) {
    body.classList.add("theme-transitioning");
  }

  // Set theme class
  if (isHero) {
    body.classList.add("hero-theme");
  } else {
    // Crucial: Remove hero classes to revert to default villain styles in style.css
    body.classList.remove("hero-theme");
  }

  // Update static content AND video
  updateThemeContent(isHero);

  // Update button text
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.textContent = isHero ? `😈 Villain Mode` : `😇 Heroic Mode`;
  }

  // Show notification
  if (window.showNotification) {
    window.showNotification(
      isHero
        ? "✨ Celestial Mode Activated! Heaven's gates have opened!"
        : "🦹 Villain Mode Activated! Embrace the darkness!",
      "success"
    );
  }

  // Remove transition class after animation
  if (animate) {
    setTimeout(() => {
      body.classList.remove("theme-transitioning");
    }, 600);
  }
}

function updateThemeContent(isHero) {
  const logo = document.querySelector(".logo");
  const heroHeading = document.querySelector(".tagline h1");
  const descriptionStrong = document.querySelector(".description strong");
  const effectTrigger = document.getElementById("effectTrigger");
  const vaultTitle = document.querySelector(".vault-title span:last-child");
  const vaultText = document.querySelector(".vault-text");
  const footerCopyright = document.querySelector(".copyright");
  const signupButton = document.querySelector(".signup-btn");
  const checkoutButton = document.getElementById("checkoutBtn");
  const vaultEmptyText = document.querySelector(".vault-empty-text");
  const authButton = document.getElementById("authButton");

  // --- VIDEO SWAP LOGIC ---
  const heroVideo = document.getElementById("heroVideo");
  if (heroVideo) {
    const newSrc = isHero ? VIDEO_PATHS.hero : VIDEO_PATHS.villain;

    // Find the primary source element
    const sourceElement = heroVideo.querySelector('source[type="video/mp4"]');
    if (sourceElement && sourceElement.src !== newSrc) {
      sourceElement.src = newSrc;
      // MUST call load() and play() to force the browser to fetch the new video
      heroVideo.load();
      heroVideo
        .play()
        .catch((e) =>
          console.error("Video Autoplay failed on theme switch:", e)
        );
    }
  }

  // --- 1. Auth Modal/UI Updates ---
  if (authButton) {
    authButton.textContent = isHero
      ? "🛡️ Access Sanctum"
      : "🔐 Login / Register";
  }

  // --- 2. Effect Trigger Button ---
  if (effectTrigger) {
    effectTrigger.textContent = isHero ? "✨ SUMMON LIGHT" : "⚡ HACK SITE";
    effectTrigger.classList.remove("glitch-trigger", "divine-trigger");
    effectTrigger.classList.add(isHero ? "divine-trigger" : "glitch-trigger");
  }

  // --- 3. Logo and Hero Section ---
  if (logo) {
    const logoText = isHero ? "Celestial Ascent" : "Villain Rising";
    logo.textContent = logoText;
    logo.setAttribute("data-text", logoText);
  }

  if (heroHeading) {
    const headingText = isHero
      ? "Heaven's Gates Open"
      : "Embrace Your Dark Side";
    heroHeading.textContent = headingText;
    heroHeading.setAttribute("data-text", headingText);
  }

  // Update strong tag in hero description
  if (descriptionStrong) {
    descriptionStrong.textContent = isHero
      ? "Train like an angel. Rise like a champion."
      : "Train like a villain. Dress like one too.";
  }

  // --- 4. Vault/Cart Naming ---
  if (vaultTitle)
    vaultTitle.textContent = isHero ? "Sacred Sanctuary" : "Villain Vault";
  if (vaultText) vaultText.textContent = isHero ? "Sanctuary" : "Vault";

  if (vaultEmptyText) {
    vaultEmptyText.innerHTML = isHero
      ? "Your sanctuary is empty.<br>Add items to begin your heroic journey."
      : "Your vault is empty.<br>Add items to begin your villain collection.";
  }

  // Checkout Button (Polished)
  if (checkoutButton) {
    checkoutButton.textContent = isHero
      ? "Secure Your Destiny"
      : "Secure Your Arsenal";
  }

  // --- 5. Footer and Other Elements ---
  if (footerCopyright) {
    footerCopyright.textContent = isHero
      ? "© 2025 | Celestial Ascent™ | Blessed & Trademarked"
      : "© 2025 | Villain Rising Limited | All Rights Reserved";
  }

  if (signupButton) {
    signupButton.textContent = isHero
      ? "Join the Ascent"
      : "Join the Dark Side";
  }

  // --- 6. Content Updates (Products/Testimonials) ---
  updateProductDescriptions(isHero);
  updateTestimonials(isHero);

  const heroButton = document.querySelector(".button button");
  if (heroButton) {
    heroButton.textContent = isHero ? "Ascend to Collection" : "New Collection";
  }

  const featuredTitle = document.querySelector(
    ".featured-section .section-title"
  );
  if (featuredTitle) {
    featuredTitle.textContent = isHero
      ? "Divine Collection"
      : "Featured Products";
  }

  const testimonialsTitle = document.querySelector(
    ".testimonials-section .section-title"
  );
  if (testimonialsTitle) {
    testimonialsTitle.textContent = isHero
      ? "Testimonies of Light"
      : "Villain Testimonials";
  }
}

function updateProductDescriptions(isHero) {
  const products = [
    {
      selector: ".product-card:nth-child(1) .product-name",
      villain: "Shadow Tech Hoodie",
      hero: "Seraphim Wing Hoodie",
    },
    {
      selector: ".product-card:nth-child(1) .product-desc",
      villain:
        "Premium moisture-wicking fabric with hidden pockets. Perfect for plotting world domination.",
      hero: "Cloud-soft performance fabric blessed with celestial comfort. Engineered for those who soar above limitations.",
    },
    {
      selector: ".product-card:nth-child(2) .product-name",
      villain: "Nemesis Runner",
      hero: "Ascension Gliders",
    },
    {
      selector: ".product-card:nth-child(2) .product-desc",
      villain:
        "Lightweight performance shoes built for speed and stealth. Chase your enemies in style.",
      hero: "Ethereal cushioning that makes each step feel weightless. Walk on air, run on clouds, ascend beyond limits.",
    },
    {
      selector: ".product-card:nth-child(3) .product-name",
      villain: "Dark Mode Tank",
      hero: "Radiant Halo Tank",
    },
    {
      selector: ".product-card:nth-child(3) .product-desc",
      villain:
        "Breathable compression fit. Show off your villain physique during intense training sessions.",
      hero: "Luminous compression weave that channels your inner light. Showcase your divine dedication to excellence.",
    },
    {
      selector: ".product-card:nth-child(4) .product-name",
      villain: "Mastermind Jacket",
      hero: "Archangel Armor",
    },
    {
      selector: ".product-card:nth-child(4) .product-desc",
      villain:
        "Weather-resistant shell with strategic ventilation. The ultimate statement piece for your villain wardrobe.",
      hero: "Heavenly shield against the elements with divine temperature regulation. Your protective aura made manifest.",
    },
  ];

  products.forEach((product) => {
    const element = document.querySelector(product.selector);
    if (element) {
      element.textContent = isHero ? product.hero : product.villain;
    }
  });
}

function updateTestimonials(isHero) {
  const testimonials = document.querySelectorAll(".testimonial-card");

  if (testimonials[0]) {
    const text = testimonials[0].querySelector(".testimonial-text");
    const author = testimonials[0].querySelector(".testimonial-author");
    const role = testimonials[0].querySelector(".testimonial-role");

    if (isHero) {
      if (text)
        text.textContent =
          "\"The Seraphim Wing Hoodie feels like it was woven from actual clouds. During my morning meditation runs, I swear I feel lighter, faster, blessed. This isn't just activewear—it's a spiritual experience.\"";
      if (author) author.textContent = "Marcus V.";
      if (role) role.textContent = "Enlightened Athlete";
    } else {
      if (text)
        text.textContent =
          '"The Shadow Tech Hoodie is pure, tactical genius. It keeps me warm during late-night heists and the fabric is so silent, surveillance never hears me coming. Maximum stealth achieved."';
      if (author) author.textContent = "Marcus V.";
      if (role) role.textContent = "Aspiring Mastermind";
    }
  }

  if (testimonials[1]) {
    const text = testimonials[1].querySelector(".testimonial-text");
    const author = testimonials[1].querySelector(".testimonial-author");
    const role = testimonials[1].querySelector(".testimonial-role");

    if (isHero) {
      if (text)
        text.textContent =
          "\"Celestial Ascent transformed how I move through the world. The Radiant Halo Tank makes me feel invincible yet humble, powerful yet graceful. I'm not just training—I'm transcending.\"";
      if (author) author.textContent = "Diana R.";
      if (role) role.textContent = "Divine Warrior";
    } else {
      if (text)
        text.textContent =
          "\"I push my gear to the breaking point. Villain Rising's compression fit never rips, never fades, and never restricts my power moves. This isn't just clothing; it's armor for chaos.\"";
      if (author) author.textContent = "Diana R.";
      if (role) role.textContent = "Professional Antagonist";
    }
  }

  if (testimonials[2]) {
    const text = testimonials[2].querySelector(".testimonial-text");
    const author = testimonials[2].querySelector(".testimonial-author");
    const role = testimonials[2].querySelector(".testimonial-role");

    if (isHero) {
      if (text)
        text.textContent =
          '"After years in darkness, Celestial Ascent showed me the light. The Ascension Gliders make every step feel purposeful, every workout a prayer. I didn\'t just find new gear—I found redemption."';
      if (author) author.textContent = "Alex K.";
      if (role) role.textContent = "Redeemed Soul";
    } else {
      if (text)
        text.textContent =
          '"Shedding my old hero uniform for Villain Rising was the best decision. The Dark Mode Tank makes me feel unstoppable, turning a former sense of duty into raw, focused ambition. I finally unlocked my true potential."';
      if (author) author.textContent = "Alex K.";
      if (role) role.textContent = "Reformed Hero";
    }
  }
}

// Expose globally
window.toggleTheme = toggleTheme;
window.applyTheme = applyTheme;
