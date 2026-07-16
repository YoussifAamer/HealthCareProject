/* =========================================================
   MediCare AI Platform — Mock Data
   Acts as a fake JSON database. A real ASP.NET Core backend
   would later replace this with API responses.
   ========================================================= */

const DB = {

  /* ----- Doctors ----- */
  doctors: [
    { id: 1, name: "Dr. Layla Hassan", specialty: "Cardiology", country: "Egypt",
      city: "Cairo", rating: 4.9, reviews: 312, fee: 45, exp: 14, av: "av-red",
      bio: "Interventional cardiologist focused on preventive heart care." },
    { id: 2, name: "Dr. Omar Khalil", specialty: "Neurology", country: "UAE",
      city: "Dubai", rating: 4.8, reviews: 248, fee: 70, exp: 11, av: "av-violet",
      bio: "Specialist in stroke management and neuro-rehabilitation." },
    { id: 3, name: "Dr. Sara Mansour", specialty: "Pediatrics", country: "Egypt",
      city: "Alexandria", rating: 5.0, reviews: 401, fee: 30, exp: 9, av: "av-cyan",
      bio: "Child health expert with a gentle, family-first approach." },
    { id: 4, name: "Dr. James Carter", specialty: "Dermatology", country: "USA",
      city: "New York", rating: 4.7, reviews: 189, fee: 90, exp: 16, av: "av-amber",
      bio: "Treats skin conditions and offers cosmetic dermatology." },
    { id: 5, name: "Dr. Aisha Noor", specialty: "Orthopedics", country: "Saudi Arabia",
      city: "Riyadh", rating: 4.8, reviews: 276, fee: 60, exp: 13, av: "av-green",
      bio: "Joint replacement and sports injury surgeon." },
    { id: 6, name: "Dr. Daniel Wright", specialty: "Cardiology", country: "UK",
      city: "London", rating: 4.6, reviews: 154, fee: 85, exp: 10, av: "" },
    { id: 7, name: "Dr. Mona Adel", specialty: "Gynecology", country: "Egypt",
      city: "Giza", rating: 4.9, reviews: 333, fee: 40, exp: 12, av: "av-violet",
      bio: "Women's health, prenatal care and minimally invasive surgery." },
    { id: 8, name: "Dr. Yusuf Rahman", specialty: "Neurology", country: "Saudi Arabia",
      city: "Jeddah", rating: 4.7, reviews: 198, fee: 65, exp: 15, av: "av-cyan",
      bio: "Headache, epilepsy and movement disorder specialist." },
    { id: 9, name: "Dr. Emily Stone", specialty: "Pediatrics", country: "USA",
      city: "Chicago", rating: 4.8, reviews: 221, fee: 75, exp: 8, av: "av-amber" },
    { id: 10, name: "Dr. Hany Fawzy", specialty: "Dermatology", country: "Egypt",
      city: "Cairo", rating: 4.6, reviews: 142, fee: 35, exp: 7, av: "av-red" },
    { id: 11, name: "Dr. Fatima Zahra", specialty: "Orthopedics", country: "UAE",
      city: "Abu Dhabi", rating: 4.9, reviews: 288, fee: 80, exp: 17, av: "av-green" },
    { id: 12, name: "Dr. Robert King", specialty: "Gynecology", country: "UK",
      city: "Manchester", rating: 4.5, reviews: 119, fee: 78, exp: 9, av: "" }
  ],

  specialties: ["Cardiology", "Neurology", "Pediatrics", "Dermatology", "Orthopedics", "Gynecology"],
  countries: ["Egypt", "UAE", "Saudi Arabia", "USA", "UK"],

  /* ----- Hospitals ----- */
  hospitals: [
    { id: 1, name: "Nile Medical Center", city: "Cairo", country: "Egypt",
      address: "12 Tahrir Square, Downtown Cairo", phone: "+20 2 1234 5678",
      beds: 420, status: "open", emergency: true, rating: 4.7, av: "av-cyan" },
    { id: 2, name: "Gulf Health Hospital", city: "Dubai", country: "UAE",
      address: "Sheikh Zayed Road, Dubai", phone: "+971 4 987 6543",
      beds: 610, status: "open", emergency: true, rating: 4.9, av: "av-violet" },
    { id: 3, name: "Alexandria Care Clinic", city: "Alexandria", country: "Egypt",
      address: "Corniche Road, Alexandria", phone: "+20 3 555 2211",
      beds: 180, status: "busy", emergency: false, rating: 4.4, av: "av-amber" },
    { id: 4, name: "Riyadh Specialist Hospital", city: "Riyadh", country: "Saudi Arabia",
      address: "King Fahd Road, Riyadh", phone: "+966 11 444 7788",
      beds: 530, status: "open", emergency: true, rating: 4.8, av: "av-green" },
    { id: 5, name: "Metropolitan General", city: "New York", country: "USA",
      address: "5th Avenue, Manhattan", phone: "+1 212 333 9090",
      beds: 720, status: "open", emergency: true, rating: 4.6, av: "av-red" },
    { id: 6, name: "Royal London Infirmary", city: "London", country: "UK",
      address: "Whitechapel Road, London", phone: "+44 20 7000 1111",
      beds: 480, status: "busy", emergency: true, rating: 4.5, av: "" }
  ],

  /* ----- Blood banks ----- */
  bloodBanks: [
    { id: 1, name: "Cairo Central Blood Bank", city: "Cairo", country: "Egypt",
      phone: "+20 2 1900 0001", emergency: true,
      stock: { "A+": "avail", "A-": "low", "B+": "avail", "B-": "out",
               "O+": "avail", "O-": "low", "AB+": "avail", "AB-": "out" } },
    { id: 2, name: "Dubai LifeStream Center", city: "Dubai", country: "UAE",
      phone: "+971 4 200 0002", emergency: true,
      stock: { "A+": "avail", "A-": "avail", "B+": "avail", "B-": "low",
               "O+": "avail", "O-": "avail", "AB+": "low", "AB-": "low" } },
    { id: 3, name: "Alexandria Donor Hub", city: "Alexandria", country: "Egypt",
      phone: "+20 3 700 0003", emergency: false,
      stock: { "A+": "low", "A-": "out", "B+": "avail", "B-": "out",
               "O+": "low", "O-": "out", "AB+": "avail", "AB-": "out" } },
    { id: 4, name: "Riyadh Blood Services", city: "Riyadh", country: "Saudi Arabia",
      phone: "+966 11 600 0004", emergency: true,
      stock: { "A+": "avail", "A-": "low", "B+": "low", "B-": "avail",
               "O+": "avail", "O-": "low", "AB+": "out", "AB-": "avail" } }
  ],

  /* ----- Health tips / articles ----- */
  healthTips: [
    { id: 1, cat: "Heart Health", icon: "heart", color: "av-red",
      title: "5 Habits for a Stronger Heart",
      excerpt: "Simple daily routines — from walking to sleep — that protect cardiovascular health.",
      read: "4 min", author: "Dr. Layla Hassan" },
    { id: 2, cat: "Nutrition", icon: "leaf", color: "av-green",
      title: "Eating Well on a Busy Schedule",
      excerpt: "Practical meal-prep ideas to keep nutrition on track even during hectic weeks.",
      read: "6 min", author: "Dr. Sara Mansour" },
    { id: 3, cat: "Mental Health", icon: "brain", color: "av-violet",
      title: "Managing Stress in Daily Life",
      excerpt: "Evidence-based techniques to lower stress and improve emotional balance.",
      read: "5 min", author: "Dr. Omar Khalil" },
    { id: 4, cat: "Sleep", icon: "moon", color: "av-cyan",
      title: "The Science of Better Sleep",
      excerpt: "How sleep cycles work and what you can change tonight for deeper rest.",
      read: "7 min", author: "Dr. Yusuf Rahman" },
    { id: 5, cat: "Fitness", icon: "activity", color: "av-amber",
      title: "Home Workouts That Actually Work",
      excerpt: "No equipment, no gym — a balanced routine you can do in 20 minutes.",
      read: "5 min", author: "Dr. Aisha Noor" },
    { id: 6, cat: "Prevention", icon: "shield", color: "",
      title: "Checkups You Shouldn't Skip",
      excerpt: "A guide to preventive screenings by age and why early detection matters.",
      read: "8 min", author: "Dr. Mona Adel" }
  ],

  /* ----- Diseases ----- */
  diseases: [
    { id: 1, name: "Hypertension (High Blood Pressure)",
      symptoms: ["Headaches", "Dizziness", "Blurred vision", "Chest discomfort"],
      treatment: "Lifestyle changes including reduced salt intake, regular exercise, and stress management. Doctors may prescribe medication to keep blood pressure within a healthy range. Regular monitoring is essential." },
    { id: 2, name: "Type 2 Diabetes",
      symptoms: ["Frequent urination", "Excessive thirst", "Fatigue", "Slow healing"],
      treatment: "Managed through balanced nutrition, weight control, and physical activity. Blood sugar monitoring and prescribed medication help maintain stable glucose levels over time." },
    { id: 3, name: "Asthma",
      symptoms: ["Shortness of breath", "Wheezing", "Coughing", "Chest tightness"],
      treatment: "Controlled with inhalers and avoidance of triggers such as dust and smoke. An action plan from your doctor helps manage flare-ups and maintain healthy lung function." },
    { id: 4, name: "Migraine",
      symptoms: ["Intense headache", "Nausea", "Light sensitivity", "Visual aura"],
      treatment: "Identifying and avoiding triggers, maintaining regular sleep, and staying hydrated. Both preventive and pain-relief medications may be recommended by a neurologist." },
    { id: 5, name: "Anemia",
      symptoms: ["Tiredness", "Pale skin", "Cold hands", "Irregular heartbeat"],
      treatment: "Often addressed with iron-rich foods and supplements. The underlying cause is investigated so treatment can be tailored — diet adjustments usually help significantly." }
  ],

  /* ----- Herbal remedies ----- */
  herbal: [
    { id: 1, name: "Ginger", use: "Eases nausea, supports digestion, and reduces mild inflammation.",
      icon: "leaf", color: "av-green" },
    { id: 2, name: "Chamomile", use: "Promotes relaxation and may improve sleep quality.",
      icon: "moon", color: "av-cyan" },
    { id: 3, name: "Turmeric", use: "Contains curcumin, known for anti-inflammatory properties.",
      icon: "sparkle", color: "av-amber" },
    { id: 4, name: "Peppermint", use: "Soothes digestive discomfort and helps relieve tension headaches.",
      icon: "leaf", color: "av-violet" },
    { id: 5, name: "Garlic", use: "Traditionally used to support heart health and immunity.",
      icon: "heart", color: "av-red" },
    { id: 6, name: "Honey", use: "Natural soother for sore throats and mild coughs.",
      icon: "sparkle", color: "av-amber" }
  ],

  /* ----- Appointments (patient view) ----- */
  appointments: [
    { id: 1, doctor: "Dr. Layla Hassan", specialty: "Cardiology", day: "18", mon: "Jun",
      time: "10:30 AM", status: "Confirmed" },
    { id: 2, doctor: "Dr. Sara Mansour", specialty: "Pediatrics", day: "22", mon: "Jun",
      time: "02:00 PM", status: "Pending" },
    { id: 3, doctor: "Dr. Omar Khalil", specialty: "Neurology", day: "29", mon: "Jun",
      time: "11:15 AM", status: "Confirmed" }
  ],

  /* ----- Doctor's incoming bookings ----- */
  bookings: [
    { id: 1, patient: "Ahmed Saleh", reason: "Follow-up checkup", day: "17", mon: "Jun",
      time: "09:00 AM", status: "Confirmed", av: "av-cyan" },
    { id: 2, patient: "Nour Ibrahim", reason: "Chest pain consultation", day: "17", mon: "Jun",
      time: "11:30 AM", status: "Pending", av: "av-violet" },
    { id: 3, patient: "Mark Davis", reason: "ECG review", day: "18", mon: "Jun",
      time: "01:00 PM", status: "Confirmed", av: "av-amber" },
    { id: 4, patient: "Hala Mostafa", reason: "Blood pressure", day: "19", mon: "Jun",
      time: "10:00 AM", status: "Pending", av: "av-green" }
  ],

  /* ----- Admin: users ----- */
  users: [
    { id: 1, name: "Ahmed Saleh", email: "ahmed@mail.com", role: "Patient",
      joined: "2025-01-12", status: "Active", av: "av-cyan" },
    { id: 2, name: "Dr. Layla Hassan", email: "layla@mail.com", role: "Doctor",
      joined: "2024-09-03", status: "Active", av: "av-red" },
    { id: 3, name: "Nour Ibrahim", email: "nour@mail.com", role: "Patient",
      joined: "2025-02-21", status: "Active", av: "av-violet" },
    { id: 4, name: "Dr. Omar Khalil", email: "omar@mail.com", role: "Doctor",
      joined: "2024-11-18", status: "Active", av: "av-amber" },
    { id: 5, name: "Mark Davis", email: "mark@mail.com", role: "Patient",
      joined: "2025-03-09", status: "Suspended", av: "av-green" },
    { id: 6, name: "Sara Admin", email: "admin@mail.com", role: "Admin",
      joined: "2024-06-01", status: "Active", av: "av-violet" }
  ],

  /* ----- Testimonials ----- */
  testimonials: [
    { name: "Rana Tarek", role: "Patient, Cairo", av: "av-violet",
      text: "Booking a cardiologist took two minutes. The AI report summary helped me understand my results before the visit." },
    { name: "Dr. Khaled Amin", role: "Physician, Dubai", av: "av-cyan",
      text: "Managing appointments and publishing health articles is effortless. The dashboard is genuinely well designed." },
    { name: "Lisa Chen", role: "Patient, New York", av: "av-amber",
      text: "I found a blood bank with my type during an emergency. This platform is now my first stop for anything health-related." }
  ],

  /* ----- FAQ ----- */
  faq: [
    { q: "Is the AI medical analysis a replacement for a doctor?",
      a: "No. The AI analysis is for educational purposes only and offers general insights. Always consult a licensed healthcare professional for diagnosis and treatment." },
    { q: "How do I book an appointment?",
      a: "Browse the Doctors page, choose a specialist, and click 'Book Appointment'. Pick a date and time slot, then confirm — you'll receive an instant confirmation." },
    { q: "Is my health data secure?",
      a: "Yes. The platform is designed with privacy in mind. Uploaded reports are processed securely and never shared without your consent." },
    { q: "Can doctors join the platform?",
      a: "Absolutely. Sign up and select the 'Doctor' role. After verification you can manage bookings, publish articles, and reach more patients." },
    { q: "Does it cost anything to search for doctors or hospitals?",
      a: "Searching doctors, hospitals and blood banks is completely free. Consultation fees are set individually by each doctor." }
  ],

  /* ----- Mock AI analysis result ----- */
  aiResult: {
    conditions: [
      { name: "Mild Iron Deficiency", prob: 72, color: "var(--amber)" },
      { name: "Vitamin D Insufficiency", prob: 58, color: "var(--primary)" },
      { name: "Normal Cardiac Markers", prob: 91, color: "var(--green)" }
    ],
    suggestions: [
      "Schedule a follow-up consultation with a general physician.",
      "Repeat a complete blood count test within 6–8 weeks.",
      "Discuss supplement options with your doctor before starting any."
    ],
    recommendations: [
      "Aim for 7–8 hours of quality sleep each night.",
      "Include 30 minutes of moderate activity most days.",
      "Stay hydrated — around 2 litres of water daily."
    ],
    nutrition: [
      "Add iron-rich foods: spinach, lentils, and lean red meat.",
      "Pair iron sources with vitamin C to boost absorption.",
      "Get safe sunlight exposure for natural vitamin D."
    ],
    herbal: [
      "Nettle tea is traditionally used to support iron levels.",
      "Moringa leaves are a natural source of minerals.",
      "Always confirm herbal use with your physician first."
    ]
  }
};