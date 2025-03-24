const conntenaire_prog = document.getElementById("progress-container");

function createProgressCircle(label, percentage, color) {
    const progressDiv = document.createElement("div");
    progressDiv.classList.add("progress-circle");
    progressDiv.style.setProperty("--clr", color);

    const circleSize = 70;
    const radius = 70;

    progressDiv.innerHTML = `
      <svg>
        <circle cx="${circleSize}" cy="${circleSize}" r="${radius}"></circle>
        <circle class="progress-ring" cx="${circleSize}" cy="${circleSize}" r="${radius}" stroke="${color}"></circle>
      </svg>
      <div class="indicator">
        <span class="percentage">0</span>
        <span class="text">${label}</span>
      </div>
    `;

    return progressDiv; 
}

function updateProgress(circle, percentage) {
    if (!circle) return;
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    circle.style.transition = "stroke-dashoffset 1.5s ease-in-out";
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = strokeDashoffset;

    circle.getBoundingClientRect();
}

// Fonction pour animer le pourcentage
function animateValue(obj, start, end, duration) {
    if (!obj) return;
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start) + "%";
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Fonction pour mettre à jour la progression de tous les cercles
function setProgress(progressData) {
    const circles = document.querySelectorAll(".progress-ring");
    const percentages = document.querySelectorAll(".percentage");

    if (circles.length < Object.keys(progressData).length || percentages.length < Object.keys(progressData).length) {
        console.error("Éléments manquants, vérifiez votre HTML.");
        return;
    }

    Object.values(progressData).forEach((data, index) => {
        updateProgress(circles[index], data.percentage);
        animateValue(percentages[index], 0, data.percentage, 1500);
    });
}

// Données des progressions
const progressData = {
    "Piscine-Go": { percentage: 84, color: "#00ADD8" },
    "Piscine-Js": { percentage: 87, color: "#fee800" },
    "Modules": { percentage: 94, color: "#fff" },
    "Checkpoint": { percentage: 100, color: "#ff2972" },
};

// Ajout dynamique des cercles de progression
Object.entries(progressData).forEach(([label, { percentage, color }]) => {
    conntenaire_prog.appendChild(createProgressCircle(label, percentage, color));
});

// Attendre que le DOM soit chargé et démarrer l'animation
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => setProgress(progressData), 500);
});
