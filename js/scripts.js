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

    listItem.append(button);
    pokemonListElement.append(listItem);
    
          button.on('click', function() {
        showDetails(pokemon);
      });   
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    
    let url = item.detailsUrl;
    
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon){
    loadDetails(pokemon).then(function(){
      showDetailsModal(pokemon);
    });
  }

  function showDetailsModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalBody.empty();
    modalTitle.text(pokemon.name);

    let height = $('<p>' + 'Height:  ' + pokemon.height + '</p>');
    let image = $('<img class="pokemon-img" src="' + pokemon.imageUrl + '" />');
    let types = $('<p>' + 'Types:  ' + pokemon.types + '</p>');
    let abilities = $('<p>' + 'Abilities: ' + pokemon.abilities + '</p>');
      
    modalBody.append(image);
    modalBody.append(height);
    modalBody.append(types);
    modalBody.append(abilities);

  }

return {
  getAll: getAll,
  add: add,
  addListItem: addListItem,
  showDetails: showDetails,
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