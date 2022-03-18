let pokemonRepository = (
    function() {

        let pokemonList = [];
        let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=900';

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
            const container = document.querySelector(".row");
            //Create new element and assign class name
            const pokemonItemDiv = document.createElement('div');
            pokemonItemDiv.setAttribute('id', 'pokemon__item')
            pokemonItemDiv.className = 'col-xl-3 col-md-4 col-sm-6 p-2 gy-0 justify-content-center align-content-center d-flex flex-column justify-content-center align-items-center';

            //Create an img element
            const pokeBallImg = document.createElement('img');
            // pokeBallImg.className = 'pokeball__img';
            pokeBallImg.setAttribute('id', 'pokeball__img')
            pokeBallImg.setAttribute('src', 'img/png/superball-96.png');

            //Create a btn element
            let button = document.createElement('button')
            button.innerText = pokemon.name;
            button.classList.add('pokemon__name--button', 'btn-lg');
            button.setAttribute('data-toggle', 'modal');
            button.setAttribute('data-target', '#pokemonModal');

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
                pokemon.abilities = [];
                for (let i = 0; i < details.abilities.length; i++) {
                    pokemon.abilities.push(details.abilities[i].ability.name);
                }
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
            $('#loading__message').attr('style', 'display: block');
            $('.header__message').attr('style', 'display: none');
        }

        function hideLoadingMessage() {
            $('#loading__message').attr('style', 'display: none');
            $('.header__message').attr('style', 'display: block');
        }

        function showModal(name, height, weight, abilities, types, imageUrl) {
            //Placing a loading gif to wait for the image to be loaded
            $('.img__attr').attr('src', 'img/gif/pika_loading.gif');
            $('.img__attr').addClass('loading_gif');

            $('.name__attr').text(name);
            console.log("Injecting image " + imageUrl);
            $('.img__attr').attr('src', imageUrl);

            //Injecting values into the div
            $('.height__attr').text(height + 'cm');
            $('.weight__attr').text(weight / 10 + 'kg');

            //Spacing properly the list of abilities
            let skills = abilities.join(', ');
            $('.abilities__attr').text(skills);

            hideModal();
        }

        function hideModal() {
            $('.close').on('click', () => resetModal());
        }

        function resetModal() {
            $('.name__attr').text('...');
            $('.height__attr').text('...');
            $('.weight__attr').text('...');
            $('.img__attr').attr('src', '');
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
            hideModal: hideModal,
            resetModal: resetModal
        };
    })();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});