let pokemonRepository = (function () {
  let pokemonList = [
    {
    name: 'Bulbasaur',
    height: 70, //Expressed in cm
    weight: 6.9, //Expressed in kg
    catchRate: 0, //Expressed in %
    evolvingLevel: 16,
    types: ['grass', 'poison']
    },
    { 
    name: 'Charmander',
    height: 60, //Expressed in cm
    weight: 8.5, //Expressed in kg
    catchRate: 0, //Expressed in %
    evolvingLevel: 16,
    types: ['fire']
    },
    { 
    name: 'Squirtle',
    height: 50, //Expressed in cm
    weight: 9, //Expressed in kg
    catchRate: 0, //Expressed in %
    evolvingLevel: 16,
    types: ['water']
    },
    { 
    name: 'Nidoran',
    height: 50, //Expressed in cm
    weight: 9, //Expressed in kg
    catchRate: 0, //Expressed in %
    evolvingLevel: 16,
    types: ['poison']
    },
    { 
    name: 'Magikarp',
    height: 90, //Expressed in cm
    weight: 10, //Expressed in kg
    catchRate: 0, //Expressed in %
    evolvingLevel: 20,
    types: ['water']
    } 
];

  return {
    add: function(pokemon) {
      //Checking if the pokemon added is an Object
      if (typeof pokemon === 'object') pokemonList.push(pokemon);
      else alert("Not a valid pokemon");
    },
    getAll: function() {
      return pokemonList;
    },
    //Find a pokemon by name
    find: function(text){
      const result = pokemonList.filter(singlePokemon => singlePokemon.name === text);
      console.log(result);
      if (result.length === 0) alert("Pokemon Not Found");
      else alert("Pokemon found");
    }
  };
})();


const container = document.querySelector(".container");
const height = 69;

//Iterate over pokemonList taking a function as parameter (Object, index, array)
let pokemonList = pokemonRepository.getAll();

pokemonList.forEach(createPokemonCard);

function createPokemonCard(singlePokemon) {
    //Create a div with pokemon__item class
    const pokemonItemDiv = document.createElement('div');
    
    //Define class name for new div
    pokemonItemDiv.className = 'pokemon__item';
    container.appendChild(pokemonItemDiv);

    //Insert text into new div
    pokemonItemDiv.innerHTML ='Name:        '+singlePokemon.name+'<br>'+
                              'Height:      '+singlePokemon.height+'<br>'+
                              'Weight:      '+singlePokemon.weight+'<br>'+
                              'Catch Rate:  '+singlePokemon.catchRate+'<br>'+
                              'Evolving at: '+singlePokemon.evolvingLevel;  
    
    //Check Height of Pokemon                              
        if (singlePokemon.height > height) pokemonItemDiv.classList.add('big__pokemon');
}

//Test for find() function
//pokemonRepository.find('Bulbasaure');

//Test for pokemonRepository.add
pokemonRepository.add({name: 'Magikarp',
    height: 90, //Expressed in cm
    weight: 10, //Expressed in kg
    catchRate: 0, //Expressed in %
    evolvingLevel: 20,
    types: ['water']});

console.table(pokemonList);


