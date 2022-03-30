const maxPage = 56;
let nextUrl = null;
let prevUrl = null;
//const NEXT_API_URL = 'https://pokeapi.co/api/v2/pokemon/?offset=';
let offset = 12;
const limit = 12;
let paginationIndex = 1;

const uiElement = (

    function() {

        function updatePagination(next, prev) {

            if (next != undefined) {
                $('.next').attr('href', next);
                nextUrl = next;
                console.log('Updated Next fetch address ' + nextUrl);
                $('.next-item').removeClass('disabled');
            } else $('.next-item').addClass('disabled');
            if (prev != undefined) {
                $('.prev').attr('href', prev);
                console.log('Updated Prev fetch address ' + prevUrl);
                $('.prev-item').removeClass('disabled');
            } else $('.prev-item').addClass('disabled');

        }

        function showLoadingMessage() {
            $('.header_container').hide();
            $('#loading__message').show();
            $('.header__message').hide();
        }

        function hideLoadingMessage() {
            $('#loading__message').hide();
            $('.header__message').show();
            $('.header_container').hide();
        }

        function showModal(name, height, weight, abilities, types, imageUrl) {
            //Placing a loading gif to wait for the image to be loaded
            $('.img__attr').attr('src', 'img/gif/pika_loading.gif');
            $('.img__attr').addClass('loading_gif');

            $('.name__attr').text(name);
            console.log("Injecting image " + imageUrl);
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

        function getPokemonsBatch(e, url) {
            cleanUI(e);
            pokemonRepository.renderPage(url);
        }

        function cleanUI(e) {
            e.preventDefault();
            $('.pokemon__column').empty();
            pokemonRepository.emptyPokemonsList();
        }

        return {
            showLoadingMessage,
            hideLoadingMessage,
            showModal,
            hideModal,
            resetModal,
            updatePagination,
            getPokemonsBatch,
            cleanUI
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

$(".next").on('click', (e) => {
    let nextUrl = $(".next").attr('href');
    uiElement.getPokemonsBatch(e, nextUrl);
});

$(".prev").on('click', (e) => {
    let prevUrl = $(".prev").attr('href');
    uiElement.getPokemonsBatch(e, prevUrl);
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