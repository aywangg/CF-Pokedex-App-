let pokemonList = (function () {

let pokemonList= [
  {name: "Charzard", type: ["flying", "fire"], height: "1.7"},
  {name: "Venusaur", type: ["poison", "grass"], height: "2"},
  {name: "Dragonite", type: ["dragon", "flying"], height: "2.2"},
 ];

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

function showDetails(pokemon) {
  console.log (event);
}

return {
  getAll: getAll,
  add: add
  addListItem: addListItem
  showDetails: showDetails
};
})();

console.log(pokemonList.getAll());

pokemonList.getAll().forEach(function (pokemon) {
  pokemonList.addListItem(pokemon);
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

