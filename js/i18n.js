/**
 * Kumaran Silks — Bilingual Engine (English / Tamil)
 * Lightweight i18n using data-i18n attributes and JSON translation files.
 */

let translations = {};
let currentLang = localStorage.getItem('ks-lang') || 'en';

/**
 * Load translation JSON for a given language.
 */
async function loadTranslations(lang) {
    try {
        const base = import.meta.env.BASE_URL || '/';
        const response = await fetch(`${base}i18n/${lang}.json`);
        if (!response.ok) throw new Error(`Failed to load ${lang} translations`);
        translations[lang] = await response.json();
    } catch (err) {
        console.error('i18n load error:', err);
    }
}

/**
 * Get a nested value from an object using a dot-notation key.
 * e.g., t('nav.home') → translations.nav.home
 */
function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

/**
 * Get translated string for a key.
 */
export function t(key) {
    const data = translations[currentLang];
    if (!data) return key;
    return getNestedValue(data, key) || key;
}

/**
 * Apply translations to all elements with data-i18n attributes.
 */
function applyTranslations() {
    const data = translations[currentLang];
    if (!data) return;

    // Text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const value = getNestedValue(data, key);
        if (value && typeof value === 'string') {
            el.textContent = value;
        }
    });

    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const value = getNestedValue(data, key);
        if (value && typeof value === 'string') {
            el.placeholder = value;
        }
    });

    // Update body class for Tamil font
    if (currentLang === 'ta') {
        document.body.classList.add('tamil');
    } else {
        document.body.classList.remove('tamil');
    }

    // Update HTML lang attribute
    document.documentElement.lang = currentLang === 'ta' ? 'ta' : 'en';
}

/**
 * Switch the active language.
 */
export async function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('ks-lang', lang);

    if (!translations[lang]) {
        await loadTranslations(lang);
    }

    applyTranslations();

    // Dispatch custom event for other modules to react
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

/**
 * Get current language code.
 */
export function getCurrentLang() {
    return currentLang;
}

/**
 * Get the full translations object for the current language.
 */
export function getTranslations() {
    return translations[currentLang] || {};
}

/**
 * Initialize i18n: load both languages, apply current language.
 */
export async function initI18n() {
    // Load both languages upfront for instant switching
    await Promise.all([
        loadTranslations('en'),
        loadTranslations('ta')
    ]);

    applyTranslations();

    // Set up language toggle button
    const toggleBtn = document.getElementById('langToggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const newLang = currentLang === 'en' ? 'ta' : 'en';
            setLanguage(newLang);
        });
    }
}
