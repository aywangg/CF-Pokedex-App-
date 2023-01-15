let pokemonList= [
  {name: "Charzard", type: ["flying", "fire"], height: "1.7"}
  {name: "Venusaur", type: ["poison", "grass"], height: "2"}
  {name: "Dragonite", type: ["dragon", "flying"], height: "2.2"}
 ];

function myLoop(list){
  document.write(list.name = " - Height: " + list.height + "<br>");
}
pokemonList.forEach(myLoop);

{
  if (pokemonList[i].height > 0.5 && pokemonList[i].height < 1){
    document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + " m) - That's as tall as a baseball bat!" + "<br>")
  }else if (pokemonList[i].height < 2){
    document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + " m) - That's as tall as Michael Jordan!" + "<br>")
  }else {
    document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + " m) - Wow, that is tall!" + "<br>")
  }
 }

 function printArrayDetails(list){
  for (let i=0; i < list.length; i++){
    document.write("<p>" + list[i].name + "</p>")
    console.log(list[i].name);
  }
 }

 printArrayDetails(pokemonstList);
 
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

