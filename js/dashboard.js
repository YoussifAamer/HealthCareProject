/* =========================================================
   MediCare AI Platform — Dashboard Shared Logic
   Sidebar navigation, view switching, and reusable card
   renderers shared by the patient, doctor and admin panels.
   ========================================================= */

/* ----------  SIDEBAR + VIEW SWITCHING  ---------- */
let VIEW_TITLES = {};

function goView(name) {
  document.querySelectorAll('.dash-view').forEach(v => v.classList.remove('active'));
  const view = document.getElementById('view-' + name);
  if (view) view.classList.add('active');

  document.querySelectorAll('.side-link[data-view]').forEach(l =>
    l.classList.toggle('active', l.dataset.view === name));

  const titleEl = document.getElementById('topTitle');
  if (titleEl && VIEW_TITLES[name]) titleEl.textContent = VIEW_TITLES[name];

  /* Close mobile sidebar */
  const sb = document.getElementById('sidebar');
  const bd = document.getElementById('backdrop');
  if (sb) sb.classList.remove('open');
  if (bd) bd.classList.remove('show');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* Wire up sidebar links, mobile menu, profile dropdown */
function initDashNav(defaultTitle, titles) {
  VIEW_TITLES = titles || {};

  document.querySelectorAll('.side-link[data-view]').forEach(link => {
    link.addEventListener('click', () => goView(link.dataset.view));
  });

  /* Any element with data-goto switches view too */
  document.querySelectorAll('[data-goto]').forEach(el => {
    el.addEventListener('click', e => { e.preventDefault(); goView(el.dataset.goto); });
  });

  /* Mobile sidebar toggle */
  const menuBtn = document.getElementById('menuBtn');
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('backdrop');
  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', () => {
      sidebar.classList.add('open');
      if (backdrop) backdrop.classList.add('show');
    });
  }
  if (backdrop) {
    backdrop.addEventListener('click', () => {
      sidebar.classList.remove('open');
      backdrop.classList.remove('show');
    });
  }

  /* Profile dropdown */
  const chip = document.getElementById('profileChip');
  const drop = document.getElementById('profileDrop');
  if (chip && drop) {
    chip.addEventListener('click', e => {
      if (e.target.closest('.dropdown')) return;
      drop.classList.toggle('show');
    });
    document.addEventListener('click', e => {
      if (!chip.contains(e.target)) drop.classList.remove('show');
    });
  }
}

/* ----------  ACCORDION (idempotent)  ---------- */
function initAccordion(root) {
  const scope = root || document;
  scope.querySelectorAll('.faq-item').forEach(item => {
    if (item.dataset.bound) return;
    item.dataset.bound = '1';
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', () => {
      const open = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        const aa = i.querySelector('.faq-a'); if (aa) aa.style.maxHeight = null;
      });
      if (!open) { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });
}

/* ----------  CARD RENDERERS  ---------- */

/* Doctor card (with Book Now -> openBooking) */
function doctorCardHTML(d) {
  return `
  <div class="card entity-card">
    <div class="ec-banner" style="background:var(--grad-soft)"></div>
    <div class="avatar avatar-2 ${d.av || ''} ec-avatar" style="font-size:1.4rem">${initials(d.name)}</div>
    <div class="ec-body">
      <h3>${d.name}</h3>
      <p class="ec-spec">${d.specialty}</p>
      <div class="ec-meta">
        <span>${ICONS.pin} ${d.city}, ${d.country}</span>
        <span>${ICONS.clock} ${d.exp} yrs exp</span>
      </div>
      <div class="ec-meta">
        <span class="badge badge-blue">$${d.fee} / visit</span>
        <span class="badge badge-green">Available</span>
      </div>
      <div class="ec-foot">
        <span class="rating">${ICONS.star} ${d.rating}
          <span style="color:var(--muted);font-weight:500">(${d.reviews})</span></span>
        <button class="btn btn-primary btn-sm" onclick="openBooking(${d.id})">Book Now</button>
      </div>
    </div>
  </div>`;
}

/* Hospital card */
function hospitalCardHTML(h) {
  const status = h.status === 'open'
    ? '<span class="badge badge-green">Open Now</span>'
    : '<span class="badge badge-amber">Busy</span>';
  const emergency = h.emergency ? '<span class="badge badge-red">24/7 ER</span>' : '';
  return `
  <div class="card" style="padding:22px">
    <div style="display:flex;align-items:center;gap:13px;margin-bottom:14px">
      <div class="avatar ${h.av || ''}" style="width:50px;height:50px;border-radius:14px">${ICONS.hospital}</div>
      <div>
        <h3 style="font-size:1.05rem">${h.name}</h3>
        <p style="font-size:.84rem;color:var(--muted)">${h.city}, ${h.country}</p>
      </div>
    </div>
    <div class="ec-meta"><span>${ICONS.pin} ${h.address}</span></div>
    <div class="ec-meta"><span>${ICONS.phone} ${h.phone}</span><span>${ICONS.layout} ${h.beds} beds</span></div>
    <div style="display:flex;gap:7px;margin:6px 0 14px">${status} ${emergency}</div>
    <div class="ec-foot" style="padding-top:14px">
      <span class="rating">${ICONS.star} ${h.rating}</span>
      <span style="font-size:.84rem;color:var(--muted);font-weight:600">${h.city}</span>
    </div>
  </div>`;
}

/* Blood bank card */
function bloodCardHTML(b) {
  const types = ['A+','A-','B+','B-','O+','O-','AB+','AB-'];
  const chips = types.map(t => `<div class="blood-chip ${b.stock[t]}" title="${t}">${t}</div>`).join('');
  const emergency = b.emergency
    ? '<span class="badge badge-red">Emergency Service</span>'
    : '<span class="badge badge-blue">Standard Hours</span>';
  return `
  <div class="card" style="padding:22px">
    <div style="display:flex;align-items:center;gap:13px;margin-bottom:10px">
      <div class="avatar av-red" style="width:48px;height:48px;border-radius:13px">${ICONS.droplet}</div>
      <div>
        <h3 style="font-size:1.05rem">${b.name}</h3>
        <p style="font-size:.84rem;color:var(--muted)">${b.city}, ${b.country}</p>
      </div>
    </div>
    <div style="margin-bottom:8px">${emergency}</div>
    <div class="blood-types">${chips}</div>
    <div class="ec-foot" style="padding-top:12px">
      <span style="font-size:.84rem;color:var(--muted);font-weight:600">${ICONS.phone} ${b.phone}</span>
    </div>
  </div>`;
}

/* Disease accordion item */
function diseaseItemHTML(d) {
  return `
  <div class="faq-item">
    <div class="faq-q"><span>${d.name}</span><span class="pm">+</span></div>
    <div class="faq-a">
      <div style="padding:0 24px 22px">
        <p style="font-size:.78rem;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">Symptoms</p>
        <div class="symptom-tags" style="margin-bottom:14px">
          ${d.symptoms.map(s => `<span class="badge badge-blue">${s}</span>`).join('')}
        </div>
        <p style="font-size:.78rem;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">Treatment</p>
        <p style="color:var(--muted);font-size:.92rem">${d.treatment}</p>
      </div>
    </div>
  </div>`;
}

/* Herbal remedy card */
function herbalCardHTML(h) {
  return `
  <div class="card feature-card" style="padding:24px">
    <div class="f-ic">${ICONS[h.icon] || ICONS.leaf}</div>
    <h3 style="font-size:1.05rem">${h.name}</h3>
    <p style="font-size:.9rem">${h.use}</p>
  </div>`;
}