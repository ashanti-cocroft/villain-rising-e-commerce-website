// heroic-theme.js - FINAL COMPLETE VERSION (Includes all product and price swaps)

const THEME_KEY = "siteTheme";
const body = document.body;

// Video Asset Paths
const VIDEO_PATHS = {
  villain_home: "videos/villian-rising.mp4",
  hero_home: "videos/heavens-gates.mp4",
  villain_men: "videos/construct-your-chaos.mp4",
  hero_men: "videos/construct-your-ascension.mp4",
  villain_women: "videos/beautifully-dangerous.mp4",
  hero_women: "videos/divine-empowerment.mp4",
  villain_accessories: "videos/complete-your-arsenal.mp4",
  hero_accessories: "videos/adorn-your-ascension.mp4",
};

// Map file paths to theme keys for updateThemeContent
const PATH_MAP = {
  "/index.html": {
    villain: VIDEO_PATHS.villain_home,
    hero: VIDEO_PATHS.hero_home,
  },
  "/men-clothing.html": {
    villain: VIDEO_PATHS.villain_men,
    hero: VIDEO_PATHS.hero_men,
  },
  "/women-clothing.html": {
    villain: VIDEO_PATHS.villain_women,
    hero: VIDEO_PATHS.hero_women,
  },
  "/accessories.html": {
    villain: VIDEO_PATHS.villain_accessories,
    hero: VIDEO_PATHS.hero_accessories,
  },
};

// --- PRODUCT AND CONTENT DATA MAPS ---

const MEN_PRODUCTS = [
  // Product Names, Descriptions, and Prices (Carousel and Grid)
  {
    selector: ".product-name:contains('Shadow Tech Hoodie')",
    villain: "Shadow Tech Hoodie",
    hero: "Seraphim Wing Hoodie",
    villain_price: "$89.99",
    hero_price: "$109.99",
  },
  {
    selector: ".product-name:contains('Villain Vision Shades')",
    villain: "Villain Vision Shades",
    hero: "Celestial Vision Shades",
    villain_price: "$149.99",
    hero_price: "$169.99",
  },
  {
    selector: ".product-name:contains('Power Surge Boots')",
    villain: "Power Surge Boots",
    hero: "Light Speed Boots",
    villain_price: "$199.99",
    hero_price: "$229.99",
  },
  {
    selector: ".product-name:contains('Shadow Strike Gloves')",
    villain: "Shadow Strike Gloves",
    hero: "Divine Strike Gloves",
    villain_price: "$79.99",
    hero_price: "$99.99",
  },
  {
    selector: ".product-name:contains('Mastermind Cap')",
    villain: "Mastermind Cap",
    hero: "Ascendant Cap",
    villain_price: "$59.99",
    hero_price: "$79.99",
  },
  {
    selector: ".product-name:contains('Sinister Briefcase')",
    villain: "Sinister Briefcase",
    hero: "Sacred Briefcase",
    villain_price: "$249.99",
    hero_price: "$279.99",
  },
  {
    selector: ".product-name:contains('Rogue Armor Vest')",
    villain: "Rogue Armor Vest",
    hero: "Paladin Armor Vest",
    villain_price: "$299.99",
    hero_price: "$349.99",
  },
  {
    selector: ".product-name:contains('Crystal Oracle Eyes')",
    villain: "Crystal Oracle Eyes",
    hero: "Celestial Sight Eyes",
    villain_price: "$179.99",
    hero_price: "$199.99",
  },
  {
    selector: ".product-name:contains('Precision Target Belt')",
    villain: "Precision Target Belt",
    hero: "Divine Alignment Belt",
    villain_price: "$139.99",
    hero_price: "$159.99",
  },
  {
    selector: ".product-name:contains('Midnight Cloak')",
    villain: "Midnight Cloak",
    hero: "Dawn's Radiance Cloak",
    villain_price: "$189.99",
    hero_price: "$219.99",
  },
  {
    selector: ".product-name:contains('Tyranny Crown')",
    villain: "Tyranny Crown",
    hero: "Sovereignty Crown",
    villain_price: "$399.99",
    hero_price: "$459.99",
  },
  {
    selector: ".product-name:contains('Chaos Sword')",
    villain: "Chaos Sword",
    hero: "Order Blade",
    villain_price: "$329.99",
    hero_price: "$379.99",
  },
  {
    selector: ".product-name:contains('Mastermind Circlet')",
    villain: "Mastermind Circlet",
    hero: "Seraph Circlet",
    villain_price: "$219.99",
    hero_price: "$259.99",
  },
  {
    selector: ".product-name:contains('Inferno Jacket')",
    villain: "Inferno Jacket",
    hero: "Divine Heat Jacket",
    villain_price: "$169.99",
    hero_price: "$199.99",
  },
  {
    selector: ".product-name:contains('Overlord Scepter')",
    villain: "Overlord Scepter",
    hero: "Archon Scepter",
    villain_price: "$449.99",
    hero_price: "$499.99",
  },
  {
    selector: ".product-name:contains('Enigma Mask')",
    villain: "Enigma Mask",
    hero: "Clarity Visor",
    villain_price: "$99.99",
    hero_price: "$119.99",
  },
  {
    selector: ".product-name:contains('Master Key Ring')",
    villain: "Master Key Ring",
    hero: "Celestial Key Ring",
    villain_price: "$129.99",
    hero_price: "$149.99",
  },
  {
    selector: ".product-name:contains('Mechanism Watch')",
    villain: "Mechanism Watch",
    hero: "Divine Mechanism Watch",
    villain_price: "$159.99",
    hero_price: "$179.99",
  },
  // Descriptions (Featured Section)
  {
    selector: ".featured-section .product-card:nth-child(1) .product-desc",
    villain: "Kevlar weave with articulated plating. Protection made manifest.",
    hero: "Angel-weave mesh with sculpted armor plates. Forged by light and wisdom.",
    type: "desc",
  },
  {
    selector: ".featured-section .product-card:nth-child(2) .product-desc",
    villain:
      "Stainless steel with ergonomic grip. A tool for ultimate control.",
    hero: "Pure celestial alloy with ergonomic grip. A tool for divine order.",
    type: "desc",
  },
  {
    selector: ".featured-section .product-card:nth-child(3) .product-desc",
    villain: "Opens anything, unlocks potential. The key to your dominion.",
    hero: "Unlocks any heart, releases potential. The key to your righteous path.",
    type: "desc",
  },
  {
    selector: ".featured-section .product-card:nth-child(4) .product-desc",
    villain: "Disappear into darkness. Premium stealth-weave technology.",
    hero: "Appear in splendor. Premium light-weave technology.",
    type: "desc",
  },
  {
    selector: ".featured-section .product-card:nth-child(5) .product-desc",
    villain: "Heat-resistant fabric for impact. Command the inferno.",
    hero: "Chill-resistant fabric for serenity. Command the peace.",
    type: "desc",
  },
  {
    selector: ".featured-section .product-card:nth-child(6) .product-desc",
    villain: "Symbol of absolute authority.",
    hero: "Symbol of universal harmony.",
    type: "desc",
  },
  {
    selector: ".featured-section .product-card:nth-child(7) .product-desc",
    villain: "Tactical design with smart alignment.",
    hero: "Pure design for moral alignment.",
    type: "desc",
  },
  {
    selector: ".featured-section .product-card:nth-child(8) .product-desc",
    villain: "Enhances cognitive abilities.",
    hero: "Enhances celestial abilities.",
    type: "desc",
  },
];

