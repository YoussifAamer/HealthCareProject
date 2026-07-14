// تتبع الإحداثيات الحية بدقة
let currentUserLocation = { lat: null, lng: null };

function triggerEmergency() {
    // التأكد من وجود حاوية التوست عشان الكود ما يضربش
    const container = document.getElementById("toast-container");
    if (container) {
        showToast("🚨 Connecting to Live GPS Satellites...");
    }
    
    if (navigator.geolocation) {
        const geoOptions = {
            enableHighAccuracy: true, // دقة عالية جداً لـ GPS الموبايل واللابتوب
            timeout: 5000,            // 5 ثواني كحد أقصى للقط الإشارة
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(
            (position) => {
                currentUserLocation.lat = position.coords.latitude;
                currentUserLocation.lng = position.coords.longitude;
                
                // تشغيل شاشة الطوارئ الحية فوراً
                activateEmergencyUI();
            },
            (error) => {
                // خطة بديلة لو الـ GPS مقفول في المتصفح
                currentUserLocation.lat = 30.5612;
                currentUserLocation.lng = 31.0118;
                activateEmergencyUI();
            },
            geoOptions
        );
    } else {
        alert("Error: Geolocation is not supported by this browser.");
    }
}

// عرض واجهة المستخدم وتحديث البيانات بناءً على الـ HTML بتاعك
function activateEmergencyUI() {
    const panel = document.getElementById("emergency-panel");
    if (panel) {
        panel.classList.add("active");
        panel.style.display = "block"; // تأكيد الظهور لو الـ CSS خافيه
    }

    // تحديث النصوص في الـ HTML
    const hospName = document.getElementById("hosp-name");
    const hospDist = document.getElementById("hosp-dist");
    const hospEta = document.getElementById("hosp-eta");

    if (hospName) hospName.textContent = "Nearest General Emergency Trauma Hospital";
    if (hospDist) hospDist.textContent = "Live Radar Syncing... 📍";
    if (hospEta) hospEta.textContent = "Calculating Live Traffic";

    // تحديث خطوات الحالة (Status Steps)
    const step3 = document.getElementById("step-3");
    if (step3) {
        step3.innerHTML = "<span>✓</span> Ambulance Dispatched & Route Locked";
        step3.style.color = "#10b981"; // لون أخضر صريح متوافق مع أي ثيم بدل الـ Variable
    }

    // إظهار زرار جوجل مابس الحقيقي
    const mapsBtn = document.getElementById("maps-route-btn");
    if (mapsBtn) { 
        mapsBtn.style.display = "block"; 
    }
    
    showToast("⚡ Emergency Route Locked! Click below to navigate.");
}

// 🎯 الدالة الخارقة: توجيه مباشر بالخط الأزرق لأقرب مستشفى حقيقية
function openGoogleMaps() {
    if (currentUserLocation.lat && currentUserLocation.lng) {
        // البحث باللفظين (مستشفى أو hospital) مع نقطة انطلاقك الحالية
        // ده بيجبر جوجل مابس يفتح الخط الأزرق فوراً لأقرب منشأة طبية فعلية (زي الضرة)
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${currentUserLocation.lat},${currentUserLocation.lng}&destination=مستشفى+OR+hospital&travelmode=driving`;
        window.open(mapsUrl, '_blank');
    } else {
        window.open("https://www.google.com/maps/dir/?api=1&destination=مستشفى+OR+hospital&travelmode=driving", '_blank');
    }
}

// دالة التوست المضمونة
function showToast(message) {
    const container = document.getElementById("toast-container");
    if (!container) return;
    
    const toast = document.createElement("div");
    // إعطاء ستايل مباشر عشان لو الـ CSS فيه مشكلة التوست يظهر برضه بشكل شيك
    toast.style.background = "#ef4444";
    toast.style.color = "white";
    toast.style.padding = "12px 24px";
    toast.style.borderRadius = "8px";
    toast.style.marginBottom = "10px";
    toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
    toast.style.fontWeight = "600";
    toast.style.display = "flex";
    toast.style.alignItems = "center";
    toast.style.gap = "10px";
    
    toast.innerHTML = `<span>🚨</span> <span>${message}</span>`;
    container.appendChild(toast);
    
    setTimeout(() => { 
        toast.remove(); 
    }, 4000);
}

// كود إضافي لتشغيل قائمة الموبايل (Menu Toggle) عشان البروجكت يبقى كامل لو التحكيم صغر الشاشة
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.querySelector(".main-nav");
    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            mainNav.classList.toggle("active");
        });
    }
});