fetch("data/characters.json")
  .then(response => response.json())
  .then(personajes => {
    const container = document.getElementById("personajes-container");

    personajes.forEach(personaje => {
      const card = document.createElement("div");
      card.classList.add("personaje-card");
      card.setAttribute("data-posicion", personaje.posicion.toUpperCase());

      const img = document.createElement("img");
      img.src = personaje.sprite;
      img.alt = personaje.nombre;

      const nombre = document.createElement("h3");
      nombre.textContent = personaje.nombre;

      const posicion = document.createElement("p");
      posicion.textContent = `Posición: ${personaje.posicion}`;

      const afinidad = document.createElement("p");
      afinidad.textContent = `Afinidad: ${personaje.afinidad}`;

      const rol = document.createElement("p");
      rol.textContent = `Rol: ${personaje.rol}`;

      card.appendChild(img);
      card.appendChild(nombre);
      card.appendChild(posicion);
      card.appendChild(afinidad);
      card.appendChild(rol);

      container.appendChild(card);
    });

    aplicarFiltro(); // Inicializa el filtro después de cargar
  });

// Filtro por posición
document.getElementById("filtro-posicion").addEventListener("change", aplicarFiltro);

function aplicarFiltro() {
  const seleccion = document.getElementById("filtro-posicion").value.toUpperCase();
  const cards = document.querySelectorAll(".personaje-card");

  cards.forEach(card => {
    const posicion = card.getAttribute("data-posicion").toUpperCase().trim();

    if (seleccion === "TODOS" || posicion === seleccion) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
