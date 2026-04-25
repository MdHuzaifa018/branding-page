// Initialize Animate On Scroll (AOS)
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true, // Animation happens only once while scrolling down
  offset: 100,
});

// --- Sticky Navbar & Active Link Highlight ---
const navbar = document.getElementById("navbar");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-item");
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  let current = "";

  // Navbar Glass Effect
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Scroll to Top Button Visibility
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }

  // Active Link Detection
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// --- Dark/Light Mode Toggle ---
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const icon = themeToggle.querySelector("i");

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark-theme");
  icon.classList.replace("fa-moon", "fa-sun");
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-theme");

  if (body.classList.contains("dark-theme")) {
    icon.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "dark");
  } else {
    icon.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "light");
  }
});

// --- Mobile Menu Toggle ---
const mobileBtn = document.querySelector(".mobile-menu-btn");
const navLinksContainer = document.querySelector(".nav-links");
const mobileIcon = mobileBtn.querySelector("i");

mobileBtn.addEventListener("click", () => {
  navLinksContainer.classList.toggle("active");
  if (navLinksContainer.classList.contains("active")) {
    mobileIcon.classList.replace("fa-bars", "fa-xmark");
  } else {
    mobileIcon.classList.replace("fa-xmark", "fa-bars");
  }
});

// Close mobile menu on link click
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinksContainer.classList.remove("active");
    mobileIcon.classList.replace("fa-xmark", "fa-bars");
  });
});

// --- FAQ Accordion ---
const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach((item) => {
  const header = item.querySelector(".accordion-header");

  header.addEventListener("click", () => {
    // Close all other accordions
    accordionItems.forEach((otherItem) => {
      if (otherItem !== item && otherItem.classList.contains("active")) {
        otherItem.classList.remove("active");
        otherItem.querySelector(".accordion-content").style.maxHeight = null;
      }
    });

    // Toggle current accordion
    item.classList.toggle("active");
    const content = item.querySelector(".accordion-content");

    if (item.classList.contains("active")) {
      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      content.style.maxHeight = null;
    }
  });
});

// --- Scroll To Top functionality ---
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// --- Prevent Form Default Submission (Demo purpose) ---
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const btn = this.querySelector("button");
    const originalText = btn.innerText;
    btn.innerText = "Message Sent!";
    btn.style.backgroundColor = "#10b981"; // Success green

    setTimeout(() => {
      btn.innerText = originalText;
      btn.style.backgroundColor = "";
      this.reset();
    }, 3000);
  });
