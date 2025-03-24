window.onload = function () {
    document.body.classList.add("baby-theme");
    loadUserData();
    loadChildren();
    applySavedFontSize();
};
// Load user info
function loadUserData() {
    let user = localStorage.getItem("user");
    let email = localStorage.getItem("userEmail");

    if (user) {
        user = JSON.parse(user);
        document.getElementById("user-name").textContent = user.name || "Not Available";
    } else {
        document.getElementById("user-name").textContent = "Not Available";
    }

    document.getElementById("registered-email").textContent = email || "Not Logged In";
}

// Load children dropdown
function loadChildren() {
    const select = document.getElementById("child-select");
    const children = JSON.parse(localStorage.getItem("children")) || [];

    select.innerHTML = '<option value="">Child list</option>';

    children.forEach((child, index) => {
        const age = calculateAge(child.birthdate);
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${child.name} (Age: ${age})`;
        select.appendChild(option);
    });
}

// Calculate child age
function calculateAge(birthdate) {
    if (!birthdate) return "Unknown";
    const birth = new Date(birthdate);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    return age >= 0 ? age : "Unknown";
}

function changeFontSize() {
    const selectedSize = document.getElementById("font-size-select").value;
    let fontSize;

    switch (selectedSize) {
        case "small":
            fontSize = "14px";
            break;
        case "medium":
            fontSize = "16px";
            break;
        case "large":
            fontSize = "18px";
            break;
        default:
            fontSize = "16px";
    }

    // ✅ Set CSS variable globally
    document.documentElement.style.setProperty('--setting-font-size', fontSize);

    // ✅ Save it to localStorage
    localStorage.setItem("preferredFontSize", selectedSize);
}

function applySavedFontSize() {
    const savedSize = localStorage.getItem("preferredFontSize") || "medium";
    document.getElementById("font-size-select").value = savedSize;
    changeFontSize();
}