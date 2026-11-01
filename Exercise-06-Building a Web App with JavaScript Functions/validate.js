
// Experiment 5: JavaScript Form Validation

const loginSection = document.getElementById("loginSection");
const registerSection = document.getElementById("registerSection");
const statusMessage = document.getElementById("statusMessage");

// Switch between Sign In and Create Account
document.getElementById("showRegister").addEventListener("click", function () {
    loginSection.hidden = true;
    registerSection.hidden = false;
    clearErrors();
});

document.getElementById("showLogin").addEventListener("click", function () {
    registerSection.hidden = true;
    loginSection.hidden = false;
    clearErrors();
});

// Validation functions
function isEmpty(value) {
    return value.trim() === "";
}

function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email.trim());
}

function isStrongPassword(password) {
    return password.length >= 8;
}

function showError(id, message) {
    document.getElementById(id).textContent = message;
}

function clearErrors() {
    document.querySelectorAll(".error").forEach(function (element) {
        element.textContent = "";
    });

    statusMessage.textContent = "";
}

// Read registered users from browser storage
function getUsers() {
    try {
        return JSON.parse(localStorage.getItem("portfolioUsers")) || [];
    } catch (error) {
        return [];
    }
}

// Save registered users
function saveUsers(users) {
    localStorage.setItem("portfolioUsers", JSON.stringify(users));
}

// Validate registration form
document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();

    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim().toLowerCase();
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    let valid = true;

    if (isEmpty(name)) {
        showError("regNameError", "Name is required.");
        valid = false;
    } else if (name.length < 3) {
        showError("regNameError", "Name must contain at least 3 characters.");
        valid = false;
    }

    if (isEmpty(email)) {
        showError("regEmailError", "Email is required.");
        valid = false;
    } else if (!isValidEmail(email)) {
        showError("regEmailError", "Enter a valid email address.");
        valid = false;
    }

    if (isEmpty(password)) {
        showError("regPasswordError", "Password is required.");
        valid = false;
    } else if (!isStrongPassword(password)) {
        showError("regPasswordError", "Use at least 8 characters.");
        valid = false;
    }

    if (password !== confirmPassword) {
        showError("confirmPasswordError", "Passwords do not match.");
        valid = false;
    }

    if (!valid) {
        return;
    }

    const users = getUsers();

    if (users.some(function (user) {
        return user.email === email;
    })) {
        showError("regEmailError", "This email is already registered.");
        return;
    }

    // Demonstration only: localStorage is not secure for passwords.
    users.push({
        name: name,
        email: email,
        password: password
    });

    try {
        saveUsers(users);
    } catch (error) {
        statusMessage.textContent =
            "Registration could not be saved in this browser.";
        return;
    }

    document.getElementById("registerForm").reset();
    registerSection.hidden = true;
    loginSection.hidden = false;

    statusMessage.textContent =
        "Registration successful! Please sign in.";

    document.getElementById("loginEmail").value = email;
});

// Validate sign-in form
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;

    let valid = true;

    if (isEmpty(email)) {
        showError("loginEmailError", "Email is required.");
        valid = false;
    } else if (!isValidEmail(email)) {
        showError("loginEmailError", "Enter a valid email address.");
        valid = false;
    }

    if (isEmpty(password)) {
        showError("loginPasswordError", "Password is required.");
        valid = false;
    }

    if (!valid) {
        return;
    }

    const users = getUsers();

    const user = users.find(function (item) {
        return item.email === email && item.password === password;
    });

    if (user) {
        // Allow the portfolio to open for this browser session.
        sessionStorage.setItem("portfolioLoggedIn", "true");
        sessionStorage.setItem("portfolioUser", user.name);

        window.location.href = "index.html";
    } else {
        statusMessage.textContent =
            "Account not found or password incorrect. Please register or try again.";
    }
});
