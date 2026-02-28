/**
 * Kumaran Silks & Sarees — Main Entry Point
 * Initializes all modules, preloader, scroll animations, header behavior.
 */

import { initI18n, getTranslations } from './i18n.js';
import { initProducts } from './products.js';
import { initHeroCarousel } from './carousel.js';
import { initMegaMenu } from './mega-menu.js';

// ── Preloader ──
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1200);
    });

    // Safety fallback: remove preloader after 4 seconds max
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 4000);
}

// ── Scroll-based Header ──
function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });
}

// ── Mobile Nav Toggle ──
function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('mainNav');
    if (!hamburger || !nav) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close nav when clicking a link
    nav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        });
    });
}

// ── Scroll Reveal Animations ──
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    });

    reveals.forEach(el => observer.observe(el));
}

// ── Render Timeline ──
function renderTimeline() {
    const container = document.getElementById('timeline');
    if (!container) return;

    const data = getTranslations();
    const timeline = data?.heritage?.timeline;
    if (!timeline) return;

    container.innerHTML = '';

    Object.entries(timeline).forEach(([year, text]) => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.innerHTML = `
      <span class="timeline-year">${year}</span>
      <span class="timeline-text">${text}</span>
    `;
        container.appendChild(item);
    });
}

// ── Render Testimonials ──
function renderTestimonials() {
    const container = document.getElementById('testimonialsGrid');
    if (!container) return;

    const data = getTranslations();
    const items = data?.testimonials?.items;
    if (!items) return;

    container.innerHTML = '';

    items.forEach((item, i) => {
        const card = document.createElement('div');
        card.className = `testimonial-card reveal reveal-delay-${i + 1}`;
        card.innerHTML = `
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text">${item.text}</p>
      <p class="testimonial-author">${item.name}</p>
      <p class="testimonial-location">${item.location}</p>
    `;
        container.appendChild(card);
    });

    // Re-observe for reveal animations
    initScrollReveal();
}

// ── Smooth Scroll for Anchor Links ──
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth',
                });
            }
        });
    });
}

// ══════════════════════════════════════════
// INITIALIZATION
// ══════════════════════════════════════════
async function init() {
    // Start preloader immediately
    initPreloader();

    // Load translations and apply
    await initI18n();

    // Render dynamic content
    renderTimeline();
    renderTestimonials();

    // Initialize interactive modules
    initHeader();
    initMobileNav();
    initMegaMenu();
    initHeroCarousel();
    initProducts();
    initSmoothScroll();

    // Start scroll reveal after everything is rendered
    setTimeout(initScrollReveal, 100);

    // Re-render dynamic content on language change
    window.addEventListener('languageChanged', () => {
        renderTimeline();
        renderTestimonials();
        // Re-init scroll reveal for newly rendered elements
        setTimeout(initScrollReveal, 100);
    });
}

// Run initialization
init();
