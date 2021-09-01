"use strict";

//============================GOOGLE Sign in==================
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  User = {
    name: profile.getName(),
    img: profile.getImageUrl(),
    id: profile.getId()
  };
  localStorage.setItem('User', JSON.stringify(User)); //Home page

  document.querySelector(".log_in>.user>.avat_img>img").src = "".concat(profile.getImageUrl());
  document.querySelector(".log_in>.user>.name").textContent = "".concat(profile.getName());
  document.querySelector('.log_in>.user').classList.remove('none');
  document.querySelector('.g-signin2').classList.add('none');
  document.getElementsByClassName('sign_Out_GG')[0].style.display = "block";
} //GOOGLE sign OUT


function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut();
  localStorage.removeItem('User'); //Homepage

  document.getElementsByClassName('g-signin2')[0].style.display = 'block';
  document.querySelector('.log_in>.user').classList.add('none');
  document.getElementsByClassName('sign_Out_GG')[0].style.display = 'none';
}