import { container, showLoginForm } from "../utils/dom.js";

export function logout() {
  localStorage.removeItem("jwt");
  container.innerHTML = "";
  showLoginForm();
}
