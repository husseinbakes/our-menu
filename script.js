document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------
    // 1. Theme Toggle Logic
    // ------------------------------------
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        themeToggle.textContent = savedTheme === 'dark-theme' ? '☀️' : '🌙';
    } else {
        // Default to light theme if no preference saved
        body.classList.add('light-theme');
        themeToggle.textContent = '🌙';
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark-theme');
            themeToggle.textContent = '☀️';
        } else {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light-theme');
            themeToggle.textContent = '🌙';
        }
    });

    // ------------------------------------
    // 2. Order Modal Logic
    // ------------------------------------
    const orderButtons = document.querySelectorAll('.order-button');
    const modal = document.getElementById('order-modal');
    const closeBtn = document.querySelector('.close-btn');
    const modalCakeName = document.getElementById('modal-cake-name');

    orderButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const cakeName = event.target.dataset.cakeName || 'this delicious cake'; // Get cake name from data attribute
            modalCakeName.textContent = cakeName;
            modal.classList.add('visible'); // Use class for visibility
            body.style.overflow = 'hidden'; // Prevent scrolling on body
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('visible');
        body.style.overflow = ''; // Restore body scrolling
    });

    // Close modal if clicked outside of modal-content
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('visible');
            body.style.overflow = ''; // Restore body scrolling
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('visible')) {
            modal.classList.remove('visible');
            body.style.overflow = '';
        }
    });

    // ------------------------------------
    // 3. Reviews Slideshow Logic (only on index.html)
    // ------------------------------------
    const reviewsWrapper = document.querySelector('.reviews-wrapper');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const sliderDotsContainer = document.querySelector('.slider-dots');

    if (reviewsWrapper && prevBtn && nextBtn && sliderDotsContainer) {
        let currentReviewIndex = 0;
        const reviewSlides = document.querySelectorAll('.review-slide');
        const totalReviews = reviewSlides.length;
        let autoSlideInterval;

        // Function to update slides and dots
        const updateSlider = () => {
            reviewsWrapper.style.transform = `translateX(${-currentReviewIndex * 100}%)`;
            updateDots();
        };

        // Function to create/update dots
        const createDots = () => {
            sliderDotsContainer.innerHTML = ''; // Clear existing dots
            for (let i = 0; i < totalReviews; i++) {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (i === currentReviewIndex) {
                    dot.classList.add('active');
                }
                dot.dataset.index = i;
                dot.addEventListener('click', () => {
                    currentReviewIndex = i;
                    updateSlider();
                    resetAutoSlide();
                });
                sliderDotsContainer.appendChild(dot);
            }
        };

        const updateDots = () => {
            document.querySelectorAll('.dot').forEach((dot, index) => {
                if (index === currentReviewIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };

        // Navigation functions
        const showNextReview = () => {
            currentReviewIndex = (currentReviewIndex + 1) % totalReviews;
            updateSlider();
        };

        const showPrevReview = () => {
            currentReviewIndex = (currentReviewIndex - 1 + totalReviews) % totalReviews;
            updateSlider();
        };

        prevBtn.addEventListener('click', () => {
            showPrevReview();
            resetAutoSlide();
        });

        nextBtn.addEventListener('click', () => {
            showNextReview();
            resetAutoSlide();
        });

        // Auto-slide functionality
        const startAutoSlide = () => {
            autoSlideInterval = setInterval(showNextReview, 7000); // Change slide every 7 seconds
        };

        const resetAutoSlide = () => {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        };

        // Pause on hover
        reviewsWrapper.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        reviewsWrapper.addEventListener('mouseleave', startAutoSlide);

        // Initialize slider
        createDots();
        updateSlider();
        startAutoSlide(); // Start auto-sliding when page loads

        // Responsive adjustments for the slider
        window.addEventListener('resize', () => {
            // Re-adjust transform to prevent layout issues on resize
            reviewsWrapper.style.transition = 'none'; // Temporarily disable transition during resize
            updateSlider();
            setTimeout(() => {
                reviewsWrapper.style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition
            }, 50);
        });
    }

    // ------------------------------------
    // 4. Active Category Link Logic
    // ------------------------------------
    const filterLinks = document.querySelectorAll('.filter-btn');
    const currentPagePath = window.location.pathname;
    const currentPageFilename = currentPagePath.substring(currentPagePath.lastIndexOf('/') + 1);

    filterLinks.forEach(link => {
        // Remove active class from all first
        link.classList.remove('active');

        // Check if the link's href matches the current page filename
        // Special case for index.html as its href is just "index.html"
        const linkFilename = link.getAttribute('href');
        if (linkFilename === currentPageFilename ||
           (currentPageFilename === '' && linkFilename === 'index.html')) { // Handles root path vs index.html explicitly
            link.classList.add('active');
        }
    });

    // ------------------------------------
    // 5. Fade-in for Sections (handled by CSS, but keeping DCL for any future JS animations)
    // ------------------------------------
    // The .fade-in animation is primarily handled by CSS with `animation-fill-mode: forwards;`
    // which keeps the final state of the animation (opacity: 1).
    // No specific JS is strictly needed for the initial fade-in, but if you wanted
    // scroll-triggered animations for sections, this is where you'd add an Intersection Observer.
});
