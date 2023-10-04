const link = 'https://pokeapi.co/api/v2/pokemon/';
const container = document.querySelector('.main');
const btnHeader = document.querySelector('.hero__nav');

//creamos el preloader
const preloader = document.createElement('div');
preloader.classList.add('modal');
preloader.innerHTML = `
<div class="modal__loader"></div>
`;

function activarPreloader() {
  document.body.appendChild(preloader);
}

async function fetchData(url, btnId) {
  for (let i = 1; i <= 151; i++) {
    const response = await fetch(url + i);
    const data = await response.json();

    if (btnId === 'everityngs') {
      agregarPokemon(data);
    } else {
      const tipos = data.types.map((type) => type.type.name);
      if (tipos.some((tipo) => tipo.includes(btnId))) {
        agregarPokemon(data);
      }
    }
  }

  preloader.remove();
}

function agregarPokemon(data) {
  let tipos = data.types.map(
    (type) => `<p class="info__type ${type.type.name}">${type.type.name}</p>`
  );
  tipos = tipos.join('');

  let dataId = data.id.toString();

  if (dataId.length === 1) {
    dataId = '00' + dataId;
  } else if (dataId.length === 2) {
    dataId = '0' + dataId;
  }

  let dataHeight = data.height * 0.1;
  dataHeight = dataHeight.toFixed(2);

  let dataWeight = data.weight * 0.1;
  dataWeight = dataWeight.toFixed(2);

  const section = document.createElement('section');
  section.classList.add('card');
  section.innerHTML = `
  <p class="card__bg">#${dataId}</p>

        <figure class="card__figure">
          <img
            src="${data.sprites.other['official-artwork'].front_default}"
            alt="${data.name}"
            class="card__img"
          />
        </figure>

        <div class="card__info">
          <div class="info__general">
            <p class="info__id">#${dataId}</p>
            <p class="info__name">${data.name}</p>
          </div>
          <div class="info__types">
          ${tipos}
          </div>
          <div class="info__stats">
            <p class="info__stat">${dataHeight}m</p>
            <p class="info__stat">${dataWeight}kg</p>
          </div>
        </div>
  `;

  container.append(section);
}

activarPreloader();
fetchData(link, '');

btnHeader.addEventListener('click', (e) => {
  const id = e.target.id;

  container.innerHTML = '';
  activarPreloader();
  fetchData(link, id);
});
