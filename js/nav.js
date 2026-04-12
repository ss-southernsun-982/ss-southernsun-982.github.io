(() => {
  const desktopLinks = document.querySelectorAll('aside nav a');
  const mobileLinks  = document.querySelectorAll('.md\\:hidden nav a, div.md\\:hidden a[href^="#"]');

  function setActive(sectionId) {
    // Desktop sidebar
    desktopLinks.forEach(link => {
      const isActive = link.getAttribute('href') === '#' + sectionId;
      link.classList.toggle('text-[#013a00]', isActive);
      link.classList.toggle('bg-[#00ff00]',   isActive);
      link.classList.toggle('font-bold',       isActive);
      link.classList.toggle('text-[#84967c]', !isActive);
    });

    // Mobile bottom nav
    mobileLinks.forEach(link => {
      const isActive = link.getAttribute('href') === '#' + sectionId;
      link.classList.toggle('text-primary-container',  isActive);
      link.classList.toggle('text-on-surface-variant', !isActive);
    });
  }

  // Click on desktop links
  desktopLinks.forEach(link => {
    link.addEventListener('click', () => {
      const id = link.getAttribute('href').replace('#', '');
      setActive(id);
    });
  });

  // Click on mobile links
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      const id = link.getAttribute('href').replace('#', '');
      setActive(id);
    });
  });

  // Scroll spy
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

  ['home', 'projects', 'skills', 'contact'].forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
})();
