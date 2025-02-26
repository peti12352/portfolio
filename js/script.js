// Example JavaScript for smooth scrolling navigation
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".site-nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 20,
          behavior: "smooth",
        });
      }
    });
  });
});
