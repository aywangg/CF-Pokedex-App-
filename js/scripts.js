let pokemonRepository = (function () {

  let pokemonList= [];
  
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  let pokemonListElement = $('.pokemon-list');

  function add(pokemon) {
    pokemonList.push(pokemon);
  };

  function getAll () {
    return pokemonList;
  }  

  function addListItem(pokemon){
    let listItem = $('<li class="list-group-item"></li>');
    let button = $('<button class="pokemon-button btn btn-info" data-target="#pokemon-modal" data-toggle="modal">' + pokemon.name + '</button>');

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
  add: add
  addListItem: addListItem
  showDetails: showDetails
  loadList: loadList
  loadDetails: loadDetails
  showDetailsModal: showDetailsModal
};
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});



 /*
                                                      For Loop Code
 for (let i=0; i < pokemonList.length; i++)
 {
  if (pokemonList[i].height > 0.5 && pokemonList[i].height < 1){
    document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + " m) - That's as tall as a baseball bat!" + "<br>")
  }else if (pokemonList[i].height < 2){
    document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + " m) - That's as tall as Michael Jordan!" + "<br>")
  }else {
    document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + " m) - Wow, that is tall!" + "<br>")
  }
 }
 */

