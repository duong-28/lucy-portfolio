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

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const scrollThreshold = 100;
    
    if (window.scrollY > scrollThreshold) {
        header.classList.add('active');
    } else {
        header.classList.remove('active');
    }
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

// Projects Carousel
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.projects-container');
    const cards = document.querySelectorAll('.project-card');
    const prevBtn = document.querySelector('.carousel-button.prev');
    const nextBtn = document.querySelector('.carousel-button.next');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (!container || !cards.length) return;

    let currentIndex = 0;
    const totalCards = cards.length;

    // Create dots
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateDots(index) {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }

    function goToSlide(index) {
        currentIndex = index;
        const offset = -index * (cards[0].offsetWidth + 32); // 32px is the gap (2rem)
        container.style.transform = `translateX(${offset}px)`;
        updateDots(index);
        updateButtons();
    }

    function updateButtons() {
        prevBtn.style.display = currentIndex === 0 ? 'none' : 'flex';
        nextBtn.style.display = currentIndex === totalCards - 1 ? 'none' : 'flex';
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalCards - 1) {
            goToSlide(currentIndex + 1);
        }
    });

    // Handle touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    container.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) { // threshold of 50px
            if (diff > 0 && currentIndex < totalCards - 1) {
                // Swipe left
                goToSlide(currentIndex + 1);
            } else if (diff < 0 && currentIndex > 0) {
                // Swipe right
                goToSlide(currentIndex - 1);
            }
        }
    });

    // Initialize
    updateButtons();
    goToSlide(0);

    // Update on window resize
    window.addEventListener('resize', () => {
        goToSlide(currentIndex);
    });
});