/* ============================================================
   LONG ISLAND DUNGEON MASTER — The Secret Engine
   A hidden Easter-egg / ARG layer. Self-contained, no deps.
   Progress persists in localStorage. Add eggs to the registry.
   Reset:  ?resetsecrets  in the URL, or  __lidmSecretsReset()
   ============================================================ */
(function () {
  'use strict';

  var KEY = 'lidm_secrets_v1';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- state ---------- */
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  var state = load();
  state.found = state.found || {};      // eggId -> true
  state.hunts = state.hunts || {};      // huntId -> { sigilId: true }
  state.unlocked = state.unlocked || {}; // rewardId -> true
  state.flags = state.flags || {};

  if (location.search.indexOf('resetsecrets') !== -1) {
    state = { found: {}, hunts: {}, unlocked: {}, flags: {} }; persist();
  }
  window.__lidmSecretsReset = function () { localStorage.removeItem(KEY); location.reload(); };

  /* ---------- registry ---------- */
  // Standalone eggs. (Hunts get added in later waves.)
  var EGGS = [
    { id: 'wizard',   name: 'Wizard Mode' },
    { id: 'vecna',    name: 'The Eye of Vecna' },
    { id: 'strahd',   name: 'Children of the Night' },
    { id: 'gygax',    name: 'Old-School Mode' },
    { id: 'nat20',    name: 'Critical Hit!' },
    { id: 'nat1',     name: 'Critical Fail!' },
    { id: 'theend',   name: 'The End… or is it?' },
    { id: 'midnight', name: 'The Witching Hour' },
    { id: 'crest',    name: 'The Sigil of the Master' }
  ];
  function eggName(id) { for (var i = 0; i < EGGS.length; i++) if (EGGS[i].id === id) return EGGS[i].name; return id; }
  function totalSecrets() { return EGGS.length; }
  function foundCount() { return Object.keys(state.found).length; }

  /* ---------- injected styles ---------- */
  var css = '\
  .sx-toast-wrap{position:fixed;left:50%;top:1.2rem;transform:translateX(-50%);z-index:100000;display:flex;flex-direction:column;gap:.5rem;align-items:center;pointer-events:none}\
  .sx-toast{background:rgba(26,0,0,.97);border:1px solid #c9a84c;border-radius:6px;color:#f2e8d0;font-family:"Merriweather Sans",sans-serif;font-size:.85rem;padding:.6rem 1rem;box-shadow:0 6px 24px rgba(0,0,0,.6);max-width:90vw;text-align:center;opacity:0;transform:translateY(-10px);transition:opacity .3s,transform .3s}\
  .sx-toast.in{opacity:1;transform:translateY(0)}\
  .sx-toast b{color:#c9a84c}\
  .sx-toast .sx-sub{display:block;color:rgba(255,255,255,.6);font-size:.72rem;margin-top:.15rem;font-style:italic}\
  .sx-tome{position:fixed;left:1.2rem;bottom:1.4rem;z-index:9999;width:52px;height:52px;border-radius:50%;background:#1a0000;color:#c9a84c;border:2px solid #c9a84c;font-size:1.3rem;cursor:pointer;display:none;align-items:center;justify-content:center;box-shadow:0 6px 20px rgba(0,0,0,.55);transition:transform .2s,background .2s,color .2s}\
  .sx-tome.show{display:flex;animation:sx-pop .5s ease}\
  .sx-tome:hover{background:#c9a84c;color:#3d0000;transform:translateY(-3px)}\
  .sx-tome .sx-badge{position:absolute;top:-6px;right:-6px;background:#8B0000;color:#e8d5a0;border:1px solid #c9a84c;border-radius:10px;font-size:.62rem;font-weight:700;font-family:"Merriweather Sans",sans-serif;padding:.05rem .35rem}\
  @keyframes sx-pop{0%{transform:scale(0) rotate(-30deg);opacity:0}70%{transform:scale(1.15) rotate(6deg)}100%{transform:scale(1);opacity:1}}\
  .sx-panel{position:fixed;inset:0;z-index:100001;background:rgba(0,0,0,.78);display:none;align-items:center;justify-content:center;padding:1.5rem}\
  .sx-panel.open{display:flex}\
  .sx-panel-card{background:#f2e8d0;color:#1a0a00;border:2px solid #c9a84c;border-radius:8px;box-shadow:0 0 0 4px rgba(139,0,0,.4),0 14px 44px rgba(0,0,0,.6);max-width:520px;width:100%;max-height:84vh;overflow:auto;padding:2rem}\
  .sx-panel-card h2{font-family:"Breathe Fire","UnifrakturMaguntia",cursive;color:#3d0000;font-size:2rem;margin:0 0 .2rem}\
  .sx-panel-card .sx-count{color:#6b5b45;font-style:italic;margin-bottom:1rem}\
  .sx-list{list-style:none;padding:0;margin:0 0 1rem}\
  .sx-list li{display:flex;align-items:center;gap:.6rem;padding:.4rem .2rem;border-bottom:1px solid rgba(139,0,0,.12);font-family:"Merriweather Sans",sans-serif;font-size:.9rem}\
  .sx-list li .sx-mark{width:1.4rem;text-align:center;color:#8B0000}\
  .sx-list li.locked{color:#9a8c72}.sx-list li.locked .sx-mark{color:#c2b18f}\
  .sx-hint{background:rgba(139,0,0,.06);border-left:3px solid #c9a84c;padding:.8rem 1rem;font-style:italic;color:#3d0000;border-radius:0 4px 4px 0;font-size:.9rem}\
  .sx-close{float:right;background:none;border:none;font-size:1.4rem;color:#8B0000;cursor:pointer;line-height:1}\
  .sx-flick{color:#c9a84c;cursor:pointer;animation:sx-flicker 4s infinite;text-decoration:none}\
  @keyframes sx-flicker{0%,18%,22%,100%{opacity:.25}20%,40%{opacity:1}45%{opacity:.4}}\
  body.sx-shake{animation:sx-shake .5s linear}\
  @keyframes sx-shake{10%{transform:translate(-4px,2px)}20%{transform:translate(5px,-3px)}30%{transform:translate(-6px,1px)}40%{transform:translate(4px,3px)}50%{transform:translate(-3px,-2px)}60%{transform:translate(5px,2px)}70%{transform:translate(-4px,-1px)}80%{transform:translate(3px,2px)}90%{transform:translate(-2px,-1px)}100%{transform:translate(0,0)}}\
  body.sx-warp{animation:sx-warp 1.4s ease}\
  @keyframes sx-warp{0%{filter:none}50%{filter:hue-rotate(180deg) saturate(2)}100%{filter:none}}\
  .sx-rain{position:fixed;top:-50px;z-index:99998;font-size:1.6rem;pointer-events:none;will-change:transform}\
  @keyframes sx-fall{to{transform:translateY(110vh) rotate(540deg)}}\
  .sx-overlay{position:fixed;inset:0;z-index:99997;pointer-events:none}\
  .sx-eye{position:fixed;inset:0;z-index:99998;display:flex;align-items:center;justify-content:center;pointer-events:none;font-size:min(40vw,360px);color:rgba(139,0,0,.85);text-shadow:0 0 50px rgba(139,0,0,.9);animation:sx-eye 2.6s ease forwards}\
  @keyframes sx-eye{0%{opacity:0;transform:scale(.4)}25%{opacity:1;transform:scale(1)}80%{opacity:1}100%{opacity:0;transform:scale(1.1)}}\
  .sx-bat{position:fixed;z-index:99998;font-size:1.5rem;pointer-events:none;color:#0a0202}\
  @keyframes sx-batfly{to{transform:translate(110vw,-30vh) rotate(20deg)}}\
  body.sx-tomb{filter:saturate(.4) sepia(.5) hue-rotate(50deg) contrast(1.1)}\
  body.sx-tomb::after{content:"";position:fixed;inset:0;z-index:99996;pointer-events:none;background:repeating-linear-gradient(0deg,rgba(0,40,0,.12),rgba(0,40,0,.12) 1px,transparent 2px,transparent 4px)}\
  body.sx-vampire::after{content:"";position:fixed;inset:0;z-index:1;pointer-events:none;background:radial-gradient(ellipse at center,transparent 40%,rgba(60,0,0,.5) 100%);mix-blend-mode:multiply}\
  @media (prefers-reduced-motion: reduce){.sx-flick{animation:none;opacity:.7}.sx-tome.show{animation:none}}\
  ';
  var st = document.createElement('style'); st.id = 'sx-styles'; st.textContent = css;
  document.head.appendChild(st);

  /* ---------- toast ---------- */
  var toastWrap;
  function toast(title, sub, ms) {
    if (!toastWrap) { toastWrap = document.createElement('div'); toastWrap.className = 'sx-toast-wrap'; document.body.appendChild(toastWrap); }
    var t = document.createElement('div'); t.className = 'sx-toast';
    t.innerHTML = '<b>' + title + '</b>' + (sub ? '<span class="sx-sub">' + sub + '</span>' : '');
    toastWrap.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('in'); });
    setTimeout(function () { t.classList.remove('in'); setTimeout(function () { t.remove(); }, 350); }, ms || 3400);
  }

  /* ---------- the Tome of Secrets ---------- */
  var tomeBtn, panel;
  function buildTome() {
    tomeBtn = document.createElement('button');
    tomeBtn.className = 'sx-tome'; tomeBtn.type = 'button';
    tomeBtn.setAttribute('aria-label', 'Open the Tome of Secrets');
    tomeBtn.innerHTML = '<i class="fas fa-book-skull" aria-hidden="true"></i><span class="sx-badge">0</span>';
    tomeBtn.addEventListener('click', openTome);
    document.body.appendChild(tomeBtn);
    if (foundCount() > 0) revealTome();
  }
  function revealTome() { if (tomeBtn) tomeBtn.classList.add('show'); updateBadge(); }
  function updateBadge() { if (tomeBtn) { var b = tomeBtn.querySelector('.sx-badge'); if (b) b.textContent = foundCount(); } }
  function openTome() {
    if (!panel) { panel = document.createElement('div'); panel.className = 'sx-panel'; panel.addEventListener('click', function (e) { if (e.target === panel) panel.classList.remove('open'); }); document.body.appendChild(panel); }
    var remaining = totalSecrets() - foundCount();
    var items = EGGS.map(function (e) {
      var got = !!state.found[e.id];
      return '<li class="' + (got ? '' : 'locked') + '"><span class="sx-mark">' + (got ? '✦' : '✧') + '</span>' + (got ? e.name : '<em>undiscovered secret</em>') + '</li>';
    }).join('');
    var hint = remaining > 0
      ? 'The realm still hides <b>' + remaining + '</b> secret' + (remaining === 1 ? '' : 's') + '. Look where the gold flickers, speak the names of the dead, and roll well.'
      : 'You have uncovered every secret the realm now holds. A true Initiate. More will come…';
    panel.innerHTML = '<div class="sx-panel-card"><button class="sx-close" aria-label="Close">&times;</button>' +
      '<h2>Tome of Secrets</h2><p class="sx-count">' + foundCount() + ' of ' + totalSecrets() + ' uncovered</p>' +
      '<ul class="sx-list">' + items + '</ul><p class="sx-hint">' + hint + '</p></div>';
    panel.querySelector('.sx-close').addEventListener('click', function () { panel.classList.remove('open'); });
    panel.classList.add('open');
  }

  /* ---------- discover ---------- */
  function discover(id) {
    if (state.found[id]) return false;
    state.found[id] = true; persist();
    var first = foundCount() === 1;
    toast('✦ Secret uncovered', eggName(id), 3600);
    revealTome();
    if (first) setTimeout(function () { toast('A Tome appears…', 'Your discoveries are now recorded. Seek the rest.', 4200); }, 1400);
    return true;
  }

  /* ---------- effects ---------- */
  function diceRain(n) {
    if (reduce) return;
    var faces = ['🎲', '⚄', '⚅', '⚀', '⚁', '⚂', '⚃'];
    for (var i = 0; i < (n || 28); i++) {
      (function () {
        var d = document.createElement('div'); d.className = 'sx-rain';
        d.textContent = faces[Math.floor(Math.random() * faces.length)];
        d.style.left = Math.random() * 100 + 'vw';
        var dur = 1.6 + Math.random() * 1.8;
        d.style.animation = 'sx-fall ' + dur + 's linear forwards';
        d.style.animationDelay = (Math.random() * 0.8) + 's';
        document.body.appendChild(d);
        setTimeout(function () { d.remove(); }, (dur + 1) * 1000);
      })();
    }
  }
  function wizardMode() {
    discover('wizard');
    if (reduce) { toast('🧙 Wizard Mode', 'The arcane stirs… (motion calmed for you)'); return; }
    document.body.classList.add('sx-shake', 'sx-warp');
    setTimeout(function () { document.body.classList.remove('sx-shake'); }, 600);
    setTimeout(function () { document.body.classList.remove('sx-warp'); }, 1500);
    diceRain(40);
    var d20 = document.getElementById('d20Btn'); if (d20) { d20.classList.add('rolling'); setTimeout(function () { d20.classList.remove('rolling'); }, 1600); }
    toast('🧙 WIZARD MODE', 'Reality bends to your whim.');
  }
  function eyeOfVecna() {
    discover('vecna');
    if (!reduce) { var e = document.createElement('div'); e.className = 'sx-eye'; e.textContent = '𓂀'; document.body.appendChild(e); setTimeout(function () { e.remove(); }, 2700); }
    toast('𓂀 The Eye opens', 'Vecna sees you.');
  }
  function childrenOfNight() {
    discover('strahd');
    if (!reduce) {
      for (var i = 0; i < 14; i++) (function () {
        var b = document.createElement('div'); b.className = 'sx-bat'; b.textContent = '🦇';
        b.style.left = '-40px'; b.style.top = (Math.random() * 80 + 5) + 'vh';
        var dur = 2 + Math.random() * 2.5;
        b.style.animation = 'sx-batfly ' + dur + 's linear forwards'; b.style.animationDelay = (Math.random() * 1.2) + 's';
        document.body.appendChild(b); setTimeout(function () { b.remove(); }, (dur + 1.5) * 1000);
      })();
    }
    toast('🦇 Children of the Night', '“Listen to them. What music they make.”');
  }
  function tombMode() {
    discover('gygax');
    document.body.classList.toggle('sx-tomb');
    var on = document.body.classList.contains('sx-tomb');
    toast('☠ Old-School Mode ' + (on ? 'ON' : 'OFF'), on ? 'Gary would be proud. Save vs. nostalgia.' : 'Back to the modern age.');
  }
  function confetti() {
    if (reduce) return;
    var colors = ['#c9a84c', '#e8d5a0', '#8B0000', '#f2e8d0'];
    for (var i = 0; i < 60; i++) (function () {
      var c = document.createElement('div'); c.className = 'sx-rain'; c.textContent = '★';
      c.style.color = colors[Math.floor(Math.random() * colors.length)];
      c.style.left = Math.random() * 100 + 'vw'; c.style.fontSize = (0.7 + Math.random()) + 'rem';
      var dur = 1.4 + Math.random() * 1.6; c.style.animation = 'sx-fall ' + dur + 's linear forwards';
      document.body.appendChild(c); setTimeout(function () { c.remove(); }, (dur + 1) * 1000);
    })();
  }

  /* ---------- the Gygaxian entry hint ---------- */
  var GYGAX_VERSE = 'Acererak whispers: “Here secrets sleep for the bold and the cursed. ' +
    'Go back to the start where the gold flickers faint — speak the names of the dead, roll true, and you may yet find what is hidden. The foolish find only dust.”';
  function plantHint() {
    // a faint flickering star in the footer copyright — the "start here" cue
    var foots = document.querySelectorAll('footer .small, .legal-foot');
    var host = foots && foots[0];
    if (!host) return;
    if (host.querySelector('.sx-flick')) return;
    var star = document.createElement('a');
    star.className = 'sx-flick'; star.href = 'javascript:void(0)'; star.title = '?'; star.setAttribute('aria-label', 'A faint sigil');
    star.innerHTML = ' ✦';
    star.addEventListener('click', function (ev) { ev.preventDefault(); toast('A whisper from the dark', GYGAX_VERSE, 8000); });
    host.appendChild(star);
  }

  /* ---------- triggers ---------- */
  function wireTriggers() {
    // Konami code -> Wizard Mode
    var KON = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    var kpos = 0;
    // keyword buffer
    var buf = '';
    document.addEventListener('keydown', function (e) {
      // konami
      var k = e.key;
      if (k === KON[kpos] || (k && k.toLowerCase() === KON[kpos])) { kpos++; if (kpos === KON.length) { kpos = 0; wizardMode(); } }
      else { kpos = (k === KON[0]) ? 1 : 0; }
      // keywords
      if (k && k.length === 1) {
        buf = (buf + k.toLowerCase()).slice(-8);
        if (buf.indexOf('vecna') !== -1) { buf = ''; eyeOfVecna(); }
        else if (buf.indexOf('strahd') !== -1) { buf = ''; childrenOfNight(); }
        else if (buf.indexOf('gygax') !== -1) { buf = ''; tombMode(); }
      }
    });

    // d20 rolls (event dispatched by index.html's roller)
    document.addEventListener('lidm:roll', function (e) {
      var n = e.detail;
      if (n === 20) { discover('nat20'); confetti(); toast('🎲 NATURAL 20', 'The dice gods smile. A sigil glimmers somewhere…'); }
      else if (n === 1) { discover('nat1'); if (!reduce) { document.body.classList.add('sx-shake'); setTimeout(function () { document.body.classList.remove('sx-shake'); }, 500); } toast('💀 NATURAL 1', 'The dice gods laugh. You hear distant mocking.'); }
    });

    // brand wordmark tapped 7x -> Wizard Mode (mobile-friendly)
    var brand = document.querySelector('.navbar-brand') || document.querySelector('.legal-brand');
    if (brand) { var taps = 0, tmr; brand.addEventListener('click', function () { taps++; clearTimeout(tmr); tmr = setTimeout(function () { taps = 0; }, 1600); if (taps >= 7) { taps = 0; discover('crest'); wizardMode(); } }); }

    // scroll to the very bottom
    var endDone = false;
    window.addEventListener('scroll', function () {
      if (endDone) return;
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 3) { endDone = true; discover('theend'); toast('You reach the end…', '…or do you? The realm keeps its secrets close.'); }
    }, { passive: true });

    // midnight / witching hour
    var h = new Date().getHours();
    if (h >= 23 || h < 1) { document.body.classList.add('sx-vampire'); if (!state.found['midnight']) setTimeout(function () { discover('midnight'); toast('🌒 The Witching Hour', 'You visit when the veil is thin. Strahd watches.'); }, 2500); }
  }

  /* ---------- boot ---------- */
  function boot() { buildTome(); plantHint(); wireTriggers(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
