/* ═══════════════════════════════════════════════════════════
   SHIV MEHTA — AI/ML ENGINEER PORTFOLIO
   JavaScript: Typewriter, Scroll Reveal, Navbar
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── Typewriter Effect ───
  const titles = [
    'AI/ML Engineer',
    'Machine Learning Developer',
    'NLP Engineer',
    'Data Scientist'
  ];

  const dynamicTitleEl = document.getElementById('dynamicTitle');

  if (dynamicTitleEl) {
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const TYPING_SPEED = 80;
    const DELETING_SPEED = 50;
    const PAUSE_AFTER_TYPE = 2000;
    const PAUSE_AFTER_DELETE = 400;

    function typewrite() {
      const currentTitle = titles[titleIndex];

      if (!isDeleting) {
        dynamicTitleEl.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentTitle.length) {
          isDeleting = true;
          setTimeout(typewrite, PAUSE_AFTER_TYPE);
          return;
        }
        setTimeout(typewrite, TYPING_SPEED);
      } else {
        dynamicTitleEl.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          titleIndex = (titleIndex + 1) % titles.length;
          setTimeout(typewrite, PAUSE_AFTER_DELETE);
          return;
        }
        setTimeout(typewrite, DELETING_SPEED);
      }
    }

    setTimeout(typewrite, 600);
  }

  // ─── Scroll Reveal (Intersection Observer) ───
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: reveal all immediately
    revealElements.forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  // ─── Navbar Scroll Effect ───
  const navbar = document.getElementById('navbar');
  let lastScrollY = 0;

  function handleNavbarScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  // ─── Active Nav Link on Scroll ───
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNavLink() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavLink, { passive: true });

  // ─── Mobile Nav Toggle ───
  const navToggle = document.getElementById('navToggle');
  const navLinksContainer = document.getElementById('navLinks');

  if (navToggle && navLinksContainer) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navLinksContainer.classList.toggle('open');
    });

    // Close mobile nav on link click
    navLinksContainer.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navLinksContainer.classList.remove('open');
      });
    });
  }

  // ─── Smooth Scroll for all anchor links ───
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ─── Staggered reveal for grid children ───
  const gridContainers = document.querySelectorAll(
    '.projects-grid, .skills-grid, .achievements-grid, .contact-grid'
  );

  gridContainers.forEach(function (grid) {
    var children = grid.querySelectorAll('.reveal');
    children.forEach(function (child, index) {
      child.style.transitionDelay = (index * 0.1) + 's';
    });
  });

})();
