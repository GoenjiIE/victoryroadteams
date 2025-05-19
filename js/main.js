document.addEventListener("DOMContentLoaded", () => {
  fetch("data/characters.json")
    .then((res) => res.json())
    .then((characters) => {
      const container = document.getElementById("character-list");
      characters.forEach((char) => {
        const card = document.createElement("div");
        card.className = "character-card";
        card.innerHTML = `
          <img src="${char.sprite}" alt="${char.name}" width="100">
          <h3>${char.name}</h3>
          <p>${char.position} | ${char.affinity}</p>
          <p>TP: ${char.stats.TP} | Kick: ${char.stats.Kick}</p>
        `;
        container.appendChild(card);
      });
    })
    .catch((err) => console.error("Error cargando personajes:", err));
});
