let pokemonRepository = (
    function() {

        let pokemonList = [];
        let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

        function add(pokemon) {
            //Checking if the pokemon added is an Object
            if (typeof pokemon === 'object') {
                pokemonList.push(pokemon);
                console.log('Entered pokemon # ' + pokemonList.length);
            } else alert("Not a valid pokemon");
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

        function ifPokemonSelected(button, pokemon) {
            //Adding an event listener to the button
            button.addEventListener('click', function(event) {
                //Invoking the showdetails function once the user clicks on the button
                console.log('Inside the listener ' + pokemon);
                pokemonRepository.showDetails(pokemon);
            });
        }

        function loadList() {
            return fetch(apiUrl).then(function(response) {
                return response.json();
            }).then(function(json) {
                console.log(json);
                json.results.forEach(function(fetchedPokemon) {
                    let pokemon = {
                        name: fetchedPokemon.name,
                        detailsUrl: fetchedPokemon.url
                    };
                    //Add single pokemon to Array
                    add(pokemon);
                });
            }).catch(function(e) {
                console.error(e);
            })
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
                console.log('Show details of ' +
                    details.name);
            }).catch(function(e) {
                console.error(e);
            });
        }

        function showDetails(pokemon) {
            loadDetails(pokemon).then(function() {
                //Add code for a new display here
                console.log('Pokemon Selected: ' + pokemon.name + ' with a height of ' + pokemon.height);
            });
        }

        return {
            add: add,
            getAll: getAll,
            loadList: loadList,
            loadDetails: loadDetails,
            showDetails: showDetails,
            addListItem: addListItem,
            ifPokemonSelected: ifPokemonSelected
        };
    })();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        console.log('Pokemon in funtion forEach: ' + pokemon.name);
        pokemonRepository.addListItem(pokemon);
    });
    console.log('Pokemon list: ' + pokemonRepository.getAll().length);
});