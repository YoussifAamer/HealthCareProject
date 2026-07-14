/* =========================================================
   MediCare AI Platform — Appointment Booking System
   ========================================================= */

const TIME_SLOTS = [
  { t: '09:00 AM', taken: false }, { t: '10:30 AM', taken: false },
  { t: '11:15 AM', taken: true  }, { t: '12:00 PM', taken: false },
  { t: '01:30 PM', taken: false }, { t: '02:45 PM', taken: true  },
  { t: '04:00 PM', taken: false }, { t: '05:30 PM', taken: false }
];

let bookingState = { doctorId: null, date: '', time: '' };

// =========================================================
// خطة الـ 200 دكتور الإجبارية المحصنة ضد المسح أو الـ Override
// =========================================================
function expandDoctorsTo200() {
  if (!window.DB || !DB.doctors) return;
  
  if (DB.doctors.length >= 200) return;

  const regionalLocations = [
    { city: "Cairo", country: "Egypt" },
    { city: "Alexandria", country: "Egypt" },
    { city: "Giza", country: "Egypt" },
    { city: "Dubai", country: "UAE" },
    { city: "Abu Dhabi", country: "UAE" },
    { city: "Riyadh", country: "Saudi Arabia" },
    { city: "Jeddah", country: "Saudi Arabia" },
    { city: "New York", country: "USA" },
    { city: "Chicago", country: "USA" },
    { city: "London", country: "UK" },
    { city: "Manchester", country: "UK" }
  ];

  const firstNames = ["Fatima", "Omar", "Aisha", "Emily", "James", "Yusuf", "Sarah", "Ali", "John", "Khaled", "Mary", "Zainab", "Robert", "Layla", "Daniel", "Mona", "Hany"];
  const lastNames = ["Zahra", "Khalil", "Noor", "Stone", "Carter", "Rahman", "Smith", "Mansoor", "Davis", "Hassan", "Taylor", "Wright", "Fawzy", "King", "Adel"];
  const avatarClasses = ["av-red", "av-violet", "av-cyan", "av-amber", "av-green", ""];

  let currentId = DB.doctors.length + 1;

  while (DB.doctors.length < 200) {
    const spec = DB.specialties[Math.floor(Math.random() * DB.specialties.length)];
    const loc = regionalLocations[Math.floor(Math.random() * regionalLocations.length)];
    const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const av = avatarClasses[Math.floor(Math.random() * avatarClasses.length)];

    DB.doctors.push({
      id: currentId++,
      name: `Dr. ${fName} ${lName}`,
      specialty: spec,
      city: loc.city,
      country: loc.country,
      exp: Math.floor(Math.random() * 12) + 5, 
      fee: Math.floor(Math.random() * 60) + 30, 
      rating: (Math.random() * (5.0 - 4.5) + 4.5).toFixed(1),
      reviews: Math.floor(Math.random() * 250) + 80,
      av: av,
      bio: `Specialist in ${spec} with years of clinical experience.`,
      isBooked: false
    });
  }

  if (typeof render === 'function') {
    render();
  }
}

// التشغيل المتتابع لضمان تخطي أي سباق سرعة بين الملفات
expandDoctorsTo200();
document.addEventListener('DOMContentLoaded', expandDoctorsTo200);
window.addEventListener('load', () => {
  expandDoctorsTo200();
  setTimeout(() => {
    if(window.DB && DB.doctors && DB.doctors.length < 200) {
      expandDoctorsTo200();
    }
  }, 500);
});

function todayISO() {
  return new Date().toISOString().split('T')[0];
}

function openBooking(doctorId) {
  const doc = DB.doctors.find(d => d.id === doctorId);
  if (!doc) return;
  bookingState = { doctorId, date: '', time: '' };

  const body = document.getElementById('bookingBody');
  body.innerHTML = `
    <div class="doc-row" style="display:flex;align-items:center;gap:14px;margin-bottom:22px">
      <div class="avatar ${doc.av || ''}" style="width:56px;height:56px;border-radius:15px;font-size:1.2rem">${initials(doc.name)}</div>
      <div>
        <h4 style="font-size:1.05rem">${doc.name}</h4>
        <p style="font-size:.86rem;color:var(--muted)">${doc.specialty} · ${doc.city}, ${doc.country}</p>
      </div>
      <span class="badge badge-blue" style="margin-left:auto">$${doc.fee} / visit</span>
    </div>

    <div class="field">
      <label>Select Date</label>
      <input type="date" id="bkDate" min="${todayISO()}" value="${todayISO()}" />
    </div>

    <div class="field">
      <label>Select Time Slot</label>
      <div class="time-grid" id="bkSlots">
        ${TIME_SLOTS.map((s, i) => `
          <div class="time-slot ${s.taken ? 'taken' : ''}" data-slot="${i}">${s.t}</div>
        `).join('')}
      </div>
    </div>

    <div class="field">
      <label>Reason for Visit (optional)</label>
      <textarea class="field-area" id="bkReason" placeholder="Briefly describe your symptoms..." style="min-height:80px"></textarea>
    </div>

    <button class="btn btn-primary btn-block btn-lg" id="bkConfirm">
      ${ICONS.calendar} Confirm Appointment
    </button>
  `;

  const dateInput = document.getElementById('bkDate');
  bookingState.date = dateInput.value;
  dateInput.addEventListener('change', () => { bookingState.date = dateInput.value; });

  document.querySelectorAll('#bkSlots .time-slot').forEach(slot => {
    slot.addEventListener('click', () => {
      const idx = +slot.dataset.slot;
      if (TIME_SLOTS[idx].taken) return;
      document.querySelectorAll('#bkSlots .time-slot').forEach(s => s.classList.remove('sel'));
      slot.classList.add('sel');
      bookingState.time = TIME_SLOTS[idx].t;
    });
  });

  document.getElementById('bkConfirm').addEventListener('click', () => confirmBooking(doc));
  openModal('bookingModal');
}

function confirmBooking(doc) {
  if (!bookingState.date) { toast('Please choose a date for your appointment.', 'error'); return; }
  if (!bookingState.time) { toast('Please select an available time slot.', 'error'); return; }

  doc.isBooked = true;

  const niceDate = new Date(bookingState.date + 'T00:00:00')
    .toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  const body = document.getElementById('bookingBody');
  body.innerHTML = `
    <div style="text-align:center;padding:8px 0 4px">
      <div class="success-check">${ICONS.check}</div>
      <h3 style="font-size:1.3rem;margin-bottom:8px">Appointment Confirmed!</h3>
      <p style="color:var(--muted);font-size:.92rem;margin-bottom:22px">
        Your booking with ${doc.name} has been scheduled.
      </p>
      <div class="card" style="padding:18px;text-align:left;background:var(--bg-2);box-shadow:none">
        <div class="mini-stat" style="border-top:none;padding-top:0"><span>Doctor</span><strong>${doc.name}</strong></div>
        <div class="mini-stat"><span>Specialty</span><strong>${doc.specialty}</strong></div>
        <div class="mini-stat"><span>Date</span><strong>${niceDate}</strong></div>
        <div class="mini-stat"><span>Time</span><strong>${bookingState.time}</strong></div>
      </div>
      <button class="btn btn-primary btn-block" style="margin-top:20px" data-close-modal>Done</button>
    </div>
  `;
  
  if (typeof render === 'function') {
    render();
  }

  body.querySelector('[data-close-modal]').addEventListener('click', () => closeModal('bookingModal'));
  toast('Appointment booked successfully.', 'success', 'Confirmed');
}