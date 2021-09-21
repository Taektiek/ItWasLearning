let overlay = document.getElementsByClassName("overlay")[0];

function hide() {
    overlay.classList.add("none");
}

function show() {
    overlay.classList.remove("none");
}

hide()