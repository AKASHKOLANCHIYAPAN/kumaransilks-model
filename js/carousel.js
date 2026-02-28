/**
 * Kumaran Silks — Hero Carousel
 */

let currentSlide = 0;
let slideInterval = null;

/**
 * Switch to a specific slide.
 */
function goToSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');

    if (!slides.length) return;

    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

/**
 * Move to the next slide.
 */
function nextSlide() {
    const slides = document.querySelectorAll('.hero-slide');
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
}

/**
 * Start auto-advancing the carousel.
 */
function startAutoPlay() {
    stopAutoPlay();
    slideInterval = setInterval(nextSlide, 6000);
}

/**
 * Stop auto-advancing.
 */
function stopAutoPlay() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

/**
 * Initialize hero carousel.
 */
export function initHeroCarousel() {
    const dots = document.querySelectorAll('.hero-dot');
    const hero = document.querySelector('.hero');

    // Dot click listeners
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.dataset.slide);
            goToSlide(slideIndex);
            startAutoPlay(); // Reset timer on manual interaction
        });
    });

    // Pause on hover
    if (hero) {
        hero.addEventListener('mouseenter', stopAutoPlay);
        hero.addEventListener('mouseleave', startAutoPlay);
    }

    // Start auto-play
    startAutoPlay();
}
