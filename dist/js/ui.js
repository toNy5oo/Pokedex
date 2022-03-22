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


// JQUERY VERSION

$(".search").on('input', () => {
    const pokemonList = $(".pokemon__item");
    const searchValue = $(".search").val().toUpperCase();
    console.log(searchValue);

    pokemonList.each((i, p) => {
        const btnText = p.firstChild.innerText;

        !btnText.includes(searchValue) ? p.setAttribute('style', 'display: none !important') : p.style.display = "";
    });

});