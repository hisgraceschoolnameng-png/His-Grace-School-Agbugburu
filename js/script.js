/**
 * HIS GRACE SCHOOL AGBUGBURU - School Management Portal Script
 * Handles Theme Toggling, Mobile Navigation, Modals, Back to Top, and Loading Screen.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons (provided via CDN in index.html)
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ==========================================
  // 1. THEME MANAGEMENT (DARK / LIGHT MODE)
  // ==========================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('[data-lucide]') : null;

  // Check saved preference or media query
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const setTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      updateThemeIcon('sun');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      updateThemeIcon('moon');
    }
  };

  const updateThemeIcon = (iconName) => {
    if (themeToggleBtn && typeof lucide !== 'undefined') {
      // Replace the inner icon and re-initialize it
      themeToggleBtn.innerHTML = `<i data-lucide="${iconName}"></i>`;
      lucide.createIcons();
    }
  };

  // Initial application of theme
  if (savedTheme) {
    setTheme(savedTheme);
  } else if (prefersDark) {
    setTheme('dark');
  } else {
    setTheme('light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'dark') {
        setTheme('light');
      } else {
        setTheme('dark');
      }
    });
  }

  // ==========================================
  // 2. MOBILE NAVIGATION (HAMBURGER DRAWER)
  // ==========================================
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMenu = () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
    
    // Prevent background scrolling when menu is open
    if (navMenu.classList.contains('open')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }

  // Close menu when clicking on nav link or external area
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // ==========================================
  // 3. BACK TO TOP BUTTON
  // ==========================================
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================
  // 4. PORTAL LOGIN MODAL HANDLERS
  // ==========================================
  const modalOverlay = document.getElementById('portal-modal-overlay');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const portalForm = document.getElementById('portal-login-form');
  const modalTitle = document.getElementById('modal-portal-title');
  const modalSubtitle = document.getElementById('modal-portal-subtitle');
  const usernameLabel = document.getElementById('modal-username-label');
  const usernameInput = document.getElementById('portal-username');
  const passwordInput = document.getElementById('portal-password');
  const loginBtnText = document.getElementById('login-btn-text');
  
  // Keep track of active portal selection
  let currentActivePortal = '';

  const openPortalModal = (portalType) => {
    currentActivePortal = portalType;
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Reset inputs
    usernameInput.value = '';
    passwordInput.value = '';

    // Dynamically adjust modal based on selected portal
    if (portalType === 'student') {
      modalTitle.textContent = 'Student Portal';
      modalSubtitle.textContent = 'Access your CBT exams, assignments, and results';
      usernameLabel.textContent = 'Student Registration Number';
      usernameInput.placeholder = 'e.g., HGS/STU/2026/001';
      loginBtnText.textContent = 'Access Student Dashboard';
    } else if (portalType === 'teacher') {
      modalTitle.textContent = 'Teacher Portal';
      modalSubtitle.textContent = 'Manage classes, assign CBTs, and publish report sheets';
      usernameLabel.textContent = 'Teacher Employee ID';
      usernameInput.placeholder = 'e.g., HGS/TCH/042';
      loginBtnText.textContent = 'Access Staff Room';
    } else if (portalType === 'admin') {
      modalTitle.textContent = 'Admin Portal';
      modalSubtitle.textContent = 'Complete control over students, staff, classes, and setup';
      usernameLabel.textContent = 'Admin Username';
      usernameInput.placeholder = 'e.g., administrator';
      loginBtnText.textContent = 'Access Console';
    }
  };

  const closePortalModal = () => {
    modalOverlay.classList.remove('open');
    if (!navMenu.classList.contains('open')) {
      document.body.style.overflow = '';
    }
  };

  // Bind portal links
  const portalLinks = document.querySelectorAll('[data-portal]');
  portalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const portalType = link.getAttribute('data-portal');
      openPortalModal(portalType);
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closePortalModal);
  }

  // Close modal when clicking on overlay background
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closePortalModal();
      }
    });
  }

  // Handle mock authentication in form
  if (portalForm) {
    portalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();

      if (!username || !password) {
        alert('Please fill in all credentials before accessing.');
        return;
      }

      // Add elegant transition to simulate system loading
      loginBtnText.innerHTML = 'Securing Session... <span class="spinner-small"></span>';
      
      setTimeout(() => {
        alert(`Authentication Simulation Successful!\n\nYou entered: ${username}\nPortal Type: ${currentActivePortal.toUpperCase()}\n\nWelcome to HIS GRACE SCHOOL AGBUGBURU Portal Hub! Dynamic backend linking is scheduled for Phase 2.`);
        loginBtnText.textContent = 'Access Console';
        closePortalModal();
      }, 1200);
    });
  }

  // ==========================================
  // 5. SMOOTH PAGE ANCHOR SCROLLING
  // ==========================================
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ==========================================
  // 6. LOADER ANIMATION DISMISSAL
  // ==========================================
  const loaderOverlay = document.getElementById('loader-overlay');
  
  const hideLoader = () => {
    if (loaderOverlay) {
      loaderOverlay.classList.add('fade-out');
      // Remove from flow entirely after transition finishes
      setTimeout(() => {
        loaderOverlay.style.display = 'none';
      }, 600);
    }
  };

  // Guarantee loader shuts off even if some static resources are slow
  window.addEventListener('load', hideLoader);
  // Fail-safe: dismiss after 2.5 seconds anyway
  setTimeout(hideLoader, 1500);
});
