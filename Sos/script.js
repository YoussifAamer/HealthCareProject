// قائمة ببعض مستشفيات الطوارئ الافتراضية لشبين الكوم والقاهرة كمثال للمحاكاة الذكية
const emergencyFacilities = [
    { name: "مستشفى شبين الكوم التعليمي (Emergency)", lat: 30.5612, lng: 31.0118, city: "Shibin El Kom" },
    { name: "مستشفى شبين الكوم الجامعي", lat: 30.5550, lng: 31.0090, city: "Shibin El Kom" },
    { name: "Cairo International Trauma Center", lat: 30.0444, lng: 31.2357, city: "Cairo" },
    { name: "Ain Shams University Hospital", lat: 30.0772, lng: 31.2849, city: "Cairo" }
];

// متغيرات عالمية لحفظ موقع المستخدم والمستشفى الحالي لتمريرها لخرائط جوجل
let currentUserLocation = { lat: null, lng: null };
let selectedHospitalLocation = { lat: null, lng: null };

function triggerEmergency() {
    if (navigator.geolocation) {
        showToast("Broadcasting SOS... Pinpointing Location...");
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                currentUserLocation.lat = position.coords.latitude;
                currentUserLocation.lng = position.coords.longitude;
                
                // البحث عن أقرب مستشفى بناءً على الإحداثيات الحقيقية
                const nearestFacility = findNearestHospital(currentUserLocation.lat, currentUserLocation.lng);
                
                // حفظ إحداثيات المستشفى المختار للخرائط
                selectedHospitalLocation.lat = nearestFacility.lat;
                selectedHospitalLocation.lng = nearestFacility.lng;
                
                // تفعيل لوحة الطوارئ وعرض الزر
                updateEmergencyPanel(nearestFacility, true);
            },
            (error) => {
                showToast("GPS Access Denied. Using Default Network Centers.");
                const defaultFacility = emergencyFacilities[0]; // مستشفى شبين الكوم كافتراضي
                
                selectedHospitalLocation.lat = defaultFacility.lat;
                selectedHospitalLocation.lng = defaultFacility.lng;
                
                updateEmergencyPanel(defaultFacility, false);
            }
        );
    } else {
        showToast("Geolocation is not supported by this browser.");
    }
}

// دالة لحساب المسافة التقريبية
function findNearestHospital(userLat, userLng) {
    let nearest = emergencyFacilities[0];
    let minDistance = Infinity;

    emergencyFacilities.forEach(facility => {
        const dLat = userLat - facility.lat;
        const dLng = userLng - facility.lng;
        const distance = Math.sqrt(dLat * dLat + dLng * dLng);
        
        if (distance < minDistance) {
            minDistance = distance;
            nearest = facility;
        }
    });
    
    nearest.calculatedDistance = minDistance === Infinity ? 2.1 : (minDistance * 111).toFixed(1);
    return nearest;
}

// دالة لتحديث واجهة المستخدم وإظهار زر الخرائط
function updateEmergencyPanel(facility, isLiveGPS) {
    const panel = document.getElementById("emergency-panel");
    panel.classList.add("active");

    // تحديث نصوص الكارت اليسار
    document.getElementById("hosp-name").textContent = facility.name;
    document.getElementById("hosp-dist").textContent = `${facility.calculatedDistance || '0.8'} km away ${isLiveGPS ? '(Verified via Live GPS 📍)' : ''}`;
    
    const estimatedETA = Math.max(4, Math.round(facility.calculatedDistance * 2.5 || 4));
    document.getElementById("hosp-eta").textContent = `${estimatedETA} Minutes`;

    // تحديث كارت الخطوات (اليمين) وتأكيد الإرسال
    const step3 = document.getElementById("step-3");
    if(step3) {
        step3.innerHTML = "<span>✓</span> Ambulance Dispatched (ID: #AMB-SHB)";
        step3.style.color = "var(--green)";
    }

    // إظهار زر الخرائط فوراً
    const mapsBtn = document.getElementById("maps-route-btn");
    if (mapsBtn) {
        mapsBtn.style.display = "flex"; // تفعيله ليظهر كـ Flexbox متناسق
    }
    
    showToast(`Help route locked to ${facility.name || 'Shibin Hospital'}!`);
}

// الدالة السحرية التي تفتح خرائط جوجل وتوجه المستخدم للمستشفى
function openGoogleMaps() {
    let mapsUrl = "";
    
    // لو الـ GPS اشتغل وجاب موقع المستخدم الحالي، نعمل رابط توجيه من نقطة لنقطة (Origin to Destination)
    if (currentUserLocation.lat && currentUserLocation.lng) {
        mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${currentUserLocation.lat},${currentUserLocation.lng}&destination=${selectedHospitalLocation.lat},${selectedHospitalLocation.lng}&travelmode=driving`;
    } else {
        // لو الـ GPS مقفول، نفتح مكان المستشفى مباشرة على الخريطة كـ Destination
        mapsUrl = `https://www.google.com/maps/search/?api=1&query=${selectedHospitalLocation.lat},${selectedHospitalLocation.lng}`;
    }
    
    // فتح الرابط في تبويب جديد احترافي
    window.open(mapsUrl, '_blank');
}

function showToast(message) {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span>🚨</span> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 2500);
}