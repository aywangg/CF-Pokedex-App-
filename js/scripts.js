let pokemonRepository = (function () {

  let pokemonList= [];
  
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function addListItem(pokemon) {
    
    let pokemonList = document.querySelector (".pokemon-list");
    
    let listPokemon = document.createElement ("li");
    
    let button = document.createElement ("button");
    
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    button.addEventListener('click', function (event){
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

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then (function(){
      
      let modalContainer = document.querySelector ('#modal-container')
      modalContainer.innerHTML = '';
      
      let modal = document.createElement('div');
      modal.classList.add ('modal');

      let sprite = document.createElement ('img');
      sprite.classList.add ('sprite');
      sprite.src = item.imageUrl;

      let closeButtonElement = document.createElement ('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'X';
      closeButtonElement.addEventListener ('click', hideModal);

      let titleElement = document.createElement ('h1');
      titleElement.innerText = (item.name);

      let contentElement = document.createElement ('p');
      contentElement.innerText = ('Height: ' + item.height + '/n' + '/n' + 'Types: ' + item.types);

      modal.appendChild (closeButtonElement);
      modal.appendChild (titleElement);
      modal.appendChild (contentElement);
      modalContainer.appendChild (modal);
      modal.appendChild (sprite);

      modalContainer.classList.add('is-visible');
  
      function hideModal (){
        modalContainer.classList.remove ('is-visible');
      }

      window.addEventListener ('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
          hideModal();
        }
      });

      document.querySelector ('button.button.class').addEventListener('click', () => {
        showDetails ('Modal Title', 'Modal Content');
      });
    });
  }


function myLoop(list){
  document.write(list.name = " - Height: " + list.height + "<br>");
}

function add (pokemon) {
  if (
    typeof pokemon === "object" &&
    "name" in pokemon &&
    "height" in pokemon &&
    "types" in pokemon 
  ) {
  pokemonList.push(pokemon)
} else {
   console.log("pokemon is not correct");
  }
}

function getAll () {
  return pokemonList;
}

return {
  getAll: getAll,
  add: add
  addListItem: addListItem
  showDetails: showDetails
  loadList: loadList
  loadDetails: loadDetails
};
})();

console.log(pokemonRepository.getAll());

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

