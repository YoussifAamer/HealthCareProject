// Automatically calculate and render today's dynamic date in DD/MM/YYYY format
document.addEventListener("DOMContentLoaded", () => {
    const displayDateElem = document.getElementById("display-date");
    if (displayDateElem) {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const year = today.getFullYear();
        displayDateElem.textContent = `${day}/${month}/${year}`;
    }

    // إضافة ستايل الـ Modal (Popup) والتوست ديناميكياً
    injectModalStyles();

    // توليد ورسم 100 طبيب بمربعات ملونة بألوان متنوعة
    render100Doctors();
});

// مصفوفة التخصصات والبيانات الأساسية للتناوب عليها
const specialtiesPool = [
    { specialty: "Pediatrics", exp: "9 yrs exp", price: "$80 / visit", rating: "5", count: "401" },
    { specialty: "Dermatology", exp: "7 yrs exp", price: "$85 / visit", rating: "4.6", count: "142" },
    { specialty: "Gynecology", exp: "12 yrs exp", price: "$90 / visit", rating: "4.9", count: "333" },
    { specialty: "Cardiology", exp: "14 yrs exp", price: "$95 / visit", rating: "4.8", count: "312" },
    { specialty: "Orthopedics", exp: "13 yrs exp", price: "$110 / visit", rating: "4.8", count: "276" },
    { specialty: "Neurology", exp: "15 yrs exp", price: "$115 / visit", rating: "4.7", count: "198" }
];

// المدن والدول المطلوبة بالتفصيل
const locations = [
    { city: "Riyadh, KSA", type: "arabic" }, { city: "Jeddah, KSA", type: "arabic" },
    { city: "Abu Dhabi, UAE", type: "arabic" }, { city: "Dubai, UAE", type: "arabic" },
    { city: "Cairo, Egypt", type: "arabic" }, { city: "Giza, Egypt", type: "arabic" }, { city: "Alexandria, Egypt", type: "arabic" },
    { city: "London, UK", type: "western" },
    { city: "New York, USA", type: "western" }, { city: "Chicago, USA", type: "western" },
    { city: "Osaka, Japan", type: "asian_jp" }, { city: "Tokyo, Japan", type: "asian_jp" },
    { city: "Munich, Germany", type: "western_de" }, { city: "Berlin, Germany", type: "western_de" },
    { city: "Paris, France", type: "western_fr" }, { city: "Monaco, France", type: "western_fr" },
    { city: "Napoli, Italy", type: "western_it" }, { city: "Roma, Italy", type: "western_it" },
    { city: "Seoul, Korea Republic", type: "asian_kr" },
    { city: "Shanghai, China", type: "asian_ch" }
];

// مصفوفة تدرجات الألوان المتنوعة والمبهجة للمربعات
const colorsPool = [
    "linear-gradient(135deg, #ff6b6b, #ff8e8e)", 
    "linear-gradient(135deg, #4facfe, #00f2fe)", 
    "linear-gradient(135deg, #43e97b, #38f9d7)", 
    "linear-gradient(135deg, #f9d423, #ff4e50)", 
    "linear-gradient(135deg, #b1f4cf, #9890e3)", 
    "linear-gradient(135deg, #7028e4, #e5b2ca)", 
    "linear-gradient(135deg, #fa709a, #fee140)", 
    "linear-gradient(135deg, #30cfd0, #330867)", 
    "linear-gradient(135deg, #11998e, #38ef7d)", 
    "linear-gradient(135deg, #ff9a9e, #fecfef)"  
];

