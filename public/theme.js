// Apply theme immediately on page load to prevent flash
(function () {
    if (localStorage.getItem('darkMode') === 'true') {
        document.documentElement.classList.add('dark-mode-pending');
    }
})();

function toggleDarkMode(el) {
    el.classList.toggle('active');
    const isDark = el.classList.contains('active');
    document.body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('darkMode', String(isDark));
}

document.addEventListener('DOMContentLoaded', function () {
    // Apply dark-mode to body if saved
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // Sync the toggle visual on settings page
    const toggle = document.getElementById('dark-mode-toggle');
    if (toggle && localStorage.getItem('darkMode') === 'true') {
        toggle.classList.add('active');
    }
});