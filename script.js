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
function initializeCarousel() {
    console.log('Initializing carousel...');
    
    // Get carousel elements
    const carousel = document.querySelector('.carousel');
    const cards = document.querySelectorAll('.project-card');
    const prevBtn = document.querySelector('.carousel-button.prev');
    const nextBtn = document.querySelector('.carousel-button.next');

    // Check if elements exist
    if (!carousel || !prevBtn || !nextBtn) {
        console.error('Missing carousel elements');
        return;
    }

    let currentIndex = 0;
    const totalCards = cards.length;
    let autoPlayInterval;

    function updateCarousel(smooth = true) {
        const cardWidth = cards[0].offsetWidth;
        const gap = 30;
        const containerWidth = carousel.parentElement.offsetWidth;
        const visibleWidth = containerWidth - 200;
        
        // Limit the offset to show 2 cards
        let baseOffset = Math.min(100 - (currentIndex * (cardWidth + gap)), 100);
        
        // Prevent the carousel from moving too far left
        if (currentIndex >= totalCards - 2) {
            baseOffset = -((totalCards - 3) * (cardWidth + gap));
        }
        
        carousel.style.transition = smooth ? 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
        carousel.style.transform = `translateX(${baseOffset}px)`;
        
        // Update card states with smoother transitions
        cards.forEach((card, idx) => {
            const distance = Math.abs(idx - currentIndex);
            card.style.transition = smooth ? 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
            
            card.classList.remove('active', 'semi-active');
            
            if (distance === 0) {
                card.classList.add('active');
            } else if (distance === 1 && idx > currentIndex) {
                card.classList.add('semi-active');
            }
        });

        console.log(`Current Index: ${currentIndex}, Offset: ${baseOffset}px`);
    }

    function goToSlide(index, smooth = true) {
        currentIndex = index;
        
        // Ensure smooth wrapping with limited range
        if (currentIndex < 0) {
            currentIndex = totalCards - 2;
        } else if (currentIndex >= totalCards - 1) {
            currentIndex = 0;
        }
        
        updateCarousel(smooth);
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    // Auto-play functionality with slower transitions
    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, 6000); // 6 seconds interval
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }

    // Event Listeners
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        stopAutoPlay();
        prevSlide();
        startAutoPlay();
    });

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
    });

    // Pause auto-play on hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    // Initialize carousel starting from the left
    goToSlide(0, false);
    startAutoPlay();
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, starting initialization...');
    initializeCarousel();
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