document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Toggle Logic ---
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.body.classList.add(currentTheme);
        themeToggle.textContent = currentTheme === 'dark-theme' ? '☀️' : '🌙';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        let theme = 'light-theme';
        if (document.body.classList.contains('dark-theme')) {
            theme = 'dark-theme';
            themeToggle.textContent = '☀️'; // Sun icon for dark theme
        } else {
            themeToggle.textContent = '🌙'; // Moon icon for light theme
        }
        localStorage.setItem('theme', theme);
    });

    // --- Order Modal Logic ---
    const orderButtons = document.querySelectorAll('.order-button');
    const modal = document.getElementById('order-modal');
    const closeModalBtn = document.querySelector('.close-btn');
    const modalCakeName = document.getElementById('modal-cake-name');
    const whatsappLink = modal.querySelector('.whatsapp-float'); // Get the WhatsApp link inside the modal

    orderButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const cakeName = event.target.dataset.cakeName || "a Custom Cake"; // Default if data-cake-name is missing
            modalCakeName.textContent = cakeName;

            // Update WhatsApp link with the cake name
            const whatsappBaseUrl = "https://wa.me/2547XXXXXXXX"; // Replace XXXXXXXX with your actual number
            const whatsappMessage = `I'm interested in ordering the ${encodeURIComponent(cakeName)} cake.`;
            whatsappLink.href = `${whatsappBaseUrl}?text=${whatsappMessage}`;

            modal.classList.add('visible');
        });
    });

    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('visible');
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('visible');
        }
    });

    // --- Dynamic Year for Footer ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }


    // --- Generalized Image Slider Logic ---
    // This class encapsulates the logic for each individual slideshow instance.
    class ImageSlider {
        constructor(sliderElement) {
            this.slider = sliderElement;
            this.wrapper = this.slider.querySelector('.image-wrapper');
            this.slides = this.slider.querySelectorAll('.image-slide');
            this.prevBtn = this.slider.querySelector('.prev-btn');
            this.nextBtn = this.slider.querySelector('.next-btn');
            this.dotsContainer = this.slider.querySelector('.slider-dots');

            if (!this.wrapper || !this.slides.length || !this.prevBtn || !this.nextBtn || !this.dotsContainer) {
                console.error("Missing essential elements for slider:", this.slider.id || this.slider);
                return; // Don't proceed if critical elements are missing
            }

            this.currentSlideIndex = 0;
            this.totalSlides = this.slides.length;
            this.autoSlideInterval = null; // To hold the interval ID

            this.initDots();
            this.attachEventListeners();
            this.updateSlider(); // Show initial slide and dot

            // Start auto-slide only for the reviews slider (if present on index.html)
            if (this.slider.id === 'reviews-slider') {
                this.startAutoSlide(5000); // 5 seconds for reviews
            }
        }

        initDots() {
            this.dotsContainer.innerHTML = ''; // Clear existing dots
            for (let i = 0; i < this.totalSlides; i++) {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                dot.dataset.index = i;
                dot.addEventListener('click', () => this.goToSlide(i));
                this.dotsContainer.appendChild(dot);
            }
        }

        updateSlider() {
            // Adjust currentSlideIndex to be within bounds
            if (this.currentSlideIndex < 0) {
                this.currentSlideIndex = this.totalSlides - 1;
            } else if (this.currentSlideIndex >= this.totalSlides) {
                this.currentSlideIndex = 0;
            }

            const offset = -this.currentSlideIndex * 100;
            this.wrapper.style.transform = `translateX(${offset}%)`;

            this.updateDots();
        }

        updateDots() {
            const dots = this.dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentSlideIndex);
            });
        }

        showNextSlide() {
            this.currentSlideIndex++;
            this.updateSlider();
            this.resetAutoSlide();
        }

        showPrevSlide() {
            this.currentSlideIndex--;
            this.updateSlider();
            this.resetAutoSlide();
        }

        goToSlide(index) {
            this.currentSlideIndex = index;
            this.updateSlider();
            this.resetAutoSlide();
        }

        startAutoSlide(intervalTime) {
            this.stopAutoSlide(); // Clear any existing interval first
            this.autoSlideInterval = setInterval(() => {
                this.showNextSlide();
            }, intervalTime);
        }

        stopAutoSlide() {
            if (this.autoSlideInterval) {
                clearInterval(this.autoSlideInterval);
                this.autoSlideInterval = null;
            }
        }

        resetAutoSlide() {
            // Only reset if auto-slide was already active
            if (this.slider.id === 'reviews-slider' && this.autoSlideInterval) {
                this.stopAutoSlide();
                this.startAutoSlide(5000); // Restart auto-slide after manual interaction
            }
        }

        attachEventListeners() {
            this.prevBtn.addEventListener('click', () => this.showPrevSlide());
            this.nextBtn.addEventListener('click', () => this.showNextSlide());
        }
    }

    // Initialize all slideshows found on the page
    const allSliders = document.querySelectorAll('.image-slider');
    allSliders.forEach(sliderElement => {
        new ImageSlider(sliderElement);
    });

}); // End DOMContentLoaded
