const BASE_URL = "http://localhost:5000/api/auth";

// ---------- REGISTER LOGIC ----------
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // page reload rokta hai

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const messageEl = document.getElementById("message");

    try {
      const res = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        messageEl.textContent = "Registered successfully! Redirecting to login...";
        messageEl.classList.add("text-green-600");
        setTimeout(() => {
          window.location.href = "login.html";
        }, 1500);
      } else {
        messageEl.textContent = data.message || "Registration failed";
        messageEl.classList.add("text-red-600");
      }
    } catch (err) {
      messageEl.textContent = "Server error. Try again.";
    }
  });
}

// ---------- LOGIN LOGIC ----------
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const messageEl = document.getElementById("message");

    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token); // JWT save karo
        window.location.href = "dashboard.html";
      } else {
        messageEl.textContent = data.message || "Login failed";
        messageEl.classList.add("text-red-600");
      }
    } catch (err) {
      messageEl.textContent = "Server error. Try again.";
    }
  });
}

// ---------- DASHBOARD LOGIC ----------
const welcomeMessage = document.getElementById("welcomeMessage");
if (welcomeMessage) {
  const token = localStorage.getItem("token");

  if (!token) {
    // Token nahi mila, wapas login bhej do
    window.location.href = "login.html";
  } else {
    // Protected route ko call karo, token bhejke
    fetch(`${BASE_URL}/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          welcomeMessage.textContent = data.message;
        } else {
          localStorage.removeItem("token");
          window.location.href = "login.html";
        }
      })
      .catch(() => {
        window.location.href = "login.html";
      });
  }

  // Logout button
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
  });
}