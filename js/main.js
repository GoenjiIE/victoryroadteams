const charactersContainer = document.getElementById('charactersContainer');
const positionFilter = document.getElementById('positionFilter');
const affinityFilter = document.getElementById('affinityFilter');
const genderFilter = document.getElementById('genderFilter');

let characters = [];

function loadCharacters() {
  fetch('characters.json')
    .then(res => res.json())
    .then(data => {
      characters = data;
      renderCharacters(characters);
    })
    .catch(() => {
      charactersContainer.textContent = "Failed to load characters.";
    });
}

function renderCharacters(charactersToRender) {
  charactersContainer.innerHTML = '';
  if (charactersToRender.length === 0) {
    charactersContainer.textContent = "No characters match the filter.";
    return;
  }

  charactersToRender.forEach(character => {
    const card = document.createElement('div');
    card.classList.add('characterCard');
    card.innerHTML = `
      <a href="character.html?id=${character.id}">
        <img src="sprites/characters/${character.id}.png" alt="${character.name}" width="100" height="100" />
      </a>
      <p>${character.name}</p>
      <div class="icons">
        <img src="sprites/positions/${character.position}.png" alt="${character.position}" title="Position" width="30" height="30" />
        <img src="sprites/affinities/${character.affinity}.png" alt="${character.affinity}" title="Affinity" width="30" height="30" />
        <img src="sprites/gender/${character.gender}.png" alt="${character.gender}" title="Gender" width="30" height="30" />
      </div>
    `;
    charactersContainer.appendChild(card);
  });
}

function applyFilters() {
  const posVal = positionFilter.value;
  const affVal = affinityFilter.value;
  const genVal = genderFilter.value;

  const filtered = characters.filter(char => {
    return (posVal === '' || char.position === posVal) &&
           (affVal === '' || char.affinity === affVal) &&
           (genVal === '' || char.gender === genVal);
  });

  renderCharacters(filtered);
}

positionFilter.addEventListener('change', applyFilters);
affinityFilter.addEventListener('change', applyFilters);
genderFilter.addEventListener('change', applyFilters);

loadCharacters();
