const maxPage = 56;
let API_URL = 'https://pokeapi.co/api/v2/pokemon/?offset=';
var offset = 0;
var limit = 12;
let paginationIndex = 1;
var CURRENT_API_URL = API_URL + offset + '&limit=' + limit;
const ALL_API_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=1192'


const uiElement = (

    function() {

        function updatePagination(next, prev) {

            if (next) {
                //Set new link
                $('.next').attr('data-link', next);
                $('.next-item').removeClass('disabled');
            } else $('.next-item').addClass('disabled');
            if (prev) {
                $('.prev').attr('data-link', prev);
                $('.prev-item').removeClass('disabled');
            } else $('.prev-item').addClass('disabled');

            //Updates the status number of the pagination
            //returns the first integer greater than or equal to the float.
            let maxPages = Math.ceil(1126 / limit)
            $('.status').text(paginationIndex + '/' + maxPages);

        }

        function showLoadingMessage() {
            if (paginationIndex == 1) {
                $('.header_container').hide();
                $('#loading__message').show();
                $('.header__message').hide();
            }
        }

        function hideLoadingMessage() {
            if (paginationIndex == 1) {
                $('#loading__message').hide();
                $('.header__message').show();
                $('.header_container').show();
            }
        }

        function showModal(name, height, weight, abilities, types, imageUrl) {
            //Placing a loading gif to wait for the image to be loaded
            $('.img__attr').attr('src', 'img/gif/pika_loading.gif');
            $('.img__attr').addClass('loading_gif');

            $('.name__attr').text(name);
            $('.img__attr').attr('src', imageUrl);

            //Injecting values into the div
            $('.height__attr').text(height * 10 + 'cm');
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

        function getPokemonsBatch(url) {
            cleanUI();
            pokemonRepository.renderPage(url);
        }

        function cleanUI() {
            $('.pokemon__column').empty();
            pokemonRepository.emptyPokemonsList();
        }

        function changeAmountPokemonsToShow(value) {

            if (value != 'ALL') {

                $('.search').hide();
                $('.pagination').show();
                limit = value;

                if (value == '24')
                    offset = (((value * paginationIndex) - value)) / 2;

                else
                    offset = ((value * paginationIndex) - value);

                cleanUI();

                CURRENT_API_URL = API_URL + offset + '&limit=' + limit;
                pokemonRepository.renderPage(CURRENT_API_URL);

            } else {
                $('.search').show();
                $('.pagination').hide();
                cleanUI();
                pokemonRepository.renderPage(ALL_API_URL);

            }
        }

        return {
            //showLoadingMessage,
            hideLoadingMessage,
            showModal,
            hideModal,
            resetModal,
            updatePagination,
            getPokemonsBatch,
            cleanUI,
            changeAmountPokemonsToShow
        };
    })();


//Hide the search function until ALL pokemon is selected
$(".search").hide();

$(".search").on('input', () => {
    const pokemonList = $(".pokemon__item");
    const searchValue = $(".search").val().toUpperCase();

    pokemonList.each((i, p) => {
        const btnText = p.firstChild.innerText;

        !btnText.includes(searchValue) ? p.setAttribute('style', 'display: none !important') : p.style.display = "";
    });
});

$(".next").on('click', ($e) => {
    $e.preventDefault();
    let nextUrl = $(".next").attr('data-link');
    console.log(nextUrl);
    uiElement.getPokemonsBatch(nextUrl);
    paginationIndex++;
});

$(".prev").on('click', ($e) => {
    $e.preventDefault();
    let prevUrl = $(".prev").attr('data-link');
    uiElement.getPokemonsBatch(prevUrl);
    paginationIndex--;
});

$('.form-select').change(function() {
    let selectValue = $(this).val();
    //console.log('Value ' + selectValue);
    uiElement.changeAmountPokemonsToShow(selectValue);
});





///////////////////////////////////////////////   DEPRECATED   //////////////////////////////////////////

//SEARCH FUNCTION Vanilla JS

// const searchInput = document.querySelector(".search");
// searchInput.addEventListener("input", () => {
//     const pokemonList = document.querySelectorAll(".pokemon__item");
//     const searchValue = searchInput.value.toUpperCase();
//     pokemonList.forEach((p) => {
//         const btnText = p.childNodes[0].innerText;
//         if (!btnText.includes(searchValue)) {
//             console.log(p);
//             p.style.setProperty("display", "none", "important");
//         } else {
//             p.style.display = "";
//         }
//     })
// })