// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({ behavior: 'smooth' });
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