const WOMEN_PRODUCTS = [
  // Product Names, Descriptions, and Prices
  {
    selector: ".product-name:contains('Shadow Strike Leggings')",
    villain: "Shadow Strike Leggings",
    hero: "Ethereal Aura Leggings",
    villain_price: "$75.99",
    hero_price: "$95.99",
  },
  {
    selector: ".product-name:contains('Empress Sports Bra')",
    villain: "Empress Sports Bra",
    hero: "Archangel Sports Bra",
    villain_price: "$55.99",
    hero_price: "$75.99",
  },
  {
    selector: ".product-name:contains('Chaos Cropped Hoodie')",
    villain: "Chaos Cropped Hoodie",
    hero: "Grace Cropped Hoodie",
    villain_price: "$79.99",
    hero_price: "$99.99",
  },
  {
    selector: ".product-name:contains('Venom Tank Top')",
    villain: "Venom Tank Top",
    hero: "Seraph Tank Top",
    villain_price: "$45.99",
    hero_price: "$65.99",
  },
  {
    selector: ".product-name:contains('Dominatrix Joggers')",
    villain: "Dominatrix Joggers",
    hero: "Sovereignty Joggers",
    villain_price: "$89.99",
    hero_price: "$109.99",
  },
  {
    selector: ".product-name:contains('Black Widow Cycling Shorts')",
    villain: "Black Widow Cycling Shorts",
    hero: "Divine Bloom Cycling Shorts",
    villain_price: "$59.99",
    hero_price: "$79.99",
  },
  {
    selector: ".product-name:contains('Mystic Long Sleeve')",
    villain: "Mystic Long Sleeve",
    hero: "Seraph Long Sleeve",
    villain_price: "$59.99",
    hero_price: "$79.99",
  },
  {
    selector: ".product-name:contains('Tyrant Tee')",
    villain: "Tyrant Tee",
    hero: "Archon Tee",
    villain_price: "$44.99",
    hero_price: "$64.99",
  },
  {
    selector: ".product-name:contains('The Obsidian Set')",
    villain: "The Obsidian Set",
    hero: "The Celestial Set",
    villain_price: "$119.99",
    hero_price: "$149.99",
  },
  {
    selector: ".product-name:contains('Reborn Tactical Jacket')",
    villain: "Reborn Tactical Jacket",
    hero: "Phoenix Tactical Jacket",
    villain_price: "$129.99",
    hero_price: "$159.99",
  },
  {
    selector: ".product-name:contains('Villain\\'s Pride Crop Top')",
    villain: "Villain's Pride Crop Top",
    hero: "Hero's Honor Crop Top",
    villain_price: "$49.99",
    hero_price: "$69.99",
  },
  {
    selector: ".product-name:contains('Power Strike Shorts')",
    villain: "Power Strike Shorts",
    hero: "Lightning Strike Shorts",
    villain_price: "$79.99",
    hero_price: "$99.99",
  },
  {
    selector: ".product-name:contains('Dual Identity Mask')",
    villain: "Dual Identity Mask",
    hero: "Pure Light Visor",
    villain_price: "$39.99",
    hero_price: "$59.99",
  },
  {
    selector: ".product-name:contains('Inferno Bomber')",
    villain: "Inferno Bomber",
    hero: "Celestial Bomber",
    villain_price: "$149.99",
    hero_price: "$179.99",
  },
  // Additional Products in the women-clothing.html carousel/grid
  {
    selector: ".product-name:contains('Shadow Strike Leggings (Black)')",
    villain: "Shadow Strike Leggings (Black)",
    hero: "Ethereal Aura Leggings (White)",
    villain_price: "$69.99",
    hero_price: "$89.99",
  },
  {
    selector: ".product-name:contains('Razor Edge Denim')",
    villain: "Razor Edge Denim",
    hero: "Divine Edge Denim",
    villain_price: "$119.99",
    hero_price: "$139.99",
  },
  {
    selector: ".product-name:contains('Explosive Style Tee')",
    villain: "Explosive Style Tee",
    hero: "Radiant Style Tee",
    villain_price: "$44.99",
    hero_price: "$64.99",
  },
  {
    selector: ".product-name:contains('Venom Strike Gloves')",
    villain: "Venom Strike Gloves",
    hero: "Seraph Grip Gloves",
    villain_price: "$59.99",
    hero_price: "$79.99",
  },
];

