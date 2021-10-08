"use strict";

//======================share_screen============================
//News PAGE
share_screen = document.querySelector('.share_screen');

function share(e) {
  share_screen.style.display = "block";
}

var button_share = document.querySelectorAll('.news_item>.button_share');
button_share.forEach(function (bt_share) {
  bt_share.addEventListener("click", share);
}); //============================cancle_notification====================

function cancle() {
  share_screen.style.display = "none";
}

var cancle_bt = document.querySelector('.cancle');
cancle_bt.addEventListener('click', cancle);