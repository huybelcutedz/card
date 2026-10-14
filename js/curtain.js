// ── Curtain intro ──────────────────────────────────────────────────────────
// Shows a black overlay on load. Any click/tap dismisses it with a curtain-
// opening animation and starts music (satisfying the browser autoplay policy).

(function () {
    const overlay = document.getElementById('curtain-overlay');
    if (!overlay) return;

    // Lock scroll while curtain is visible
    document.body.classList.add('curtain-active');

    function openCurtain() {
        // 1. Start music (user gesture → autoplay allowed)
        const audio = document.getElementById('bg-audio');
        if (audio) {
            audio.play().catch(() => {});
        }

        // 2. Trigger the curtain-open CSS animation
        overlay.classList.add('is-open');

        // 3. After the CSS transition finishes, remove overlay & unlock scroll
        overlay.addEventListener('transitionend', function handler(e) {
            // Only fire once, on one of the panels
            if (e.target.classList.contains('curtain-panel')) {
                overlay.removeEventListener('transitionend', handler);
                overlay.classList.add('is-gone');
                document.body.classList.remove('curtain-active');
            }
        });
    }

    // Listen for click or touch anywhere on the overlay
    overlay.addEventListener('click', openCurtain, { once: true });
    overlay.addEventListener('touchstart', openCurtain, { once: true });
})();

