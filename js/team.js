const charactersContainer = document.getElementById("characters-container");
const teamContainer = document.getElementById("team-formation");
let selectedTeam = [];

fetch("data/characters.json")
  .then((res) => res.json())
  .then((data) => {
    renderCharacters(data);
  });

function renderCharacters(characters) {
  const sortedKeys = Object.keys(characters).sort();
  sortedKeys.forEach((key) => {
    const char = characters[key];
    const card = document.createElement("div");
    card.className = "character-card";
    card.onclick = () => addToTeam(char);

    card.innerHTML = `
      <img class="character-sprite" src="sprites/characters/${char.name}.png" alt="${char.name}">
      <div class="character-name">${char.name.replace(/_/g, " ")}</div>
      <div class="icons">
        <img src="sprites/positions/${char.position}.png" alt="${char.position}">
        <img src="sprites/affinities/${char.affinity}.png" alt="${char.affinity}">
        <img src="sprites/gender/${char.gender}.png" alt="${char.gender}">
      </div>
    `;
    charactersContainer.appendChild(card);
  });
}

function addToTeam(character) {
  if (selectedTeam.length >= 11) {
    alert("¡Solo puedes tener un máximo de 11 jugadores!");
    return;
  }

  if (selectedTeam.some(c => c.name === character.name)) {
    alert("Este personaje ya está en tu equipo.");
    return;
  }

  selectedTeam.push(character);
  renderTeam();
}

function renderTeam() {
  teamContainer.innerHTML = "";
  selectedTeam.forEach((char, index) => {
    const slot = document.createElement("div");
    slot.className = "team-slot";

    slot.innerHTML = `
      <img class="character-sprite" src="sprites/characters/${char.name}.png" alt="${char.name}">
      <div class="character-name">${char.name.replace(/_/g, " ")} (#${index + 1})</div>
      <div class="icons">
        <img src="sprites/positions/${char.position}.png" alt="${char.position}">
        <img src="sprites/affinities/${char.affinity}.png" alt="${char.affinity}">
        <img src="sprites/gender/${char.gender}.png" alt="${char.gender}">
      </div>
      <button onclick="removeFromTeam(${index})">Quitar</button>
    `;
    teamContainer.appendChild(slot);
  });
}

function removeFromTeam(index) {
  selectedTeam.splice(index, 1);
  renderTeam();
}
