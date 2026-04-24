/**
 * env-theme.js — Shared environment theming for all pages (except login).
 */
(function () {
    const envConfig = {
        third: { label: 'THIRD', primary: '#C6152A', primaryDark: '#A00F21', gradient: 'linear-gradient(135deg,#C6152A 0%,#A00F21 100%)', shadow: 'rgba(198,21,42,0.3)' },
        pilot: { label: 'PILOT', primary: '#E07B20', primaryDark: '#C06010', gradient: 'linear-gradient(135deg,#E07B20 0%,#C06010 100%)', shadow: 'rgba(224,123,32,0.3)' },
        production: { label: 'PRODUCTION', primary: '#1A9A2A', primaryDark: '#14771F', gradient: 'linear-gradient(135deg,#1A9A2A 0%,#14771F 100%)', shadow: 'rgba(26,154,42,0.3)' }
    };
    const env = localStorage.getItem('selectedEnv') || 'third';
    const cfg = envConfig[env] || envConfig.third;
    window.__envCfg = cfg;
    window.__envKey = env;
    document.documentElement.style.setProperty('--env-primary', cfg.primary);
    document.documentElement.style.setProperty('--env-primary-dark', cfg.primaryDark);
    document.documentElement.style.setProperty('--env-gradient', cfg.gradient);
    document.documentElement.style.setProperty('--env-shadow', cfg.shadow);

    function applyTheme() {
        document.querySelectorAll('.toolbar').forEach(el => { el.style.background = cfg.gradient; });
        document.querySelectorAll('.detail-header,.confirm-header').forEach(el => { el.style.background = cfg.gradient; });
        document.querySelectorAll('.submit-btn,.btn-save-sig').forEach(el => { el.style.background = cfg.gradient; el.style.boxShadow = '0 8px 22px ' + cfg.shadow; });
        document.querySelectorAll('.time-card-header h2 i,.attach-card-header i,.attach-card h2 i,.card h2 i').forEach(el => { el.style.color = cfg.primary; });
        document.querySelectorAll('.current-date i').forEach(el => { el.style.color = cfg.primary; });
        document.querySelectorAll('.dates i').forEach(el => { if (el.getAttribute('data-lucide') === 'calendar') el.style.color = cfg.primary; });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyTheme);
    else applyTheme();
})();