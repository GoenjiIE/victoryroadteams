// Utilidades
function getQueryParam(param) {
  const url = new URL(window.location.href);
  return url.searchParams.get(param);
}
function escapeHTML(str) {
  return (str+"").replace(/[&<>"']/g, s => (
    { "&":"&amp;", "<":"&lt;", ">":"&gt;", "\"":"&quot;", "'":"&#39;" }[s]
  ));
}
function formatName(name) {
  // Ej: "mark evans" => "Mark Evans"
  return name.replace(/\b\w/g, l => l.toUpperCase());
}
function getSpritePath(char) {
  // Asume nombre en snake_case: "Mark Evans" => mark_evans.png
  return `sprites/characters/${char.name.toLowerCase().replace(/ /g,"_")}.png`;
}
function getIconPath(type, value) {
  // type: 'positions', 'affinities', 'gender'
  // value: 'GK', 'fire', 'male', etc.
  let fname = value.toLowerCase();
  return `sprites/${type}/${fname}.png`;
}
function createIconImg(type, value, alt) {
  return `<img src="${getIconPath(type, value)}" alt="${alt}" title="${alt}">`;
}

// --- INICIO DEL PANEL DE PARÁMETROS ---
function renderParamPanel(stats) {
  if (!stats) return "";
  return `
  <div style="margin:2rem auto; max-width:350px;">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <div class="relative w-[320px] h-[320px] rounded-lg bg-white border border-gray-300 p-4 flex flex-col items-center mx-auto">
      <div class="flex items-center w-full mb-2">
        <div class="flex items-center justify-center w-10 h-10 bg-blue-700 rounded-l-md">
          <span class="text-white font-bold text-lg">21</span>
          <span class="text-white text-xs font-bold ml-0.5">.</span>
        </div>
        <i class="fas fa-chevron-left text-blue-700 text-2xl ml-2"></i>
        <h1 class="text-blue-700 text-3xl font-extrabold ml-4 tracking-widest">PARÁMETROS</h1>
      </div>
      <div class="relative w-full h-full max-w-[280px] max-h-[280px] rounded-lg bg-white border border-gray-300 p-4 grid grid-cols-3 grid-rows-3 gap-y-2 gap-x-1 text-center text-blue-900">
        <!-- POTENCIA -->
        <div class="col-start-2 row-start-1">
          <div class="flex justify-center items-center space-x-1 mb-0.5">
            <span class="bg-red-600 text-white text-xs font-bold px-1 rounded">${stats.potencia.tags[0]}</span>
            <span class="text-[38px] font-extrabold leading-none">${stats.potencia.base}</span>
            <span class="text-yellow-500 text-xl font-bold leading-none">${stats.potencia.max}</span>
          </div>
          <hr class="border-blue-900 border-[1.5px] w-16 mx-auto mb-0.5" />
          <div class="text-sm font-semibold tracking-widest">POTENCIA</div>
        </div>
        <!-- TÉCNICA -->
        <div class="col-start-1 row-start-2 text-left pl-2">
          <div class="flex items-center space-x-1 mb-0.5">
            <span class="bg-yellow-400 text-black text-xs font-bold px-1 rounded">${stats.tecnica.tags[0]}</span>
            <span class="text-[30px] font-extrabold leading-none">${stats.tecnica.base}</span>
            <span class="text-yellow-500 text-xl font-bold leading-none">${stats.tecnica.max}</span>
          </div>
          <hr class="border-blue-900 border-[1.5px] w-16" />
          <div class="text-sm font-semibold tracking-widest">TÉCNICA</div>
        </div>
        <!-- CONTROL -->
        <div class="col-start-3 row-start-2 text-right pr-2">
          <div class="flex justify-end items-center space-x-1 mb-0.5">
            <span class="bg-red-600 text-white text-xs font-bold px-1 rounded">${stats.control.tags[0]}</span>
            <span class="bg-yellow-400 text-black text-xs font-bold px-1 rounded ml-0.5">${stats.control.tags[1]}</span>
            <span class="text-[30px] font-extrabold leading-none ml-1">${stats.control.base}</span>
            <span class="text-yellow-500 text-xl font-bold leading-none">${stats.control.max}</span>
          </div>
          <hr class="border-blue-900 border-[1.5px] w-16 ml-auto" />
          <div class="text-sm font-semibold tracking-widest">CONTROL</div>
        </div>
        <!-- INTELIGENCIA -->
        <div class="col-start-1 row-start-3 text-left pl-2">
          <div class="flex items-center space-x-1 mb-0.5">
            <span class="text-[30px] font-extrabold leading-none">${stats.inteligencia.base}</span>
            <span class="text-yellow-500 text-xl font-bold leading-none">${stats.inteligencia.max}</span>
          </div>
          <hr class="border-blue-900 border-[1.5px] w-16" />
          <div class="flex items-center space-x-1 text-sm font-semibold tracking-widest">
            <span>INTELIGENCIA</span>
            <span class="bg-blue-300 text-blue-900 text-xs font-bold px-1 rounded ml-1">${stats.inteligencia.tags[0]}</span>
            <span class="bg-yellow-400 text-black text-xs font-bold px-1 rounded ml-0.5">${stats.inteligencia.tags[1]}</span>
          </div>
        </div>
        <!-- PRESIÓN -->
        <div class="col-start-3 row-start-3 text-right pr-2">
          <div class="flex justify-end items-center space-x-1 mb-0.5">
            <span class="text-[30px] font-extrabold leading-none">${stats.presion.base}</span>
            <span class="text-yellow-500 text-xl font-bold leading-none">${stats.presion.max}</span>
          </div>
          <hr class="border-blue-900 border-[1.5px] w-16 ml-auto" />
          <div class="flex justify-end items-center space-x-1 text-sm font-semibold tracking-widest">
            <span>PRESIÓN</span>
            <span class="bg-blue-300 text-blue-900 text-xs font-bold px-1 rounded ml-1">${stats.presion.tags[0]}</span>
          </div>
        </div>
        <!-- AGILIDAD -->
        <div class="col-start-2 row-start-4 text-center mt-2">
          <div class="flex justify-center items-center space-x-1 mb-0.5">
            <span class="text-[30px] font-extrabold leading-none">${stats.agilidad.base}</span>
            <span class="text-yellow-500 text-xl font-bold leading-none">${stats.agilidad.max}</span>
          </div>
          <hr class="border-blue-900 border-[1.5px] w-16 mx-auto mb-0.5" />
          <div class="text-sm font-semibold tracking-widest">AGILIDAD</div>
          <div class="text-xs font-semibold tracking-widest text-blue-900 mt-0.5">
            POR
          </div>
        </div>
        <!-- FÍSICO -->
        <div class="col-start-3 row-start-4 text-center mt-2">
          <div class="flex justify-center items-center space-x-1 mb-0.5">
            <span class="text-[30px] font-extrabold leading-none">${stats.fisico.base}</span>
            <span class="text-yellow-500 text-xl font-bold leading-none">${stats.fisico.max}</span>
          </div>
          <hr class="border-blue-900 border-[1.5px] w-16 mx-auto mb-0.5" />
          <div class="text-sm font-semibold tracking-widest">FÍSICO</div>
          <div class="flex justify-center items-center space-x-1 text-xs font-semibold tracking-widest text-blue-900 mt-0.5">
            <span>POR</span>
            <span class="bg-blue-300 text-blue-900 text-xs font-bold px-1 rounded">DC</span>
          </div>
        </div>
        <!-- Círculo central e iconos -->
        <div class="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full bg-black flex justify-center items-center">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute top-0 left-0">
            <circle cx="60" cy="60" r="58" stroke="white" stroke-width="4"/>
            <polygon points="60,20 90,40 90,80 60,100 30,80 30,40" fill="#3b82f6" />
          </svg>
          <div class="absolute top-[10px] left-[50%] -translate-x-1/2 text-white text-xl">
            <i class="fas fa-futbol"></i>
          </div>
          <div class="absolute top-[35%] right-[10px] text-white text-xl">
            <i class="fas fa-basketball-ball"></i>
          </div>
          <div class="absolute bottom-[35%] right-[10px] text-white text-xl">
            <i class="fas fa-user-friends"></i>
          </div>
          <div class="absolute bottom-[10px] left-[50%] -translate-x-1/2 text-white text-xl">
            <i class="fas fa-running"></i>
          </div>
          <div class="absolute bottom-[35%] left-[10px] text-white text-xl">
            <i class="fas fa-shoe-prints"></i>
          </div>
          <div class="absolute top-[35%] left-[10px] text-white text-xl">
            <i class="fas fa-lightbulb"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}
// --- FIN DEL PANEL DE PARÁMETROS ---

// Renderizado de ficha de personaje + panel de stats
if (document.getElementById('char-detail-card')) {
  let characters = [];
  fetch('data/characters.json')
    .then(res => res.json())
    .then(data => {
      characters = data;
      showCharacter();
    });

  function showCharacter() {
    const nameParam = getQueryParam('name');
    if (!nameParam) return notFound();

    const char = characters.find(c => c.name.toLowerCase() === nameParam.toLowerCase());
    if (!char) return notFound();

    document.title = `${formatName(char.name)} - Victory Road Team Builder`;
    document.getElementById('char-detail-card').innerHTML = `
      <img class="char-img-lg" src="${getSpritePath(char)}" alt="${escapeHTML(char.name)}">
      <div class="char-name-lg">${escapeHTML(formatName(char.name))}</div>
      <div class="char-icons-lg">
        ${createIconImg('positions', char.position, char.position)}
        ${createIconImg('affinities', char.affinity, char.affinity)}
        ${createIconImg('gender', char.gender, char.gender)}
      </div>
      ${
        char.description ?
        `<div class="char-desc">${escapeHTML(char.description)}</div>` : ''
      }
    `;
    // Panel de stats si existen
    document.getElementById('param-panel').innerHTML = char.stats ? renderParamPanel(char.stats) : "";
  }

  function notFound() {
    document.getElementById('char-detail-card').innerHTML =
      '<div style="color:#c00">Personaje no encontrado.</div>';
    document.getElementById('param-panel').innerHTML = "";
  }
}
