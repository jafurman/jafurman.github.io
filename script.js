/* Scroll behaviour for the landing page: reveal-on-enter, a progress bar, a nav
   that solidifies and tracks the section you are in, and a light hero parallax.
   Everything is defensive, and prefers-reduced-motion turns the motion off. */
(function () {
    /* the .reveal animation must never hide content if JS is off or fails */
    document.documentElement.classList.add('js');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function yearStamp() {
        var y = document.getElementById('year');
        if (y) { y.textContent = String(new Date().getFullYear()); }
    }

    function reveals() {
        var items = document.querySelectorAll('.reveal');
        if (!('IntersectionObserver' in window) || reduce) {
            items.forEach(function (el) { el.classList.add('in'); });
            return;
        }
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    io.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
        items.forEach(function (el) { io.observe(el); });
    }

    function scrollStuff() {
        var bar = document.getElementById('progress');
        var top = document.querySelector('.topbar');
        var heroInner = document.querySelector('.hero-inner');
        var links = Array.prototype.slice.call(document.querySelectorAll('.links a[href^="#"]'));
        var sections = links.map(function (a) {
            return document.querySelector(a.getAttribute('href'));
        });
        var ticking = false;

        function update() {
            ticking = false;
            var y = window.scrollY || window.pageYOffset || 0;
            var doc = document.documentElement;
            var max = Math.max(1, doc.scrollHeight - window.innerHeight);

            if (bar) { bar.style.width = Math.min(100, (y / max) * 100) + '%'; }
            if (top) { top.classList.toggle('solid', y > 40); }

            if (heroInner && !reduce) {
                var past = Math.min(1, y / Math.max(1, window.innerHeight * 0.9));
                heroInner.style.transform = 'translateY(' + (past * 60).toFixed(1) + 'px)';
                heroInner.style.opacity = String(1 - past * 0.85);
            }

            var activeIndex = -1;
            sections.forEach(function (section, i) {
                if (section && section.getBoundingClientRect().top <= 120) { activeIndex = i; }
            });
            links.forEach(function (a, i) { a.classList.toggle('active', i === activeIndex); });
        }

        function onScroll() {
            if (!ticking) {
                ticking = true;
                window.requestAnimationFrame(update);
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        update();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { yearStamp(); reveals(); scrollStuff(); });
    } else {
        yearStamp(); reveals(); scrollStuff();
    }
})();
