function updateProgress(circle, percentage) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  circle.style.transition = "stroke-dashoffset 1.5s ease-in-out";
  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = strokeDashoffset;

  circle.getBoundingClientRect();
}

function animateValue(obj, start, end, duration) {
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

export function setProgress(progressData) {
  const circles = document.querySelectorAll(".progress-ring");
  const percentages = document.querySelectorAll(".percentage");
  Object.values(progressData).forEach((data, index) => {
    updateProgress(circles[index], data.percentage);
    animateValue(percentages[index], 0, data.percentage, 1500);
  });
}
