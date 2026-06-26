/* =========================================================
   MediCare AI Platform — Reusable Components
   Injects the shared navbar and footer into inner pages.
   Usage: <body data-page="doctors"> ... place <div id="site-nav">
   and <div id="site-footer"> ... then call mountChrome().
   ========================================================= */

function mountChrome() {
  const page = document.body.dataset.page || '';
  const navLinks = [
    { id: 'home', label: 'Home', href: 'index.html' },
    { id: 'doctors', label: 'Doctors', href: 'doctors.html' },
    { id: 'hospitals', label: 'Hospitals', href: 'hospitals.html' },
    { id: 'blood', label: 'Blood Banks', href: 'blood-banks.html' },
    { id: 'ai', label: 'AI Analysis', href: 'ai-analysis.html' },
    { id: 'tips', label: 'Health Tips', href: 'health-tips.html' },
    { id: 'about', label: 'About', href: 'about.html' },
    { id: 'contact', label: 'Contact', href: 'contact.html' },
    { id: 'pharmacy', label: '⚕', href: 'Pharmacy/pharmacy.html' },
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
        <div class="nav-actions">
          <a href="login.html" class="btn btn-ghost btn-sm">Login</a>
          <a href="signup.html" class="btn btn-primary btn-sm">Sign Up</a>
          <button class="nav-toggle" aria-label="Menu"><span></span><span></span><span></span></button>
        </div>
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
              <a href="#" aria-label="Twitter">𝕏</a>
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Instagram">◎</a>
              <a href="#" aria-label="LinkedIn">in</a>
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
              <li><a href="about.html">About Us</a></li>
              <li><a href="health-tips.html">Health Tips</a></li>
              <li><a href="contact.html">Contact</a></li>
              <li><a href="signup.html">Careers</a></li>
            </ul>
          </div>
          <div>
            <h5>Account</h5>
            <ul>
              <li><a href="login.html">Login</a></li>
              <li><a href="signup.html">Sign Up</a></li>
              <li><a href="patient-dashboard.html">Patient Portal</a></li>
              <li><a href="doctor-dashboard.html">Doctor Portal</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 MediCare AI Platform. All rights reserved.</span>
          <a href="Fast/fbook.html" class="btn btn-primary btn-sm">Fast Book</a>
          <span>Built as a competition project · Frontend demo · Privacy · Terms</span>
        </div>
      </div>
    </footer>`;
  }

  initNavbar();
}
