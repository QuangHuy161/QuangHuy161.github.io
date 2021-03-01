//bar-menu-icon
const icon = document.querySelector(".nav-menu-icon>.icon");
icon.addEventListener('click', () => {
    if (icon.classList.contains("active")) icon.classList.remove('active');
    else icon.classList.add('active');
});

//wait while loading
if (!window.onload) {
    document.querySelector('.loading').style.top = "-100vh";
}

//const navigation
const BODY = document.querySelector('.main');
const navi = document.querySelector('.nav-horizontal');
const list_nav = document.querySelector('.nav-menu');
const nav_icon_bar = document.querySelector('.nav-menu-icon');
icon.addEventListener('click', () => {
    if (navi.classList.contains('hid')) {
        navi.classList.remove('hid');
        navi.style.transform = ` translateX(0)`;
        list_nav.style.transform = ` translateX(0)`;
        BODY.style.gridTemplateColumns = '25% 75%';
    } else {
        list_nav.style.transform = ` translateX(${-list_nav.offsetWidth }px)`;
        navi.classList.add('hid');
        BODY.style.gridTemplateColumns = '5% 95%';
    }
});