// Navbar background change on scroll
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// AOS initialization
AOS.init({
    duration: 900,
    once: true,
    easing: 'ease-in-out',
});

// Animated Text
const words = ['LUXURY', 'UNIQUE', 'RICHNESS', 'EDGE',];
const changingWord = document.querySelector('.changing-word');
let currentIndex = 0;

function updateWord() {
    // Remove active class and start fade out
    changingWord.classList.remove('active');
    changingWord.style.opacity = '0';

    setTimeout(() => {
        // Update text and trigger reflow
        changingWord.textContent = words[currentIndex];
        changingWord.offsetHeight; // Force reflow

        // Add active class and fade in
        changingWord.classList.add('active');
        changingWord.style.opacity = '1';

        // Update index for next word
        currentIndex = (currentIndex + 1) % words.length;
    }, 100);
}

// Initial word
updateWord();

// Change word every 2 seconds (matching the CSS animation duration)
setInterval(updateWord, 2000);

// Add extra animation on hover
if (changingWord) {
    changingWord.addEventListener('mouseover', () => {
        changingWord.style.transform = 'scale(1.05)';
        changingWord.style.transition = 'transform 0.3s ease';
    });

    changingWord.addEventListener('mouseout', () => {
        changingWord.style.transform = 'scale(1)';
    });
}

// Interactive Smoke Effect
function createSmokeParticles() {
    const sections = document.querySelectorAll('.smoke-section');

    sections.forEach(section => {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'smoke-particles';
        section.appendChild(particlesContainer);

        // Create initial particles
        for (let i = 0; i < 50; i++) {
            createParticle(particlesContainer);
        }

        // Handle mouse/touch interaction
        section.addEventListener('mousemove', (e) => handleInteraction(e, particlesContainer));
        section.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            handleInteraction(touch, particlesContainer);
        });
    });
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'smoke-particle';

    // Random size between 20 and 100 pixels
    const size = Math.random() * 80 + 20;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Random position
    resetParticle(particle, container);

    container.appendChild(particle);
}

function resetParticle(particle, container) {
    const x = Math.random() * container.offsetWidth;
    const y = Math.random() * container.offsetHeight;

    particle.style.transform = 'translate(0, 0)';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
}

function handleInteraction(e, container) {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const particles = container.querySelectorAll('.smoke-particle');
    particles.forEach(particle => {
        const particleRect = particle.getBoundingClientRect();
        const particleX = particleRect.left - rect.left + particleRect.width / 2;
        const particleY = particleRect.top - rect.top + particleRect.height / 2;

        const dx = x - particleX;
        const dy = y - particleY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
            const angle = Math.atan2(dy, dx);
            const force = (100 - distance) / 2;
            const moveX = Math.cos(angle + Math.PI) * force;
            const moveY = Math.sin(angle + Math.PI) * force;

            particle.style.transform = `translate(${moveX}px, ${moveY}px)`;

            // Reset particle position after animation
            setTimeout(() => {
                resetParticle(particle, container);
            }, 1000);
        }
    });
}

// Initialize smoke effect
document.addEventListener('DOMContentLoaded', () => {
    // Add smoke-section class to relevant sections
    const sections = ['about', 'services', 'contact'];
    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            section.classList.add('smoke-section');
        }
    });

    createSmokeParticles();
}); 