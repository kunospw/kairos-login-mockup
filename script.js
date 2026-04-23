function togglePasswordVisibility() {
    const passwordInput = document.getElementById('passwordInput');
    const eyeIcon = document.getElementById('eyeIcon');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.setAttribute('data-lucide', 'eye');
    } else {
        passwordInput.type = 'password';
        eyeIcon.setAttribute('data-lucide', 'eye-off');
    }

    // Refresh icons
    lucide.createIcons();
}

function toggleCustomServer() {
    const serverBox = document.getElementById('serverBox');
    const chevronIcon = document.getElementById('chevronIcon');

    serverBox.classList.toggle('hidden');

    if (serverBox.classList.contains('hidden')) {
        chevronIcon.setAttribute('data-lucide', 'chevron-down');
    } else {
        chevronIcon.setAttribute('data-lucide', 'chevron-up');
    }

    // Refresh icons
    lucide.createIcons();
}

// Form submission prevent default
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('.login-button');
    const originalText = btn.textContent;

    btn.textContent = 'LOGGING IN...';
    btn.style.opacity = '0.7';

    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.opacity = '1';
        window.location.href = 'jobs.html';
    }, 1500);
});

// Copy Device ID
document.querySelector('.copy-icon').addEventListener('click', () => {
    const deviceId = "SKQ1.211103.001";
    navigator.clipboard.writeText(deviceId).then(() => {
        alert('Device ID copied to clipboard');
    });
});
