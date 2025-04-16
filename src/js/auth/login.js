import { initializeProfilePage } from "../display.js";
import { container } from "../utils/dom.js";

export async function login(username, password) {
  try {
    const credentials = btoa(`${username}:${password}`);
    const response = await fetch(
      "https://learn.zone01oujda.ma/api/auth/signin",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (typeof data === "string") {
      localStorage.setItem("jwt", data);
    } else if (data.token) {
      localStorage.setItem("jwt", data.token);
    } else {
      throw new Error("No token received");
    }

    document.title = "Profile";
    container.innerHTML = "";
    initializeProfilePage();
  } catch (error) {
    console.error("Login error:", error.message);
    const errorMessage = document.createElement("div");
    errorMessage.id = "error-message";
    container.prepend(errorMessage);

    if (errorMessage) {
      errorMessage.textContent = "User does not exist or password incorrect";
      errorMessage.style.display = "block";
      setTimeout(() => {
        errorMessage.textContent = "";
        errorMessage.style.display = "none";
      }, 2000);
    }
  }
}
