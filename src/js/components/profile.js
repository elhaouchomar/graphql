const container = document.querySelector(".container");
export function getInformation(user, city, campus, xp, ratio, id) {
  const profile = document.createElement("div");
  profile.classList.add("profile");
  profile.innerHTML = `
    <img class="image-profile floating" src="${id}" alt="Profile picture"/>
    <div class="profile-info">
        <h1>${user}</h1>
        <p>City: ${city}</p>
        <p>Campus: ${campus}</p>
        <p>XP: ${xp}</p>
        <p>Audits ratio: ${ratio}</p>
    </div>
      `;
  container.appendChild(profile);
}
