// ========================================
// Hong Kong Stablecoin - Website Scripts
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLanguageSwitch();
    initSmoothScroll();
    initNavbarScroll();
    initMetricsAnimation();
    initContactForm();
    initMobileMenu();
});

// ========================================
// Language Switching
// ========================================

let currentLang = 'zh'; // Default: Traditional Chinese

function initLanguageSwitch() {
    const langSwitch = document.getElementById('langSwitch');

    langSwitch.addEventListener('click', function() {
        currentLang = currentLang === 'zh' ? 'en' : 'zh';
        langSwitch.textContent = currentLang === 'zh' ? 'EN' : '繁';
        updatePageLanguage();
    });
}

function updatePageLanguage() {
    // Update all elements with data-en and data-zh attributes
    const elements = document.querySelectorAll('[data-en][data-zh]');

    elements.forEach(el => {
        const text = currentLang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-zh');

        // Handle different element types
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = text;
        } else if (el.tagName === 'OPTION') {
            el.textContent = text;
        } else {
            el.textContent = text;
        }
    });

    // Update HTML lang attribute
    document.documentElement.lang = currentLang === 'en' ? 'en' : 'zh-Hant';
}

// ========================================
// Smooth Scrolling
// ========================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

// ========================================
// Navbar Scroll Effect
// ========================================

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Add shadow when scrolled
        if (currentScroll > 10) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}

// ========================================
// Metrics Animation
// ========================================

function initMetricsAnimation() {
    const metrics = document.querySelector('.metrics');
    let animated = false;

    // Intersection Observer for animation trigger
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                animateMetrics();
            }
        });
    }, { threshold: 0.5 });

    if (metrics) {
        observer.observe(metrics);
    }
}

function animateMetrics() {
    // Animate Total Supply
    animateNumber('totalSupply', 0, 60, 2000, 0);

    // Animate Reserve Ratio
    animateNumber('reserveRatio', 0, 100, 1500, 0);

    // Animate Holders
    animateNumber('holders', 0, 245, 2000, 0);
}

function animateNumber(elementId, start, end, duration, decimals) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const range = end - start;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (range * easeOutQuart);

        element.textContent = decimals > 0
            ? current.toFixed(decimals)
            : Math.round(current);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ========================================
// Contact Form
// ========================================

function initContactForm() {
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Simple validation
            if (!data.company || !data.name || !data.email) {
                alert(currentLang === 'en'
                    ? 'Please fill in all required fields.'
                    : '請填寫所有必填欄位。');
                return;
            }

            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.disabled = true;
            submitBtn.textContent = currentLang === 'en' ? 'Submitting...' : '提交中...';

            // Simulate API call
            setTimeout(() => {
                alert(currentLang === 'en'
                    ? 'Thank you for your inquiry. We will contact you soon.'
                    : '感謝您的諮詢，我們將盡快與您聯繫。');
                form.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 1500);
        });
    }
}

// ========================================
// Mobile Menu
// ========================================

function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-open');
            menuBtn.classList.toggle('active');
        });
    }
}

function closeMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuBtn = document.getElementById('mobileMenuBtn');

    if (navLinks && menuBtn) {
        navLinks.classList.remove('mobile-open');
        menuBtn.classList.remove('active');
    }
}

// ========================================
// Mobile Menu Styles (injected via JS)
// ========================================

const mobileMenuStyles = `
    @media (max-width: 768px) {
        .nav-links.mobile-open {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 72px;
            left: 0;
            right: 0;
            background: white;
            padding: 24px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            gap: 16px;
        }

        .nav-links.mobile-open a {
            font-size: 16px;
            padding: 12px 0;
        }

        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }

        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
    }
`;

// Inject mobile menu styles
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuStyles;
document.head.appendChild(styleSheet);

// ========================================
// Utility Functions
// ========================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Format large numbers with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