const ACCESSORIES_PRODUCTS = [
  // Product Names, Descriptions, and Prices
  {
    selector: ".product-name:contains('Shadow Satchel')",
    villain: "Shadow Satchel",
    hero: "Celestial Satchel",
    villain_price: "$69.99",
    hero_price: "$89.99",
  },
  {
    selector: ".product-name:contains('Chronos Timepiece')",
    villain: "Chronos Timepiece",
    hero: "Aura Chronometer",
    villain_price: "$179.99",
    hero_price: "$219.99",
  },
  {
    selector: ".product-name:contains('Obsidian Scarf')",
    villain: "Obsidian Scarf",
    hero: "Seraph Silk Scarf",
    villain_price: "$39.99",
    hero_price: "$59.99",
  },
  {
    selector: ".product-name:contains('Void Backpack')",
    villain: "Void Backpack",
    hero: "Lightbearer Backpack",
    villain_price: "$119.99",
    hero_price: "$149.99",
  },
  {
    selector: ".product-name:contains('Executive Briefcase')",
    villain: "Executive Briefcase",
    hero: "Divine Executive Case",
    villain_price: "$249.99",
    hero_price: "$279.99",
  },
  {
    selector: ".product-name:contains('Empire Cap')",
    villain: "Empire Cap",
    hero: "Realm Cap",
    villain_price: "$59.99",
    hero_price: "$79.99",
  },
  {
    selector: ".product-name:contains('Combat Boots')",
    villain: "Combat Boots",
    hero: "Valor Boots",
    villain_price: "$189.99",
    hero_price: "$219.99",
  },
  {
    selector: ".product-name:contains('Tyrant Ring')",
    villain: "Tyrant Ring",
    hero: "Sovereign Ring",
    villain_price: "$99.99",
    hero_price: "$119.99",
  },
  {
    selector: ".product-name:contains('Dark Matter Shades')",
    villain: "Dark Matter Shades",
    hero: "Pure Light Shades",
    villain_price: "$149.99",
    hero_price: "$169.99",
  },
  {
    selector: ".product-name:contains('Venom Gloves')",
    villain: "Venom Gloves",
    hero: "Seraph Grip Gloves",
    villain_price: "$79.99",
    hero_price: "$99.99",
  },
];

// --- INITIALIZATION AND UNIVERSAL LOGIC ---

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem(THEME_KEY) || "villain";

  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Ensure content updates happen even on initial load for the saved theme
  if (savedTheme === "hero") {
    applyTheme("hero", false);
  } else {
    // Manually run content update on load even for villain theme to ensure initial data is right
    updateThemeContent(false);
  }
});

function toggleTheme(e) {
  if (e) e.stopPropagation();

  const isCurrentlyHero = body.classList.contains("hero-theme");
  const newTheme = isCurrentlyHero ? "villain" : "hero";

  if (window.clearAllEffects) {
    window.clearAllEffects();
  }

  applyTheme(newTheme, true);
}

