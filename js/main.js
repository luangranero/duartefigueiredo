/* =========================================================
   Duarte Figueiredo | Advocacia Previdenciária
   ========================================================= */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- ano do rodapé ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- header sólido + botão flutuante ---------- */
  var header = document.getElementById('header');
  var wa = document.querySelector('.wa-float');

  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle('solid', y > 60);
    if (wa) wa.classList.toggle('show', y > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- menu mobile ---------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  });

  nav.addEventListener('click', function (e) {
    if (e.target.tagName !== 'A') return;
    nav.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });

  /* ---------- reveal on scroll ---------- */
  var targets = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window) || reduced) {
    targets.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---------- parallax suave nas figuras ---------- */
  var parallax = Array.prototype.slice.call(document.querySelectorAll('.parallax img'));

  if (parallax.length && !reduced) {
    var ticking = false;

    function updateParallax() {
      var vh = window.innerHeight;
      parallax.forEach(function (img) {
        var box = img.parentElement.getBoundingClientRect();
        if (box.bottom < -200 || box.top > vh + 200) return;
        // -1 (abaixo da tela) .. 1 (acima da tela)
        var progress = (box.top + box.height / 2 - vh / 2) / (vh / 2);
        img.style.transform = 'translate3d(0,' + (progress * -22).toFixed(2) + 'px,0) scale(1.12)';
      });
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateParallax);
    }, { passive: true });

    window.addEventListener('resize', updateParallax);
    updateParallax();
  }

  /* ---------- poeira dourada do hero ---------- */
  var canvas = document.getElementById('dust');

  if (canvas && !reduced) {
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var particles = [];
    var w = 0, h = 0;
    var pointer = { x: -999, y: -999 };
    var running = true;

    function resize() {
      var rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function seed() {
      var count = Math.round(Math.min(110, Math.max(38, (w * h) / 13000)));
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.7 + 0.4,
          vx: (Math.random() - 0.5) * 0.16,
          vy: -(Math.random() * 0.22 + 0.05),
          a: Math.random() * 0.45 + 0.12,
          tw: Math.random() * Math.PI * 2
        });
      }
    }

    function draw() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.tw += 0.02;

        // leve atração ao cursor
        var dx = p.x - pointer.x;
        var dy = p.y - pointer.y;
        var d2 = dx * dx + dy * dy;
        if (d2 < 18000) {
          var f = (1 - d2 / 18000) * 0.45;
          p.x += (dx / (Math.sqrt(d2) || 1)) * f;
          p.y += (dy / (Math.sqrt(d2) || 1)) * f;
        }

        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        var alpha = p.a * (0.55 + 0.45 * Math.sin(p.tw));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(224, 200, 140, ' + alpha.toFixed(3) + ')';
        ctx.fill();
      }

      requestAnimationFrame(draw);
    }

    var hero = document.querySelector('.hero');
    hero.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    });
    hero.addEventListener('mouseleave', function () {
      pointer.x = pointer.y = -999;
    });

    // pausa quando o hero sai da tela
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        var visible = entries[0].isIntersecting;
        if (visible && !running) { running = true; draw(); }
        running = visible;
      }, { threshold: 0 }).observe(hero);
    }

    window.addEventListener('resize', resize);
    resize();
    draw();
  }

  /* ---------- formulário -> WhatsApp ---------- */
  var form = document.getElementById('form');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);

      var texto =
        'Olá! Vim pelo site.\n\n' +
        'Nome: ' + (d.get('nome') || '') + '\n' +
        'Telefone: ' + (d.get('tel') || '') + '\n' +
        'Assunto: ' + (d.get('assunto') || '') + '\n' +
        'Resumo: ' + (d.get('msg') || 'nao informado');

      window.open('https://wa.me/5511941594174?text=' + encodeURIComponent(texto), '_blank', 'noopener');
    });
  }

  /* ---------- destaque do link ativo no menu ---------- */
  var sections = document.querySelectorAll('section[id]');
  var links = {};
  document.querySelectorAll('.nav a[href^="#"]').forEach(function (a) {
    links[a.getAttribute('href').slice(1)] = a;
  });

  if ('IntersectionObserver' in window) {
    var activeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = links[entry.target.id];
        if (!link) return;
        link.style.color = entry.isIntersecting ? '#E4C88C' : '';
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (s) { activeObserver.observe(s); });
  }
})();
