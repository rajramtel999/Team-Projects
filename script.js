/**
 * MAIN SCRIPT FOR PROJECT PORTFOLIO
 * 
 * Features:
 * - Dynamic project rendering
 * - Lazy loading for images
 * - Premium 3D Tilt & Glare interactions
 * - Particle generation
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check if PROJECTS is defined
    if (typeof PROJECTS === 'undefined') {
        console.error('PROJECTS array is not defined. Ensure projects.js is loaded first.');
        return;
    }

    renderProjects();
    setupIntersectionObserver();
    setupSmoothScroll();
    generateParticles();
});

/**
 * Render Projects from PROJECTS array
 */
function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    const emptyState = document.getElementById('emptyState');

    projectsGrid.innerHTML = '';

    if (!PROJECTS || PROJECTS.length === 0) {
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    PROJECTS.forEach((project, index) => {
        const projectCard = createProjectCard(project, index);
        projectsGrid.appendChild(projectCard);
    });
    
    // Setup interactions on the newly injected cards
    setTimeout(() => {
        observeElements();
    }, 50);
}

/**
 * Create a project card element with inner 3D wrapper
 */
function createProjectCard(project, index) {
    const card = document.createElement('article');
    card.className = 'project-card' + (project.featured ? ' featured' : '');
    card.setAttribute('data-project-id', project.id);
    card.style.animationDelay = `${index * 0.15}s`;

    const tagsHTML = project.tags
        .map(tag => `<span class="tag">${escapeHtml(tag)}</span>`)
        .join('');

    card.innerHTML = `
        <div class="project-card-inner">
            ${project.featured ? '<div class="featured-badge">⭐ Featured</div>' : ''}
            
            <div class="project-image-wrapper">
                <img 
                    class="project-image" 
                    data-src="${project.image}" 
                    alt="${escapeHtml(project.title)}"
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250'%3E%3Crect fill='%230f111e' width='400' height='250'/%3E%3C/svg%3E"
                    loading="lazy"
                >
            </div>
            
            <div class="project-content">
                <h3 class="project-title">${escapeHtml(project.title)}</h3>
                <p class="project-description">${escapeHtml(project.description)}</p>
                
                <div class="project-tags">
                    ${tagsHTML}
                </div>
                
                <a href="${project.liveUrl}" class="live-button" target="_blank" rel="noopener noreferrer">
                    <span>View Live</span>
                    <i class="bi bi-eye-fill"></i>
                </a>
            </div>
        </div>
    `;

    return card;
}



/**
 * Lazy Loading
 */
function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                    img.onload = () => { img.style.opacity = '1'; };
                }
                obs.unobserve(img);
            }
        });
    }, { threshold: 0.1, rootMargin: '50px' });

    document.querySelectorAll('img[data-src]').forEach(img => {
        img.style.opacity = '0';
        // Ensure both opacity and smooth transform scale transitions are preserved
        img.style.transition = 'opacity 0.6s ease, transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
        observer.observe(img);
    });
}

/**
 * Particles
 */
function generateParticles() {
    const field = document.querySelector('.particle-field');
    if (!field) return;
    
    const count = window.innerWidth > 768 ? 25 : 12;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.setProperty('--size', (Math.random() * 3 + 2) + 'px');
        p.style.setProperty('--top', Math.random() * 100 + '%');
        p.style.setProperty('--left', Math.random() * 100 + '%');
        p.style.setProperty('--duration', (Math.random() * 10 + 10) + 's');
        p.style.setProperty('--delay', (Math.random() * -5) + 's');
        p.style.setProperty('--dx', ((Math.random() - 0.5) * 150) + 'px');
        p.style.setProperty('--dy', (-Math.random() * 150 - 50) + 'px');
        field.appendChild(p);
    }
}

/**
 * Reveal on Scroll
 */
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) translateZ(0)';
            }
        });
    }, { threshold: 0.1 });
    
    const sections = document.querySelectorAll('.contact-container, .footer');
    sections.forEach(s => observer.observe(s));
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function escapeHtml(text) {
    if (!text) return '';
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.toString().replace(/[&<>"']/g, m => map[m]);
}
