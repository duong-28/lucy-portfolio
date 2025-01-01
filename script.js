// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const section = document.querySelector(targetId);
        
        section.scrollIntoView({ behavior: 'smooth' });
        
        // If navigating to about section, trigger animations
        if (targetId === '#about') {
            setTimeout(triggerAboutAnimations, 500);
        }
    });
}); 

// Mobile menu functionality
const menuBtn = document.querySelector('.menu-btn');
const navbar = document.querySelector('.navbar');

// Toggle menu when clicking the button
menuBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    // Only close if menu is active and click is outside navbar
    if (navbar.classList.contains('active') && 
        !navbar.contains(e.target) && 
        !menuBtn.contains(e.target)) {
        navbar.classList.remove('active');
    }
});

// About section animations
const aboutSection = document.querySelector('#about');
const aboutElements = {
    heading: document.querySelector('.about-typing'),
    profile: document.querySelector('.profile-image'),
    text: document.querySelector('.about-text')
};

function triggerAboutAnimations() {
    aboutElements.heading.classList.add('animate');
    aboutElements.profile.classList.add('animate');
    aboutElements.text.classList.add('animate');
}

// Intersection Observer for About section
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            triggerAboutAnimations();
            aboutObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

if (aboutSection) {
    aboutObserver.observe(aboutSection);
}