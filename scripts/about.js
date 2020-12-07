const bar_icon = document.querySelector(".bar");
const nav_links = document.querySelector(".nav-links");
const nav = document.querySelector('#home');
const rec = nav.getBoundingClientRect();


bar_icon.addEventListener("click", (event) => {
    event.preventDefault();
    bar_icon.classList.toggle('active');
    if (nav_links.style.display != "grid") {
        nav_links.classList.toggle('visible');
        nav_links.style.top = `${rec.bottom}px`;
    } else {
        nav_links.classList.toggle('visible');

    }
});