//GOOGLE Sign in
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    document.getElementsByClassName('g-signin2')[0].style.display = 'none'
    document.querySelector(".sign_Out_GG").classList.add('d-block');
    var profile_block = `
            <div class="col-4 g-picture_profile">
                <img src="${profile.getImageUrl()}" alt="" srcset="">
            </div>
            <div class="col-4 g-name_account">
                ${profile.getName()}
            </div>
        `
    document.querySelector('.g-signin1').insertAdjacentHTML('beforeend', profile_block)
    document.getElementsByClassName('g-signin1')[0].style.display = 'block !important';

}

//GOOGLE sign OUT
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        document.getElementsByClassName('g-signin2')[0].style.display = 'block'
        document.querySelector('.g-signin1').classList.add('d-none');
        document.querySelector(".sign_Out_GG").classList.add('d-none');
    });

}