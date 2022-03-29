const maxPage = 56;
let nextUrl = null;
let prevUrl = null;
//const NEXT_API_URL = 'https://pokeapi.co/api/v2/pokemon/?offset=';
let offset = 12;
const limit = 12;
let paginationIndex = 1;

const uiElement = (

    function() {

        // function activateListeners() {
        //     let prevButton = document.querySelector('.prev');
        //     let nextButton = document.querySelector('.next');

        //     prevButton.addEventListener('click', () => {
        //         alert('Test');
        //     });

        //     nextButton.addEventListener('click', () => {
        //         alert('Test');
        //     });
        //     // prev.addEventListener('click', alert('Test'));

        //     // $('.prev').on('click', () => {

        //     // });
        //     // $('.next').on('click', () => {
        //     //     alert('Test 2');
        //     // });
        // }

        function updatePagination(next, prev) {

            console.log(next + ' ' + prev);

            if (next != undefined) {
                nextUrl = next;
                console.log('Updated Next fetch address ' + nextUrl);
                $('.next-item').removeClass('disabled');
            } else $('.next-item').addClass('disabled');
            if (prev != undefined) {
                prevUrl = prev;
                $('.prev-item').removeClass('disabled');
            } else $('.prev-item').addClass('disabled');

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

        function getNextPokemonsBatch(e) {
            cleanUI(e);
            pokemonRepository.renderPage(nextUrl);
        }

        function getPrevPokemonsBatch(e) {
            cleanUI(e);
            pokemonRepository.renderPage(prevUrl);
        }

        function cleanUI(e) {
            e.preventDefault();
            $('.pokemon__column').empty();
            console.log('Cleaning UI');
            pokemonRepository.emptyPokemonsList();
        }


        return {
            showLoadingMessage,
            hideLoadingMessage,
            showModal,
            hideModal,
            resetModal,
            updatePagination,
            getPrevPokemonsBatch,
            getNextPokemonsBatch,
            cleanUI
        };
    })();


////////////////////////////////  EVENT LISTENERS


$(".search").on('input', () => {
    const pokemonList = $(".pokemon__item");
    const searchValue = $(".search").val().toUpperCase();

    pokemonList.each((i, p) => {
        const btnText = p.firstChild.innerText;

        !btnText.includes(searchValue) ? p.setAttribute('style', 'display: none !important') : p.style.display = "";
    });

});

$(".next").on('click', (e) => {
    uiElement.getNextPokemonsBatch(e);
    let paginationPages = $('.page-number');
    paginationPages.forEach(element => {


        console.log(element);
        element.innerText = i + 1;
        i++;
    });
});

$(".prev").on('click', (e) => {
    uiElement.getNextPokemonsBatch(e);
});


//SEARCH FUNCTION

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