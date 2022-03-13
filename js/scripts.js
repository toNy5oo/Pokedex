let pokemonRepository = (
    function() {

        // let pokemonList = [{
        //         name: 'Bulbasaur',
        //         height: 70, //Expressed in cm
        //         weight: 6.9, //Expressed in kg
        //         catchRate: 0, //Expressed in %
        //         evolvingLevel: 16,
        //         types: ['grass', 'poison']
        //     },
        //     {
        //         name: 'Charmander',
        //         height: 60, //Expressed in cm 
        //         weight: 8.5, //Expressed in kg
        //         catchRate: 0, //Expressed in %
        //         evolvingLevel: 16,
        //         types: ['fire']
        //     },
        //     {
        //         name: 'Squirtle',
        //         height: 50, //Expressed in cm
        //         weight: 9, //Expressed in kg
        //         catchRate: 0, //Expressed in %
        //         evolvingLevel: 16,
        //         types: ['water']
        //     },
        //     {
        //         name: 'Nidoran',
        //         height: 50, //Expressed in cm
        //         weight: 9, //Expressed in kg
        //         catchRate: 0, //Expressed in %
        //         evolvingLevel: 16,
        //         types: ['poison']
        //     },
        //     {
        //         name: 'Magikarp',
        //         height: 90, //Expressed in cm
        //         weight: 10, //Expressed in kg
        //         catchRate: 0, //Expressed in %
        //         evolvingLevel: 20,
        //         types: ['water']
        //     }
        // ];

        let pokemonList = [];
        let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

        function add(pokemon) {
            //Checking if the pokemon added is an Object
            if (typeof pokemon === 'object') pokemonList.push(pokemon);
            else alert("Not a valid pokemon");
        }

        function getAll() {
            return pokemonList;
        }

        //Find a pokemon by name
        function find(text) {
            const result = pokemonList.filter(singlePokemon => singlePokemon.name === text);
            console.log(result);
            if (result.length === 0) alert("Pokemon Not Found");
            else alert("Pokemon found");
        }

        function addListItem(pokemon) {
            //Retrieve container DIV
            const container = document.querySelector(".container");
            //Create new element and assign class name
            const pokemonItemDiv = document.createElement('div');
            pokemonItemDiv.className = 'pokemon__item';

            //Create an img element
            const pokeBallImg = document.createElement('img');
            // pokeBallImg.className = 'pokeball__img';
            pokeBallImg.setAttribute('id', 'pokeball__img')
            pokeBallImg.setAttribute('src', 'https://img.icons8.com/color/50/000000/pokeball-2.png');
            console.log(pokeBallImg);

            //Create a btn element
            let button = document.createElement('button')
            button.innerText = pokemon.name;
            button.classList.add('pokemon__name--button');

            //Invoke the function to add event listener
            pokemonRepository.ifPokemonSelected(button, pokemon);

            //adding the button to the new div
            pokemonItemDiv.appendChild(button);

            //adding the button to the new div
            pokemonItemDiv.appendChild(pokeBallImg);

            //Add the new div to the container
            container.appendChild(pokemonItemDiv);
        }

        function loadList() {
            return fetch(apiUrl).then(function(response) {
                return response.json();
            }).then(function(json) {
                json.results.forEach(function(item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    add(pokemon);
                });
            }).catch(function(e) {
                console.error(e);
            })
        }

        function showDetails(pokemon) {
            console.log('Selected ' + pokemon.name);
        }

        function ifPokemonSelected(button, pokemon) {
            //Adding an event listener to the button
            button.addEventListener('click', function(event) {
                //Invoking the showdetails function once the user clicks on the button
                pokemonRepository.showDetails(pokemon);
            });
        }

        function loadDetails(pokemon) {
            //Get pokemon details using URL from parameter (pokemon.url)
            let url = pokemon.detailsUrl;
            return fetch(url).then(function(response) {
                return response.json();
            }).then(function(details) {
                // Now we add the details to the item
                pokemon.imageUrl = details.sprites.front_default;
                pokemon.height = details.height;
                pokemon.types = details.types;
            }).catch(function(e) {
                console.error(e);
            });
        }

        return {
            add: add,
            getAll: getAll,
            loadList: loadList,
            loadDetails: loadDetails,
            addListItem: addListItem,
            ifPokemonSelected: ifPokemonSelected
        };
    })();


pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

//Retrieve all the pokemons in an array of Objects
//&&
//Iterate over pokemonList taking a function as parameter (addListItem)
// let pokemonList = pokemonRepository.getAll().forEach(pokemon => pokemonRepository.addListItem(pokemon));