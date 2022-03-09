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

 let singlePokemon = null;
 const container = document.querySelector(".container");
 const height = 69;

for (let i = 0; i < pokemonList.length; i++) { 
    //get a single object from the array of objects in the container
    singlePokemon = pokemonList[i];  
    
    //Create a div with pokemon__item class
    const pokemonItem = document.createElement('div');
    
    //Define class name for new div
    pokemonItem.className = 'pokemon__item';
    container.appendChild(pokemonItem);
    
    //Insert text into new div
    pokemonItem.innerHTML =   'Name:        '+         singlePokemon.name+'<br>'+
                              'Height:      '+         singlePokemon.height+'<br>'+
                              'Weight:      '+         singlePokemon.weight+'<br>'+
                              'Catch Rate:  '+     singlePokemon.catchRate+'<br>'+
                              'Evolving at: '+    singlePokemon.evolvingLevel;  
    
    //Check Height of Pokemon                              
        if (singlePokemon.height > height) {
            pokemonItem.classList.add('big__pokemon');
        }
   
}

   