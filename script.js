/* ========== Navbar Scroll Effect ========== */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const navMenu = document.getElementById('navLinks');
const navToggle = document.getElementById('navToggle');

function handleNavScroll() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavScroll);

/* ========== Mobile Navigation ========== */
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  navToggle.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

/* ========== Active Nav Link on Scroll ========== */
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveLink);

/* ========== Back to Top ========== */
const backToTop = document.getElementById('backToTop');

function handleBackToTop() {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

window.addEventListener('scroll', handleBackToTop);

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ========== Scroll Animations ========== */
const animateElements = document.querySelectorAll('[data-animate]');

const observerOptions = {
  root: null,
  rootMargin: '0px 0px -60px 0px',
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('animated');
      }, index * 100);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

animateElements.forEach(el => observer.observe(el));

/* ========== Skill Bar Animation ========== */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.getAttribute('data-width');
      entry.target.style.width = `${width}%`;
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

skillFills.forEach(fill => skillObserver.observe(fill));

/* ========== Particle Effect ========== */
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 6 + 2;
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 15;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}%`;
    particle.style.bottom = '-10px';
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;

    container.appendChild(particle);
  }
}

createParticles();

/* ========== Contact Form ========== */
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;

  btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
  btn.style.background = '#22c55e';
  btn.style.borderColor = '#22c55e';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.style.background = '';
    btn.style.borderColor = '';
    btn.disabled = false;
    contactForm.reset();
  }, 3000);
});

/* ========== Smooth Scroll for all anchor links ========== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ========== Certificate Modal ========== */
function openCertModal(src) {
  const modal = document.getElementById('certModal');
  const modalImg = document.getElementById('certModalImg');
  const modalDownload = document.getElementById('certModalDownload');
  modalImg.src = src;
  modalDownload.href = src;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCertModal(event) {
  const modal = document.getElementById('certModal');
  const content = modal.querySelector('.cert-modal-content');
  if (event.target === modal || event.target.closest('.cert-modal-close')) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ========== Resume Modal ========== */
function openResumeModal() {
  const modal = document.getElementById('resumeModal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeResumeModal(event) {
  const modal = document.getElementById('resumeModal');
  if (event.target === modal || event.target.closest('.cert-modal-close')) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const certModal = document.getElementById('certModal');
    const resumeModal = document.getElementById('resumeModal');
    certModal.classList.remove('active');
    resumeModal.classList.remove('active');
    document.body.style.overflow = '';
  }
});
