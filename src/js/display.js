import {
  container,
  createChartContainer,
  conntenaire_prog,
  createProgressCircle,
  createGraphAndSelect,
  createDisconnectButton,
  showLoginForm,
  body,
} from "./utils/dom.js";
import { getInformation } from "./components/profile.js";
import { setProgress } from "./components/circles.js";
import { createBarChart } from "./components/bar.js";
import { generateLineGraph } from "./components/line.js";
import { recieveData } from "./utils/fetch.js";
import { logout } from "./auth/logout.js";
import * as queries from "./data/querys.js";
import { ListUsers } from "./utils/users.js";

const getXP = (level) =>
  [0, 5, 10, 20, 35, 50, 65, 75, 85, 95, 100][level] || 0;

async function fetchData() {
  return await Promise.all([
    recieveData(queries.projects),
    recieveData(queries.info),
    recieveData(queries.level),
    recieveData(queries.skills),
    recieveData(queries.xp),
    recieveData(queries.go),
    recieveData(queries.js),
    recieveData(queries.checkpoint),
    recieveData(queries.moduleFall),
  ]);
}

function calculateProgressData(
  piscineGoRes,
  piscineJsRes,
  projects,
  faill,
  checkpointRes
) {
  const piscineGo = Math.round(
    (piscineGoRes.data.go_valid_exercise.aggregate.count /
      piscineGoRes.data.go_exercise.aggregate.count) *
      100
  );
  const piscineJs = Math.round(
    (piscineJsRes.data.js_valid_exercise.aggregate.count /
      piscineJsRes.data.js_exercise.aggregate.count) *
      100
  );
  const checkpoint = getXP(
    checkpointRes.data.valid_exercise.nodes[0].attrs.group
  );
  const modules =
    (Object.entries(projects).length /
      (Object.entries(projects).length + faill)) *
    100;

  return {
    "Piscine-Go": { percentage: piscineGo, color: "#00ADD8" },
    "Piscine-Js": { percentage: piscineJs, color: "#fee800" },
    Modules: { percentage: modules, color: "#fff" },
    Checkpoint: { percentage: checkpoint, color: "#ff2972" },
  };
}

function renderProgressCircles(progressData) {
  Object.entries(progressData).forEach(([label, { percentage, color }]) =>
    conntenaire_prog.appendChild(
      createProgressCircle(label, percentage, color)
    )
  );
  setTimeout(() => setProgress(progressData), 500);
  container.appendChild(conntenaire_prog);
}

function renderUserInfo(user, totaleXp) {
  const fullName = `${user.firstName} ${user.lastName}`;
  const xp =
    totaleXp >= 1_000_000
      ? `${(totaleXp / 1_000_000).toFixed(2)} Mb`
      : `${(totaleXp / 1_000).toFixed(2)} Kb`;
  let id = ListUsers.get(user.login)
    ? `https://discord.zone01oujda.ma/assets/pictures/3P3A${ListUsers.get(
        user.login
      )}.JPG`
    : `https://discord.zone01oujda.ma/assets/pictures/${user.login}.jpg`;

  if (ListUsers.get(user.login) === 8898) {
    id =
      "https://learn.zone01oujda.ma/git/avatars/3533b6d094d55f6212285aa44d2664d1?size=512";
  }

  getInformation(
    fullName,
    user.attrs.city,
    user.campus,
    xp,
    user.auditRatio.toFixed(1),
    id
  );
}

function renderBarChart(skillsRes) {
  createBarChart("chart", {
    Prog: skillsRes.data.user[0].skill_prog.aggregate.max.amount,
    Go: skillsRes.data.user[0].skill_go.aggregate.max.amount,
    "Back-End": skillsRes.data.user[0].skill_back_end.aggregate.max.amount,
    JS: skillsRes.data.user[0].skill_js.aggregate.max.amount,
    "Front-End": skillsRes.data.user[0].skill_front_end.aggregate.max.amount,
    HTML: skillsRes.data.user[0].skill_html.aggregate.max.amount,
    Algo: skillsRes.data.user[0].skill_algo.aggregate.max.amount,
    SQL: skillsRes.data.user[0].skill_sql.aggregate.max.amount,
    Docker: skillsRes.data.user[0].skill_docker.aggregate.max.amount,
    CSS: skillsRes.data.user[0].skill_css.aggregate.max.amount,
    Unix: skillsRes.data.user[0].skill_unix.aggregate.max.amount,
    "Sys-Admin": skillsRes.data.user[0].skill_sys_admin.aggregate.max.amount,
    Ai: skillsRes.data.user[0].skill_ai.aggregate.max.amount,
  });
}

function renderLineGraph(projects, totaleXp, level) {
  const allProject = projects.map(({ path, progress, createdAt }) => [
    path.substring(path.lastIndexOf("/") + 1),
    Math.ceil(progress),
    new Date(createdAt).getTime(),
  ]);

  createGraphAndSelect();
  generateLineGraph(allProject, totaleXp, level);
}

export async function initializeProfilePage() {
  try {
    container.innerHTML = "";
    conntenaire_prog.innerHTML = "";

    const [
      projectsRes,
      dataRes,
      levelRes,
      skillsRes,
      totaleXpRes,
      piscineGoRes,
      piscineJsRes,
      checkpointRes,
      faillModelRes,
    ] = await fetchData();

    if (
      !projectsRes ||
      !dataRes ||
      !levelRes ||
      !skillsRes ||
      !totaleXpRes ||
      !piscineGoRes ||
      !piscineJsRes ||
      !checkpointRes ||
      !faillModelRes
    ) {
      container.innerHTML = "<h1>No data available!</h1>";
      return;
    }

    const projects = projectsRes.data.projects;
    const user = dataRes.data.user[0];
    const level = levelRes.data.transaction_aggregate.aggregate.max.amount;
    const totaleXp =
      totaleXpRes.data.transaction_aggregate.aggregate.sum.amount;
    const faill = faillModelRes.data.progress_aggregate.aggregate.count;

    createDisconnectButton();
    renderUserInfo(user, totaleXp);

    const progressData = calculateProgressData(
      piscineGoRes,
      piscineJsRes,
      projects,
      faill,
      checkpointRes
    );
    renderProgressCircles(progressData);

    createChartContainer();
    renderBarChart(skillsRes);
    renderLineGraph(projects, totaleXp, level);
  } catch (error) {
    container.innerHTML = "<h1>No data available!</h1>";
  }
}

function initializeApp() {
  if (localStorage.getItem("jwt")) {
    document.title = "Profile";
    container.innerHTML = "";
    initializeProfilePage();
  } else {
    document.title = "Login";
    container.innerHTML = "";
    showLoginForm();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initializeApp();

  document.body.addEventListener("click", (e) => {
    const disconnectBtn = e.target.closest("#disconnect-btn");
    if (disconnectBtn) {
      logout();
      disconnectBtn.remove();
      document.title = "Login";
      container.innerHTML = "";
      showLoginForm();
    }
  });
});

if (localStorage.getItem("jwt")) {
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        initializeProfilePage();
      }, 300);
    });
    
    
}
