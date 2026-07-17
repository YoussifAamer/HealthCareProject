/* =========================================================
   MediCare AI Platform — Reusable Components
   Injects the shared navbar and footer into inner pages.
   Usage: <body data-page="doctors"> ... place <div id="site-nav">
   and <div id="site-footer"> ... then call mountChrome().
   ========================================================= */

function mountChrome() {
  const page = document.body.dataset.page || '';
  const navLinks = [
    { id: 'home', label: '<span class="chip c-primary"><svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/></svg></span>Home', href: 'index.html' },
    { id: 'doctors', label: '<span class="chip c-primary"><svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3v6a4 4 0 0 0 8 0V3"/><circle cx="18" cy="16" r="3"/><path d="M10 9v3a6 6 0 0 0 6 6"/></svg></span>Doctors', href: 'doctors.html' },
    { id: 'hospitals', label: 'Hospitals', href: 'hospitals.html' },
    { id: 'blood', label: 'Blood Banks', href: 'blood-banks.html' },
    { id: 'ai', label: 'AI Analysis', href: 'ai-analysis.html' },
    { id: 'tips', label: 'Health Tips', href: 'health-tips.html' },
    { id: 'pharmacy', label: '⚕', href: 'Pharmacy/pharmacy.html' },
    { id: 'about', label: 'About', href: 'about.html' },
    { id: 'contact', label: 'Contact', href: 'contact.html' },
  ];

  /* ---- NAVBAR ---- */
  const navMount = document.getElementById('site-nav');
  if (navMount) {
    navMount.outerHTML = `
    <nav class="navbar">
      <div class="nav-inner">
        <a href="index.html" class="logo">
          <span class="mark">${ICONS.heart}</span> Medi<span>Care</span>
        </a>
        <ul class="nav-links">
          ${navLinks.map(l => `<li><a href="${l.href}" class="${l.id === page ? 'active' : ''}">${l.label}</a></li>`).join('')}
        </ul>
      </div>
    </nav>`;
  }

  /* ---- FOOTER ---- */
  const footMount = document.getElementById('site-footer');
  if (footMount) {
    footMount.outerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <a href="index.html" class="logo" style="color:#fff"><span class="mark">${ICONS.heart}</span> Medi<span>Care</span></a>
            <p>An AI-powered healthcare platform connecting patients, doctors and institutions for smarter, more accessible care.</p>
            <div class="socials">
              <a href="https://x.com/home" aria-label="Twitter" target="_blank">𝕏</a>
            </div>
          </div>
        <div>
          <h5>Platform</h5>
          <ul>
            <li><a href="doctors.html">Find Doctors</a></li>
            <li><a href="hospitals.html">Hospitals</a></li>
            <li><a href="blood-banks.html">Blood Banks</a></li>
            <li><a href="ai-analysis.html">AI Analysis</a></li>
          </ul>
        </div>
        <div>
          <h5>Company</h5>
          <ul>
            <li><a href="health-tips.html">Health Tips</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div>
          <h5>Another Sections</h5>
          <ul>
            <li><a href="pharmacy.html">Pharmacy</a></li>
            <li><a href="sos.html">SOS</a></li>
            <li><a href="add.html">Track Your Health</a></li>
            <li><a href="fbook.html">Fast Booking</a></li>
          </ul>
        </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 MediCare AI Platform. All rights reserved.</span>
          <span>Built as a competition project · Frontend demo · Privacy · Terms</span>
        </div>
      </div>
    </footer>`;
  }

  initNavbar();
}
