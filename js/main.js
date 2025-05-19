fetch("data/characters.json")
  .then(response => response.json())
  .then(characters => {
    const container = document.getElementById("characters-container");

    characters.forEach(character => {
      const card = document.createElement("div");
      card.classList.add("character-card");
      card.setAttribute("data-position", character.position.toUpperCase());
      card.setAttribute("data-gender", character.gender.toLowerCase());
      card.setAttribute("data-affinity", character.affinity.toLowerCase());

      const img = document.createElement("img");
      img.src = character.sprite;
      img.alt = character.name;
      img.classList.add("sprite");

      const name = document.createElement("h3");
      name.textContent = character.name;

      // Affinity icon
      const affinityImg = document.createElement("img");
      affinityImg.src = `sprites/affinities/${character.affinity.toLowerCase()}.png`;
      affinityImg.alt = character.affinity;
      affinityImg.classList.add("icon");
      affinityImg.title = character.affinity;

      // Position icon
      const positionImg = document.createElement("img");
      positionImg.src = `sprites/positions/${character.position.toLowerCase()}.png`;
      positionImg.alt = character.position;
      positionImg.classList.add("icon");
      positionImg.title = character.position;

      // Gender icon
      const genderImg = document.createElement("img");
      genderImg.src = `sprites/gender/${character.gender.toLowerCase()}.png`;
      genderImg.alt = character.gender;
      genderImg.classList.add("icon");
      genderImg.title = character.gender;

      card.appendChild(img);
      card.appendChild(name);
      card.appendChild(affinityImg);
      card.appendChild(positionImg);
      card.appendChild(genderImg);

      container.appendChild(card);
    });

    applyFilters();
  });

document.getElementById("filter-position").addEventListener("change", applyFilters);
document.getElementById("filter-gender").addEventListener("change", applyFilters);
document.getElementById("filter-affinity").addEventListener("change", applyFilters);

function applyFilters() {
  const filterPos = document.getElementById("filter-position").value.toUpperCase();
  const filterGen = document.getElementById("filter-gender").value.toLowerCase();
  const filterAff = document.getElementById("filter-affinity").value.toLowerCase();

  const cards = document.querySelectorAll(".character-card");

  cards.forEach(card => {
    const pos = card.getAttribute("data-position");
    const gen = card.getAttribute("data-gender");
    const aff = card.getAttribute("data-affinity");

    const matchesPos = filterPos === "ALL" || pos === filterPos;
    const matchesGen = filterGen === "all" || gen === filterGen;
    const matchesAff = filterAff === "all" || aff === filterAff;

    card.style.display = (matchesPos && matchesGen && matchesAff) ? "block" : "none";
  });
}
