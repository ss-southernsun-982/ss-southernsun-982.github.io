document.addEventListener("DOMContentLoaded", function () {
  const doors = document.querySelector(".doors");
  const splashScreen = document.getElementById("splash-screen");
  const mainContent = document.getElementById("main-content");

  // Start with doors closed
  setTimeout(() => {
    // Open the doors
    doors.classList.add("open");

    // Wait for doors to open and loading to complete
    setTimeout(() => {
      // Fade out splash screen
      splashScreen.style.opacity = "0";
      splashScreen.style.transition = "opacity 0.5s ease";

      // Show main content
      setTimeout(() => {
        splashScreen.style.display = "none";
        mainContent.style.display = "block";

        // Fade in main content
        mainContent.style.opacity = "0";
        mainContent.style.transition = "opacity 0.5s ease";

        requestAnimationFrame(() => {
          mainContent.style.opacity = "1";
        });
      }, 500);
    }, 2500); // Adjust this time to match your loading bar duration
  }, 500);
});

function showContent(contentId) {
  const sidebarClose = document.getElementById("sidebarClose");
  // Remove active class from all nav links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
  });

  // Add active class to clicked nav link
  document
    .querySelector(`[onclick="showContent('${contentId}')"]`)
    .classList.add("active");

  // Hide all content sections
  document.querySelectorAll(".content").forEach((content) => {
    content.classList.remove("active");
    content.classList.remove("fade-in");
  });

  // Show selected content with animation
  const selectedContent = document.getElementById(contentId);
  selectedContent.classList.add("active");
  selectedContent.classList.add("fade-in");

  sidebarClose?.click();
}

// Make showContent function global
window.showContent = showContent;

// Handle mobile menu
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    if (window.innerWidth < 992) {
      // Add mobile menu collapse logic here if needed
    }
  });
});

class TextAnimator {
  constructor(element, texts, options = {}) {
    this.element = element;
    this.texts = texts;
    this.currentIndex = 0;
    this.options = {
      typeSpeed: options.typeSpeed || 100,
      deleteSpeed: options.deleteSpeed || 50,
      pauseTime: options.pauseTime || 2000,
      loop: options.loop !== undefined ? options.loop : true,
    };
    this.isDeleting = false;
    this.text = "";
    this.animate();
  }

  animate() {
    const currentText = this.texts[this.currentIndex];

    if (this.isDeleting) {
      // Remove character
      this.text = currentText.substring(0, this.text.length - 1);
    } else {
      // Add character
      this.text = currentText.substring(0, this.text.length + 1);
    }

    // Update text content
    this.element.textContent = this.text;

    // Calculate typing speed
    let speed = this.isDeleting
      ? this.options.deleteSpeed
      : this.options.typeSpeed;

    // Check if word is complete
    if (!this.isDeleting && this.text === currentText) {
      // Add fade out class after pause
      setTimeout(() => {
        this.element.classList.add("fade-out");
        setTimeout(() => {
          this.isDeleting = true;
          this.element.classList.remove("fade-out");
        }, 500);
      }, this.options.pauseTime);
      speed = this.options.pauseTime;
    } else if (this.isDeleting && this.text === "") {
      this.isDeleting = false;
      // Move to next text
      this.currentIndex = (this.currentIndex + 1) % this.texts.length;
      // Add fade in class
      this.element.classList.add("fade-in");
      setTimeout(() => {
        this.element.classList.remove("fade-in");
      }, 500);
      speed = 500;
    }

    setTimeout(() => this.animate(), speed);
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const element = document.querySelector(".animated-text");
  const texts = [
    "Mobile Developer: Android, Flutter",
    "Backend Developer: NodeJS, NextJS",
    "Database: PostgreSQL, OracleSQL",
    "Odoo Developer: Python, JavaScript",
    "Docker, Nginx",
  ];

  const options = {
    typeSpeed: 100, // Speed of typing
    deleteSpeed: 50, // Speed of deleting
    pauseTime: 2000, // How long to pause between typing and deleting
    loop: true, // Whether to loop through the texts
  };

  new TextAnimator(element, texts, options);
});

// Add this to your existing sidebar management code
document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");
  const sidebarClose = document.getElementById("sidebarClose");
  const overlay = document.querySelector(".sidebar-overlay");

  // Menu button click handler
  menuBtn?.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    sidebar.classList.toggle("show");
    // overlay.classList.toggle("show");
  });

  // Close button click handler
  sidebarClose?.addEventListener("click", () => {
    menuBtn.classList.remove("active");
    sidebar.classList.remove("show");
    // overlay.classList.remove("show");
  });

  // Overlay click handler
  overlay?.addEventListener("click", () => {
    menuBtn.classList.remove("active");
    sidebar.classList.remove("show");
    // overlay.classList.remove("show");
  });
});

// Add this to your existing script.js
document.addEventListener("DOMContentLoaded", function () {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      portfolioItems.forEach((item) => {
        if (
          filterValue === "all" ||
          item.getAttribute("data-category") === filterValue
        ) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
});

// Add this to your existing script.js
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector(".contact-form");

  contactForm?.addEventListener("submit", function (e) {
    e.preventDefault();

    // Add your form submission logic here
    // Example:
    const formData = new FormData(this);
    console.log("Form submitted:", Object.fromEntries(formData));

    // Reset form after submission
    this.reset();

    // Show success message (you can customize this)
    alert("Message sent successfully!");
  });
});

// document.addEventListener("DOMContentLoaded", function () {
//   // ... existing code ...

//   // Function to update particles height
//   function updateParticlesHeight() {
//     const activeContent = document.querySelector(".content.active");
//     const particlesContainer = document.getElementById("particles-js");

//     if (activeContent && particlesContainer) {
//       // Get the actual height of the active content
//       const contentHeight = activeContent.offsetHeight;
//       // Get the viewport height
//       const viewportHeight = window.innerHeight;
//       // Use the larger of the two heights
//       const newHeight = Math.max(contentHeight, viewportHeight);

//       particlesContainer.style.height = `${newHeight}px`;
//     }
//   }

//   // Update particles height when content changes
//   const navLinks = document.querySelectorAll(".nav-link");
//   navLinks.forEach((link) => {
//     link.addEventListener("click", () => {
//       // Wait for content transition to complete
//       setTimeout(updateParticlesHeight, 100);
//     });
//   });

//   // Update on window resize
//   window.addEventListener("resize", updateParticlesHeight);

//   // Initial update
//   updateParticlesHeight();
// });
