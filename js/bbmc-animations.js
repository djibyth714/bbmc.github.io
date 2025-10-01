/**
 * BB MC - Animations & Interactions JavaScript
 * Fichier pour améliorer l'expérience utilisateur avec des animations modernes
 */

(function() {
  'use strict';

  // ============================================
  // 1. SMOOTH SCROLL POUR TOUS LES LIENS INTERNES
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '#!') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // ============================================
  // 2. ANIMATION DES COMPTEURS
  // ============================================
  function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      // Format des nombres avec séparateurs
      element.textContent = Math.floor(current).toLocaleString('fr-FR');
    }, 16);
  }

  // Observer pour déclencher les compteurs au scroll
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter').forEach(counter => {
    counterObserver.observe(counter);
  });

  // ============================================
  // 3. ANIMATIONS AU SCROLL (REVEAL ON SCROLL)
  // ============================================
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observer tous les éléments avec classe animate-on-scroll
  document.querySelectorAll('.animate-on-scroll, .video-card, .album-card, .theme-card, .timeline-item').forEach(el => {
    scrollObserver.observe(el);
  });

  // ============================================
  // 4. PARALLAX EFFECT AVANCÉ - SECTIONS SUPERPOSÉES
  // ============================================
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    
    // Parallax sur le hero
    if (heroSection) {
      const parallaxSpeed = 0.5;
      heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }

    // Effet parallax sur les images de fond
    document.querySelectorAll('.breadcrumbs-custom').forEach(breadcrumb => {
      const rect = breadcrumb.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const yPos = -(scrolled - breadcrumb.offsetTop) * 0.3;
        breadcrumb.style.backgroundPosition = `center ${yPos}px`;
      }
    });

    // Parallax sur les sections superposées
    const sections = document.querySelectorAll('.album-showcase, .videos-section, .music-section');
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const speed = 0.1 + (index * 0.05);
        const yPos = (window.innerHeight - rect.top) * speed;
        section.style.transform = `translateY(-${yPos * 0.3}px)`;
      }
    });

    // Effet 3D sur les cartes au scroll
    const cards = document.querySelectorAll('.video-card, .album-card');
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const windowCenter = window.innerHeight / 2;
      const distance = cardCenter - windowCenter;
      const rotateX = distance * 0.01;
      
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg)`;
      }
    });
  });

  // ============================================
  // 5. NAVBAR SCROLL EFFECT
  // ============================================
  let lastScroll = 0;
  const navbar = document.querySelector('.rd-navbar');
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (navbar) {
      if (currentScroll > 100) {
        navbar.classList.add('rd-navbar--scrolled');
      } else {
        navbar.classList.remove('rd-navbar--scrolled');
      }

      // Hide/show navbar on scroll
      if (currentScroll > lastScroll && currentScroll > 500) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
    }
    
    lastScroll = currentScroll;
  });

  // ============================================
  // 6. BACK TO TOP BUTTON - Vérifier si existe déjà
  // ============================================
  // Supprimer le bouton existant s'il y en a un
  const existingBtn = document.getElementById('ui-to-top');
  if (existingBtn) {
    existingBtn.style.display = 'none'; // Cacher l'ancien bouton
  }

  // Créer notre bouton uniquement s'il n'existe pas déjà
  let backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) {
    backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTop';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.setAttribute('aria-label', 'Retour en haut');
    document.body.appendChild(backToTopBtn);
  }

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ============================================
  // 7. HOVER EFFECTS SUR LES CARTES
  // ============================================
  document.querySelectorAll('.video-card, .album-card, .social-link').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // ============================================
  // 8. AUDIO PLAYER CUSTOM CONTROLS
  // ============================================
  document.querySelectorAll('audio').forEach(audio => {
    audio.addEventListener('play', function() {
      // Pause tous les autres lecteurs audio
      document.querySelectorAll('audio').forEach(otherAudio => {
        if (otherAudio !== this) {
          otherAudio.pause();
        }
      });
      
      // Animation du conteneur parent
      const container = this.closest('div[style*="background"]');
      if (container) {
        container.style.boxShadow = '0 0 30px rgba(255, 107, 53, 0.5)';
        container.style.transform = 'scale(1.02)';
      }
    });

    audio.addEventListener('pause', function() {
      const container = this.closest('div[style*="background"]');
      if (container) {
        container.style.boxShadow = 'none';
        container.style.transform = 'scale(1)';
      }
    });
  });

  // ============================================
  // 9. LAZY LOADING POUR LES IMAGES
  // ============================================
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // ============================================
  // 10. PARTICLES EFFECT AMÉLIORÉ POUR LE HERO
  // ============================================
  function createParticles() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-enhanced';
    particlesContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: 2;
      pointer-events: none;
    `;

    // Créer des particules avec effet 3D
    for (let i = 0; i < 80; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle-enhanced';
      
      const size = Math.random() * 4 + 2;
      const tx = (Math.random() - 0.5) * 200;
      const ty = (Math.random() - 0.5) * 200;
      
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(255, 215, 0, ${Math.random() * 0.8 + 0.2}), transparent);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: floatParticle ${Math.random() * 15 + 10}s infinite ease-in-out;
        animation-delay: ${Math.random() * 5}s;
        filter: blur(${Math.random() * 2}px);
        --tx: ${tx}px;
        --ty: ${ty}px;
      `;
      particlesContainer.appendChild(particle);
    }

    hero.appendChild(particlesContainer);
  }

  // ============================================
  // 10B. EFFET DE LUMIÈRE DYNAMIQUE
  // ============================================
  function createDynamicLight() {
    const sections = document.querySelectorAll('.album-showcase, .music-section');
    sections.forEach(section => {
      if (!section.classList.contains('dynamic-light')) {
        section.classList.add('dynamic-light');
      }
    });
  }

  // ============================================
  // 10C. EFFET 3D AU MOUVEMENT DE LA SOURIS
  // ============================================
  function init3DMouseEffect() {
    const cards = document.querySelectorAll('.video-card, .album-card, .stat-item');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      });
    });
  }

  // Ajouter l'animation CSS pour les particules
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% {
        transform: translate(0, 0) scale(1);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      50% {
        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.5);
        opacity: 0.8;
      }
      90% {
        opacity: 1;
      }
    }

    .visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }

    .video-card, .album-card, .theme-card, .timeline-item {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }

    #backToTop {
      position: fixed;
      right: 20px;
      bottom: 24px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(45deg, #ff6b35, #ff8a65);
      color: #fff;
      border: none;
      display: none;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 6px 18px rgba(255, 107, 53, 0.4);
      z-index: 9999;
      font-size: 24px;
      font-weight: bold;
      transition: all 0.3s ease;
    }

    #backToTop.show {
      display: flex;
      animation: fadeInUp 0.3s ease;
    }

    #backToTop:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(255, 107, 53, 0.6);
    }

    .rd-navbar {
      transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
    }

    .rd-navbar--scrolled {
      background: rgba(26, 26, 46, 0.95) !important;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2) !important;
    }

    /* Amélioration des cartes vidéo */
    .video-card {
      position: relative;
      overflow: hidden;
    }

    .video-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s ease;
      z-index: 1;
    }

    .video-card:hover::before {
      left: 100%;
    }

    /* Timeline animations */
    .timeline-item {
      position: relative;
    }

    .timeline-item.visible::before {
      animation: expandLine 0.5s ease forwards;
    }

    @keyframes expandLine {
      from {
        height: 0;
      }
      to {
        height: 100%;
      }
    }

    /* Social links pulse effect */
    .social-link {
      position: relative;
      overflow: hidden;
    }

    .social-link::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: translate(-50%, -50%);
      transition: width 0.3s ease, height 0.3s ease;
    }

    .social-link:hover::after {
      width: 100%;
      height: 100%;
    }

    /* Amélioration des boutons */
    .btn-custom, .button {
      position: relative;
      overflow: hidden;
      z-index: 1;
    }

    .btn-custom::before, .button::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      transform: translate(-50%, -50%);
      transition: width 0.6s ease, height 0.6s ease;
      z-index: -1;
    }

    .btn-custom:hover::before, .button:hover::before {
      width: 300%;
      height: 300%;
    }

    /* Effet de typing pour les titres */
    @keyframes typing {
      from {
        width: 0;
      }
      to {
        width: 100%;
      }
    }

    @keyframes blink {
      50% {
        border-color: transparent;
      }
    }

    /* Amélioration des images au hover */
    img {
      transition: transform 0.3s ease, filter 0.3s ease;
    }

    img:hover {
      transform: scale(1.05);
      filter: brightness(1.1);
    }

    /* Loading animation pour les images */
    img[data-src] {
      filter: blur(5px);
      transition: filter 0.3s ease;
    }

    img:not([data-src]) {
      filter: blur(0);
    }
  `;
  document.head.appendChild(style);

  // ============================================
  // 11. INITIALISATION AU CHARGEMENT
  // ============================================
  window.addEventListener('load', () => {
    createParticles();
    createDynamicLight();
    init3DMouseEffect();
    
    // Ajouter une classe pour indiquer que la page est chargée
    document.body.classList.add('page-loaded');
    
    // Animation d'entrée pour le contenu
    setTimeout(() => {
      document.querySelectorAll('.animate-fade-up, .animate-fade-left, .animate-fade-right').forEach((el, index) => {
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0) translateX(0)';
        }, index * 100);
      });
    }, 300);

    // Ajouter des classes d'animation aux sections
    const sections = document.querySelectorAll('.album-showcase, .videos-section, .music-section, .social-section');
    sections.forEach((section, index) => {
      setTimeout(() => {
        section.classList.add('section-visible');
      }, 300 + (index * 200));
    });
  });

  // ============================================
  // 12. FORMULAIRE DE CONTACT - VALIDATION AMÉLIORÉE
  // ============================================
  const contactForm = document.querySelector('form.rd-mailform');
  if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      // Animation au focus
      input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
        this.style.borderColor = '#ff6b35';
        this.style.boxShadow = '0 0 10px rgba(255, 107, 53, 0.3)';
      });

      input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
        this.style.borderColor = '';
        this.style.boxShadow = '';
        
        // Validation en temps réel
        if (this.value.trim() !== '') {
          this.parentElement.classList.add('has-value');
        } else {
          this.parentElement.classList.remove('has-value');
        }
      });

      // Animation lors de la saisie
      input.addEventListener('input', function() {
        if (this.value.trim() !== '') {
          this.parentElement.classList.add('has-value');
        } else {
          this.parentElement.classList.remove('has-value');
        }
      });
    });

    // Animation de soumission
    contactForm.addEventListener('submit', function(e) {
      const submitBtn = this.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.innerHTML = '<span style="display: inline-block; animation: spin 1s linear infinite;">⟳</span> Envoi en cours...';
        submitBtn.disabled = true;
      }
    });
  }

  // Animation de rotation pour le loader
  const spinStyle = document.createElement('style');
  spinStyle.textContent = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(spinStyle);

  // ============================================
  // 13. EASTER EGG - KONAMI CODE
  // ============================================
  let konamiCode = [];
  const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  
  document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
      document.body.style.animation = 'rainbow 2s linear infinite';
      setTimeout(() => {
        document.body.style.animation = '';
      }, 5000);
    }
  });

  const rainbowStyle = document.createElement('style');
  rainbowStyle.textContent = `
    @keyframes rainbow {
      0% { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    }
  `;
  document.head.appendChild(rainbowStyle);

  console.log('%c🎤 BB MC - Site Officiel', 'font-size: 20px; font-weight: bold; color: #ff6b35;');
  console.log('%cProduction: D.F.PROD', 'font-size: 14px; color: #ffd700;');

})();
