import { login } from "../auth/login.js";

export const container = document.querySelector(".container");

export const body = document.querySelector("body");

export function showLoginForm() {
  container.innerHTML = `
        <div class="wrapper">
            <form id="login-form" action="">
                <h1 class="h1"><img width="45" height="45" src="https://graphql.org/img/logo.svg" alt="">Login</h1>
                <div class="input-box">
                    <input id="username" type="text" placeholder="Username" required>
                    <i class='bx bxs-user'></i>
                </div>
                <div class="input-box">
                    <input id="password" type="password" placeholder="Password" required>
                    <i class='bx bxs-lock-alt'></i>
                </div>
                <button type="submit" class="btn">Login</button>
            </form>
        </div>`;

  const form = document.getElementById("login-form");
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      await login(username, password);
    });
  }
}

export const existingBtn = document.getElementById("disconnect-btn");

export function createDisconnectButton() {
  const button = document.createElement("button");
  button.id = "disconnect-btn";
  const icon = document.createElement("i");
  icon.classList.add("fas", "fa-power-off");
  button.appendChild(icon);
  document.body.appendChild(button);
}

export const conntenaire_prog = document.createElement("div");
conntenaire_prog.id = "progress-container";
export function createProgressCircle(label, percentage, color) {
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
        <span class="percentage"></span>
        <span class="text">${label}</span>
      </div>
    `;
  return progressDiv;
}

export function createGraphAndSelect() {
  const container = document.querySelector(".container");
  const graphContainer = document.createElement("div");
  graphContainer.classList.add("graph-container");
  graphContainer.innerHTML = `
<h1>XP progression</h1>
      <svg id="lineGraph" width="100%" height="400"></svg>
      <div id="graphInfo">
        <span id="level">5</span>
        <span id="xp">700 Kb</span>
      </div>
    `;
  container.appendChild(graphContainer);
}

export function createChartContainer() {
  const container = document.querySelector(".container");
  const chart_container = document.createElement("div");
  chart_container.id = "chart-container";
  chart_container.classList.add("card");
  chart_container.innerHTML = `<h1 class="skills">Best skills</h1>`;
  const chart_svg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  chart_svg.id = "chart";
  chart_container.appendChild(chart_svg);
  container.appendChild(chart_container);
}
