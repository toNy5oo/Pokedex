$(".search").on("input", () => { const e = $(".pokemon__item"),
        t = $(".search").val().toUpperCase();
    console.log(t), e.each((e, s) => { s.firstChild.innerText.includes(t) ? s.style.display = "" : s.setAttribute("style", "display: none !important") }) });