// بنك الأسماء لتوليد أسماء فريدة ومناسبة لكل دولة
const nameBank = {
    arabic: {
        first: ["Ahmed", "Omar", "Youssef", "Kareem", "Mustafa", "Ziad", "Tarek", "Fatma", "Nour", "Mariam", "Amr", "Khaled", "Zain", "Ali", "Sami"],
        last: ["Mansour", "Fawzy", "Adel", "Hassan", "Al-Otaibi", "Al-Shammari", "Saeed", "Al-Maktoum", "Radwan", "El-Din", "Al-Suwaidi", "Gadd"]
    },
    western: {
        first: ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Thomas", "Charles", "Emma", "Olivia", "Sophia"],
        last: ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Wilson", "Anderson", "Taylor", "Thomas", "Moore"]
    },
    western_de: {
        first: ["Klaus", "Hans", "Jürgen", "Stefan", "Thomas", "Andreas", "Michael", "Sabine", "Monika", "Ursula"],
        last: ["Müller", "Schmidt", "Schneider", "Fischer", "Weber", "Meyer", "Wagner", "Becker", "Schulz"]
    },
    western_fr: {
        first: ["Jean", "Pierre", "Michel", "Philippe", "André", "René", "Marie", "Nathalie", "Isabelle"],
        last: ["Martin", "Bernard", "Thomas", "Petit", "Robert", "Richard", "Durand", "Dubois", "Moreau"]
    },
    western_it: {
        first: ["Giovanni", "Giuseppe", "Antonio", "Mario", "Luigi", "Francesco", "Anna", "Maria", "Francesca"],
        last: ["Rossi", "Russo", "Ferrari", "Esposito", "Bianchi", "Romano", "Colombo", "Ricci"]
    },
    asian_jp: {
        first: ["Hiroshi", "Takashi", "Kenji", "Akira", "Yuki", "Haruto", "Sakura", "Mei"],
        last: ["Sato", "Suzuki", "Takahashi", "Tanaka", "Watanabe", "Ito", "Nakamura", "Kobayashi"]
    },
    asian_kr: {
        first: ["Min-jun", "Seo-jun", "Ha-joon", "Do-yun", "Ji-woo", "Seo-yeon", "Ha-eun"],
        last: ["Kim", "Lee", "Park", "Choi", "Jung", "Kang", "Cho", "Yoon"]
    },
    asian_ch: {
        first: ["Wei", "Min", "Qiang", "Lei", "Jun", "Yong", "Fang", "Yan", "Xiu"],
        last: ["Wang", "Li", "Zhang", "Liu", "Chen", "Yang", "Huang", "Zhao"]
    }
};

function render100Doctors() {
    const grid = document.querySelector(".doctors-grid");
    if (!grid) return;

    grid.innerHTML = "";
    const generatedNames = new Set();

    for (let i = 0; i < 100; i++) {
        const locData = locations[i % locations.length];
        const currentLoc = locData.city;
        const culture = locData.type;
        const specData = specialtiesPool[i % specialtiesPool.length];
        const currentGradient = colorsPool[i % colorsPool.length];

        let firstNames = nameBank[culture].first;
        let lastNames = nameBank[culture].last;
        
        let fName = firstNames[i % firstNames.length];
        let lName = lastNames[(i + Math.floor(i / firstNames.length)) % lastNames.length];
        let docName = `Dr. ${fName} ${lName}`;

        let safetyCounter = 0;
        while (generatedNames.has(docName) && safetyCounter < 20) {
            const randFirst = firstNames[Math.floor(Math.random() * firstNames.length)];
            const randLast = lastNames[Math.floor(Math.random() * lastNames.length)];
            docName = `Dr. ${randFirst} ${randLast}`;
            safetyCounter++;
        }
        generatedNames.add(docName);

        const nameParts = docName.replace("Dr. ", "").split(" ");
        const init = (nameParts[0][0] + (nameParts[1] ? nameParts[1][0] : "")).toUpperCase();
        const doctorId = i + 1;

        const cardHTML = `
            <div class="doctor-card" id="card-${doctorId}">
                <div class="card-header">
                    <div class="doctor-info-main">
                        <h2 class="doctor-name">${docName}</h2>
                        <p class="specialty">${specData.specialty}</p>
                    </div>
                    <div class="avatar" style="background: ${currentGradient}; color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; border-radius: 8px; width: 44px; height: 44px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">${init}</div>
                </div>
                <div class="card-details">
                    <div class="detail-item">
                        <span class="icon">📍</span>
                        <span class="text">${currentLoc}</span>
                    </div>
                    <div class="detail-item">
                        <span class="icon">⏱️</span>
                        <span class="text">${specData.exp}</span>
                    </div>
                </div>
                <div class="badge-row">
                    <span class="price-badge">${specData.price}</span>
                    <span class="status-badge available" id="status-${doctorId}">Available</span>
                </div>
                <div class="rating-row">
                    <span class="star">★</span>
                    <span class="rating-val">${specData.rating}</span>
                    <span class="rating-count">(${specData.count})</span>
                </div>
                <div class="booking-inputs">
                    <label for="time-${doctorId}">Select Time:</label>
                    <input type="time" id="time-${doctorId}" class="time-input" required>
                </div>
                <button class="btn-book" id="btn-${doctorId}" onclick="openPaymentForm(${doctorId}, '${docName.replace(/'/g, "\\'")}', '${specData.specialty}', '${specData.price}', '${currentLoc}')">Book Now</button>
            </div>
        `;
        
        grid.insertAdjacentHTML("beforeend", cardHTML);
    }
}

