document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    // أزرار الـ Quick Demo (موجودة في صفحة login.html)
    const demoButtons = document.querySelectorAll('.demo-btn');
    const loginRoleSelect = document.getElementById('loginRole');
    const loginEmailInput = document.getElementById('loginEmail');
    const loginPasswordInput = document.getElementById('loginPassword');

    // 1. تشغيل ميزة الـ Demo في صفحة الـ Login لو موجودة
    if (demoButtons.length > 0) {
        demoButtons.forEach(button => {
            button.addEventListener('click', () => {
                const selectedRole = button.getAttribute('data-role');
                if (loginRoleSelect) loginRoleSelect.value = selectedRole;
                if (loginEmailInput) loginEmailInput.value = `${selectedRole}@medicare.com`;
                if (loginPasswordInput) loginPasswordInput.value = `demo1234`;
            });
        });
    }

    // 2. معالجة عمل الـ Submit للفورم المتاحة
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // منع الصفحة من الـ Refresh
            
            alert(`Logging in as ${loginRoleSelect.value.toUpperCase()}...`);
            
            // التوجيه التلقائي بعد الضغط على OK في الـ Alert
            window.location.href = 'home.html'; 
        });
    }

    // كود الـ Sign Up بدون أي تعديل كما طلبت
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const signupRole = document.getElementById('signupRole').value;
            alert(`Account created successfully for ${signupRole.toUpperCase()}!`);
            // توجيه المستخدم لصفحة تسجيل الدخول بعد النجاح
            window.location.href = 'home.html';
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // 1. مسك الفورم بتاعة اللوجن (تأكد أن الـ id في الـ HTML هو loginForm أو غيره للاسم اللي تحت)
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault(); // يمنع الصفحة إنها تعمل ريفريش وتفضي البيانات

            // 2. مسك الـ Input اللي الدكتور كاتب فيه اسمه
            const nameInput = document.getElementById("DoctorNameInput");

            if (nameInput && nameInput.value.trim() !== "") {
                // 3. حفظ الاسم في الـ localStorage
                const doctorInfo = { name: nameInput.value.trim() };
                localStorage.setItem("loggedInDoctor", JSON.stringify(doctorInfo));

                // 4. الانتقال فوراً لصفحة الداشبورد
                window.location.href = "dashboard.html";
            } else {
                alert("Please enter your name first!");
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // 1. مسك الفورم بتاعة الساين أب (تأكد أن الـ id في الـ HTML هو signupForm)
    const signupForm = document.getElementById("signupForm");

    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault(); // يمنع الريفرش التلقائي للفورم

            // 2. مسك الـ Input اللي الدكتور كاتب فيه اسمه في الساين أب
            const signUpNameInput = document.getElementById("signUpNameInput");

            if (signUpNameInput && signUpNameInput.value.trim() !== "") {
                // 3. حفظ البيانات في الـ localStorage
                const doctorInfo = { name: signUpNameInput.value.trim() };
                localStorage.setItem("loggedInDoctor", JSON.stringify(doctorInfo));

                // 4. الانتقال فوراً لصفحة الداشبورد كأنه سجل ودخل تلقائي
                window.location.href = "dashboard.html";
            } else {
                alert("Please fill in your name!");
            }
        });
    }
});