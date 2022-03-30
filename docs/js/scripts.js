const INIT_API_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=12';
const pokemonRepository = (function() {
    let pokemonList = [];

    function add(pokemon) { if (typeof pokemon === 'object') { pokemonList.push(pokemon) } else alert("Not a valid pokemon") }

    function find(text) { const result = pokemonList.filter(singlePokemon => singlePokemon.name === text); if (result.length === 0) alert("Pokemon Not Found");
        else alert("Pokemon found") }

    function loadList(url) { return fetch(url).then(function(response) { return response.json() }).then(function(json) { console.log('Next: ' + json.next + '<br>Prev: ' + json.previous);
            uiElement.updatePagination(json.next, json.previous);
            json.results.forEach(function(fetchedPokemon) { let pokemon = { name: fetchedPokemon.name, detailsUrl: fetchedPokemon.url, };
                add(pokemon);
                uiElement.hideLoadingMessage() }) }).catch(function(e) { uiElement.hideLoadingMessage();
            console.error(e) }) }

    function addListItem(pokemon) {
        const container = document.querySelector(".pokemon__column");
        const pokemonItemDiv = document.createElement('div');
        pokemonItemDiv.className = 'pokemon__item col-xl-3 col-md-4 col-sm-6 p-2 gy-0 d-flex flex-column align-items-center';
        const pokeBallImg = document.createElement('img');
        pokeBallImg.setAttribute('class', 'pokeball__img')
        pokeBallImg.setAttribute('src', 'img/png/superball-96.png');
        let button = document.createElement('button')
        button.innerText = pokemon.name;
        button.classList.add('pokemon__name--button', 'btn-lg');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#pokemonModal');
        pokemonRepository.ifPokemonSelected(button, pokemon);
        pokemonItemDiv.appendChild(button);
        pokemonItemDiv.appendChild(pokeBallImg);
        container.appendChild(pokemonItemDiv)
    }

    function loadDetails(pokemon) { let url = pokemon.detailsUrl; return fetch(url).then(function(response) { return response.json() }).then(function(details) { pokemon.imageUrl = details.sprites.other.dream_world.front_default;
            pokemon.height = details.height;
            pokemon.types = details.types;
            pokemon.weight = details.weight;
            pokemon.abilities = []; for (let i = 0; i < details.abilities.length; i++) { pokemon.abilities.push(details.abilities[i].ability.name) } }).catch(function(e) { console.error(e) }) }

    function ifPokemonSelected(button, pokemon) { button.addEventListener('click', function(event) { pokemonRepository.showDetails(pokemon) }) }

    function getAll() { return pokemonList }

    function showDetails(pokemon) { loadDetails(pokemon).then(function() { uiElement.showModal(pokemon.name, pokemon.height, pokemon.weight, pokemon.abilities, pokemon.types, pokemon.imageUrl) }) }

    function emptyPokemonsList() { pokemonList = [] }

    function renderPage(URL) { pokemonRepository.loadList(URL).then(function() { pokemonRepository.getAll().forEach(function(pokemon) { pokemonRepository.addListItem(pokemon) }) }) }
    return { add, getAll, loadList, loadDetails, showDetails, addListItem, ifPokemonSelected, emptyPokemonsList, renderPage }
})();
pokemonRepository.renderPage(INIT_API_URL)