/* ============================================================
   LONG ISLAND DUNGEON MASTER — The Herald's Nudge
   One tasteful, dismissible Substack bar. Appears at 60% scroll
   depth; dismissal (or clicking through) is remembered in
   localStorage. Never included on ARG/reward pages — and it
   guards against them anyway. Self-contained, no deps.
   ============================================================ */
(function () {
  'use strict';

  var KEY = 'lidm_nudge_v1';
  var SUB = 'https://longislanddungeonmaster.substack.com';

  try { if (localStorage.getItem(KEY)) return; } catch (e) {}
  if (/vault|scroll/i.test(location.pathname)) return; // ARG/reward pages: never

  var css = '\
  .lidm-nudge{position:fixed;left:0;right:0;bottom:0;z-index:99990;background:linear-gradient(180deg,rgba(26,0,0,.97),rgba(61,0,0,.97));border-top:2px solid #c9a84c;box-shadow:0 -6px 24px rgba(0,0,0,.55);padding:.75rem 3rem .75rem 1rem;display:flex;align-items:center;justify-content:center;gap:1rem;flex-wrap:wrap;transform:translateY(110%);transition:transform .45s ease}\
  .lidm-nudge.in{transform:translateY(0)}\
  .lidm-nudge p{margin:0;color:#f2e8d0;font-family:"Merriweather Sans",sans-serif;font-size:.88rem;text-align:center}\
  .lidm-nudge p b{color:#c9a84c}\
  .lidm-nudge .lidm-nudge-cta{display:inline-block;background:#8B0000;color:#e8d5a0;border:1px solid #c9a84c;border-radius:4px;font-family:"Merriweather Sans",sans-serif;font-size:.85rem;font-weight:700;letter-spacing:.5px;padding:.45rem 1rem;text-decoration:none;white-space:nowrap}\
  .lidm-nudge .lidm-nudge-cta:hover,.lidm-nudge .lidm-nudge-cta:focus{background:#a51111;color:#f2e8d0}\
  .lidm-nudge .lidm-nudge-x{position:absolute;right:.6rem;top:50%;transform:translateY(-50%);background:none;border:none;color:rgba(242,232,208,.65);font-size:1.35rem;line-height:1;cursor:pointer;padding:.3rem .5rem}\
  .lidm-nudge .lidm-nudge-x:hover,.lidm-nudge .lidm-nudge-x:focus{color:#c9a84c}\
  body.lidm-nudge-open .sx-tome{bottom:5.6rem}\
  body.lidm-nudge-open #d20Btn{bottom:5.6rem}\
  @media (max-width:600px){.lidm-nudge{padding:.65rem 2.6rem .65rem .8rem;gap:.6rem}.lidm-nudge p{font-size:.8rem}}\
  @media (prefers-reduced-motion: reduce){.lidm-nudge{transition:none}}\
  ';
  var st = document.createElement('style');
  st.id = 'lidm-nudge-styles';
  st.textContent = css;
  document.head.appendChild(st);

  var bar, shown = false;

  function remember() { try { localStorage.setItem(KEY, '1'); } catch (e) {} }
  function dismiss() {
    remember();
    if (bar) { bar.classList.remove('in'); setTimeout(function () { bar.remove(); }, 500); }
    document.body.classList.remove('lidm-nudge-open');
  }

  function show() {
    if (shown) return;
    shown = true;
    bar = document.createElement('div');
    bar.className = 'lidm-nudge';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'The Weekly One-Shot newsletter');
    bar.innerHTML =
      '<p><b>The Weekly One-Shot</b> &mdash; a ready-to-run adventure in your inbox, every week. Free.</p>' +
      '<a class="lidm-nudge-cta" href="' + SUB + '" target="_blank" rel="noopener">Join the List &rarr;</a>' +
      '<button class="lidm-nudge-x" type="button" aria-label="Dismiss">&times;</button>';
    bar.querySelector('.lidm-nudge-x').addEventListener('click', dismiss);
    bar.querySelector('.lidm-nudge-cta').addEventListener('click', remember);
    document.body.appendChild(bar);
    document.body.classList.add('lidm-nudge-open');
    requestAnimationFrame(function () { bar.classList.add('in'); });
  }

  function check() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    if (max <= 0) return;
    if ((window.scrollY || doc.scrollTop || 0) / max >= 0.6) {
      window.removeEventListener('scroll', check);
      show();
    }
  }
  window.addEventListener('scroll', check, { passive: true });
})();
