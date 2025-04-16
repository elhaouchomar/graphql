import { logout } from "../auth/logout.js";

export async function recieveData(query) {
  try {
    const JWT = localStorage.getItem("jwt");
    const response = await fetch(
      "https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWT}`,
        },
        body: JSON.stringify({ query }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Authentication failed: ${errorText}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    localStorage.removeItem("jwt");
    logout();
    return undefined;
  }
}
