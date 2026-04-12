(() => {
  const navLinks = document.querySelectorAll('aside nav a');

  function setActive(activeLink) {
    navLinks.forEach(link => {
      link.classList.remove('text-[#013a00]', 'bg-[#00ff00]', 'font-bold');
      link.classList.add('text-[#84967c]');
    });
    activeLink.classList.remove('text-[#84967c]');
    activeLink.classList.add('text-[#013a00]', 'bg-[#00ff00]', 'font-bold');
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => setActive(link));
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const link = document.querySelector(`aside nav a[href="#${entry.target.id}"]`);
        if (link) setActive(link);
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

  ['home', 'projects', 'skills', 'contact'].forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
})();
