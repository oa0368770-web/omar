const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const servicesGrid = document.getElementById('servicesGrid');
const portfolioGrid = document.getElementById('portfolioGrid');
const contactForm = document.getElementById('contactForm');
const formResponse = document.getElementById('formResponse');
const allNavLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    updateActiveLink();
});

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
});

document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('open');
        menuToggle.classList.remove('open');
    }
});

allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.classList.remove('open');
    });
});

function updateActiveLink() {
    const sections = ['home', 'services', 'about', 'portfolio', 'contact'];
    const scrollPos = window.scrollY + 180;

    for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPos) {
            allNavLinks.forEach(l => l.classList.remove('active'));
            const active = document.querySelector(`.nav-links a[href="#${sections[i]}"]`);
            if (active) active.classList.add('active');
            break;
        }
    }
}

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target);
            if (target) animateCount(el, target);
            countObserver.unobserve(el);
        }
    });
}, observerOptions);

function animateCount(el, target) {
    const duration = 1800;
    const start = performance.now();
    const prefix = el.dataset.prefix || '';
    const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = prefix + Math.floor(eased * target).toLocaleString('ar-EG');
        if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

document.querySelectorAll('.stat-number[data-target]').forEach(el => countObserver.observe(el));

async function loadServices() {
    try {
        const res = await fetch('/api/services');
        const json = await res.json();
        const services = json.data;
        const portfolioIcons = ['🏢', '☕', '📱', '🏫', '🏥', '🛒', '🏨', '🍽️', '💼'];

        servicesGrid.innerHTML = services.map(s => `
            <div class="service-card">
                <div class="service-icon">${s.icon}</div>
                <h3>${s.title}</h3>
                <p>${s.shortDesc}</p>
                <ul class="service-features">
                    ${s.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
            </div>
        `).join('');

        loadPortfolio(portfolioIcons);
    } catch (e) {
        console.error('Error loading services:', e);
    }
}

async function loadPortfolio(icons) {
    try {
        const res = await fetch('/api/portfolio');
        const json = await res.json();
        const projects = json.data;
        const gradients = [
            'linear-gradient(135deg, #667eea, #764ba2)',
            'linear-gradient(135deg, #f093fb, #f5576c)',
            'linear-gradient(135deg, #4facfe, #00f2fe)',
            'linear-gradient(135deg, #43e97b, #38f9d7)',
            'linear-gradient(135deg, #fa709a, #fee140)',
            'linear-gradient(135deg, #30cfd0, #330867)',
            'linear-gradient(135deg, #a8edea, #fed6e3)',
            'linear-gradient(135deg, #ff9a9e, #fecfef)',
            'linear-gradient(135deg, #667eea, #764ba2)'
        ];

        portfolioGrid.innerHTML = projects.map((p, i) => `
            <div class="portfolio-item">
                <div class="pf-bg" style="background: ${gradients[i % gradients.length]}">
                    ${icons[i % icons.length]}
                </div>
                <div class="pf-overlay">
                    <span class="pf-category">${p.category}</span>
                    <div class="pf-title">${p.title}</div>
                    <div class="pf-year">${p.year}</div>
                </div>
            </div>
        `).join('');
    } catch (e) {
        console.error('Error loading portfolio:', e);
    }
}

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formResponse.className = 'form-response';
    formResponse.textContent = '';

    const formData = {
        name: contactForm.name.value.trim(),
        phone: contactForm.phone.value.trim(),
        email: contactForm.email.value.trim(),
        service: contactForm.service.value,
        subject: contactForm.subject.value.trim(),
        message: contactForm.message.value.trim()
    };

    const btn = contactForm.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span class="btn-text">جاري الإرسال...</span>';

    try {
        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const data = await res.json();

        if (data.success) {
            formResponse.className = 'form-response success';
            formResponse.textContent = data.message + ' | رقم الطلب: ' + data.ticket;
            contactForm.reset();
            setTimeout(() => {
                formResponse.className = 'form-response';
                formResponse.textContent = '';
            }, 8000);
        } else {
            formResponse.className = 'form-response error';
            formResponse.textContent = data.message || 'حدث خطأ، حاول مرة أخرى.';
        }
    } catch (err) {
        formResponse.className = 'form-response error';
        formResponse.textContent = 'لا يمكن الاتصال بالسيرفر، تحقق من الاتصال.';
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalHTML;
    }
});

/* ===== Dark Mode Toggle ===== */
const themeToggle = document.getElementById('themeToggle');
const THEME_KEY = 'ronaqs-theme';

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

const savedTheme = localStorage.getItem(THEME_KEY)
    || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
    });
}

/* ===== Floating Offer Close ===== */
const OFFER_HIDDEN_KEY = 'ronaqs-offer-hidden';
const floatingOffer = document.getElementById('floatingOffer');
const floatingOfferClose = document.getElementById('floatingOfferClose');
const sidebarOffer = document.getElementById('sidebarOffer');
const sidebarOfferClose = document.getElementById('sidebarOfferClose');
const SIDEBAR_HIDDEN_KEY = 'ronaqs-sidebar-hidden';

if (floatingOffer && localStorage.getItem(OFFER_HIDDEN_KEY) === '1') {
    floatingOffer.classList.add('hidden');
}

if (sidebarOffer && localStorage.getItem(SIDEBAR_HIDDEN_KEY) === '1') {
    sidebarOffer.classList.add('hidden');
}

if (floatingOfferClose && floatingOffer) {
    floatingOfferClose.addEventListener('click', (e) => {
        e.stopPropagation();
        floatingOffer.style.animation = 'none';
        floatingOffer.style.opacity = '0';
        floatingOffer.style.transform = 'translateY(30px) scale(0.7)';
        setTimeout(() => {
            floatingOffer.classList.add('hidden');
            localStorage.setItem(OFFER_HIDDEN_KEY, '1');
        }, 250);
    });
}

if (sidebarOfferClose && sidebarOffer) {
    sidebarOfferClose.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        sidebarOffer.style.animation = 'none';
        sidebarOffer.style.opacity = '0';
        sidebarOffer.style.transform = 'translate(-120%, -50%)';
        setTimeout(() => {
            sidebarOffer.classList.add('hidden');
            localStorage.setItem(SIDEBAR_HIDDEN_KEY, '1');
        }, 350);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadServices();
    updateActiveLink();
});
