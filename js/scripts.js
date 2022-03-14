let pokemonRepository = (
    function() {

        let pokemonList = [];
        let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=30';

        function add(pokemon) {
            //Checking if the pokemon added is an Object
            if (typeof pokemon === 'object') {
                pokemonList.push(pokemon);
                console.log(pokemon);
            } else alert("Not a valid pokemon");
        }

        function getAll() {
            return pokemonList;
        }

        //Find a pokemon by name
        function find(text) {
            const result = pokemonList.filter(singlePokemon => singlePokemon.name === text);
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
                pokemonRepository.showDetails(pokemon);
            });
        }

        function loadList() {
            showLoadingMessage();
            return fetch(apiUrl).then(function(response) {
                return response.json();
            }).then(function(json) {
                json.results.forEach(function(fetchedPokemon) {
                    console.log(fetchedPokemon);
                    let pokemon = {
                        name: fetchedPokemon.name,
                        detailsUrl: fetchedPokemon.url,
                    };
                    //Add single pokemon to Array
                    add(pokemon);
                    hideLoadingMessage();
                });
            }).catch(function(e) {
                hideLoadingMessage();
                console.error(e);
            })
        }

        function loadDetails(pokemon) {
            //Get pokemon details using URL from parameter (pokemon.url)
            let url = pokemon.detailsUrl;
            return fetch(url).then(function(response) {
                return response.json();
            }).then(function(details) {
                // Add the details from the API to the item
                pokemon.imageUrl = details.sprites.other.dream_world.front_default;
                pokemon.height = details.height;
                pokemon.types = details.types;
                pokemon.weight = details.weight;
                pokemon.abilities = details.abilities;
            }).catch(function(e) {
                console.error(e);
            });
        }

        function showDetails(pokemon) {
            loadDetails(pokemon).then(function() {
                //Add code for a new display here
                showModal(pokemon.name, pokemon.height, pokemon.weight, pokemon.abilities, pokemon.types, pokemon.imageUrl);
                console.log('Pokemon Selected: ' + pokemon.name + ' with a height of ' + pokemon.height + ' and a height of ' + pokemon.weight);

            });
        }

        function showLoadingMessage() {
            const loadingMessageDiv = document.getElementById('loading__message');
            //Hide the DIV from the page
            loadingMessageDiv.removeAttribute('style', 'display: none');
        }

        function hideLoadingMessage() {
            const loadingMessageDiv = document.getElementById('loading__message');

            //Hide the DIV from the page
            loadingMessageDiv.setAttribute('style', 'display: none');
        }

        function showModal(name, height, weight, abilities, types, imageUrl) {
            let modalContainer = document.querySelector('.modal-container');

            //Make the div visible
            modalContainer.classList.add('is-visible')

            //Inject text to the existint Divs with the parameters
            document.querySelector('.modal__title').innerText = name;

            let description = 'Height: ' + height + '<br>Weight: ' + weight;

            document.querySelector('.modal__text').innerHTML = description;
            document.querySelector('.modal__img').setAttribute('src', imageUrl);

            console.log(imageUrl);

            //Define ESC or Click to close modal
            let closeButton = document.querySelector('.modal-close');
            closeButton.addEventListener('click', hideModal);

            window.addEventListener('keydown', (e) => {
                console.log(e.key);
                if (e.key === 'Escape' && modalContainer.classList.contains('is-visible'))
                    hideModal();
            });

            modalContainer.classList.add('is-visible');
        }

        function hideModal() {
            let modalContainer = document.querySelector('.modal-container');
            modalContainer.classList.remove('is-visible');
        }

        return {
            add: add,
            getAll: getAll,
            loadList: loadList,
            loadDetails: loadDetails,
            showDetails: showDetails,
            addListItem: addListItem,
            ifPokemonSelected: ifPokemonSelected,
            showLoadingMessage: showLoadingMessage,
            hideLoadingMessage: hideLoadingMessage,
            showModal: showModal,
            hideModal: hideModal
        };
    })();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});