const characterList = document.getElementById("characterList");
const positionFilter = document.getElementById("positionFilter");
const affinityFilter = document.getElementById("affinityFilter");
const genderFilter = document.getElementById("genderFilter");

let characters = [];

function loadCharacters() {
  fetch('characters.json')
    .then(res => res.json())
    .then(data => {
      characters = data;
      displayCharacters();
    });
}

function displayCharacters() {
  const pos = positionFilter.value;
  const aff = affinityFilter.value;
  const gen = genderFilter.value;

  const filtered = characters.filter(c => {
    return (!pos || c.position === pos) &&
           (!aff || c.affinity === aff) &&
           (!gen || c.gender === gen);
  });

  characterList.innerHTML = filtered.map(c => `
    <div class="character-card" onclick="location.href='character.html?id=${c.id}'">
      <img src="sprites/characters/${c.id}.png" alt="${c.name}" width="80" />
      <p>${c.name}</p>
    </div>
  `).join('');
}

positionFilter.addEventListener("change", displayCharacters);
affinityFilter.addEventListener("change", displayCharacters);
genderFilter.addEventListener("change", displayCharacters);

loadCharacters();
