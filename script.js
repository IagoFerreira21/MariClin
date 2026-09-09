(function(){
  // Sticky nav background
  var nav = document.getElementById('siteNav');
  var onScroll = function(){
    if(window.scrollY > 40){ nav.classList.add('scrolled'); } else { nav.classList.remove('scrolled'); }
  };
  document.addEventListener('scroll', onScroll);
  onScroll();

  // Mobile menu toggle
  var toggle = document.getElementById('menuToggle');
  var links = document.getElementById('navLinks');
  toggle.addEventListener('click', function(){
    var open = links.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
    });
  });

  // Scroll-spy active nav link
  var navAnchors = Array.from(links.querySelectorAll('a[href^="#"]'));
  var targets = navAnchors.map(function(a){ return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  var spy = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      var id = '#' + entry.target.id;
      var link = navAnchors.find(function(a){ return a.getAttribute('href') === id; });
      if(!link) return;
      if(entry.isIntersecting){
        navAnchors.forEach(function(a){ a.classList.remove('active'); });
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  targets.forEach(function(t){ spy.observe(t); });

  // Accordion
  document.querySelectorAll('.acc-item').forEach(function(item){
    var trigger = item.querySelector('.acc-trigger');
    var panel = item.querySelector('.acc-panel');
    if(item.classList.contains('open')){ panel.style.maxHeight = panel.scrollHeight + 'px'; }
    trigger.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.acc-item').forEach(function(other){
        other.classList.remove('open');
        other.querySelector('.acc-trigger').setAttribute('aria-expanded','false');
        other.querySelector('.acc-panel').style.maxHeight = null;
      });
      if(!isOpen){
        item.classList.add('open');
        trigger.setAttribute('aria-expanded','true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
  window.addEventListener('resize', function(){
    document.querySelectorAll('.acc-item.open .acc-panel').forEach(function(panel){
      panel.style.maxHeight = panel.scrollHeight + 'px';
    });
  });

  // Sinais de dor toggle
  var toggleBtns = document.querySelectorAll('.sinais-toggle button');
  toggleBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      toggleBtns.forEach(function(b){ b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected','true');
      var target = btn.getAttribute('data-target');
      document.querySelectorAll('.sinal-item').forEach(function(item){
        item.classList.toggle('show', item.classList.contains(target));
      });
    });
  });

  // Contact form -> WhatsApp message
  var form = document.getElementById('contactForm');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var nomeTutor = document.getElementById('nomeTutor').value.trim();
    var nomePet = document.getElementById('nomePet').value.trim();
    var cidade = document.getElementById('cidade').value;
    var servico = document.getElementById('servico').value;
    var mensagem = document.getElementById('mensagem').value.trim();

    var texto = 'Olá, MariClin! Meu nome é ' + (nomeTutor || 'não informado') + '.';
    if(nomePet){ texto += ' Meu pet se chama ' + nomePet + '.'; }
    texto += ' Gostaria de agendar: ' + servico + ', na unidade de ' + cidade + '.';
    if(mensagem){ texto += ' Detalhes: ' + mensagem; }

    var url = 'https://wa.me/553499660026?text=' + encodeURIComponent(texto);
    window.open(url, '_blank');
  });
})();
