// ---------- Theme picker ----------

const themeOptions = document.querySelectorAll('.theme-option');

function applyTheme(option) {
    if (!option) return;

    const color = option.dataset.color;
    const colorLight = option.dataset.colorLight;

    if (!color || !colorLight) return;

    document.documentElement.style.setProperty('--green', color);
    document.documentElement.style.setProperty('--green-light', colorLight);
    document.documentElement.style.setProperty(
        '--accent-gradient',
        `linear-gradient(135deg, ${color}, ${colorLight})`
    );

    // Keep glass glow tokens in sync with the active accent colour.
    // This mirrors NSVisualEffectView automatically inheriting the system accent.
    document.documentElement.style.setProperty('--glow-color', color);
    document.documentElement.style.setProperty(
        '--glass-border',
        `color-mix(in srgb, ${color} 14%, rgba(255,255,255,.06))`
    );

    themeOptions.forEach((item) => {
        item.classList.remove('active');
    });

    option.classList.add('active');
}

themeOptions.forEach((option) => {
    option.addEventListener('click', () => applyTheme(option));
});