// دالة لفتح الفورم المنبثقة (Popup) وتمرير بيانات الدكتور لها
function openPaymentForm(doctorId, doctorName, specialty, price, location) {
    const timeInput = document.getElementById(`time-${doctorId}`);
    
    if (!timeInput.value) {
        alert("Please select a convenient time first / برجاء اختيار الوقت أولاً");
        return;
    }

    // إنشاء الـ Modal HTML دايناميك في الصفحة مع إضافة معرفات (IDs) وعلامة الحقول الإجبارية
    const modalHTML = `
        <div class="payment-modal-overlay" id="payment-modal">
            <div class="payment-modal-card">
                <button class="modal-close-btn" onclick="closePaymentForm()">&times;</button>
                <h3 class="modal-title">Confirm & Pay</h3>
                <div class="modal-billing-info">
                    <div class="billing-row"><strong>Doctor:</strong> <span>${doctorName}</span></div>
                    <div class="billing-row"><strong>Specialty:</strong> <span>${specialty}</span></div>
                    <div class="billing-row"><strong>Location:</strong> <span>${location}</span></div>
                    <div class="billing-row"><strong>Time Slot:</strong> <span class="highlight-time">${timeInput.value}</span></div>
                    <hr class="modal-divider">
                    <div class="billing-row total-row"><strong>Total Amount:</strong> <span>${price.split(' ')[0]}</span></div>
                </div>
                
                <div class="payment-fields">
                    <label>Cardholder Name <span style="color: red;">*</span></label>
                    <input type="text" id="modal-card-name" placeholder="John Doe" class="modal-input" required>
                    
                    <label>Card Number <span style="color: red;">*</span></label>
                    <input type="text" id="modal-card-num" placeholder="1234 5678 9101 1121" class="modal-input" required>
                </div>

                <button class="btn-modal-pay" onclick="confirmPayment(${doctorId}, '${doctorName.replace(/'/g, "\\'")}')">Pay Now</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);
}

// دالة إغلاق الفورم
function closePaymentForm() {
    const modal = document.getElementById("payment-modal");
    if (modal) modal.remove();
}

// دالة تأكيد الدفع مع التحقق من الحقول الإلزامية (Validation)
function confirmPayment(doctorId, doctorName) {
    const cardName = document.getElementById("modal-card-name").value.trim();
    const cardNum = document.getElementById("modal-card-num").value.trim();

    // التحقق البرمجي أن الحقول ليست فارغة (Required)
    if (!cardName || !cardNum) {
        alert("Please fill in all required payment details / برجاء ملء بيانات الدفع المطلوبة أولاً");
        return; // يوقف التنفيذ لمنع الدفع وإغلاق الفورم
    }

    const btn = document.getElementById(`btn-${doctorId}`);
    const timeInput = document.getElementById(`time-${doctorId}`);
    const statusBadge = document.getElementById(`status-${doctorId}`);

    // 1. إغلاق الفورم فوراً بعد التأكد من إدخال البيانات
    closePaymentForm();

    // 2. قفل خانة اختيار الوقت في الكارت الأصلي
    if (timeInput) timeInput.disabled = true;

    // 3. تحويل الزرار الأصلي لـ Booked ومنع الضغط عليه تماماً
    if (btn) {
        btn.textContent = "Booked";
        btn.disabled = true;
        btn.style.background = "#9ca3af"; // لون رمادي دلالة على الـ Disabled
        btn.style.cursor = "not-allowed";
    }

    // 4. تحديث الـ Badge الخاص بالحالة في الكارت لـ Booked باللون الأحمر
    if (statusBadge) {
        statusBadge.textContent = "Booked";
        statusBadge.style.background = "#fee2e2";
        statusBadge.style.color = "#ef4444";
    }

    // 5. إظهار التوست الاحترافي أسفل اليسار بالرسالة المطلوبة تماماً
    showToast(`Paid Successfully with ${doctorName}`);
}

// دالة إظهار التوست أسفل اليسار (Toast Notification)
function showToast(message) {
    let container = document.getElementById("toast-container");
    
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span>✅</span> <span>${message}</span>`;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 2500);
}

