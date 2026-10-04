/* BB MC — Site officiel 2026 */
(function () {
  var doc = document.documentElement;
  doc.classList.add('js');

  /* Header : fond plein au défilement */
  var hdr = document.querySelector('.hdr');
  function onScroll() { if (hdr) hdr.classList.toggle('solid', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Menu mobile */
  var burger = document.querySelector('.burger');
  if (burger) {
    burger.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu');
      burger.setAttribute('aria-expanded', open);
    });
    document.querySelectorAll('.nav a').forEach(function (a) {
      a.addEventListener('click', function () { document.body.classList.remove('menu'); });
    });
  }

  /* Apparitions au défilement (le contenu reste visible si l'observateur n'existe pas) */
  var targets = document.querySelectorAll('.rv, .bars, .ychart');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add('in'); });
  }

  /* YouTube : vignette légère, lecteur chargé au clic */
  document.querySelectorAll('.yt[data-id]').forEach(function (el) {
    function load() {
      if (el.querySelector('iframe')) return;
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + el.dataset.id + '?autoplay=1&rel=0';
      f.title = el.getAttribute('aria-label') || 'Vidéo BB MC';
      f.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen';
      f.allowFullscreen = true;
      el.appendChild(f);
    }
    el.addEventListener('click', load);
    el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); load(); } });
  });

  /* Lecteur audio */
  document.querySelectorAll('.player').forEach(function (pl) {
    var list = pl.querySelectorAll('.tracks li');
    if (!list.length) return;
    var audio = new Audio();
    audio.preload = 'none';
    var cur = -1;
    var btn = pl.querySelector('.pbtn');
    var t = pl.querySelector('.t'), a = pl.querySelector('.a');
    var bar = pl.querySelector('.bar'), fill = pl.querySelector('.bar i'), time = pl.querySelector('.time');
    var useIcon = function (name) { return '<svg class="ic"><use href="images_BBMC/web/icons.svg#i-' + name + '"/></svg>'; };
    function fmt(s) { if (!isFinite(s)) return '0:00'; s = Math.floor(s); return Math.floor(s / 60) + ':' + ('0' + s % 60).slice(-2); }
    function setPlaying(p) {
      btn.innerHTML = useIcon(p ? 'pause' : 'play');
      btn.setAttribute('aria-label', p ? 'Pause' : 'Lecture');
      list.forEach(function (li, i) { li.classList.toggle('playing', p && i === cur); });
    }
    function select(i, autoplay) {
      cur = (i + list.length) % list.length;
      var li = list[cur];
      list.forEach(function (x) { x.classList.remove('on'); });
      li.classList.add('on');
      audio.src = li.dataset.src;
      t.textContent = li.dataset.title;
      a.textContent = li.dataset.artist || 'BB MC';
      fill.style.width = '0';
      if (autoplay) audio.play().catch(function () {});
    }
    list.forEach(function (li, i) {
      li.tabIndex = 0;
      li.addEventListener('click', function () { if (i === cur) { audio.paused ? audio.play() : audio.pause(); } else select(i, true); });
      li.addEventListener('keydown', function (e) { if (e.key === 'Enter') li.click(); });
    });
    btn.addEventListener('click', function () {
      if (cur < 0) return select(0, true);
      audio.paused ? audio.play() : audio.pause();
    });
    var prev = pl.querySelector('[data-prev]'), next = pl.querySelector('[data-next]');
    if (prev) prev.addEventListener('click', function () { select(cur - 1, true); });
    if (next) next.addEventListener('click', function () { select(cur + 1, true); });
    audio.addEventListener('play', function () { setPlaying(true); });
    audio.addEventListener('pause', function () { setPlaying(false); });
    audio.addEventListener('ended', function () { select(cur + 1, true); });
    audio.addEventListener('timeupdate', function () {
      fill.style.width = (audio.currentTime / audio.duration * 100 || 0) + '%';
      time.textContent = fmt(audio.currentTime) + ' / ' + fmt(audio.duration);
    });
    bar.addEventListener('click', function (e) {
      if (!audio.duration) return;
      var r = bar.getBoundingClientRect();
      audio.currentTime = (e.clientX - r.left) / r.width * audio.duration;
    });
    /* Pré-sélection du premier titre sans lecture */
    cur = 0; list[0].classList.add('on'); t.textContent = list[0].dataset.title;
    audio.src = list[0].dataset.src;
  });

  /* Visionneuse photo */
  var groups = {};
  document.querySelectorAll('a[data-lb]').forEach(function (a) {
    var g = a.dataset.lb; (groups[g] = groups[g] || []).push(a);
  });
  if (Object.keys(groups).length) {
    var lb = document.createElement('div');
    lb.className = 'lb';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.innerHTML = '<img alt=""><button class="x" aria-label="Fermer"><svg class="ic"><use href="images_BBMC/web/icons.svg#i-xmark"/></svg></button>' +
      '<button class="pv" aria-label="Précédente"><svg class="ic"><use href="images_BBMC/web/icons.svg#i-chevron-left"/></svg></button>' +
      '<button class="nx" aria-label="Suivante"><svg class="ic"><use href="images_BBMC/web/icons.svg#i-chevron-right"/></svg></button><div class="cap"></div>';
    document.body.appendChild(lb);
    var img = lb.querySelector('img'), cap = lb.querySelector('.cap'), set = [], idx = 0, last = null;
    function show(i) {
      idx = (i + set.length) % set.length;
      img.src = set[idx].href;
      img.alt = set[idx].querySelector('img') ? set[idx].querySelector('img').alt : '';
      cap.textContent = (idx + 1) + ' / ' + set.length + (img.alt ? ' — ' + img.alt : '');
    }
    function close() { lb.classList.remove('open'); document.body.style.overflow = ''; if (last) last.focus(); }
    Object.keys(groups).forEach(function (g) {
      groups[g].forEach(function (a, i) {
        a.addEventListener('click', function (e) {
          e.preventDefault(); set = groups[g]; last = a; show(i);
          lb.classList.add('open'); document.body.style.overflow = 'hidden'; lb.querySelector('.x').focus();
        });
      });
    });
    lb.querySelector('.x').addEventListener('click', close);
    lb.querySelector('.pv').addEventListener('click', function () { show(idx - 1); });
    lb.querySelector('.nx').addEventListener('click', function () { show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
  }

  /* Formulaire de contact → ouvre la messagerie (site statique, sans serveur PHP) */
  var form = document.querySelector('form[data-mailto]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var subject = '[' + d.get('type') + '] ' + (d.get('subject') || 'Demande via bbmc.dsall.fr');
      var body = 'Nom : ' + d.get('name') + '\nE-mail : ' + d.get('email') + '\nTéléphone : ' + (d.get('phone') || '-') + '\n\n' + d.get('message');
      window.location.href = 'mailto:' + form.dataset.mailto + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }

  /* Année du footer */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