function applyTheme(theme, animate = true) {
  const isHero = theme === "hero";

  localStorage.setItem(THEME_KEY, theme);

  if (animate) {
    body.classList.add("theme-transitioning");
  }

  if (isHero) {
    body.classList.add("hero-theme");
  } else {
    body.classList.remove("hero-theme");
  }

  updateThemeContent(isHero);

  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.textContent = isHero ? `😈 Villain Mode` : `😇 Heroic Mode`;
  }

  if (window.showNotification) {
    window.showNotification(
      isHero
        ? "✨ Celestial Mode Activated! Heaven's gates have opened!"
        : "🦹 Villain Mode Activated! Embrace the darkness!",
      "success"
    );
  }

  if (animate) {
    setTimeout(() => {
      body.classList.remove("theme-transitioning");
    }, 600);
  }
}

function updateThemeContent(isHero) {
  // --- Determine Current Page and Video Paths ---
  const currentPath = window.location.pathname.endsWith("/")
    ? "/index.html"
    : window.location.pathname;
  const pageKey =
    Object.keys(PATH_MAP).find((key) =>
      currentPath.includes(key.replace(".html", ""))
    ) || "/index.html";
  const videoPaths = PATH_MAP[pageKey];

  // --- VIDEO SWAP LOGIC (Universal) ---
  const heroVideo = document.getElementById("heroVideo");
  if (heroVideo) {
    const newSrc = isHero ? videoPaths.hero : videoPaths.villain;
    const sourceElement = heroVideo.querySelector('source[type="video/mp4"]');
    if (sourceElement && sourceElement.src !== newSrc) {
      sourceElement.src = newSrc;
      heroVideo.load();
      heroVideo
        .play()
        .catch((e) =>
          console.error("Video Autoplay failed on theme switch:", e)
        );
    }
  }

  // --- 1. Global UI & Branding Updates (Universal Elements) ---
  const logo = document.querySelector(".logo");
  const footerCopyright = document.querySelector(".copyright");
  const effectTrigger = document.getElementById("effectTrigger");
  const vaultTitle = document.querySelector(".vault-title span:last-child");
  const vaultText = document.querySelector(".vault-text");
  const signupButton = document.querySelector(".signup-btn");
  const checkoutButton = document.getElementById("checkoutBtn");
  const authButton = document.getElementById("authButton");
  const vaultEmptyText = document.querySelector(".vault-empty-text");

  // Global Text Swaps
  if (logo) {
    const logoText = isHero ? "Celestial Ascent" : "Villain Rising";
    logo.textContent = logoText;
    logo.setAttribute("data-text", logoText);
  }
  if (vaultTitle)
    vaultTitle.textContent = isHero ? "Sacred Sanctuary" : "Vault";
  if (vaultText) vaultText.textContent = isHero ? "Sanctuary" : "Vault";
  if (checkoutButton)
    checkoutButton.textContent = isHero
      ? "Secure Your Destiny"
      : "Secure Your Arsenal";
  if (footerCopyright)
    footerCopyright.textContent = isHero
      ? "© 2025 | Celestial Ascent™ | Blessed & Trademarked"
      : "© 2025 | Villain Rising Limited | All Rights Reserved. | We Do Evil.";
  if (signupButton)
    signupButton.textContent = isHero ? "Join the Ascent" : "Subscribe Now";
  if (authButton)
    authButton.textContent = isHero
      ? "🛡️ Access Sanctum"
      : "🔐 Login / Register";
  if (effectTrigger) {
    effectTrigger.textContent = isHero ? "✨ SUMMON LIGHT" : "⚡ HACK SITE";
    effectTrigger.classList.remove("glitch-trigger", "divine-trigger");
    effectTrigger.classList.add(isHero ? "divine-trigger" : "glitch-trigger");
  }
  if (vaultEmptyText) {
    vaultEmptyText.innerHTML = isHero
      ? "Your sanctuary is empty.<br>Add items to begin your heroic journey."
      : "Your vault is empty.<br>Add items to begin your villain collection.";
  }

  // Re-run theme-dependent modal update if it's open
  const authModal = document.getElementById("authModal");
  if (authModal && window.switchAuthMode) {
    const currentMode = authModal
      .querySelector(".auth-tab.active")
      ?.textContent.toLowerCase()
      .includes("register")
      ? "register"
      : "login";
    window.switchAuthMode(currentMode);
  }

  // --- 2. Page-Specific Content Swaps ---
  if (pageKey === "/index.html") {
    updateIndexContent(isHero);
  } else if (pageKey === "/men-clothing.html") {
    updateMenContent(isHero);
  } else if (pageKey === "/women-clothing.html") {
    updateWomenContent(isHero);
  } else if (pageKey === "/accessories.html") {
    updateAccessoriesContent(isHero);
  }
}

// --- PAGE-SPECIFIC CONTENT FUNCTIONS ---

