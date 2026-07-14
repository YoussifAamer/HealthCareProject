/* =========================================================
   MediCare AI Platform — Hospital Expansion System (Ultra Short Names)
   ========================================================= */

function expandHospitalsTo50() {
  if (!window.DB) window.DB = {};
  if (!DB.hospitals) DB.hospitals = [];
  
  if (DB.hospitals.length >= 50) return;

  // كلمات مفردة وقصيرة جداً لتصبح مع اسم المدينة (كلمتين فقط إجمالاً)
  const hospitalNames = [
    "Hospital", "Clinic", "Center", "Hub", "Care", "Med", "Health"
  ];

  const locations = [
    { city: "Cairo", country: "Egypt" }, { city: "Alexandria", country: "Egypt" }, { city: "Giza", country: "Egypt" },
    { city: "Dubai", country: "UAE" }, { city: "Abu Dhabi", country: "UAE" },
    { city: "Riyadh", country: "Saudi Arabia" }, { city: "Jeddah", country: "Saudi Arabia" },
    { city: "New York", country: "USA" }, { city: "Chicago", country: "USA" },
    { city: "London", country: "UK" }, { city: "Manchester", country: "UK" },
        { city: "Berlin", country: "Germany" }, { city: "Munich", country: "Germany" },
        { city: "Monaco", country: "France" }, { city: "Paris", country: "France" },
        { city: "Milano", country: "Italy" }, { city: "Napoli", country: "Italy" },
        { city: "Osaka", country: "Japan" }, { city: "Tokyo", country: "Japan" },
        { city: "Shanghai", country: "China" }, { city: "Seoul", country: "Korea Republic" },
  ];

  const avatarClasses = ["av-cyan", "av-violet", "av-amber", "av-green", "av-red", ""];
  let currentId = DB.hospitals.length + 1;

  while (DB.hospitals.length < 50) {
    const hName = hospitalNames[Math.floor(Math.random() * hospitalNames.length)];
    const loc = locations[Math.floor(Math.random() * locations.length)];
    const av = avatarClasses[Math.floor(Math.random() * avatarClasses.length)];
    const randNum = Math.floor(Math.random() * 9000) + 1000;

    DB.hospitals.push({
      id: currentId++,
      name: `${loc.city} ${hName}`, // النتيجة النهائية: "Cairo Clinic" أو "Dubai Hub" (كلمتين بالظبط!)
      city: loc.city,
      country: loc.country,
      address: `${Math.floor(Math.random() * 90) + 10} Medical St., ${loc.city}`,
      phone: `+000 0 555 ${randNum}`,
      beds: Math.floor(Math.random() * 600) + 100,
      status: Math.random() > 0.3 ? "open" : "busy",
      emergency: Math.random() > 0.4,
      rating: (Math.random() * (5.0 - 4.2) + 4.2).toFixed(1),
      av: av
    });
  }
}

// جدار الحماية
expandHospitalsTo50();
document.addEventListener('DOMContentLoaded', expandHospitalsTo50);
window.addEventListener('load', expandHospitalsTo50);