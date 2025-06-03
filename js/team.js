const availablePlayersContainer = document.querySelector(".available-players");
const teamFormationContainer = document.querySelector(".team-formation");
const exportButton = document.getElementById("export-team");

let allCharacters = {};
let selectedTeam = [];

function fetchCharacters() {
  fetch("data/characters.json")
    .then((res) => res.json())
    .then((data) => {
      allCharacters = data;
      renderAvailablePlayers();
      renderTeam();
    });
}

function renderAvailablePlayers() {
  availablePlayersContainer.innerHTML = "";

  const sortedNames = Object.keys(allCharacters).sort();

  sortedNames.forEach((key) => {
    const char = allCharacters[key];
    const card = document.createElement("div");
    card.className = "character-card";
    card.onclick = () => addToTeam(char);

    card.innerHTML = `
      <img class="character-sprite" src="sprites/characters/${char.name}.png" alt="${char.name}" />
      <div class="character-name">${char.name.replace(/_/g, " ")}</div>
      <div class="icons">
        <img src="sprites/positions/${char.position}.png" alt="${char.position}" />
        <img src="sprites/affinities/${char.affinity}.png" alt="${char.affinity}" />
        <img src="sprites/gender/${char.gender}.png" alt="${char.gender}" />
      </div>
    `;
    availablePlayersContainer.appendChild(card);
  });
}

function addToTeam(char) {
  if (selectedTeam.length >= 11) {
    alert("Solo puedes seleccionar 11 jugadores.");
    return;
  }
  if (selectedTeam.some(c => c.name === char.name)) {
    alert("Este jugador ya está en tu equipo.");
    return;
  }
  selectedTeam.push(char);
  renderTeam();
}

function renderTeam() {
  teamFormationContainer.innerHTML = "<h3>Tu equipo:</h3>";
  if (selectedTeam.length === 0) {
    teamFormationContainer.innerHTML += "<p>No has seleccionado jugadores aún.</p>";
    return;
  }

  const grid = document.createElement("div");
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = "repeat(auto-fit, minmax(100px, 1fr))";
  grid.style.gap = "10px";
  grid.style.marginTop = "10px";

  selectedTeam.forEach((char, index) => {
    const slot = document.createElement("div");
    slot.className = "character-card";
    slot.innerHTML = `
      <img class="character-sprite" src="sprites/characters/${char.name}.png" alt="${char.name}" />
      <div class="character-name">${char.name.replace(/_/g, " ")}</div>
      <button onclick="removeFromTeam(${index})">Quitar</button>
    `;
    grid.appendChild(slot);
  });

  teamFormationContainer.appendChild(grid);
}

function removeFromTeam(index) {
  selectedTeam.splice(index, 1);
  renderTeam();
}

exportButton.addEventListener("click", () => {
  alert("¡Funcionalidad de exportar equipo próximamente!");
});

// Iniciar app
fetchCharacters();
