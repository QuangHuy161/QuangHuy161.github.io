"use strict";

var bar_icon = document.querySelector(".bar");
var nav_links = document.querySelector(".nav-links");
var nav = document.querySelector('#home');
var rec = nav.getBoundingClientRect();
bar_icon.addEventListener("click", function (event) {
  event.preventDefault();
  bar_icon.classList.toggle('active');

  if (nav_links.style.display != "grid") {
    nav_links.classList.toggle('visible');
    nav_links.style.top = "".concat(rec.bottom, "px");
  } else {
    nav_links.classList.toggle('visible');
  }
});