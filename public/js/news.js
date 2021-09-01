//======================share_screen============================
//News PAGE
share_screen = document.querySelector('.share_screen')

function share(e) {
    share_screen.style.display = "block"
}
let button_share = document.querySelectorAll('.news_item>.button_share')
button_share.forEach(bt_share => {
    bt_share.addEventListener("click", share);
});
//============================cancle_notification====================

function cancle() {
    share_screen.style.display = "none"
}
let cancle_bt = document.querySelector('.cancle')
cancle_bt.addEventListener('click', cancle)