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

      // AFINIDAD → sprite
      const afinidadImg = document.createElement("img");
      const afinidadLower = personaje.afinidad.toLowerCase();
      afinidadImg.src = `sprites/afinidades/${afinidadLower}.png`;
      afinidadImg.alt = personaje.afinidad;
      afinidadImg.classList.add("icono");
      afinidadImg.title = personaje.afinidad;

      // POSICIÓN → sprite
      const posicionImg = document.createElement("img");
      const posicionLower = personaje.posicion.toLowerCase();
      posicionImg.src = `sprites/posiciones/${posicionLower}.png`;
      posicionImg.alt = personaje.posicion;
      posicionImg.classList.add("icono");
      posicionImg.title = personaje.posicion;

      // GÉNERO → sprite
      const generoImg = document.createElement("img");
      const generoLower = personaje.genero.toLowerCase();
      generoImg.src = `sprites/genero/${generoLower}.png`;
      generoImg.alt = personaje.genero;
      generoImg.classList.add("icono");
      generoImg.title = personaje.genero;

      card.appendChild(img);
      card.appendChild(nombre);
      card.appendChild(afinidadImg);
      card.appendChild(posicionImg);
      card.appendChild(generoImg);

      container.appendChild(card);
    });

    aplicarFiltros();
  });

document.getElementById("filtro-posicion").addEventListener("change", aplicarFiltros);
document.getElementById("filtro-genero").addEventListener("change", aplicarFiltros);

function aplicarFiltros() {
  const filtroPos = document.getElementById("filtro-posicion").value.toUpperCase();
  const filtroGen = document.getElementById("filtro-genero").value.toLowerCase();

  const cards = document.querySelectorAll(".personaje-card");

  cards.forEach(card => {
    const pos = card.getAttribute("data-posicion").toUpperCase();
    const gen = card.getAttribute("data-genero").toLowerCase();

    const coincidePos = filtroPos === "TODOS" || pos === filtroPos;
    const coincideGen = filtroGen === "todos" || gen === filtroGen;

    card.style.display = (coincidePos && coincideGen) ? "block" : "none";
  });
}
