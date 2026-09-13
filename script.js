/* Tuamata — site behaviour.
   SITE CONFIG: set contactEmail before launch. Leave formEndpoint empty to use the
   visitor's mail client, or paste a Formspree/Netlify/Basin endpoint to post it. */
var SITE = {
  contactEmail: "",   // e.g. "partnerships@yourdomain.co.uk"
  formEndpoint: ""    // e.g. "https://formspree.io/f/xxxxxxx"
};

(function(){
  "use strict";
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('primaryNav');
  if (toggle && nav){
    toggle.addEventListener('click', function(){
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* Stats count-up. The final value is already in the HTML, so this is purely
     an enhancement — with reduced motion we leave the numbers alone. */
  if (!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)){
    document.querySelectorAll('.stat .num[data-to]').forEach(function(el){
      var target = parseInt(el.getAttribute('data-to'), 10);
      if (!target) return;
      var start = null, dur = 1100;
      el.textContent = '0';
      window.requestAnimationFrame(function step(ts){
        if (start === null) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) window.requestAnimationFrame(step); else el.textContent = target;
      });
    });
  }

  var slot = document.getElementById('contactEmailSlot');
  if (slot && SITE.contactEmail){
    slot.innerHTML = '<a href="mailto:' + SITE.contactEmail + '">' + SITE.contactEmail + '</a>';
  }

  /* A lazy image that never begins loading would otherwise sit as an empty
     panel, because onerror never fires. Nudge any straggler, then fall back. */
  window.setTimeout(function(){
    var imgs = document.querySelectorAll('figure img');
    for (var i = 0; i < imgs.length; i++){ if (!imgs[i].complete) imgs[i].loading = 'eager'; }
    window.setTimeout(function(){
      for (var j = 0; j < imgs.length; j++){
        if (imgs[j].complete && imgs[j].naturalWidth === 0){
          imgs[j].parentElement.classList.add('art-fallback');
        }
      }
    }, 1200);
  }, 1200);

  var form = document.getElementById('contactForm');
  if (!form) return;
  var note = document.getElementById('formNote');

  if (SITE.formEndpoint){
    form.setAttribute('action', SITE.formEndpoint);
    form.setAttribute('method', 'POST');
    return;
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var name = form.elements.name.value.trim();
    var org = form.elements.organisation.value.trim();
    var email = form.elements.email.value.trim();
    var msg = form.elements.message.value.trim();
    if (!name || !email || !msg){
      note.textContent = 'Please add your name, email, and enquiry.';
      note.className = 'form-note error'; return;
    }
    if (!SITE.contactEmail){
      note.textContent = 'Contact address not yet configured \u2014 set SITE.contactEmail in script.js.';
      note.className = 'form-note error'; return;
    }
    var body = 'Name: ' + name + '\nOrganisation: ' + (org || '\u2014') + '\nEmail: ' + email + '\n\n' + msg;
    window.location.href = 'mailto:' + SITE.contactEmail
      + '?subject=' + encodeURIComponent('Partnership enquiry \u2014 ' + (org || name))
      + '&body=' + encodeURIComponent(body);
    note.textContent = 'Opening your email client\u2026';
    note.className = 'form-note';
  });
})();
