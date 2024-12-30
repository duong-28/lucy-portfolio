document.addEventListener('DOMContentLoaded', function() {
    const pages = document.querySelectorAll('.page');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    let currentPage = 0;
    let isAnimating = false;

    // Initialize pages
    function initializePages() {
        pages.forEach((page, index) => {
            page.style.zIndex = pages.length - index;
            if (index === 0) {
                page.classList.add('active');
            }
        });
    }

    initializePages();
    prevBtn.style.display = 'none';

    function turnPage(index) {
        if (isAnimating) return;
        isAnimating = true;

        const currentPageElement = pages[currentPage];
        const nextPageElement = pages[index];

        // Update z-indices for proper stacking
        if (index > currentPage) {
            // Going forward
            nextPageElement.style.zIndex = parseInt(currentPageElement.style.zIndex) - 1;
            requestAnimationFrame(() => {
                currentPageElement.classList.add('flipped');
                
                setTimeout(() => {
                    currentPageElement.classList.remove('active');
                    nextPageElement.classList.add('active');
                    isAnimating = false;
                }, 800);
            });
        } else {
            // Going backward
            nextPageElement.style.zIndex = parseInt(currentPageElement.style.zIndex) + 1;
            currentPageElement.classList.remove('flipped');
            nextPageElement.classList.add('active');
            
            setTimeout(() => {
                currentPageElement.classList.remove('active');
                isAnimating = false;
            }, 800);
        }

        currentPage = index;
        updateButtons();
    }

    function updateButtons() {
        prevBtn.style.display = currentPage === 0 ? 'none' : 'block';
        nextBtn.style.display = currentPage === pages.length - 1 ? 'none' : 'block';
    }

    nextBtn.addEventListener('click', () => {
        if (currentPage < pages.length - 1) turnPage(currentPage + 1);
    });

    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) turnPage(currentPage - 1);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' && currentPage < pages.length - 1) {
            turnPage(currentPage + 1);
        }
        if (e.key === 'ArrowLeft' && currentPage > 0) {
            turnPage(currentPage - 1);
        }
    });
}); 