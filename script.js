// ==================== PARTICLE SYSTEM ====================
function createParticles() {
    const particleContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const randomX = Math.random() * window.innerWidth;
        const randomDelay = Math.random() * 15;
        const randomDuration = 15 + Math.random() * 10;
        
        particle.style.left = randomX + 'px';
        particle.style.top = window.innerHeight + 'px';
        particle.style.animationDelay = randomDelay + 's';
        particle.style.animationDuration = randomDuration + 's';
        
        particleContainer.appendChild(particle);
    }

    // Recreate particles every 25 seconds
    setInterval(() => {
        const particles = document.querySelectorAll('.particle');
        particles.forEach(p => p.remove());
        createParticles();
    }, 25000);
}

// ==================== NAVBAR FUNCTIONALITY ====================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ==================== SMOOTH SCROLL & ACTIVE LINK ====================
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInUp 1s ease forwards';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ==================== BUTTON FUNCTIONALITY ====================
const joinSmpBtn = document.querySelector('.btn-primary');
const discordBtn = document.querySelector('.btn-secondary');
const trailerBtn = document.querySelector('.btn-tertiary');
const joinSeason2Btn = document.querySelector('.btn-season2');
const communityBtns = document.querySelectorAll('.btn-community');

if (joinSmpBtn) {
    joinSmpBtn.addEventListener('click', () => {
        showNotification('Copy the server IP to join!', 'info');
    });
}

if (discordBtn) {
    discordBtn.addEventListener('click', () => {
        window.open('https://discord.gg/yourdiscord', '_blank');
    });
}

if (trailerBtn) {
    trailerBtn.addEventListener('click', () => {
        window.open('https://youtube.com/yourvideo', '_blank');
    });
}

if (joinSeason2Btn) {
    joinSeason2Btn.addEventListener('click', () => {
        showNotification('Welcome to Season 2! Join our Discord for more info.', 'success');
    });
}

communityBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const text = e.target.textContent;
        if (text.includes('DISCORD')) {
            window.open('https://discord.gg/yourdiscord', '_blank');
        } else if (text.includes('YOUTUBE')) {
            window.open('https://youtube.com/yourchannel', '_blank');
        } else if (text.includes('INSTAGRAM')) {
            window.open('https://instagram.com/yourprofile', '_blank');
        }
    });
});

// ==================== NOTIFICATION SYSTEM ====================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#2ecc71' : '#3498db'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        z-index: 2000;
        animation: slideIn 0.3s ease forwards;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== STATS COUNTER ====================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(interval);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Animate counters when they come into view
const statusValues = document.querySelectorAll('.status-value');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const text = entry.target.textContent;
            const numberMatch = text.match(/\d+/);
            if (numberMatch) {
                const targetNumber = parseInt(numberMatch[0]);
                animateCounter(entry.target, targetNumber);
            }
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

statusValues.forEach(value => {
    // Only animate numeric values
    if (/^\d+/.test(value.textContent)) {
        counterObserver.observe(value);
    }
});

// ==================== GLOW EFFECT ON MOUSE MOVE ====================
document.addEventListener('mousemove', (e) => {
    const glowElements = document.querySelectorAll('.hero-title, .section-title');
    
    glowElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Limit glow effect to elements that are close to mouse
        const distance = Math.sqrt(x ** 2 + y ** 2);
        if (distance < 300) {
            el.style.filter = `drop-shadow(0 0 ${20 + distance / 10}px rgba(46, 204, 113, 0.6))`;
        }
    });
});

// ==================== PARALLAX EFFECT ====================
window.addEventListener('scroll', () => {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        const scrolled = window.pageYOffset;
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ==================== LAZY LOADING IMAGES (if added later) ====================
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ==================== INITIALIZE ON PAGE LOAD ====================
window.addEventListener('load', () => {
    createParticles();
    
    // Add fade-in animation to all sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.animation = `fadeInUp 1s ease forwards`;
        section.style.animationDelay = `${index * 0.1}s`;
    });
});

// ==================== PRELOAD CRITICAL RESOURCES ====================
function preloadResources() {
    // Preload fonts
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
    document.head.appendChild(link);
}

preloadResources();

// ==================== PAGE VISIBILITY API ====================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations
        document.body.style.animationPlayState = 'running';
    }
});

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', (e) => {
    // Press 'D' to open Discord
    if (e.key === 'd' || e.key === 'D') {
        window.open('https://discord.gg/yourdiscord', '_blank');
    }
    
    // Press 'H' to scroll to home
    if (e.key === 'h' || e.key === 'H') {
        document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
    }
});

// ==================== CONSOLE MESSAGE ====================
console.log('%c🟢 SIDD_BROZX SMP SEASON 2 X SKSTA5 SEASON 2 🟢', 'color: #2ecc71; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #2ecc71;');
console.log('%cWelcome to the Ultimate Minecraft Survival Experience!', 'color: #2ecc71; font-size: 14px;');
console.log('%cPress D to join Discord | Press H to go home', 'color: #b0b0b0; font-size: 12px;');
