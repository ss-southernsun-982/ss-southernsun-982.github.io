particlesJS("particles-js", {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#333333",
    },
    shape: {
      type: "circle",
      stroke: {
        width: 1,
        color: "#000000",
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 200,
      color: "#333333",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
  fullScreen: {
    enable: true,
    zIndex: -1,
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        particles: {
          number: {
            value: 40,
          },
        },
      },
    },
  ],
});

// Improved resize handler
function reinitializeParticles() {
  try {
    if (window.pJSDom && window.pJSDom.length > 0) {
      // Safely destroy existing instance
      window.pJSDom[0].pJS.fn.vendors.destroypJS();
      window.pJSDom = [];
    }
    // Reinitialize particles
    particlesJS("particles-js", {
      particles: {
        number: {
          value: window.innerWidth < 768 ? 40 : 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        // ... rest of your particles config ...
      },
      retina_detect: true,
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
    });
  } catch (error) {
    console.log("Particles resize error:", error);
  }
}

// Update particles canvas size
function updateParticlesSize() {
  try {
    if (window.pJSDom && window.pJSDom[0]) {
      const canvas = window.pJSDom[0].pJS.canvas.el;
      const wrapper = document.getElementById("particles-js");

      if (canvas && wrapper) {
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.width = wrapper.offsetWidth;
        canvas.height = wrapper.offsetHeight;
      }
    }
  } catch (error) {
    console.log("Canvas resize error:", error);
  }
}

// Debounce function to limit resize calls
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Add event listeners with debouncing
const debouncedResize = debounce(() => {
  reinitializeParticles();
  updateParticlesSize();
}, 250);

window.addEventListener("resize", debouncedResize);
document.addEventListener("DOMContentLoaded", () => {
  updateParticlesSize();
});
