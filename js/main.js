/* =========================================================
   MediCare AI Platform — Core Script (shared across pages)
   ========================================================= */

/* ----------  ICON LIBRARY (inline SVG)  ---------- */
const ICONS = {
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0016.5 3c-1.7 0-3 .8-4.5 2.5C10.5 3.8 9.2 3 7.5 3A5.5 5.5 0 002 8.5c0 2.3 1.5 4 3 5.5l7 7Z"/></svg>',
  brain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 007 4.5v.6A3 3 0 005 8a3 3 0 00.5 1.7A3 3 0 005 14a3 3 0 002 2.8V18a2.5 2.5 0 005 0V4.5A2.5 2.5 0 009.5 2ZM14.5 2A2.5 2.5 0 0117 4.5v.6A3 3 0 0119 8a3 3 0 01-.5 1.7A3 3 0 0119 14a3 3 0 01-2 2.8V18a2.5 2.5 0 01-5 0"/></svg>',
  leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 019.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8a10 10 0 01-10 10Z"/><path d="M2 21c0-3 1.8-5.7 5.5-7"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6.4 6.4 0 009 9 9 9 0 11-9-9Z"/></svg>',
  activity: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>',
  sparkle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9Z"/><path d="M19 3v3M5 18v3M20.5 19.5h-3"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.9 21l1.2-6.8-5-4.9 6.9-1Z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.7A2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 2 .7 2.9a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.5c.9.3 1.9.6 2.9.7a2 2 0 011.7 2Z"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 01-3.4 0"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2 21c0-3.5 3-5.5 7-5.5s7 2 7 5.5"/><path d="M16 5a3.5 3.5 0 010 7M22 21c0-3-1.8-4.8-5-5.3"/></svg>',
  stethoscope: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 3v6a5 5 0 0010 0V3"/><path d="M4 3H2M14 3h-2M9 19a4 4 0 008 0v-3"/><circle cx="20" cy="13" r="2.5"/></svg>',
  hospital: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16"/><path d="M12 7v6M9 10h6M9 21v-4h6v4"/></svg>',
  droplet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5S5 10 5 14.5a7 7 0 0014 0C19 10 12 2.5 12 2.5Z"/></svg>',
  robot: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 8V4M9 4h6"/><circle cx="9" cy="14" r="1.4" fill="currentColor"/><circle cx="15" cy="14" r="1.4" fill="currentColor"/><path d="M2 13v3M22 13v3"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><rect x="7" y="11" width="3" height="6"/><rect x="13" y="7" width="3" height="10"/><rect x="19" y="4" width="0" height="13"/></svg>',
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><path d="M7 9l5-5 5 5M12 4v12"/></svg>',
  doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8Z"/><path d="M14 2v6h6M9 13h6M9 17h6"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.6 1.6 0 00-1.8-.3 1.6 1.6 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.6 1.6 0 00-1-1.5 1.6 1.6 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.6 1.6 0 00.3-1.8 1.6 1.6 0 00-1.5-1H3a2 2 0 110-4h.1a1.6 1.6 0 001.5-1 1.6 1.6 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.6 1.6 0 001.8.3H9a1.6 1.6 0 001-1.5V3a2 2 0 114 0v.1a1.6 1.6 0 001 1.5 1.6 1.6 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.6 1.6 0 00-.3 1.8V9a1.6 1.6 0 001.5 1H21a2 2 0 110 4h-.1a1.6 1.6 0 00-1.5 1Z"/></svg>',
  logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.8 2.8 0 014 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>',
  send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4Z"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>',
  layout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
  warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0Z"/><path d="M12 9v4M12 17h0"/></svg>',
  pill: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.5 20.5a5 5 0 01-7-7l6-6a5 5 0 017 7Z"/><path d="M8.5 8.5l7 7"/></svg>',
  apple: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7c0-2 1.5-4 4-4 0 2.5-2 4-4 4Z"/><path d="M12 7c-3-2-8-1-8 5 0 5 3 9 5 9 1 0 1.5-1 3-1s2 1 3 1c2 0 5-4 5-9 0-3-2-4.5-4-4.7"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 6l10 7L22 6"/></svg>'
};

/* ----------  HELPERS  ---------- */
function $(s, ctx = document) { return ctx.querySelector(s); }
function $$(s, ctx = document) { return [...ctx.querySelectorAll(s)]; }
function initials(name) {
  return name.replace('Dr. ', '').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
}

/* ----------  NAVBAR  ---------- */
function initNavbar() {
  const nav = $('.navbar');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    });
  }
  const toggle = $('.nav-toggle');
  const links = $('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });
    $$('.nav-links a').forEach(a => a.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
    }));
  }
}

