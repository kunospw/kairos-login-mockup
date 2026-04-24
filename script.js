function togglePasswordVisibility() {
    const passwordInput = document.getElementById('passwordInput');
    const eyeIcon = document.getElementById('eyeIcon');
    if (passwordInput.type === 'password') { passwordInput.type = 'text'; eyeIcon.setAttribute('data-lucide', 'eye'); }
    else { passwordInput.type = 'password'; eyeIcon.setAttribute('data-lucide', 'eye-off'); }
    lucide.createIcons();
}
function toggleCustomServer() {
    const serverBox = document.getElementById('serverBox');
    const chevronIcon = document.getElementById('chevronIcon');
    serverBox.classList.toggle('hidden');
    chevronIcon.setAttribute('data-lucide', serverBox.classList.contains('hidden') ? 'chevron-down' : 'chevron-up');
    lucide.createIcons();
}
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('.login-button');
    const originalText = btn.textContent;
    btn.textContent = 'LOGGING IN...';
    btn.style.opacity = '0.7';
    setTimeout(() => { btn.textContent = originalText; btn.style.opacity = '1'; window.location.href = 'jobs.html'; }, 1500);
});
document.querySelector('.copy-icon').addEventListener('click', () => {
    navigator.clipboard.writeText("SKQ1.211103.001").then(() => alert('Device ID copied to clipboard'));
});