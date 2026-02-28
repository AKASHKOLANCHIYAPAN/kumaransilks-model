/**
 * Kumaran Silks — Mega Menu Controller
 */

export function initMegaMenu() {
    const trigger = document.getElementById('collectionsLink');
    const megaMenu = document.getElementById('megaMenu');

    if (!trigger || !megaMenu) return;

    let isOpen = false;
    let closeTimeout = null;

    function open() {
        clearTimeout(closeTimeout);
        megaMenu.classList.add('active');
        isOpen = true;
    }

    function close() {
        closeTimeout = setTimeout(() => {
            megaMenu.classList.remove('active');
            isOpen = false;
        }, 200);
    }

    // Mouse events for desktop
    trigger.addEventListener('mouseenter', open);
    trigger.addEventListener('mouseleave', close);
    megaMenu.addEventListener('mouseenter', () => clearTimeout(closeTimeout));
    megaMenu.addEventListener('mouseleave', close);

    // Click toggle for mobile
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        if (isOpen) {
            megaMenu.classList.remove('active');
            isOpen = false;
        } else {
            open();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) {
            megaMenu.classList.remove('active');
            isOpen = false;
        }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (isOpen && !megaMenu.contains(e.target) && !trigger.contains(e.target)) {
            megaMenu.classList.remove('active');
            isOpen = false;
        }
    });
}