function updateIndexContent(isHero) {
  const heroHeading = document.querySelector(".tagline h1");
  const descriptionStrong = document.querySelector(".description strong");
  const heroButton = document.querySelector(".button button");
  const featuredTitle = document.querySelector(
    ".featured-section .section-title"
  );
  const testimonialsTitle = document.querySelector(
    ".testimonials-section .section-title"
  );

  // Use a simpler mapping for the few index page products
  const indexProducts = [
    {
      selector: ".featured-section .product-card:nth-child(1) .product-name",
      villain: "Shadow Tech Hoodie",
      hero: "Seraphim Wing Hoodie",
    },
    {
      selector: ".featured-section .product-card:nth-child(1) .product-price",
      villain: "$89.99",
      hero: "$109.99",
    },
    {
      selector: ".featured-section .product-card:nth-child(2) .product-name",
      villain: "Nemesis Runner",
      hero: "Ascendant Runner",
    },
    {
      selector: ".featured-section .product-card:nth-child(2) .product-price",
      villain: "$129.99",
      hero: "$149.99",
    },
    {
      selector: ".featured-section .product-card:nth-child(3) .product-name",
      villain: "Dark Mode Tank",
      hero: "Pure Light Tank",
    },
    {
      selector: ".featured-section .product-card:nth-child(3) .product-price",
      villain: "$49.99",
      hero: "$69.99",
    },
    {
      selector: ".featured-section .product-card:nth-child(4) .product-name",
      villain: "Mastermind Jacket",
      hero: "Ascendant Jacket",
    },
    {
      selector: ".featured-section .product-card:nth-child(4) .product-price",
      villain: "$159.99",
      hero: "$189.99",
    },
    // Update the add-to-cart data attributes for the index page as well
    {
      selector: ".featured-section .product-card:nth-child(1) .add-to-cart",
      dataAttr: "data-product",
      villain: "Shadow Tech Hoodie",
      hero: "Seraphim Wing Hoodie",
    },
    {
      selector: ".featured-section .product-card:nth-child(1) .add-to-cart",
      dataAttr: "data-price",
      villain: "89.99",
      hero: "109.99",
    },
    {
      selector: ".featured-section .product-card:nth-child(2) .add-to-cart",
      dataAttr: "data-product",
      villain: "Nemesis Runner",
      hero: "Ascendant Runner",
    },
    {
      selector: ".featured-section .product-card:nth-child(2) .add-to-cart",
      dataAttr: "data-price",
      villain: "129.99",
      hero: "149.99",
    },
    {
      selector: ".featured-section .product-card:nth-child(3) .add-to-cart",
      dataAttr: "data-product",
      villain: "Dark Mode Tank",
      hero: "Pure Light Tank",
    },
    {
      selector: ".featured-section .product-card:nth-child(3) .add-to-cart",
      dataAttr: "data-price",
      villain: "49.99",
      hero: "69.99",
    },
    {
      selector: ".featured-section .product-card:nth-child(4) .add-to-cart",
      dataAttr: "data-product",
      villain: "Mastermind Jacket",
      hero: "Ascendant Jacket",
    },
    {
      selector: ".featured-section .product-card:nth-child(4) .add-to-cart",
      dataAttr: "data-price",
      villain: "159.99",
      hero: "189.99",
    },
  ];

  indexProducts.forEach((map) => {
    document.querySelectorAll(map.selector).forEach((el) => {
      if (map.dataAttr) {
        el.setAttribute(map.dataAttr, isHero ? map.hero : map.villain);
      } else {
        el.textContent = isHero ? map.hero : map.villain;
      }
    });
  });

  if (heroHeading) {
    const headingText = isHero
      ? "Heaven's Gates Open"
      : "Embrace Your Dark Side";
    heroHeading.textContent = headingText;
    heroHeading.setAttribute("data-text", headingText);
  }
  if (descriptionStrong)
    descriptionStrong.textContent = isHero
      ? "Train like an angel. Rise like a champion."
      : "Train for dominance. Dress to impress.";
  if (heroButton)
    heroButton.textContent = isHero ? "Ascend to Collection" : "New Collection";
  if (featuredTitle)
    featuredTitle.textContent = isHero
      ? "Divine Collection"
      : "Featured Products";
  if (testimonialsTitle)
    testimonialsTitle.textContent = isHero
      ? "Testimonies of Light"
      : "Client Testimonials";

  // Testimonial swaps
  const t1 = document.querySelector(
    ".testimonials-section .testimonial-card:nth-child(1) .testimonial-text"
  );
  const t2 = document.querySelector(
    ".testimonials-section .testimonial-card:nth-child(2) .testimonial-text"
  );
  const t3 = document.querySelector(
    ".testimonials-section .testimonial-card:nth-child(3) .testimonial-text"
  );

  if (t1)
    t1.innerHTML = isHero
      ? `"The **Seraphim Wing Hoodie** is pure, tactical grace. It keeps me comfortable during solemn vigils and the fabric is so soothing, my prayers are never broken. *Maximum serenity achieved.*"`
      : `"The **Shadow Tech Hoodie** is pure, tactical genius. It keeps me warm during late-night heists and the fabric is so silent, surveillance never hears me coming. *Maximum stealth achieved.*"`;

  if (t2)
    t2.innerHTML = isHero
      ? `"I push my gear to the limits of grace. Celestial Ascent's compression fit never wavers, never dulls, and always empowers my movements. This isn't just clothing; it's **armor for justice**."`
      : `"I push my gear to the breaking point. Villain Rising's compression fit never rips, never fades, and never restricts my power moves. This isn't just clothing; it's **armor for chaos**."`;

  if (t3)
    t3.innerHTML = isHero
      ? `"Shedding my old villain uniform for Celestial Ascent was the best decision. The **Pure Light Tank** makes me feel radiant, turning a former sense of ambition into raw, focused compassion. *I finally unlocked my true potential.*"`
      : `"Shedding my old hero uniform for Villain Rising was the best decision. The **Dark Mode Tank** makes me feel unstoppable, turning a former sense of duty into raw, focused ambition. *I finally unlocked my true potential.*"`;
}

