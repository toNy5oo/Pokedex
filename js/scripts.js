let pokemonRepository = function() { const t = [],
        e = "https://pokeapi.co/api/v2/pokemon/?limit=500";

    function n(e) { "object" == typeof e ? t.push(e) : alert("Not a valid pokemon") }

    function o(t) { let e = t.detailsUrl; return fetch(e).then(function(t) { return t.json() }).then(function(e) { t.imageUrl = e.sprites.other.dream_world.front_default, t.height = e.height, t.types = e.types, t.weight = e.weight, t.abilities = []; for (let n = 0; n < e.abilities.length; n++) t.abilities.push(e.abilities[n].ability.name) }).catch(function(t) { console.error(t) }) }

    function i() { $("#loading__message").attr("style", "display: block"), $(".header__message").attr("style", "display: none") }

    function a() { $("#loading__message").attr("style", "display: none"), $(".header__message").attr("style", "display: block") }

    function l(t, e, n, o, i, a) { $(".img__attr").attr("src", "img/gif/pika_loading.gif"), $(".img__attr").addClass("loading_gif"), $(".name__attr").text(t), console.log("Injecting image " + a), $(".img__attr").attr("src", a), $(".height__attr").text(10 * e + "cm"), $(".weight__attr").text(n / 10 + "kg"); let l = o.join(", ");
        $(".abilities__attr").text(l), s() }

    function s() { $(".close").on("click", () => r()) }

    function r() { $(".name__attr").text("..."), $(".height__attr").text("..."), $(".weight__attr").text("..."), $(".img__attr").attr("src", "") } return { add: n, getAll: function() { return t }, loadList: function() { return i(), fetch(e).then(function(t) { return t.json() }).then(function(t) { t.results.forEach(function(t) { n({ name: t.name, detailsUrl: t.url }), a() }) }).catch(function(t) { a(), console.error(t) }) }, loadDetails: o, showDetails: function(t) { o(t).then(function() { l(t.name, t.height, t.weight, t.abilities, t.types, t.imageUrl) }) }, addListItem: function(t) { const e = document.querySelector(".pokemon__column"),
                n = document.createElement("div");
            n.className = "pokemon__item col-xl-3 col-md-4 col-sm-6 p-2 gy-0 d-flex flex-column align-items-center"; const o = document.createElement("img");
            o.setAttribute("class", "pokeball__img"), o.setAttribute("src", "img/png/superball-96.png"); let i = document.createElement("button");
            i.innerText = t.name, i.classList.add("pokemon__name--button", "btn-lg"), i.setAttribute("data-toggle", "modal"), i.setAttribute("data-target", "#pokemonModal"), pokemonRepository.ifPokemonSelected(i, t), n.appendChild(i), n.appendChild(o), e.appendChild(n) }, ifPokemonSelected: function(t, e) { t.addEventListener("click", function(t) { pokemonRepository.showDetails(e) }) }, showLoadingMessage: i, hideLoadingMessage: a, showModal: l, hideModal: s, resetModal: r } }();
pokemonRepository.loadList().then(function() { pokemonRepository.getAll().forEach(function(t) { pokemonRepository.addListItem(t) }) });