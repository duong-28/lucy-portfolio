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
    const carousel = document.querySelector('.carousel');
    const cards = document.querySelectorAll('.project-card');
    const prevBtn = document.querySelector('.carousel-button.prev');
    const nextBtn = document.querySelector('.carousel-button.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    let currentIndex = 0;
    const totalCards = cards.length;
    
    // Initialize dots
    dotsContainer.innerHTML = '';
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    function updateCarousel(smooth = true) {
        const cardWidth = cards[0].offsetWidth;
        const gap = 40;
        const offset = -(currentIndex * (cardWidth + gap));
        
        if (smooth) {
            carousel.style.transition = 'transform 0.8s ease';
        } else {
            carousel.style.transition = 'none';
        }
        
        carousel.style.transform = `translateX(${offset}px)`;
        
        // Update dots
        document.querySelectorAll('.carousel-dot').forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIndex);
        });
        
        // Update card states
        cards.forEach((card, idx) => {
            const distance = Math.abs(idx - currentIndex);
            if (smooth) {
                card.style.transition = 'all 0.8s ease';
            } else {
                card.style.transition = 'none';
            }
            card.style.opacity = distance === 0 ? '1' : '0.6';
            card.style.transform = `scale(${distance === 0 ? 1 : 0.85})`;
        });

        // Log for debugging
        console.log('Updating carousel:', { currentIndex, offset, cardWidth });
    }

    function goToSlide(index) {
        currentIndex = index;
        if (currentIndex < 0) currentIndex = totalCards - 1;
        if (currentIndex >= totalCards) currentIndex = 0;
        updateCarousel(true);
        console.log('Going to slide:', currentIndex); // Debug log
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    // Auto-advance carousel
    let autoplayInterval = setInterval(nextSlide, 5000);

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    // Event Listeners
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        prevSlide();
        resetAutoplay();
        console.log('Prev button clicked'); // Debug log
    });

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextSlide();
        resetAutoplay();
        console.log('Next button clicked'); // Debug log
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoplay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoplay();
        }
    });

    // Touch events
    let touchStartX = 0;
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        clearInterval(autoplayInterval);
    });

    carousel.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        resetAutoplay();
    });

    // Pause on hover
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    carouselContainer.addEventListener('mouseleave', () => {
        resetAutoplay();
    });

    // Initialize carousel
    updateCarousel(false);
    console.log('Carousel initialized with', totalCards, 'cards'); // Debug log

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateCarousel(false);
            console.log('Carousel updated after resize'); // Debug log
        }, 100);
    });
});

// Error handling for videos
document.querySelectorAll('video').forEach(video => {
    video.addEventListener('error', function() {
        this.style.display = 'none';
        const fallbackImg = this.parentElement.querySelector('img');
        if (fallbackImg) {
            fallbackImg.style.display = 'block';
        }
    });
});