/* ----------  SCROLL REVEAL  ---------- */
function initReveal() {
  const els = $$('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}

/* ----------  FAQ ACCORDION  ---------- */
function initFAQ() {
  $$('.faq-item').forEach(item => {
    const q = $('.faq-q', item);
    const a = $('.faq-a', item);
    if (!q || !a) return;
    q.addEventListener('click', () => {
      const open = item.classList.contains('open');
      $$('.faq-item').forEach(i => {
        i.classList.remove('open');
        const aa = $('.faq-a', i); if (aa) aa.style.maxHeight = null;
      });
      if (!open) { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });
}

/* ----------  TOAST NOTIFICATIONS  ---------- */
function toast(message, type = 'info', title = null) {
  let stack = $('.toast-stack');
  if (!stack) {
    stack = document.createElement('div');
    stack.className = 'toast-stack';
    document.body.appendChild(stack);
  }
  const titles = { success: 'Success', error: 'Error', info: 'Notice' };
  const icons = { success: ICONS.check, error: ICONS.warning, info: ICONS.bell };
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `
    <div class="t-ic">${icons[type]}</div>
    <div><strong>${title || titles[type]}</strong><span>${message}</span></div>`;
  stack.appendChild(el);
  setTimeout(() => {
    el.classList.add('out');
    setTimeout(() => el.remove(), 320);
  }, 3600);
}

/* ----------  MODAL  ---------- */
function openModal(id) {
  const m = $('#' + id);
  if (m) { m.classList.add('show'); document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
  const m = id ? $('#' + id) : $('.modal-overlay.show');
  if (m) { m.classList.remove('show'); document.body.style.overflow = ''; }
}
function initModals() {
  $$('.modal-overlay').forEach(ov => {
    ov.addEventListener('click', e => { if (e.target === ov) closeModal(ov.id); });
  });
  $$('[data-close-modal]').forEach(b => b.addEventListener('click', () => closeModal()));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

/* ----------  CHATBOT FAB  ---------- */
const CHAT_REPLIES = [
  "I can help you find a doctor, hospital, or blood bank. What do you need?",
  "For symptom questions, our AI Analysis page gives educational insights — but always confirm with a doctor.",
  "To book an appointment, open the Doctors page and pick a specialist that fits your needs.",
  "In an emergency, please call your local emergency number immediately. I can also show nearby hospitals.",
  "Great question! You can read more in our Health Tips section, written by verified doctors."
];
function initChatbot() {
  const fab = $('#chatFab');
  const win = $('#chatWindow');
  if (!fab || !win) return;
  fab.addEventListener('click', () => win.classList.toggle('show'));
  const close = $('#chatClose', win);
  if (close) close.addEventListener('click', () => win.classList.remove('show'));
  const input = $('#chatInput', win);
  const body = $('#chatBody', win);
  const sendBtn = $('#chatSend', win);
  let turn = 0;
  function send() {
    const text = input.value.trim();
    if (!text) return;
    const u = document.createElement('div');
    u.className = 'chat-msg user'; u.textContent = text;
    body.appendChild(u);
    input.value = '';
    body.scrollTop = body.scrollHeight;
    setTimeout(() => {
      const b = document.createElement('div');
      b.className = 'chat-msg bot';
      b.textContent = CHAT_REPLIES[turn % CHAT_REPLIES.length];
      body.appendChild(b);
      body.scrollTop = body.scrollHeight;
      turn++;
    }, 650);
  }
  if (sendBtn) sendBtn.addEventListener('click', send);
  if (input) input.addEventListener('keydown', e => { if (e.key === 'Enter') send(); });
}

/* ----------  CHATBOT MARKUP INJECTION  ---------- */
function mountChatbot() {
  if ($('#chatFab')) return;
  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <div class="chat-window" id="chatWindow">
      <div class="chat-head">
        <div class="ch-av">${ICONS.robot}</div>
        <div><h4>MediCare Assistant</h4><span>Online now</span></div>
        <button id="chatClose" style="margin-left:auto;background:none;color:#fff;font-size:1.3rem">&times;</button>
      </div>
      <div class="chat-body" id="chatBody">
        <div class="chat-msg bot">Hi! 👋 I'm your MediCare assistant. How can I help you stay healthy today?</div>
      </div>
      <div class="chat-input">
        <input id="chatInput" placeholder="Type a message..." />
        <button id="chatSend">${ICONS.send}</button>
      </div>
    </div>
    <button class="fab" id="chatFab" aria-label="Open chat assistant">${ICONS.robot}</button>`;
  document.body.appendChild(wrap);
  initChatbot();
}

/* ----------  AUTH SESSION (localStorage-free, in-memory + sessionStorage)  ---------- */
const Session = {
  set(user) { try { sessionStorage.setItem('mc_user', JSON.stringify(user)); } catch (e) {} },
  get() { try { return JSON.parse(sessionStorage.getItem('mc_user')); } catch (e) { return null; } },
  clear() { try { sessionStorage.removeItem('mc_user'); } catch (e) {} }
};

/* ----------  PARALLAX FLOAT BADGES (subtle)  ---------- */
function initParallax() {
  const badges = $$('.float-badge');
  if (!badges.length) return;
  window.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5);
    const y = (e.clientY / window.innerHeight - 0.5);
    badges.forEach((b, i) => {
      const d = (i + 1) * 12;
      b.style.transform += '';
    });
  });
}

/* ----------  COUNTER ANIMATION  ---------- */
function animateCounters() {
  $$('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const dur = 1400;
    let start = null;
    function step(ts) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      el.textContent = (Number.isInteger(target) ? Math.round(val) : val.toFixed(1)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    const obs = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) { requestAnimationFrame(step); obs.unobserve(el); } });
    }, { threshold: 0.4 });
    obs.observe(el);
  });
}

/* ----------  INIT ALL  ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initReveal();
  initFAQ();
  initModals();
  animateCounters();
  if (!document.body.classList.contains('no-chatbot')) mountChatbot();
});
