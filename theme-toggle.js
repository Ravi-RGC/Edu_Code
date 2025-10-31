// ===== SIMPLE THEME TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Theme toggle script loaded');
    
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) {
        console.error('Theme toggle button not found!');
        return;
    }
    
    console.log('Theme toggle button found');
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateToggleVisual(true);
        console.log('Loaded dark theme from storage');
    } else {
        updateToggleVisual(false);
        console.log('Using light theme');
    }
    
    // Add click event listener
    themeToggle.addEventListener('click', function() {
        console.log('Theme toggle clicked');
        
        const isDark = document.body.classList.contains('dark-mode');
        console.log('Current theme is dark:', isDark);
        
        if (isDark) {
            // Switch to light mode
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            updateToggleVisual(false);
            console.log('Switched to light mode');
        } else {
            // Switch to dark mode
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            updateToggleVisual(true);
            console.log('Switched to dark mode');
        }
        
        // Add ripple effect
        addRipple(themeToggle);
    });
    
    // Keyboard support
    themeToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            themeToggle.click();
        }
    });
    
    function updateToggleVisual(isDark) {
        const track = themeToggle.querySelector('.theme-toggle-track');
        const thumb = themeToggle.querySelector('.theme-toggle-thumb');
        
        if (!track || !thumb) {
            console.error('Theme toggle elements not found');
            return;
        }
        
        if (isDark) {
            track.style.background = 'linear-gradient(45deg, #2C3E50, #34495E)';
            thumb.style.transform = 'translateX(30px)';
            thumb.style.background = '#2C3E50';
            themeToggle.setAttribute('aria-pressed', 'true');
            themeToggle.title = 'Switch to Light Mode';
        } else {
            track.style.background = 'linear-gradient(45deg, #87CEEB, #FFE4B5)';
            thumb.style.transform = 'translateX(0px)';
            thumb.style.background = 'white';
            themeToggle.setAttribute('aria-pressed', 'false');
            themeToggle.title = 'Switch to Dark Mode';
        }
        
        console.log('Updated toggle visual for dark mode:', isDark);
    }
    
    function addRipple(element) {
        const ripple = document.createElement('div');
        ripple.className = 'theme-ripple';
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 107, 107, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
            width: ${size}px;
            height: ${size}px;
            left: ${rect.width / 2 - size / 2}px;
            top: ${rect.height / 2 - size / 2}px;
        `;
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 600);
    }
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
