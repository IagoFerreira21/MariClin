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

  // Farmácia: busca de produtos
  var farmaciaSearch = document.getElementById('farmaciaSearch');
  var farmaciaGrid, farmaciaEmpty, farmaciaCards;
  function filtrarFarmacia(termo){
    if(!farmaciaGrid) return;
    termo = termo.trim().toLowerCase();
    var visiveis = 0;
    farmaciaCards.forEach(function(card){
      var texto = card.textContent.toLowerCase();
      var mostrar = texto.indexOf(termo) !== -1;
      card.style.display = mostrar ? '' : 'none';
      if(mostrar){ visiveis++; }
    });
    farmaciaEmpty.hidden = visiveis !== 0;
  }
  if(farmaciaSearch){
    farmaciaGrid = document.getElementById('farmaciaGrid');
    farmaciaEmpty = document.getElementById('farmaciaEmpty');
    farmaciaCards = Array.from(farmaciaGrid.querySelectorAll('.farmacia-card'));
    farmaciaSearch.addEventListener('input', function(){
      filtrarFarmacia(farmaciaSearch.value);
    });
  }

  // Lupa flutuante na navegação -> abre, filtra e rola até a Farmácia
  var navSearchWrap = document.querySelector('.nav-search');
  var navSearchToggle = document.getElementById('navSearchToggle');
  var navSearchInput = document.getElementById('navSearchInput');
  if(navSearchWrap && navSearchToggle && navSearchInput){
    navSearchToggle.addEventListener('click', function(){
      var open = navSearchWrap.classList.toggle('open');
      navSearchToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if(open){ navSearchInput.focus(); }
    });
    navSearchInput.addEventListener('input', function(){
      var termo = navSearchInput.value;
      if(farmaciaSearch){ farmaciaSearch.value = termo; }
      filtrarFarmacia(termo);
    });
    navSearchInput.addEventListener('keydown', function(e){
      if(e.key === 'Enter'){
        e.preventDefault();
        var farmaciaSection = document.getElementById('farmacia');
        if(farmaciaSection){ farmaciaSection.scrollIntoView({ behavior:'smooth' }); }
      }
    });
  }

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

/* ============================================================
   PWA — service worker + instalação do app (Android e iOS)
   ============================================================ */
(function(){
  // 1) Registra o service worker (só funciona em https ou localhost)
  if('serviceWorker' in navigator){
    window.addEventListener('load', function(){
      navigator.serviceWorker.register('sw.js').catch(function(){ /* sem suporte: segue normal */ });
    });
  }

  var pill = document.getElementById('installPill');
  var pillMain = document.getElementById('installPillMain');
  var pillClose = document.getElementById('installPillClose');
  var modal = document.getElementById('installModal');
  var modalClose = document.getElementById('installClose');
  var installNow = document.getElementById('installNow');
  if(!pill || !modal) return;

  var tabs = modal.querySelectorAll('.install-tabs button');
  var panels = modal.querySelectorAll('.install-steps');
  var DISMISS_KEY = 'mariclin_install_dismissed';
  var DISMISS_DAYS = 7;
  var deferredPrompt = null;
  var lastFocus = null;

  var isStandalone = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
                     window.navigator.standalone === true;
  var isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) ||
              (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  // App já instalado e aberto pelo ícone: esconde tudo que fala em instalar
  if(isStandalone){
    document.documentElement.classList.add('is-installed');
    return;
  }

  function recentlyDismissed(){
    try{
      var t = parseInt(localStorage.getItem(DISMISS_KEY), 10);
      return t && (Date.now() - t) < DISMISS_DAYS * 86400000;
    }catch(e){ return false; }
  }
  function rememberDismiss(){
    try{ localStorage.setItem(DISMISS_KEY, String(Date.now())); }catch(e){}
  }

  function selectOS(os){
    tabs.forEach(function(b){
      var on = b.getAttribute('data-os') === os;
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    panels.forEach(function(p){ p.hidden = p.getAttribute('data-panel') !== os; });
  }
  tabs.forEach(function(b){
    b.addEventListener('click', function(){ selectOS(b.getAttribute('data-os')); });
  });

  function openModal(){
    lastFocus = document.activeElement;
    selectOS(isIOS ? 'ios' : 'android');
    installNow.hidden = !deferredPrompt;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    modalClose.focus();
  }
  function closeModal(){
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if(lastFocus && lastFocus.focus){ lastFocus.focus(); }
  }
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', function(e){ if(e.target === modal){ closeModal(); } });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && !modal.hidden){ closeModal(); }
  });

  function askInstall(){
    if(!deferredPrompt){ openModal(); return; }
    var p = deferredPrompt;
    deferredPrompt = null;
    p.prompt();
    p.userChoice.then(function(choice){
      if(choice && choice.outcome === 'accepted'){ pill.hidden = true; closeModal(); }
    });
  }

  // Android / Chrome / Edge: o navegador avisa que o site pode ser instalado
  window.addEventListener('beforeinstallprompt', function(e){
    e.preventDefault();
    deferredPrompt = e;
    if(!recentlyDismissed()){ pill.hidden = false; }
  });
  window.addEventListener('appinstalled', function(){
    deferredPrompt = null;
    pill.hidden = true;
    closeModal();
    document.documentElement.classList.add('is-installed');
  });

  // iPhone / iPad: não existe aviso automático, então mostramos o convite com as instruções
  if(isIOS && !recentlyDismissed()){
    setTimeout(function(){ pill.hidden = false; }, 4000);
  }

  pillMain.addEventListener('click', askInstall);
  pillClose.addEventListener('click', function(){ pill.hidden = true; rememberDismiss(); });
  installNow.addEventListener('click', askInstall);

  // Link "Instalar o app" no rodapé (qualquer navegador): abre as instruções
  document.querySelectorAll('[data-open-install]').forEach(function(a){
    a.addEventListener('click', function(e){ e.preventDefault(); openModal(); });
  });
})();