function updateMenContent(isHero) {
  const heroHeading = document.querySelector(".tagline h1 strong");
  const descriptionStrong = document.querySelector(".description strong");
  const categoriesHeroTitle = document.querySelector(".categories-hero-title");
  const featuredTitle = document.querySelector(
    ".featured-products .section-title"
  );
  const featuredGearTitle = document.querySelector(
    "section.featured-section h2:nth-child(1)"
  );
  const categoriesHeroDesc = document.querySelector(".categories-hero-desc");
  const infoBox1Title = document.querySelector(
    ".info-box:nth-child(1) .info-box-title"
  );
  const infoBox1Text = document.querySelector(
    ".info-box:nth-child(1) .info-box-text"
  );
  const infoBox2Title = document.querySelector(
    ".info-box:nth-child(2) .info-box-title"
  );
  const infoBox2Text = document.querySelector(
    ".info-box:nth-child(2) .info-box-text"
  );

  // 1. Hero Text Swaps
  if (heroHeading)
    heroHeading.textContent = isHero
      ? "Forge Your Destiny"
      : "Construct Your Chaos";
  if (descriptionStrong)
    descriptionStrong.textContent = isHero
      ? "Be the architect of your own light."
      : "Be the architect of your own empire.";
  if (categoriesHeroTitle)
    categoriesHeroTitle.textContent = isHero
      ? "Men's Celestial Arsenal"
      : "Men's Apparel Arsenal";
  if (categoriesHeroDesc)
    categoriesHeroDesc.textContent = isHero
      ? "Men's workout gear forged to help you ascend beyond limits. Functional and pure, we create attire for true heroes. Since our emergence, we've designed light athletic wear we want to wear, for powerful champions."
      : "Men's workout gear designed to help you dominate your domain. Functional and menacing, we create attire you'll conquer in. Since our rise to power, we've designed the dark athletic wear we want to wear, for powerful practitioners.";
  if (infoBox1Title)
    infoBox1Title.textContent = isHero
      ? "Workout Clothes built for grace"
      : "Workout Clothes built for ambition";
  if (infoBox1Text)
    infoBox1Text.textContent = isHero
      ? "Our legacy was forged in light. Celestial Ascent was founded with a passion for justice and that serenity flows through all our gear today. From inspiring workout shirts and pure tanks, to precision-engineered joggers and shorts designed for maximum mobility, you will always feel righteous in every training session."
      : "Our legacy was forged in darkness. Villain Rising was founded with a passion for power and that intensity flows through all our gear today. From intimidating workout shirts and tactical tanks, to precision-engineered joggers and shorts designed for maximum mobility, you will always feel unstoppable in every training session.";
  if (infoBox2Title)
    infoBox2Title.textContent = isHero
      ? "Activewear for Pure Performers"
      : "Activewear for High Performers";
  if (infoBox2Text)
    infoBox2Text.textContent = isHero
      ? "We create the tools that help everyone embrace their potential – no matter the challenge. Our range of Men's Activewear is designed to give you the edge you need to inspire, whether that's lifting spirits, conquering the marathon, or commanding the studio."
      : "We create the tools that help everyone embrace their potential – no matter the battlefield. Our range of Men's Activewear is designed to give you the edge you need to dominate, whether that's crushing weights, conquering the track, or commanding the studio.";

  // 2. Section Title Swaps
  if (featuredTitle)
    featuredTitle.textContent = isHero
      ? "Divine Selection"
      : "Featured Products";
  if (featuredGearTitle)
    featuredGearTitle.textContent = isHero
      ? "Tools of Ascendance"
      : "Featured Gear";

  // 3. Mega Menu Swaps
  const megaMenuSale = document.querySelector(".mega-menu-column h3");
  if (megaMenuSale)
    megaMenuSale.textContent = isHero
      ? "✨ Divine Sale Monday"
      : "🔥 Killer Sale Friday";

  // 4. Product Swaps
  MEN_PRODUCTS.forEach((map) => {
    document.querySelectorAll(map.selector).forEach((el) => {
      // Handle name and description (regular text content)
      if (!map.type || map.type !== "desc") {
        el.textContent = isHero ? map.hero : map.villain;
      }
      if (map.type === "desc") {
        el.textContent = isHero ? map.hero : map.villain;
      }

      // Handle Price Swap (assuming .product-price is the sibling element or found via a different selector)
      const productCard = el.closest(".product-card");
      const priceElement = productCard?.querySelector(".product-price");
      const cartButton = productCard?.querySelector(".add-to-cart");

      if (priceElement && map.villain_price && map.hero_price) {
        priceElement.textContent = isHero ? map.hero_price : map.villain_price;
        // Update data-price attribute for the cart button
        const rawPrice = (isHero ? map.hero_price : map.villain_price).replace(
          "$",
          ""
        );
        if (cartButton) {
          cartButton.setAttribute(
            "data-product",
            isHero ? map.hero : map.villain
          );
          cartButton.setAttribute("data-price", rawPrice);
          cartButton.setAttribute(
            "data-icon",
            productCard.querySelector(".product-image").textContent
          );
        }
      }
    });
  });
}

