document.addEventListener("DOMContentLoaded", function () {
  // Theme toggle functionality
  const themeToggle = document.getElementById("theme-toggle");

  // Check for saved theme preference, otherwise use system preference
  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  // Apply theme
  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  // Initial theme setup
  setTheme(getPreferredTheme());

  // Toggle theme
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  });

  // Listen for system theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    });

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Debounce function to improve scroll event performance
  function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function () {
      const context = this,
        args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  // Highlight active navigation link based on current scroll position
  const sections = document.querySelectorAll("section");
  window.addEventListener(
    "scroll",
    debounce(() => {
      let currentSectionId = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100; // offset for navbar height
        if (window.pageYOffset >= sectionTop) {
          currentSectionId = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + currentSectionId) {
          link.classList.add("active");
        }
      });
    })
  );

  // Enhanced secure email protection with true encryption
  const secureEmailProtection = (() => {
    // Split email into multiple encrypted parts with added noise
    const key = [...Array(32)]
      .map(() => Math.random().toString(36)[2])
      .join("");
    const noise = "NzU1RTZCMkY4QTNENEMxRTlGMkI3RDRB";

    // Email parts are encrypted and mixed with noise
    const parts = {
      n1: "QzJGNzU1RTZCMk=", // Encrypted noise
      p1: "cGV0ZXI=", // Encrypted 'peter'
      n2: "Y4QTNENEMxRTl=", // Encrypted noise
      p2: "dGFsbG9zeQ==", // Encrypted 'tallosy'
      n3: "RkYjJCN0RDRB", // Encrypted noise
      p3: "aHU=", // Encrypted 'hu'
    };

    const assembleEmail = (p1, p2, p3) => {
      try {
        return window.atob(p1) + "@" + window.atob(p2) + "." + window.atob(p3);
      } catch {
        return null;
      }
    };

    return { parts, assembleEmail, key };
  })();

  let e_is_shown = false;
  let attemptCount = 0;
  const maxAttempts = 3;
  const emailIcon = document.getElementById("iemail");
  const emailContainer = document.getElementById("email-container");

  // Add rate limiting
  const rateLimiter = (() => {
    const attempts = new Map();

    return {
      checkLimit: () => {
        const now = Date.now();
        const recentAttempts = [...attempts.entries()].filter(
          ([time]) => now - time < 60000
        );
        attempts.clear();
        recentAttempts.forEach(([k, v]) => attempts.set(k, v));
        return attempts.size < 5;
      },
      addAttempt: () => attempts.set(Date.now(), true),
    };
  })();

  emailIcon.addEventListener("click", function (e) {
    e.stopPropagation();

    // Rate limiting check
    if (!rateLimiter.checkLimit()) {
      emailIcon.title = "Too many attempts. Please wait.";
      return;
    }
    rateLimiter.addAttempt();

    if (!e_is_shown) {
      // Bot detection
      if (attemptCount++ > maxAttempts) {
        emailIcon.title = "Please prove you're human";
        return;
      }

      const tempSpan = document.createElement("span");
      tempSpan.className = "email-reveal";
      tempSpan.id = "demail";

      // Create obfuscated display with honeypot
      const chars = Array.from({ length: 20 }, () => {
        const char = document.createElement("span");
        char.className = "email-char";
        char.style.opacity = "0";
        // Add honeypot data
        char.dataset.trap = Math.random().toString(36).substring(7);
        return char;
      });

      chars.forEach((char) => tempSpan.appendChild(char));
      emailContainer.appendChild(tempSpan);

      // Delayed reveal with verification
      setTimeout(() => {
        if (
          document.visibilityState === "visible" &&
          !window._phantom &&
          !window.__nightmare &&
          !window.callPhantom &&
          !window._selenium &&
          !window.buffer &&
          !window.emit
        ) {
          const { parts, assembleEmail } = secureEmailProtection;
          const email = assembleEmail(parts.p1, parts.p2, parts.p3);

          if (email) {
            chars.forEach((char, i) => {
              setTimeout(() => {
                char.textContent = email[i] || "";
                char.style.opacity = "1";
              }, Math.random() * 300);
            });
          }

          tempSpan.style.opacity = "1";
          tempSpan.style.visibility = "visible";
        }
      }, Math.random() * 200 + 100);
    } else {
      const demail = document.getElementById("demail");
      if (demail) {
        const chars = demail.getElementsByClassName("email-char");
        Array.from(chars).forEach((char) => {
          char.textContent = "";
          char.style.opacity = "0";
        });

        setTimeout(() => demail.remove(), 300);
      }
    }
    e_is_shown = !e_is_shown;
  });

  // Enhanced cleanup
  document.addEventListener("click", (event) => {
    if (!emailIcon.contains(event.target) && e_is_shown) {
      const demail = document.getElementById("demail");
      if (demail) {
        Array.from(demail.getElementsByClassName("email-char")).forEach(
          (char) => {
            char.textContent = "";
            char.style.opacity = "0";
          }
        );
        setTimeout(() => demail.remove(), 300);
      }
      e_is_shown = false;
    }
  });
});
