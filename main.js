/**
 * LEGACY UNITED — OFFICIAL INTERACTIVE CONTROLLER
 * Domain: legacyunited.io
 * Central Support: support@legacyunited.io
 * Organization: Legacy United (Est. 2017)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- Elements Cache ---
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavLinks = mobileNav ? mobileNav.querySelectorAll('.mobile-nav-item, .btn') : [];

  // Tab Elements
  const tabDigitalBtn = document.getElementById('tabDigitalBtn');
  const tabPhysicalBtn = document.getElementById('tabPhysicalBtn');
  const panelDigital = document.getElementById('panelDigital');
  const panelPhysical = document.getElementById('panelPhysical');

  // Privacy Modal Elements
  const privacyModal = document.getElementById('privacyModal');
  const openPrivacyModalBtn = document.getElementById('openPrivacyModal');
  const closePrivacyModalBtn = document.getElementById('closePrivacyModal');
  const confirmPrivacyCloseBtn = document.getElementById('confirmPrivacyClose');

  // Terms Modal Elements
  const termsModal = document.getElementById('termsModal');
  const openTermsModalBtn = document.getElementById('openTermsModal');
  const closeTermsModalBtn = document.getElementById('closeTermsModal');
  const confirmTermsCloseBtn = document.getElementById('confirmTermsClose');

  // Contact Form Elements
  const inquiryForm = document.getElementById('inquiryForm');
  const formFeedback = document.getElementById('formFeedback');

  // Navigation Links
  const navLinks = document.querySelectorAll('.nav-links .nav-item');

  // --- Sticky Header Scroll Shadow ---
  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > 30) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- Mobile Navigation Toggle ---
  if (mobileToggle && mobileNav) {
    const toggleMobileMenu = (forceClose = false) => {
      const isCurrentlyOpen = mobileNav.classList.contains('is-open');
      const shouldOpen = forceClose ? false : !isCurrentlyOpen;

      if (shouldOpen) {
        mobileNav.classList.add('is-open');
        mobileToggle.classList.add('is-active');
        mobileToggle.setAttribute('aria-expanded', 'true');
      } else {
        mobileNav.classList.remove('is-open');
        mobileToggle.classList.remove('is-active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    };

    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        toggleMobileMenu(true);
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (
        mobileNav.classList.contains('is-open') &&
        !mobileNav.contains(e.target) &&
        !mobileToggle.contains(e.target)
      ) {
        toggleMobileMenu(true);
      }
    });
  }

  // --- Dual-Pillar Interactive Tab Model ---
  const switchTab = (activePillar) => {
    if (!tabDigitalBtn || !tabPhysicalBtn || !panelDigital || !panelPhysical) return;

    if (activePillar === 'digital') {
      tabDigitalBtn.classList.add('active');
      tabDigitalBtn.setAttribute('aria-selected', 'true');
      tabPhysicalBtn.classList.remove('active');
      tabPhysicalBtn.setAttribute('aria-selected', 'false');

      panelDigital.classList.add('active');
      panelPhysical.classList.remove('active');
    } else {
      tabPhysicalBtn.classList.add('active');
      tabPhysicalBtn.setAttribute('aria-selected', 'true');
      tabDigitalBtn.classList.remove('active');
      tabDigitalBtn.setAttribute('aria-selected', 'false');

      panelPhysical.classList.add('active');
      panelDigital.classList.remove('active');
    }
  };

  if (tabDigitalBtn && tabPhysicalBtn) {
    tabDigitalBtn.addEventListener('click', () => switchTab('digital'));
    tabPhysicalBtn.addEventListener('click', () => switchTab('physical'));
  }

  // --- Accessible Modal Dialogs ---
  const openModal = (modalElement) => {
    if (!modalElement) return;
    modalElement.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';

    // Trap focus inside modal
    const closeBtn = modalElement.querySelector('.modal-close');
    if (closeBtn) {
      setTimeout(() => closeBtn.focus(), 50);
    }
  };

  const closeModal = (modalElement) => {
    if (!modalElement) return;
    modalElement.setAttribute('hidden', '');
    document.body.style.overflow = '';
  };

  // Privacy Policy Modal Handlers
  if (openPrivacyModalBtn && privacyModal) {
    openPrivacyModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(privacyModal);
    });
  }
  if (closePrivacyModalBtn && privacyModal) {
    closePrivacyModalBtn.addEventListener('click', () => closeModal(privacyModal));
  }
  if (confirmPrivacyCloseBtn && privacyModal) {
    confirmPrivacyCloseBtn.addEventListener('click', () => closeModal(privacyModal));
  }

  // Terms of Service Modal Handlers
  if (openTermsModalBtn && termsModal) {
    openTermsModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(termsModal);
    });
  }
  if (closeTermsModalBtn && termsModal) {
    closeTermsModalBtn.addEventListener('click', () => closeModal(termsModal));
  }
  if (confirmTermsCloseBtn && termsModal) {
    confirmTermsCloseBtn.addEventListener('click', () => closeModal(termsModal));
  }

  // Handle direct hash navigation (e.g. #privacy, #terms) for direct Apple review links
  const checkHashModal = () => {
    const hash = window.location.hash.toLowerCase();
    if (hash === '#privacy' || hash === '#privacy-policy') {
      openModal(privacyModal);
    } else if (hash === '#terms' || hash === '#terms-of-service' || hash === '#eula') {
      openModal(termsModal);
    }
  };
  checkHashModal();
  window.addEventListener('hashchange', checkHashModal);

  // Modal Backdrop Click (close when clicking outside dialog window)
  [privacyModal, termsModal].forEach((modal) => {
    if (!modal) return;
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Global Keyboard Escape Handler
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (privacyModal && !privacyModal.hasAttribute('hidden')) {
        closeModal(privacyModal);
      }
      if (termsModal && !termsModal.hasAttribute('hidden')) {
        closeModal(termsModal);
      }
      if (mobileNav && mobileNav.classList.contains('is-open')) {
        mobileNav.classList.remove('is-open');
        if (mobileToggle) {
          mobileToggle.classList.remove('is-active');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      }
    }
  });

  // --- Contact / Inquiry Form Processing via Formspree ---
  if (inquiryForm) {
    const submitBtn = document.getElementById('submitBtn');

    inquiryForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const fullName = document.getElementById('fullName')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const inquiryType = document.getElementById('inquiryType')?.value;
      const message = document.getElementById('message')?.value.trim();

      if (!fullName || !email || !inquiryType || !message) {
        if (formFeedback) {
          formFeedback.className = 'form-feedback is-visible error';
          formFeedback.textContent = 'Please complete all required fields before submitting.';
        }
        return;
      }

      const originalBtnText = submitBtn ? submitBtn.textContent : 'Submit Inquiry';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting Inquiry...';
      }

      try {
        const formData = new FormData(inquiryForm);
        const response = await fetch('https://formspree.io/f/xdekjvze', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          if (formFeedback) {
            formFeedback.className = 'form-feedback is-visible success';
            formFeedback.innerHTML = `<strong>Thank you, ${fullName}!</strong> Your inquiry has been successfully sent to our admissions and central support desk. We will respond within one business day.`;
          }
          inquiryForm.reset();
        } else {
          const errorData = await response.json();
          const errorMsg = errorData?.errors?.map(err => err.message).join(', ') || 'Submission failed. Please try again.';
          if (formFeedback) {
            formFeedback.className = 'form-feedback is-visible error';
            formFeedback.innerHTML = `${errorMsg} Or email directly to <a href="mailto:support@legacyunited.io" style="text-decoration:underline;">support@legacyunited.io</a>.`;
          }
        }
      } catch (err) {
        if (formFeedback) {
          formFeedback.className = 'form-feedback is-visible error';
          formFeedback.innerHTML = `Network error submitting inquiry. Please email our admissions team directly at <a href="mailto:support@legacyunited.io" style="text-decoration:underline;">support@legacyunited.io</a>.`;
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }
      }
    });
  }

  // --- Scrollspy Navigation Indicator ---
  const sections = document.querySelectorAll('section[id]');
  const updateNavSpy = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateNavSpy, { passive: true });
});
