const API_BASE = "http://elitecoders.runasp.net/api/Auth";

function normalizeRole(role) {
  const value = (role || "").toString().trim().toLowerCase();
  if (value === "doctor") return "doctor";
  if (value === "admin") return "admin";
  return "patient";
}

function formatRoleForApi(role) {
  const value = (role || "").toString().trim().toLowerCase();
  if (value === "doctor") return "Doctor";
  if (value === "admin") return "Admin";
  return "Patient";
}

function redirectByRole(role) {
  const destination = {
    patient: "patient-dashboard.html",
    doctor: "doctor-dashboard.html",
    admin: "admin-dashboard.html"
  }[normalizeRole(role)];

  if (destination) {
    window.location.href = destination;
  } else {
    window.location.href = "index.html";
  }
}

function persistAuth(userData, role) {
  const normalizedRole = normalizeRole(role);
  const fullName = userData?.fullName || userData?.name || userData?.email || "User";

  localStorage.setItem("token", userData?.token || "");
  localStorage.setItem("fullName", fullName);
  localStorage.setItem("role", normalizedRole);

  if (typeof Session !== "undefined" && Session?.set) {
    Session.set({ name: fullName, role: normalizedRole });
  }
}

function showResult(elementId, success, message) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = message;
  el.style.color = success ? "green" : "red";
  el.style.display = "block";
}

async function register() {
  const rawRole = document.getElementById("reg-role")?.value || document.getElementById("role")?.value || "patient";
  const user_info = {
    fullName: document.getElementById("reg-name")?.value || document.getElementById("fullName")?.value || "",
    email: document.getElementById("reg-email")?.value || document.getElementById("email")?.value || "",
    password: document.getElementById("reg-password")?.value || document.getElementById("password")?.value || "",
    confirmPassword: document.getElementById("reg-confirm")?.value || document.getElementById("confirm")?.value || "",
    role: formatRoleForApi(rawRole)
  };

  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user_info)
    });

    const data = await res.json();
    const payload = data?.data || data;

    if (data.success || payload?.token) {
      persistAuth(payload, user_info.role);
      showResult("reg-result", true, `✅ Registered as ${payload.fullName || user_info.fullName} (${user_info.role})`);
      setTimeout(() => redirectByRole(user_info.role), 800);
    } else {
      showResult("reg-result", false, `❌ ${data.message || "Registration failed."}`);
      toast(data.message || "Registration failed.", "error");
    }
  } catch (err) {
    showResult("reg-result", false, `❌ Network error: ${err.message}`);
    toast("Network error while registering.", "error");
  }
}

async function login() {
  const rawRole = document.getElementById("log-role")?.value || document.getElementById("role")?.value || "patient";
  const user_info = {
    email: document.getElementById("log-email")?.value || document.getElementById("email")?.value || "",
    password: document.getElementById("log-password")?.value || document.getElementById("password")?.value || "",
    role: formatRoleForApi(rawRole)
  };

  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user_info)
    });

    const data = await res.json();
    const payload = data?.data || data;

    if (data.success || payload?.token) {
      persistAuth(payload, user_info.role);
      showResult("log-result", true, `✅ Welcome back, ${payload.fullName || user_info.email}!`);
      setTimeout(() => redirectByRole(user_info.role), 800);
    } else {
      showResult("log-result", false, `❌ ${data.message || "Login failed."}`);
      toast(data.message || "Login failed.", "error");
    }
  } catch (err) {
    showResult("log-result", false, `❌ Network error: ${err.message}`);
    toast("Network error while logging in.", "error");
  }
}

function getToken() {
  return localStorage.getItem("token");
}

async function getProtectedData(url) {
  const token = getToken();
  if (!token) {
    alert("Not logged in!");
    return;
  }

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (res.status === 401) {
    alert("Session expired. Please login again.");
    return;
  }

  return await res.json();
}

function bindAuthForms() {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("log-email");
      const pass = document.getElementById("log-password");
      let ok = true;

      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email?.value || "");
      document.getElementById("f-email")?.classList.toggle("invalid", !emailOk);
      if (!emailOk) ok = false;

      const passOk = (pass?.value || "").length >= 6;
      document.getElementById("f-pass")?.classList.toggle("invalid", !passOk);
      if (!passOk) ok = false;

      if (!ok) {
        toast("Please fix the highlighted fields.", "error");
        return;
      }

      await login();
    });
  }

  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("reg-name") || document.getElementById("fullName");
      const email = document.getElementById("reg-email") || document.getElementById("email");
      const pass = document.getElementById("reg-password") || document.getElementById("password");
      const confirm = document.getElementById("reg-confirm") || document.getElementById("confirm");
      let ok = true;

      const nameOk = (name?.value || "").trim().length >= 3;
      document.getElementById("f-name")?.classList.toggle("invalid", !nameOk);
      if (!nameOk) ok = false;

      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email?.value || "");
      document.getElementById("f-email")?.classList.toggle("invalid", !emailOk);
      if (!emailOk) ok = false;

      const passOk = (pass?.value || "").length >= 6;
      document.getElementById("f-pass")?.classList.toggle("invalid", !passOk);
      if (!passOk) ok = false;

      const confirmOk = (confirm?.value || "") === (pass?.value || "") && (confirm?.value || "").length > 0;
      document.getElementById("f-cpass")?.classList.toggle("invalid", !confirmOk);
      if (!confirmOk) ok = false;

      if (!document.getElementById("terms")?.checked) {
        toast("Please accept the Terms of Service.", "error");
        return;
      }

      if (!ok) {
        toast("Please fix the highlighted fields.", "error");
        return;
      }

      await register();
    });
  }

  ["log-email", "log-password"].forEach((id) => {
    const el = document.getElementById(id);
    el?.addEventListener("input", (e) => e.target.closest(".field")?.classList.remove("invalid"));
  });

  ["reg-name", "reg-email", "reg-password", "reg-confirm"].forEach((id) => {
    const el = document.getElementById(id);
    el?.addEventListener("input", (e) => e.target.closest(".field")?.classList.remove("invalid"));
  });
}

document.addEventListener("DOMContentLoaded", bindAuthForms);
