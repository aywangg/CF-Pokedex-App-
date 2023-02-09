let pokemonRepository = (function () {
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1000';
  let pokemonList= [];

  function getAll () {
    return pokemonList;
  }  

  function add(pokemon) {
    if (typeof pokemon === 'object') {
      pokemonList.push(pokemon);
    } else {
      alert ('Please enter a Pokemon object');
    }
  }

  function addListItem (pokemon){
    let pokemonName = pokemon.name;
    let pokemonCapped = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    let list = document.querySelector('ul');
    list.classList.add('list-group', 'list-group-horizontal');
    let listItem = document.createElement('li');
    listItem.classList.add('group-list-item');
    let button = document.createElement('button');
    button.innerText = pokemonCapped;
    button.classList.add(
      'pokemon=button',
      'show-modal',
      'btn',
      'btn-primary'
    );
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '.modal');
    listItem.appendChild(button);
    list.appendChild(listItem);
    addListener(button, pokemon);
  }

  function addListener(element, pokemon) {
    element.addEventListener('click', function () {
      showModal(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageFront = details.sprites.front_default;
        item.imageBack = details.sprites.back_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
        item.abilities = details.abilities;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

function showModal (pokemon){
  loadDetails(pokemon).then(function (){
    let modalTitle = $('.modal-title');
    modalTitle.empty();
    let pokemonCapped = 
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    modalTitle.append(pokeCapped);

    let modalBody = $('.modal-body');
    modalBody.empty();
    modalBody.append(
      `<img class="modal-image" src="${pokemon.imageFront}">`
    );
    modalBody.append(
      `<img class="modal-image" src="${pokemon.imageBack}">`
    );
    modalBody.append(`<p>Height: ${pokemon.height}</p>`);
    modalBody.append(`<p>Weight: ${pokemon.weight}</p>`);

    let types = pokemon.types;
    let typesList = '';
    for (let i = 0; i < types.length; i++) {
      if (i < types.length - 1) {
        typesList += types[i].type.name + ', ';
      } else {
        typesList += types[i].type.name;
      }
    }
    modalBody.append(`<p>Types: ${typesList}</p>`);

    let abilities = pokemon.abilities;
    let abilityList = '';
    for (let i = 0; i < abilities.length; i++) {
      if (i < abilities.length - 1) {
        abilityList += abilities[i].ability.name + ', ';
      } else {
        abilityList += abilities[i].ability.name;
      }
    }
    modalBody.append(`<p>Abilities: ${abilityList}</p>`);
  });
}

function hideModal() {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.remove('is-visible');
}

window.addEventListener('keydown', (e) => {
  let modalContainer = document.querySelector('#modal-container');
  if (
    e.key === 'Escape' &&
    modalContainer.classList.contains('is-visible')
  ) {
    hideModal();
  }
});

return {
  getAll: getAll,
  add: add,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetailsModal: showDetailsModal
};
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});