function updateWomenContent(isHero) {
  const heroHeading = document.querySelector(".tagline h1 strong");
  const descriptionStrong = document.querySelector(".description strong");
  const categoriesHeroTitle = document.querySelector(".categories-hero-title");
  const featuredTitle = document.querySelector(
    ".featured-products .section-title"
  );
  const featuredGearTitle = document.querySelector(
    "section.featured-section h2:nth-child(1)"
  );
  const categoriesHeroDesc = document.querySelector(".categories-hero-desc");
  const infoBox1Title = document.querySelector(
    ".info-box:nth-child(1) .info-box-title"
  );
  const infoBox1Text = document.querySelector(
    ".info-box:nth-child(1) .info-box-text"
  );
  const infoBox2Title = document.querySelector(
    ".info-box:nth-child(2) .info-box-title"
  );
  const infoBox2Text = document.querySelector(
    ".info-box:nth-child(2) .info-box-text"
  );

  if (heroHeading)
    heroHeading.textContent = isHero
      ? "Radiantly Unstoppable"
      : "Beautifully Dangerous";
  if (descriptionStrong)
    descriptionStrong.textContent = isHero
      ? "Train with grace. Dress with light."
      : "Train like a villain. Dress like one too.";
  if (categoriesHeroTitle)
    categoriesHeroTitle.textContent = isHero
      ? "Women's Celestial Arsenal"
      : "Women's Villain Arsenal";
  if (featuredTitle)
    featuredTitle.textContent = isHero
      ? "Divine Selection"
      : "Featured Products";
  if (featuredGearTitle)
    featuredGearTitle.textContent = isHero
      ? "Tools of Ascendance"
      : "Featured Gear";
  if (categoriesHeroDesc)
    categoriesHeroDesc.textContent = isHero
      ? "Women's sacred gear designed to help you command respect and rise above. Graceful and powerful, we create attire for the true champions of light. Since our emergence, we've designed light activewear we want to wear, for those who seek divine power."
      : "Women's workout gear designed to help you command fear and ascend to dominance. Functional and menacing, we create attire you'll conquer in. Since our rise to power, we've designed the dark activewear we want to wear, for powerful female practitioners.";
  if (infoBox1Title)
    infoBox1Title.textContent = isHero
      ? "Activewear Built for the Archangel"
      : "Activewear Built for the Empress";
  if (infoBox1Text)
    infoBox1Text.textContent = isHero
      ? "From the sculpting fit of our leggings to the supportive grace of our bras, every piece is designed to facilitate divine performance and inspire awe."
      : "From the commanding fit of our leggings to the formidable support of our bras, every piece is designed to facilitate superior performance and inspire terror.";
  if (infoBox2Title)
    infoBox2Title.textContent = isHero
      ? "Empowerment Through Light"
      : "Domination Through Darkness";
  if (infoBox2Text)
    infoBox2Text.textContent = isHero
      ? "Our range of women's apparel is built to give you the confidence to lead, crush your personal bests, and spread light wherever you go."
      : "Our range of women's apparel is built to give you the confidence to dominate, crush your enemies, and command every room you enter.";

  // Mega Menu Swap
  const megaMenuSale = document.querySelector(".mega-menu-column h3");
  if (megaMenuSale)
    megaMenuSale.textContent = isHero
      ? "⚡ Divine Sale Event"
      : "⚡ Black Friday";

  // Product Swaps
  WOMEN_PRODUCTS.forEach((map) => {
    document.querySelectorAll(map.selector).forEach((el) => {
      // Handle name
      el.textContent = isHero ? map.hero : map.villain;

      // Handle Price Swap and Data Attributes
      const productCard = el.closest(".product-card");
      const priceElement = productCard?.querySelector(".product-price");
      const cartButton = productCard?.querySelector(".add-to-cart");

      if (priceElement && map.villain_price && map.hero_price) {
        priceElement.textContent = isHero ? map.hero_price : map.villain_price;

        // Update data-price attribute for the cart button
        const rawPrice = (isHero ? map.hero_price : map.villain_price).replace(
          "$",
          ""
        );
        if (cartButton) {
          cartButton.setAttribute(
            "data-product",
            isHero ? map.hero : map.villain
          );
          cartButton.setAttribute("data-price", rawPrice);
          cartButton.setAttribute(
            "data-icon",
            productCard.querySelector(".product-image").textContent
          );
        }
      }
    });
  });
}

