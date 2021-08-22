"use strict";

//GOOGLE Sign in
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  document.getElementsByClassName('g-signin2')[0].style.display = 'none';
  document.querySelector(".sign_Out_GG").classList.add('d-block');
  var profile_block = "\n            <div class=\"col-4 g-picture_profile\">\n                <img src=\"".concat(profile.getImageUrl(), "\" alt=\"\" srcset=\"\">\n            </div>\n            <div class=\"col-4 g-name_account\">\n                ").concat(profile.getName(), "\n            </div>\n        ");
  document.querySelector('.g-signin1').insertAdjacentHTML('beforeend', profile_block);
  document.getElementsByClassName('g-signin1')[0].style.display = 'block !important';
} //GOOGLE sign OUT


function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    document.getElementsByClassName('g-signin2')[0].style.display = 'block';
    document.querySelector('.g-signin1').classList.add('d-none');
    document.querySelector(".sign_Out_GG").classList.add('d-none');
  });
}