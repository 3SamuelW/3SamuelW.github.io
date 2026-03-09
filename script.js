/* ============================================================
   INITIALIZATION
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    initAOS();
    initTyped();
    initParticles();
    initNavigation();
    initThemeToggle();
    initScrollEffects();
    initPubFilters();
    initStatCounters();
    initTiltCards();
    initCursorGlow();
});

/* ============================================================
   AOS - Animate on Scroll
   ============================================================ */
function initAOS() {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80,
        disable: window.innerWidth < 480
    });
}

/* ============================================================
   TYPED.JS - Hero Typing Effect
   ============================================================ */
function initTyped() {
    if (document.getElementById('typedText')) {
        new Typed('#typedText', {
            strings: [
                // PLACEHOLDER: 替换为你的身份/标签
                'PhD Applicant',
                'Machine Learning Researcher',
                '[Your Research Area] Enthusiast',
                'Problem Solver',
                'Open Source Contributor'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            smartBackspace: true
        });
    }
}

/* ============================================================
   tsParticles - Background Particles
   ============================================================ */
function initParticles() {
    if (typeof tsParticles === 'undefined') return;

    const isDark = !document.documentElement.hasAttribute('data-theme') ||
                   document.documentElement.getAttribute('data-theme') === 'dark';

    tsParticles.load('particles-js', {
        fullScreen: false,
        fpsLimit: 60,
        particles: {
            number: {
                value: 50,
                density: { enable: true, area: 1000 }
            },
            color: { value: isDark ? '#00d4ff' : '#0099cc' },
            shape: { type: 'circle' },
            opacity: {
                value: { min: 0.1, max: 0.3 },
                animation: { enable: true, speed: 0.5, minimumValue: 0.05 }
            },
            size: {
                value: { min: 1, max: 3 },
                animation: { enable: true, speed: 1, minimumValue: 0.5 }
            },
            links: {
                enable: true,
                distance: 150,
                color: isDark ? '#00d4ff' : '#0099cc',
                opacity: 0.1,
                width: 1
            },
            move: {
                enable: true,
                speed: 0.8,
                direction: 'none',
                random: true,
                straight: false,
                outModes: 'out'
            }
        },
        interactivity: {
            detectsOn: 'window',
            events: {
                onHover: { enable: true, mode: 'grab' },
                resize: true
            },
            modes: {
                grab: {
                    distance: 180,
                    links: { opacity: 0.25 }
                }
            }
        },
        detectRetina: true
    });
}

/* ============================================================
   NAVIGATION
   ============================================================ */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Hamburger toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('open');
        });

        // Close on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('open');
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('open');
            }
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // Active section tracking
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active',
                        link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

/* ============================================================
   THEME TOGGLE
   ============================================================ */
function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    const icon = toggle?.querySelector('i');

    // Check saved preference
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    toggle?.addEventListener('click', () => {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        if (isLight) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
        // Reload particles for new colors
        initParticles();
    });
}

/* ============================================================
   SCROLL EFFECTS
   ============================================================ */
function initScrollEffects() {
    const backToTop = document.getElementById('backToTop');

    // Back to Top visibility
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop?.classList.add('visible');
        } else {
            backToTop?.classList.remove('visible');
        }
    }, { passive: true });

    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Parallax-like fade on hero
    const heroContent = document.querySelector('.hero-content');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (heroContent && scrolled < window.innerHeight) {
            const opacity = 1 - (scrolled / (window.innerHeight * 0.6));
            const translateY = scrolled * 0.3;
            heroContent.style.opacity = Math.max(0, opacity);
            heroContent.style.transform = `translateY(${translateY}px)`;
        }
        if (scrollIndicator) {
            scrollIndicator.style.opacity = Math.max(0, 1 - scrolled / 200);
        }
    }, { passive: true });
}

/* ============================================================
   PUBLICATION FILTERS
   ============================================================ */
function initPubFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const pubItems = document.querySelectorAll('.pub-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            pubItems.forEach((item, index) => {
                const category = item.dataset.category;
                const shouldShow = filter === 'all' || category === filter;

                if (shouldShow) {
                    item.classList.remove('hidden');
                    item.style.animation = `fadeInUp 0.4s ease ${index * 0.1}s forwards`;
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

/* ============================================================
   STAT COUNTERS
   ============================================================ */
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = el.getAttribute('data-count');

                // If target is a number, animate; otherwise just set text
                const num = parseInt(target);
                if (!isNaN(num) && num > 0) {
                    animateCounter(el, 0, num, 1500);
                } else {
                    el.textContent = target;
                }
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));
}

function animateCounter(el, start, end, duration) {
    const startTime = performance.now();
    const diff = end - start;

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + diff * eased);
        el.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = end;
        }
    }

    requestAnimationFrame(update);
}

/* ============================================================
   TILT EFFECT
   ============================================================ */
function initTiltCards() {
    if (typeof VanillaTilt === 'undefined') return;
    // Only on non-touch devices
    if (window.matchMedia('(pointer: fine)').matches) {
        VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
            max: 5,
            speed: 400,
            glare: true,
            'max-glare': 0.08,
            scale: 1.01
        });
    }
}

/* ============================================================
   CURSOR GLOW
   ============================================================ */
function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow || !window.matchMedia('(pointer: fine)').matches) return;

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });

    function animate() {
        // Smooth follow
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        requestAnimationFrame(animate);
    }
    animate();
}

/* ============================================================
   FADE-IN-UP ANIMATION (for pub filter)
   ============================================================ */
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(styleSheet);