function updateAccessoriesContent(isHero) {
  const heroHeading = document.querySelector(".tagline h1 strong");
  const descriptionStrong = document.querySelector(".description strong");
  const categoriesHeroTitle = document.querySelector(".categories-hero-title");
  const featuredTitle = document.querySelector(
    ".featured-section .section-title"
  );

  // Custom titles for accessories.html
  const featuredGearTitle = document.querySelector(".featured-section h2");
  if (featuredGearTitle)
    featuredGearTitle.textContent = isHero
      ? "Featured Adornments"
      : "Featured Accessories";
  const categoriesHeroDesc = document.querySelector(".categories-hero-desc");
  if (categoriesHeroDesc)
    categoriesHeroDesc.textContent = isHero
      ? "Every accessory is blessed and forged with pure, celestial energy, offering light, precision, and grace to complete your heroic path. From luminous bags to sovereign rings."
      : "No empire is built without the right tools. Our accessories are designed to complement your apparel, offering function, stealth, and authority. From high-capacity bags to essential tactical gear.";
  const infoBox1Title = document.querySelector(
    ".info-box:nth-child(1) .info-box-title"
  );
  if (infoBox1Title)
    infoBox1Title.textContent = isHero
      ? "The Tools of Grace"
      : "The Tools of Power";
  const infoBox1Text = document.querySelector(
    ".info-box:nth-child(1) .info-box-text"
  );
  if (infoBox1Text)
    infoBox1Text.textContent = isHero
      ? "Every item in the collection is imbued with positive energy for a specific purpose, whether it's facilitating peaceful communication, ensuring the safe transport of relics, or simply projecting grace."
      : "Every item in the accessory collection is engineered for a specific purpose, whether it's facilitating communication, ensuring the safe transport of contraband, or simply projecting authority. Trust in your gear.";
  const infoBox2Title = document.querySelector(
    ".info-box:nth-child(2) .info-box-title"
  );
  if (infoBox2Title)
    infoBox2Title.textContent = isHero
      ? "Attention to Light"
      : "Attention to Detail";
  const infoBox2Text = document.querySelector(
    ".info-box:nth-child(2) .info-box-text"
  );
  if (infoBox2Text)
    infoBox2Text.textContent = isHero
      ? "The smallest details can amplify your divine presence. Our accessories are designed to seamlessly integrate with your apparel, providing maximum functionality without compromising on purity."
      : "The smallest details can determine the success of a plan. Our accessories are designed to seamlessly integrate with your apparel, providing maximum functionality without compromising on style.";

  if (heroHeading)
    heroHeading.textContent = isHero
      ? "Adorn Your Ascension"
      : "Perfect Your Villainy";
  if (descriptionStrong)
    descriptionStrong.textContent = isHero
      ? "Finish what you've started with divine light."
      : "Finish what you started.";
  if (categoriesHeroTitle)
    categoriesHeroTitle.textContent = isHero
      ? "Celestial Adornments"
      : "Accessory Arsenal";
  if (featuredTitle)
    featuredTitle.textContent = isHero
      ? "Featured Adornments"
      : "Featured Accessories";

  ACCESSORIES_PRODUCTS.forEach((map) => {
    document.querySelectorAll(map.selector).forEach((el) => {
      el.textContent = isHero ? map.hero : map.villain;

      // Handle Price Swap and Data Attributes
      const productCard = el.closest(".product-card");
      const priceElement = productCard?.querySelector(".product-price");
      const cartButton = productCard?.querySelector(".add-to-cart");

      if (priceElement && map.villain_price && map.hero_price) {
        priceElement.textContent = isHero ? map.hero_price : map.villain_price;

        // Update data-price attribute for the cart button
        const rawPrice = (isHero ? map.hero_price : map.villain_price).replace(
          "$",
          ""
        );
        if (cartButton) {
          cartButton.setAttribute(
            "data-product",
            isHero ? map.hero : map.villain
          );
          cartButton.setAttribute("data-price", rawPrice);
          cartButton.setAttribute(
            "data-icon",
            productCard.querySelector(".product-image").textContent
          );
        }
      }
    });
  });

  const megaMenuBags = document.querySelector(".mega-menu-column h3");
  if (megaMenuBags)
    megaMenuBags.textContent = isHero ? "👜 Bags of Light" : "👜 Bags";
}

// Expose globally
window.toggleTheme = toggleTheme;
window.applyTheme = applyTheme;
