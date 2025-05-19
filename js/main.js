fetch("data/characters.json")
  .then(response => response.json())
  .then(personajes => {
    const container = document.getElementById("personajes-container");

    personajes.forEach(personaje => {
      const card = document.createElement("div");
      card.classList.add("personaje-card");
      card.setAttribute("data-posicion", personaje.posicion.toUpperCase());
      card.setAttribute("data-genero", personaje.genero);

      const img = document.createElement("img");
      img.src = personaje.sprite;
      img.alt = personaje.nombre;

      const nombre = document.createElement("h3");
      nombre.textContent = personaje.nombre;

      const posicion = document.createElement("p");
      posicion.textContent = `Posición: ${personaje.posicion}`;

      const afinidadImg = document.createElement("img");
      const afinidadLower = personaje.afinidad.toLowerCase();
      afinidadImg.src = `sprites/afinidades/${afinidadLower}.png`;
      afinidadImg.alt = personaje.afinidad;
      afinidadImg.classList.add("afinidad-icon");
      afinidadImg.title = personaje.afinidad;

      card.appendChild(img);
      card.appendChild(nombre);
      card.appendChild(posicion);
      card.appendChild(afinidadImg);

      container.appendChild(card);
    });

    aplicarFiltros(); // aplicar filtros iniciales
  });

document.getElementById("filtro-posicion").addEventListener("change", aplicarFiltros);
document.getElementById("filtro-genero").addEventListener("change", aplicarFiltros);

function aplicarFiltros() {
  const filtroPos = document.getElementById("filtro-posicion").value.toUpperCase();
  const filtroGen = document.getElementById("filtro-genero").value;

  const cards = document.querySelectorAll(".personaje-card");

  cards.forEach(card => {
    const pos = card.getAttribute("data-posicion").toUpperCase();
    const gen = card.getAttribute("data-genero");

    const coincidePos = filtroPos === "TODOS" || pos === filtroPos;
    const coincideGen = filtroGen === "TODOS" || gen === filtroGen;

    card.style.display = (coincidePos && coincideGen) ? "block" : "none";
  });
}
