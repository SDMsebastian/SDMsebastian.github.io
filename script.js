/* ===========================================================
   SDM WEB STUDIO — script.js
   =========================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- NAVBAR: transparente -> sólida al hacer scroll ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 24);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- MENU MOVIL ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  /* ---------- SCROLL REVEAL ---------- */
  const revealItems = document.querySelectorAll('.reveal, .reveal-scale');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealItems.forEach(el => revealObserver.observe(el));

  /* ---------- PROCESO: activa el número al hacer scroll ---------- */
  document.querySelectorAll('.p-step').forEach(el => revealObserver.observe(el));
  const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); });
  }, { threshold: 0.4 });
  document.querySelectorAll('.p-step').forEach(el => stepObserver.observe(el));

  /* ---------- CONTADORES ANIMADOS ---------- */
  const counters = document.querySelectorAll('.count');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  };
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { animateCount(entry.target); counterObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.6 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---------- FAQ ACORDEON ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---------- WHATSAPP: mensaje automático ---------- */
  const WA_NUMBER = '18299895998';
  const waLink = (projectName) => {
    const msg = `Hola, vi la demo de "${projectName}" y me gustaría una página similar para mi negocio.`;
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  /* ---------- DATA: PORTAFOLIO ---------- */
  const projects = [
    { name: 'La Terraza Bar', cat: 'bares', catLabel: 'Bares', tag: 'BAR', desc: 'Página con carta de cócteles, ambiente nocturno y reserva de mesas para eventos.', tech: ['Menú digital', 'Reservas', 'WhatsApp'], grad: 'linear-gradient(135deg,#7c1d3f,#1a0a12)' },
    { name: 'Cantina Roja', cat: 'bares', catLabel: 'Bares', tag: 'BAR', desc: 'Landing con promociones semanales y ubicación destacada para atraer más visitas.', tech: ['SEO Local', 'Google Maps'], grad: 'linear-gradient(135deg,#5b1a8b,#160a26)' },
    { name: 'Sabor Criollo', cat: 'restaurantes', catLabel: 'Restaurantes', tag: 'REST', desc: 'Menú digital interactivo con pedidos directos por WhatsApp y galería de platos.', tech: ['Menú digital', 'Pedidos', 'WhatsApp'], grad: 'linear-gradient(135deg,#b45309,#1c1006)' },
    { name: 'Fuoco Trattoria', cat: 'restaurantes', catLabel: 'Restaurantes', tag: 'REST', desc: 'Experiencia elegante con reservas online y presentación premium del chef.', tech: ['Reservas', 'SEO'], grad: 'linear-gradient(135deg,#166534,#06170d)' },
    { name: 'Café Origen', cat: 'cafeterias', catLabel: 'Cafeterías', tag: 'CAFE', desc: 'Sitio cálido con historia de la marca, menú de temporada y horarios claros.', tech: ['Menú digital', 'Responsive'], grad: 'linear-gradient(135deg,#92400e,#1a0f04)' },
    { name: 'Bruma Coffee House', cat: 'cafeterias', catLabel: 'Cafeterías', tag: 'CAFE', desc: 'Landing minimalista enfocada en atraer clientes de trabajo remoto y estudio.', tech: ['SEO', 'Google Maps'], grad: 'linear-gradient(135deg,#334155,#0a0f18)' },
    { name: 'Rústica Barbershop', cat: 'barberias', catLabel: 'Barberías', tag: 'BARBER', desc: 'Reserva de citas online y catálogo de servicios con precios claros.', tech: ['Reservas', 'WhatsApp'], grad: 'linear-gradient(135deg,#1f2937,#020409)' },
    { name: 'Clásico Barber Club', cat: 'barberias', catLabel: 'Barberías', tag: 'BARBER', desc: 'Diseño con identidad fuerte y galería de trabajos para generar confianza.', tech: ['Galería', 'SEO Local'], grad: 'linear-gradient(135deg,#374151,#050608)' },
    { name: 'Hotel Marea Azul', cat: 'hoteles', catLabel: 'Hoteles', tag: 'HOTEL', desc: 'Presentación de habitaciones, tarifas y solicitud de reserva directa.', tech: ['Reservas', 'Galería', 'SEO'], grad: 'linear-gradient(135deg,#0e7490,#04141a)' },
    { name: 'Hotel Palma Real', cat: 'hoteles', catLabel: 'Hoteles', tag: 'HOTEL', desc: 'Landing premium enfocada en aumentar reservas directas sin comisiones.', tech: ['Reservas', 'Multilenguaje'], grad: 'linear-gradient(135deg,#0369a1,#031420)' },
    { name: 'Boutique Nueva Era', cat: 'tiendas', catLabel: 'Tiendas', tag: 'TIENDA', desc: 'Catálogo visual de productos con contacto directo por WhatsApp para pedidos.', tech: ['Catálogo', 'WhatsApp'], grad: 'linear-gradient(135deg,#9333ea,#160a28)' },
    { name: 'Tienda Central', cat: 'tiendas', catLabel: 'Tiendas', tag: 'TIENDA', desc: 'Página rápida con ubicación, horarios y catálogo de productos destacados.', tech: ['SEO Local', 'Catálogo'], grad: 'linear-gradient(135deg,#4338ca,#0c0a1e)' },
  ];

  const filterLabelMap = { bares:'BAR', restaurantes:'REST', cafeterias:'CAFE', barberias:'BARBER', hoteles:'HOTEL', tiendas:'TIENDA' };

  const portfolioGrid = document.getElementById('portfolioGrid');
  const renderProjects = (filter = 'all') => {
    portfolioGrid.innerHTML = '';
    const list = filter === 'all' ? projects : projects.filter(p => p.cat === filter);
    list.forEach((p, i) => {
      const card = document.createElement('article');
      card.className = 'glass-card p-card reveal';
      card.style.setProperty('--i', i);
      card.innerHTML = `
        <div class="p-preview" style="background:${p.grad}">
          <div class="p-browser-bar"><span></span><span></span><span></span></div>
          <div class="p-mock">
            <div class="p-mock-title">${p.name}</div>
            <div class="p-mock-sub">${p.catLabel} · sitio web</div>
            <span class="p-mock-btn">Reservar / Contactar</span>
          </div>
        </div>
        <div class="p-body">
          <div class="p-cat">${p.catLabel}</div>
          <h3 class="p-title">${p.name}</h3>
          <p class="p-desc">${p.desc}</p>
          <div class="p-tech">${p.tech.map(t => `<span>${t}</span>`).join('')}</div>
          <div class="p-actions">
            <a href="#" class="btn btn-ghost btn-sm">Ver Demo</a>
            <a href="${waLink(p.name)}" target="_blank" class="btn btn-whatsapp btn-sm">Quiero una así</a>
          </div>
        </div>`;
      portfolioGrid.appendChild(card);
      revealObserver.observe(card);
    });
  };
  renderProjects();

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.dataset.filter);
    });
  });

  /* ---------- DATA: CASOS DE EXITO ---------- */
  const cases = [
    { biz: 'La Terraza Bar', cat: 'Bar', letter: 'LT',
      goal: 'Atraer más clientes los fines de semana y facilitar reservas de mesas.',
      problem: 'Solo tenían Instagram, sin forma de reservar ni de aparecer en Google.',
      solution: 'Página web con reservas online, menú de cócteles y ubicación destacada.',
      result: '+40% en reservas de mesas para eventos en el primer mes.' },
    { biz: 'Sabor Criollo', cat: 'Restaurante', letter: 'SC',
      goal: 'Aumentar pedidos para llevar y reducir llamadas telefónicas.',
      problem: 'Los clientes no encontraban el menú actualizado ni una forma rápida de pedir.',
      solution: 'Menú digital interactivo con pedidos directos por WhatsApp.',
      result: 'Pedidos por WhatsApp aumentaron de forma constante desde el lanzamiento.' },
    { biz: 'Rústica Barbershop', cat: 'Barbería', letter: 'RB',
      goal: 'Reducir citas perdidas y proyectar una imagen más profesional.',
      problem: 'Las citas se agendaban solo por mensajes, generando confusión de horarios.',
      solution: 'Sistema de reservas online con catálogo de servicios y precios claros.',
      result: 'Agenda organizada y menos cancelaciones de última hora.' },
    { biz: 'Hotel Marea Azul', cat: 'Hotel', letter: 'HM',
      goal: 'Aumentar reservas directas y reducir dependencia de plataformas externas.',
      problem: 'Pagaban altas comisiones por reservas hechas desde plataformas de terceros.',
      solution: 'Landing premium con galería de habitaciones y formulario de reserva directa.',
      result: 'Más reservas gestionadas directamente, sin comisiones adicionales.' },
  ];

  const caseGrid = document.getElementById('caseGrid');
  cases.forEach((c, i) => {
    const card = document.createElement('article');
    card.className = 'glass-card case-card reveal';
    card.style.setProperty('--i', i);
    card.innerHTML = `
      <div class="case-top">
        <div class="case-badge">${c.letter}</div>
        <div><div class="case-biz">${c.biz}</div><div class="case-cat">${c.cat}</div></div>
      </div>
      <div class="case-row"><span class="case-label">Objetivo</span><span class="case-text">${c.goal}</span></div>
      <div class="case-row"><span class="case-label">Problema</span><span class="case-text">${c.problem}</span></div>
      <div class="case-row"><span class="case-label">Solución</span><span class="case-text">${c.solution}</span></div>
      <div class="case-result"><b>Resultado:</b> ${c.result}</div>`;
    caseGrid.appendChild(card);
    revealObserver.observe(card);
  });

  /* ---------- FORMULARIO DE CONTACTO ---------- */
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const [nombre, negocio, tipo] = contactForm.querySelectorAll('input, select');
    const mensaje = contactForm.querySelector('textarea').value;
    const texto = `Hola, soy ${nombre.value} de "${negocio.value}" (${tipo.value}). ${mensaje}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(texto)}`, '_blank');
  });

});
