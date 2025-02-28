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

  // Email protection functionality
  const rot13 = (message) => {
    const alpha =
      "abcdefghijklmnopqrstuvwxyzabcdefghijklmABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLM";
    return message.replace(
      /[a-z]/gi,
      (letter) => alpha[alpha.indexOf(letter) + 13]
    );
  };

  let e_is_shown = false;
  const emailIcon = document.getElementById("iemail");
  const demail = document.getElementById("demail");
  const msg = "crgre@gnyybfl.uh"; // "peter@tallosy.hu" in rot13

  emailIcon.addEventListener("click", function (e) {
    e.stopPropagation();
    if (!e_is_shown) {
      setTimeout(() => {
        demail.textContent = rot13(msg);
        demail.style.opacity = "1";
        demail.style.visibility = "visible";
      }, 50); // Small delay to ensure proper transition
    } else {
      demail.style.opacity = "0";
      demail.style.visibility = "hidden";
      // Clear content after fade out
      setTimeout(() => {
        demail.textContent = "";
      }, 300); // Match transition duration
    }
    e_is_shown = !e_is_shown;
  });

  // Hide email when clicking outside
  document.addEventListener("click", (event) => {
    if (!emailIcon.contains(event.target) && e_is_shown) {
      demail.style.opacity = "0";
      demail.style.visibility = "hidden";
      setTimeout(() => {
        demail.textContent = "";
      }, 300);
      e_is_shown = false;
    }
  });
});
