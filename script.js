// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Fade-in on scroll
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply fade-in to sections and cards
document.querySelectorAll('.section, .project-card, .skill-category, .timeline-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Contact form - disable button while submitting to prevent double-submit
document.getElementById('contact-form').addEventListener('submit', () => {
    const btn = document.querySelector('#contact-form button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
});
