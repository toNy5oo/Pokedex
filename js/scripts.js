let pokemonRepository = (function() {
    let pokemonList = [{
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
        find: function(text) {
            const result = pokemonList.filter(singlePokemon => singlePokemon.name === text);
            console.log(result);
            if (result.length === 0) alert("Pokemon Not Found");
            else alert("Pokemon found");
        },
        addListItem: function(pokemon) {
            //Retrieve container DIV
            const container = document.querySelector(".container");
            //Create new element and assign class name
            const pokemonItemDiv = document.createElement('div');
            pokemonItemDiv.className = 'pokemon__item';

            //Create a btn element
            let button = document.createElement('button')
            button.innerText = pokemon.name;
            button.classList.add('pokemon__name--button');

            //Invoke the function to add event listener
            pokemonRepository.ifPokemonSelected(button, pokemon);

            //adding the button to the new div
            pokemonItemDiv.appendChild(button);

            //Add the new div to the container
            container.appendChild(pokemonItemDiv);
        },
        showDetails(pokemon) {
            console.log('Selected ' + pokemon.name);
        },
        ifPokemonSelected(button, pokemon) {
            //Adding an event listener to the button
            button.addEventListener('click', function(event) {
                //Invoking the showdetails function once the user clicks on the button
                pokemonRepository.showDetails(pokemon);
            });
        }
    };
})();

//Retrieve all the pokemons in an array of Objects
//&&
//Iterate over pokemonList taking a function as parameter (addListItem)
let pokemonList = pokemonRepository.getAll().forEach(pokemon => pokemonRepository.addListItem(pokemon));