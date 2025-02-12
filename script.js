// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Highlight active navigation section
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 150) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

// Animate project cards on scroll
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card').forEach(card => {
    card.classList.add('hidden');
    observer.observe(card);
});

// Example of a dark mode toggle
const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
};

// Example of a project filter
const filterProjects = (tag) => {
    const projects = document.querySelectorAll('.project-card');
    projects.forEach(project => {
        const hasTag = project.dataset.tags.includes(tag);
        project.style.display = tag === 'all' || hasTag ? 'block' : 'none';
    });
};

const translations = {
    en: {
        about: 'About Me',
        projects: 'Projects',
        contact: 'Contact'
    },
    es: {
        about: 'Sobre Mí',
        projects: 'Proyectos',
        contact: 'Contacto'
    }
};

const setLanguage = (lang) => {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        element.textContent = translations[lang][key];
    });
};

// Initialize skill circles animation
const initSkillCircles = () => {
    document.querySelectorAll('.skill-circle-progress').forEach(circle => {
        const percent = circle.getAttribute('data-percent');
        const perimeter = circle.getAttribute('r') * 2 * Math.PI;
        const offset = perimeter - (percent / 100 * perimeter);
        circle.style.strokeDasharray = perimeter;
        circle.style.strokeDashoffset = perimeter;
        
        // Animate when in view
        setTimeout(() => {
            circle.style.strokeDashoffset = offset;
        }, 500);
    });
};

// Initialize programming languages chart
const initLanguagesChart = () => {
    const ctx = document.getElementById('languagesChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['JavaScript', 'Python', 'Java', 'HTML/CSS', 'SQL', 'TypeScript'],
            datasets: [{
                label: 'Skill Level',
                data: [90, 75, 70, 85, 80, 85],
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                borderColor: 'rgba(0, 123, 255, 1)',
                pointBackgroundColor: 'rgba(0, 123, 255, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(0, 123, 255, 1)'
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
};

// Animate timeline items
const animateTimeline = () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => observer.observe(item));
};

// Initialize all visualizations
document.addEventListener('DOMContentLoaded', () => {
    initSkillCircles();
    initLanguagesChart();
    animateTimeline();
});

// Add GSAP animations for smooth transitions
gsap.from('.skill-circle', {
    duration: 1,
    scale: 0.5,
    opacity: 0,
    stagger: 0.2,
    ease: 'back.out(1.7)',
    scrollTrigger: {
        trigger: '.skills-container',
        start: 'top center'
    }
}); 