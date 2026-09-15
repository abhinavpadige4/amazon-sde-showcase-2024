// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        htmlElement.setAttribute('data-theme', 'dark');
        updateThemeIcon(true);
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        updateThemeIcon(false);
    }
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme === 'dark');
        
        // Dispatch event for other scripts to react to theme change
        document.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme: newTheme } 
        }));
    });
    
    // Update theme icon based on current theme
    function updateThemeIcon(isDark) {
        const icon = themeToggle.querySelector('.theme-toggle-icon');
        if (icon) {
            icon.textContent = isDark ? '☀️' : '🌙';
        }
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', newTheme);
            updateThemeIcon(newTheme === 'dark');
        }
    });
});