const API = "http://localhost:5000/api";

function register() {
    const nameInput = document.getElementById("registerName");
    const emailInput = document.getElementById("registerEmail");
    const passwordInput = document.getElementById("registerPassword");

    fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log("Register response:", data);
        alert(data.message);
        
        if (data.message === "Registered successfully") {
            window.location.href = "login.html";
        }
    })
    .catch(err => {
        console.error("Register error:", err);
        alert("An error occurred: " + err.message);
    });
}

function login() {
    const emailInput = document.getElementById("loginEmail");
    const passwordInput = document.getElementById("loginPassword");

    fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: emailInput.value,
            password: passwordInput.value
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log("Login response:", data);
        
        if (data.token) {
            localStorage.setItem("token", data.token);
            window.location.href = "dashboard.html";
        } else {
            alert(data.message || "Login failed");
        }
    })
    .catch(err => {
        console.error("Login error:", err);
        alert("An error occurred: " + err.message);
    });
}

function loadHabits() {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location = "register.html";
        return;
    }

    fetch(`${API}/habits`, {
        method: "GET",
        headers: { "Authorization": token }
    })
    .then(res => res.json())
    .then(habits => {
        const habitList = document.getElementById("habitList");
        habitList.innerHTML = "";
        
        if (habits.length === 0) {
            habitList.innerHTML = '<div class="empty-message">No habits yet. Add one to get started!</div>';
            return;
        }
        
        habits.forEach(habit => {
            const habitItem = document.createElement("div");
            habitItem.className = "habit-item";
            habitItem.innerHTML = `
                <span class="habit-title">${habit.title}</span>
                <button class="delete-btn" onclick="deleteHabit('${habit._id}')">Delete</button>
            `;
            habitList.appendChild(habitItem);
        });
    })
    .catch(err => console.error("Error loading habits:", err));
}

function addHabit() {
    const token = localStorage.getItem("token");
    const habitTitle = document.getElementById("habitTitle").value.trim();
    
    if (!habitTitle) {
        alert("Please enter a habit title");
        return;
    }

    fetch(`${API}/habits`, {
        method: "POST",
        headers: { 
            "Authorization": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: habitTitle })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("habitTitle").value = "";
        loadHabits();
    })
    .catch(err => console.error("Error adding habit:", err));
}

function deleteHabit(habitId) {
    const token = localStorage.getItem("token");
    
    fetch(`${API}/habits/${habitId}`, {
        method: "DELETE",
        headers: { "Authorization": token }
    })
    .then(res => res.json())
    .then(data => {
        loadHabits();
    })
    .catch(err => console.error("Error deleting habit:", err));
}

function logout() {
    localStorage.removeItem("token");
    window.location = "index.html";
}

function initPage() {
    const path = window.location.pathname || '';
    if (path.endsWith('dashboard.html') || path.endsWith('/dashboard.html')) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", loadHabits);
        } else {
            loadHabits();
        }
    }
}

initPage();
