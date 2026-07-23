document.documentElement.classList.remove('no-js');

const revealItems = document.querySelectorAll('.reveal-item');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
});

revealItems.forEach((item) => revealObserver.observe(item));

// Mobile hamburger menu
(() => {
    const toggle = document.getElementById('navToggle');
    const nav = document.getElementById('mainNav');
    if (!toggle || !nav) return;

    const setOpen = (isOpen) => {
        nav.classList.toggle('is-open', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
        document.body.classList.toggle('nav-open', isOpen);
    };

    toggle.addEventListener('click', () => {
        setOpen(!nav.classList.contains('is-open'));
    });

    nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => setOpen(false));
    });
})();

window.addEventListener('load', () => {
    const heroLeft = document.querySelector('.hero-left');
    const heroRight = document.querySelector('.hero-right');

    if (heroLeft) heroLeft.classList.add('active');
    if (heroRight) heroRight.classList.add('active');
});

// Work carousel: featured slide + thumbnail rail, auto-rotating
(() => {
    const stage = document.getElementById('workStage');
    const featuredImg = document.querySelector('#workFeatured img');
    const thumbButtons = document.querySelectorAll('#workThumbs .work-thumb');
    if (!stage || !featuredImg || !thumbButtons.length) return;

    const items = [
        { src: 'img/portfolio-tunnel-figure.png', alt: 'Work 1' },
        { src: 'img/portfolio-eye-punx.png', alt: 'Work 2' },
        { src: 'img/portfolio-red-armor.png', alt: 'Work 3' },
        { src: 'img/portfolio-walkie-talkie.png', alt: 'Work 4' },
    ];

    const render = () => {
        featuredImg.style.opacity = 0;
        setTimeout(() => {
            featuredImg.src = items[0].src;
            featuredImg.alt = items[0].alt;
            featuredImg.style.opacity = 1;
        }, 200);

        thumbButtons.forEach((btn, i) => {
            const item = items[i + 1];
            const img = btn.querySelector('img');
            img.style.opacity = 0;
            setTimeout(() => {
                img.src = item.src;
                img.alt = item.alt;
                img.style.opacity = 1;
            }, 200);
        });
    };

    const advance = (steps = 1) => {
        for (let i = 0; i < steps; i += 1) items.push(items.shift());
        render();
    };

    let timer = setInterval(() => advance(1), 4000);

    stage.addEventListener('mouseenter', () => clearInterval(timer));
    stage.addEventListener('mouseleave', () => {
        clearInterval(timer);
        timer = setInterval(() => advance(1), 4000);
    });

    thumbButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            advance(Number(btn.dataset.index));
            clearInterval(timer);
            timer = setInterval(() => advance(1), 4000);
        });
    });
})();

// Work page: filter tabs
(() => {
    const tabs = document.querySelectorAll('#filterTabs .filter-tab');
    const tiles = document.querySelectorAll('#workGrid .work-tile');
    if (!tabs.length || !tiles.length) return;

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            tabs.forEach((t) => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.dataset.filter;
            tiles.forEach((tile) => {
                const show = filter === 'all' || tile.dataset.category === filter;
                tile.classList.toggle('is-hidden', !show);
            });
        });
    });
})();

// Let's Build page: FAQ accordion
(() => {
    const items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach((item) => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('is-open');
            items.forEach((i) => i.classList.remove('is-open'));
            if (!isOpen) item.classList.add('is-open');
        });
    });
})();

// Insights page: filter tabs
(() => {
    const tabs = document.querySelectorAll('#insightFilterTabs .filter-tab');
    const cards = document.querySelectorAll('#insightGrid .insight-card');
    if (!tabs.length || !cards.length) return;

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            tabs.forEach((t) => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.dataset.filter;
            cards.forEach((card) => {
                const categories = (card.dataset.category || '').split(' ');
                const show = filter === 'all' || categories.includes(filter);
                card.classList.toggle('is-hidden', !show);
            });
        });
    });
})();
