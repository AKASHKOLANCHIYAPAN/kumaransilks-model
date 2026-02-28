/**
 * Kumaran Silks — Product Grid & Filter System
 */

import { getTranslations, getCurrentLang } from './i18n.js';

const productImages = [
    '/images/product-1.png',
    '/images/product-2.png',
    '/images/product-3.png',
    '/images/product-4.png',
    '/images/product-5.png',
    '/images/product-6.png',
];

let activeFilters = {
    zari: 'all',
    weave: 'all',
    occasion: 'all',
};

/**
 * Get the product data from translations for the current language.
 */
function getProducts() {
    const data = getTranslations();
    if (!data.product_items) return [];
    return data.product_items.map((item, i) => ({
        ...item,
        image: productImages[i % productImages.length],
        id: i,
    }));
}

/**
 * Render a single product card.
 */
function createProductCard(product, index) {
    const data = getTranslations();
    const card = document.createElement('div');
    card.className = `product-card reveal reveal-delay-${(index % 3) + 1}`;
    card.dataset.zari = product.zari;
    card.dataset.weave = product.weave;
    card.dataset.occasion = product.occasion;

    card.innerHTML = `
    <div class="product-card-image">
      <img src="${product.image}" alt="${product.name}" loading="lazy" />
      <span class="product-card-badge">${product.silk}</span>
      <div class="product-card-actions">
        <button class="product-action-btn">${data.products?.quick_view || 'Quick View'}</button>
        <button class="product-action-btn">${data.products?.add_to_cart || 'Add to Cart'}</button>
      </div>
    </div>
    <div class="product-card-info">
      <h3 class="product-card-name">${product.name}</h3>
      <p class="product-card-desc">${product.desc}</p>
      <div class="product-card-meta">
        <span class="product-card-price">${product.price}</span>
        <div class="product-card-tags">
          <span class="product-tag">${product.zari}</span>
          <span class="product-tag">${product.weave}</span>
        </div>
      </div>
    </div>
  `;

    // Trigger reveal animation after append
    requestAnimationFrame(() => {
        setTimeout(() => card.classList.add('visible'), 50 * index);
    });

    return card;
}

/**
 * Filter and render products.
 */
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    const products = getProducts();
    grid.innerHTML = '';

    const filtered = products.filter(p => {
        // Original English data for filtering (use en.json values)
        const enProducts = [
            { zari: 'Pure Gold', weave: 'Temple Border', occasion: 'Muhurtham' },
            { zari: 'Pure Gold', weave: 'Mayil', occasion: 'Reception' },
            { zari: 'Tested', weave: 'Chakram', occasion: 'Reception' },
            { zari: 'Pure Gold', weave: 'Chakram', occasion: 'Muhurtham' },
            { zari: 'Pure Gold', weave: 'Temple Border', occasion: 'Muhurtham' },
            { zari: 'Copper', weave: 'Temple Border', occasion: 'Gifting' },
        ];
        const enData = enProducts[p.id] || {};

        if (activeFilters.zari !== 'all' && enData.zari !== activeFilters.zari) return false;
        if (activeFilters.weave !== 'all' && enData.weave !== activeFilters.weave) return false;
        if (activeFilters.occasion !== 'all' && enData.occasion !== activeFilters.occasion) return false;
        return true;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--muted);">
      <p style="font-size: 1.25rem; font-family: var(--font-heading);">No products match your filters</p>
      <p style="margin-top: 0.5rem;">Try adjusting your selection</p>
    </div>`;
        return;
    }

    filtered.forEach((product, i) => {
        grid.appendChild(createProductCard(product, i));
    });
}

/**
 * Set up filter event listeners.
 */
function setupFilters() {
    document.querySelectorAll('.filter-option input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const filterName = e.target.name;
            const filterValue = e.target.value;
            activeFilters[filterName] = filterValue;
            renderProducts();
        });
    });
}

/**
 * Initialize products module.
 */
export function initProducts() {
    renderProducts();
    setupFilters();

    // Re-render on language change
    window.addEventListener('languageChanged', () => {
        renderProducts();
    });
}
