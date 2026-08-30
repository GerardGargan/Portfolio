// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        const open = navMenu.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', open);
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// Staggered fade-in when a group scrolls into view
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.25 });

document.querySelectorAll('.fade-group').forEach(el => fadeObserver.observe(el));

// Contact form - submit via AJAX to stay on page
const contactForm = document.getElementById('contact-form');
if (contactForm) contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
        });
        const data = await response.json();
        if (data.success) {
            btn.textContent = 'Sent!';
            form.reset();
        } else {
            btn.textContent = 'Failed — try again';
            btn.disabled = false;
        }
    } catch {
        btn.textContent = 'Failed — try again';
        btn.disabled = false;
    }
});
