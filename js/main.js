async function loadCharacters() {
  const response = await fetch("data/characters.json");
  const data = await response.json();
  return data;
}

function createCharacterCard(character) {
  const card = document.createElement("div");
  card.className = "character-card";

  const sprite = document.createElement("img");
  sprite.src = `sprites/characters/${character.name}.png`;
  sprite.alt = character.name;
  card.appendChild(sprite);

  const name = document.createElement("div");
  name.textContent = character.name.replace(/_/g, " ");
  name.style.marginTop = "10px";
  card.appendChild(name);

  const icons = document.createElement("div");
  icons.className = "attribute-icons";

  const positionIcon = document.createElement("img");
  positionIcon.src = `sprites/positions/${character.position}.png`;
  positionIcon.alt = character.position;
  icons.appendChild(positionIcon);

  const affinityIcon = document.createElement("img");
  affinityIcon.src = `sprites/affinities/${character.affinity}.png`;
  affinityIcon.alt = character.affinity;
  icons.appendChild(affinityIcon);

  const genderIcon = document.createElement("img");
  genderIcon.src = `sprites/gender/${character.gender}.png`;
  genderIcon.alt = character.gender;
  icons.appendChild(genderIcon);

  card.appendChild(icons);
  return card;
}

function renderCharacters(characters) {
  const list = document.getElementById("characterList");
  list.innerHTML = "";

  characters.forEach(character => {
    list.appendChild(createCharacterCard(character));
  });
}

function applyFilters(characters) {
  const pos = document.getElementById("positionFilter").value;
  const aff = document.getElementById("affinityFilter").value;
  const gen = document.getElementById("genderFilter").value;

  return characters.filter(c =>
    (!pos || c.position === pos) &&
    (!aff || c.affinity === aff) &&
    (!gen || c.gender === gen)
  );
}

document.addEventListener("DOMContentLoaded", async () => {
  const allCharacters = await loadCharacters();
  renderCharacters(allCharacters);

  document.querySelectorAll(".filters select").forEach(select => {
    select.addEventListener("change", () => {
      const filtered = applyFilters(allCharacters);
      renderCharacters(filtered);
    });
  });
});
