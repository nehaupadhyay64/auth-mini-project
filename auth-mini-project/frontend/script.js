
const BASE_URL = "https://auth-mini-project-1.onrender.com";

// ---------- REGISTER LOGIC ----------
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const messageEl = document.getElementById("message");

    try {
      const res = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        messageEl.textContent =
          "Registered successfully! Redirecting to login...";
        messageEl.classList.remove("text-red-600");
        messageEl.classList.add("text-green-600");

        setTimeout(() => {
          window.location.href = "login.html";
        }, 1500);
      } else {
        messageEl.textContent = data.message || "Registration failed";
        messageEl.classList.remove("text-green-600");
        messageEl.classList.add("text-red-600");
      }
    } catch (err) {
      console.error("Register error:", err);
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
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "dashboard.html";
      } else {
        messageEl.textContent = data.message || "Login failed";
        messageEl.classList.remove("text-green-600");
        messageEl.classList.add("text-red-600");
      }
    } catch (err) {
      console.error("Login error:", err);
      messageEl.textContent = "Server error. Try again.";
    }
  });
}

// ---------- DASHBOARD LOGIC ----------
const welcomeMessage = document.getElementById("welcomeMessage");

if (welcomeMessage) {
  const token = localStorage.getItem("token");
  const logoutBtn = document.getElementById("logoutBtn");

  if (!token) {
    window.location.href = "login.html";
  } else {
    fetch(`${BASE_URL}/api/auth/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Authentication failed");
        }

        return data;
      })
      .then((data) => {
        if (data.message) {
          welcomeMessage.textContent = data.message;
        } else {
          localStorage.removeItem("token");
          window.location.href = "login.html";
        }
      })
      .catch((err) => {
        console.error("Dashboard error:", err);
        localStorage.removeItem("token");
        window.location.href = "login.html";
      });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.href = "login.html";
    });
  }
}