// ستايلات الـ CSS الخاصة بالفورم والتوست، بيتم حقنها برمجياً لضمان سلامة التصميم
function injectModalStyles() {
    const style = document.createElement("style");
    style.textContent = `
        /* الـ Overlay الخلفية المعتمة */
        .payment-modal-overlay {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(4px);
            display: flex; justify-content: center; align-items: center;
            z-index: 9999;
            animation: fadeIn 0.2s ease-out;
        }
        /* كارت الفورم المنبثق */
        .payment-modal-card {
            background: #ffffff;
            padding: 24px;
            border-radius: 16px;
            width: 90%; max-width: 400px;
            box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
            position: relative;
            animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .modal-close-btn {
            position: absolute; top: 12px; right: 16px;
            background: none; border: none; font-size: 24px; color: #9ca3af;
            cursor: pointer; transition: color 0.2s;
        }
        .modal-close-btn:hover { color: #374151; }
        .modal-title { font-size: 20px; font-weight: 700; color: #111827; margin-bottom: 16px; }
        .modal-billing-info { background: #f9fafb; padding: 14px; border-radius: 8px; margin-bottom: 16px; }
        .billing-row { display: flex; justify-content: space-between; font-size: 14px; color: #4b5563; margin-bottom: 6px; }
        .highlight-time { color: #2563eb; font-weight: 600; }
        .modal-divider { border: 0; border-top: 1px solid #e5e7eb; margin: 8px 0; }
        .total-row { color: #111827; font-size: 16px; }
        .payment-fields { display: flex; flex-direction: column; gap: 4px; margin-bottom: 16px; }
        .payment-fields label { font-size: 12px; font-weight: 600; color: #374151; }
        .modal-input { padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; margin-bottom: 8px; }
        .modal-input:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
        /* زرار الدفع داخل الفورم */
        .btn-modal-pay {
            width: 100%; background: #10b981; color: white; border: none;
            padding: 12px; border-radius: 8px; font-weight: 600; font-size: 16px;
            cursor: pointer; transition: background 0.2s;
        }
        .btn-modal-pay:hover { background: #059669; }
        
        /* حاوية التوست أسفل اليسار */
        #toast-container {
            position: fixed; bottom: 24px; left: 24px;
            display: flex; flex-direction: column; gap: 10px; z-index: 10000;
        }
        .toast {
            background: #111827; color: white; padding: 12px 20px;
            border-radius: 8px; display: flex; align-items: center; gap: 10px;
            font-size: 14px; font-weight: 500;
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3);
            animation: slideInLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slideInLeft { from { transform: translateX(-100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    `;
    document.head.appendChild(style);
}