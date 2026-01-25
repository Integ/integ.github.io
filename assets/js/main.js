// Terminal typing animation
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Matrix rain effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}';
    const matrixArray = matrix.split('');
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for(let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px monospace';
        
        for(let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 35);
    document.body.appendChild(canvas);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Terminal command interaction
function initTerminalInteraction() {
    const terminalLines = document.querySelectorAll('.terminal-line');
    
    terminalLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '0';
            line.style.transform = 'translateX(-20px)';
            line.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateX(0)';
            }, 100);
        }, index * 200);
    });
}

// Project cards animation on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
    
    // Observe section headers
    document.querySelectorAll('.section-header').forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(-20px)';
        header.style.transition = 'all 0.6s ease';
        observer.observe(header);
    });
}

// Interactive project filter (future enhancement)
function initProjectFilter() {
    const skills = document.querySelectorAll('.skill-tag');
    
    skills.forEach(skill => {
        skill.style.cursor = 'pointer';
        skill.addEventListener('click', function() {
            const skillName = this.textContent;
            filterProjectsBySkill(skillName);
        });
    });
}

function filterProjectsBySkill(skillName) {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach(project => {
        const projectTech = project.querySelector('.project-lang').textContent;
        if (projectTech.toLowerCase().includes(skillName.toLowerCase())) {
            project.style.display = 'block';
            project.style.animation = 'glow 0.5s ease';
        } else {
            project.style.display = 'none';
        }
    });
}

// Glitch effect for terminal
function addGlitchEffect() {
    const terminal = document.querySelector('.terminal');
    if (!terminal) return;
    
    terminal.addEventListener('mouseover', function() {
        this.style.animation = 'glitch 0.3s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 300);
    });
}

// Add CSS for glitch animation
function addGlitchCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glitch {
            0%, 100% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
        }
        
        @keyframes glow {
            0%, 100% { box-shadow: 0 0 5px rgba(0, 255, 65, 0.3); }
            50% { box-shadow: 0 0 20px rgba(0, 255, 65, 0.6); }
        }
        
        .skill-tag:hover {
            animation: pulse 0.5s ease;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
    `;
    document.head.appendChild(style);
}

// Dynamic copyright year
function updateCopyrightYear() {
    const yearElements = document.querySelectorAll('.copyright-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// Loading animation
function initLoadingAnimation() {
    const body = document.body;
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', () => {
        body.style.opacity = '1';
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize features
    createMatrixRain();
    initSmoothScrolling();
    initScrollAnimations();
    initTerminalInteraction();
    addGlitchCSS();
    addGlitchEffect();
    updateCopyrightYear();
    initLoadingAnimation();
    
    // Typing animation for main title
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.textContent;
        setTimeout(() => {
            typeWriter(typingText, text, 150);
        }, 1000);
    }
    
    // Add some interactivity to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });
    
    // Console Easter egg
    console.log('%c🚀 Happy Hacking! 🚀', 'color: #00ff41; font-size: 20px; font-weight: bold;');
    console.log('%cWelcome to my terminal! Try exploring the commands...', 'color: #00ff41; font-size: 12px;');
});

// Handle window resize for canvas
window.addEventListener('resize', function() {
    const canvas = document.querySelector('canvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Press 'T' to focus on terminal
    if (e.key === 't' || e.key === 'T') {
        const terminal = document.querySelector('.terminal');
        if (terminal) {
            terminal.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Press 'G' to go to GitHub
    if (e.key === 'g' || e.key === 'G') {
        window.open('https://github.com/Integ', '_blank');
    }
    
    // Press '?' for help
    if (e.key === '?') {
        console.log('Keyboard shortcuts:');
        console.log('T - Scroll to terminal');
        console.log('G - Open GitHub');
        console.log('? - Show this help');
    }
});