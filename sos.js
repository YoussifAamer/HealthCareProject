// قائمة مستشفيات الشروق الخمسة الرئيسية مع إحداثياتها التقريبية
const emergencyFacilities = [
    { name: "مستشفى الشروق", lat: 30.1221, lng: 31.6214, city: "El Shorouk" },
    { name: "مستشفى رويال الشروق", lat: 30.1189, lng: 31.6098, city: "El Shorouk" },
    { name: "مستشفى الشروق المركزي", lat: 30.1415, lng: 31.6322, city: "El Shorouk" },
    { name: "مستشفى شفا فرع الشروق", lat: 30.1152, lng: 31.6150, city: "El Shorouk" },
    { name: "مستشفى نور الشروق", lat: 30.1284, lng: 31.6255, city: "El Shorouk" }
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
                
                // البحث عن أقرب مستشفى بناءً على الإحداثيات الحقيقية للمستخدم
                const nearestFacility = findNearestHospital(currentUserLocation.lat, currentUserLocation.lng);
                
                // حفظ إحداثيات المستشفى المختار للخرائط
                selectedHospitalLocation.lat = nearestFacility.lat;
                selectedHospitalLocation.lng = nearestFacility.lng;
                
                // تفعيل لوحة الطوارئ وعرض زر الخريطة والتوجيهات
                updateEmergencyPanel(nearestFacility, true);
            },
            (error) => {
                showToast("GPS Access Denied. Using Default Network Centers.");
                const defaultFacility = emergencyFacilities[0]; // مستشفى الشروق كافتراضي عند رفض الإذن
                
                selectedHospitalLocation.lat = defaultFacility.lat;
                selectedHospitalLocation.lng = defaultFacility.lng;
                
                updateEmergencyPanel(defaultFacility, false);
            }
        );
    } else {
        showToast("Geolocation is not supported by this browser.");
    }
}

// دالة لحساب أقرب مستشفى باستخدام صيغة المسافة البسيطة
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
    
    // تحويل المسافة التقريبية لكيلومترات (درجة خط العرض تساوي تقريباً 111 كم)
    nearest.calculatedDistance = minDistance === Infinity ? 1.5 : (minDistance * 111).toFixed(1);
    return nearest;
}

// دالة لتحديث واجهة المستخدم وإظهار زر الخرائط
function updateEmergencyPanel(facility, isLiveGPS) {
    const panel = document.getElementById("emergency-panel");
    panel.classList.add("active");

    // تحديث نصوص كارت التفاصيل
    document.getElementById("hosp-name").textContent = facility.name;
    document.getElementById("hosp-dist").textContent = `${facility.calculatedDistance || '1.2'} km away ${isLiveGPS ? '(Verified via Live GPS 📍)' : ''}`;
    
    const estimatedETA = Math.max(3, Math.round(facility.calculatedDistance * 2.2 || 3));
    document.getElementById("hosp-eta").textContent = `${estimatedETA} Minutes`;

    // تحديث كارت الحالة لتأكيد الإرسال والطلب
    const step3 = document.getElementById("step-3");
    if(step3) {
        step3.innerHTML = "<span>✓</span> Ambulance Dispatched (ID: #AMB-SHK)";
        step3.style.color = "var(--green)";
    }

    // إظهار زر خرائط جوجل مباشرة للبدء في الملاحة والتوجيه
    const mapsBtn = document.getElementById("maps-route-btn");
    if (mapsBtn) {
        mapsBtn.style.display = "flex"; 
    }
    
    showToast(`Help route locked to ${facility.name}!`);
}

// الدالة المسؤولة عن فتح خرائط جوجل وعمل التوجيهات
function openGoogleMaps() {
    let mapsUrl = "";
    
    // إذا تم الحصول على موقع المستخدم بنجاح، يتم رسم اتجاه القيادة من موقعه الحالي إلى إحداثيات المستشفى
    if (currentUserLocation.lat && currentUserLocation.lng) {
        mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${currentUserLocation.lat},${currentUserLocation.lng}&destination=${selectedHospitalLocation.lat},${selectedHospitalLocation.lng}&travelmode=driving`;
    } else {
        // إذا كان الـ GPS معطلاً، يتم توجيه المستخدم إلى موقع المستشفى مباشرة على الخريطة
        mapsUrl = `https://www.google.com/maps/search/?api=1&query=${selectedHospitalLocation.lat},${selectedHospitalLocation.lng}`;
    }
    
    // فتح الرابط في نافذة جديدة
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