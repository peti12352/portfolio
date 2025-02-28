document.addEventListener("DOMContentLoaded", function () {
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

  // Enhanced email protection and reveal functionality
  const rot13 = (str) => {
    return str.replace(/[a-zA-Z]/g, (char) => {
      const base = char <= "Z" ? 65 : 97;
      return String.fromCharCode(
        ((char.charCodeAt(0) - base + 13) % 26) + base
      );
    });
  };

  // Initialize email functionality when DOM is loaded
  const emailIcon = document.getElementById("iemail");
  const emailDisplay = document.getElementById("demail");
  let isEmailShown = false;

  // Encoded email - this makes it harder for bots to scrape
  const encodedEmail = "crgre@gnyybfl.uh"; // "peter@tallosy.hu" in ROT13

  emailIcon.addEventListener("click", () => {
    if (!isEmailShown) {
      // Decode and display email
      const decodedEmail = rot13(encodedEmail);
      emailDisplay.textContent = decodedEmail;
      emailDisplay.style.opacity = "1";

      // Create a temporary input for copy functionality
      const tempInput = document.createElement("input");
      tempInput.value = decodedEmail;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);

      // Update tooltip
      emailIcon.title = "Email copied to clipboard!";

      // Reset tooltip after 2 seconds
      setTimeout(() => {
        emailIcon.title = "Click to reveal email";
      }, 2000);
    } else {
      // Hide email
      emailDisplay.textContent = "";
      emailDisplay.style.opacity = "0";
      emailIcon.title = "Click to reveal email";
    }
    isEmailShown = !isEmailShown;
  });

  // Hide email when clicking outside
  document.addEventListener("click", (event) => {
    if (!emailIcon.contains(event.target) && isEmailShown) {
      emailDisplay.textContent = "";
      emailDisplay.style.opacity = "0";
      emailIcon.title = "Click to reveal email";
      isEmailShown = false;
    }
  });
});
