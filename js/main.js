async function loadCharacters() {
  const response = await fetch('characters.json');
  const characters = await response.json();
  displayCharacters(characters);
}

function displayCharacters(characters) {
  const container = document.getElementById('charactersContainer');
  container.innerHTML = '';

  const positionFilter = document.getElementById('positionFilter').value;
  const affinityFilter = document.getElementById('affinityFilter').value;
  const genderFilter = document.getElementById('genderFilter').value;

  const filtered = characters
    .filter(char =>
      (!positionFilter || char.position === positionFilter) &&
      (!affinityFilter || char.affinity === affinityFilter) &&
      (!genderFilter || char.gender === genderFilter)
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  filtered.forEach(char => {
    const card = document.createElement('div');
    card.className = 'character-card';
    card.onclick = () => {
      window.location.href = `character.html?id=${char.id}`;
    };

    card.innerHTML = `
      <img src="sprites/characters/${char.id}.png" alt="${char.name}" />
      <div><img src="sprites/positions/${char.position}.png" alt="${char.position}" width="24"/></div>
      <div><img src="sprites/affinities/${char.affinity}.png" alt="${char.affinity}" width="24"/></div>
      <div><img src="sprites/gender/${char.gender}.png" alt="${char.gender}" width="24"/></div>
    `;

    container.appendChild(card);
  });
}

document.getElementById('positionFilter').addEventListener('change', loadCharacters);
document.getElementById('affinityFilter').addEventListener('change', loadCharacters);
document.getElementById('genderFilter').addEventListener('change', loadCharacters);

loadCharacters();
