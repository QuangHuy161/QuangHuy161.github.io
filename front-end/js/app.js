// scrapeFunciton('https://ncov.moh.gov.vn/')

const apiCaBenh = 'https://api.apify.com/v2/key-value-stores/ZsOpZgeg7dFS1rgfM/records/LATEST';
const apiKhuVuc = 'https://api.apify.com/v2/key-value-stores/p3nS2Q9TUn6kUOriJ/records/LATEST';

Promise.all([
    fetch(apiCaBenh),
    fetch(apiKhuVuc)
]).then(function(responses) {
    return Promise.all(responses.map(function(response) {
        return response.json();
    }));
}).then(function(data) {
    const caBenhArr = new Array();
    const khuVucArr = new Array();
    //push data into array
    caBenhArr.push(data[0]['detail']);
    khuVucArr.push(data[1]['key']);
    // sort two arr
    qSort(khuVucArr[0], 0, khuVucArr[0].length - 1)
    qSort1(caBenhArr[0], 0, caBenhArr[0].length - 1)
    console.log(caBenhArr[0]);
    str_data = ""
    for (const el of caBenhArr[0]) {
        t = Bsearch(khuVucArr[0], el['hc-key'])
        if (t != -1)
            if (el['hc-key'] == khuVucArr[0][t]['hec-key']) {
                str_data += `
                <tr>
                    <td>${khuVucArr[0][t]['name']}</td>
                    <td>${el['socakhoi']}</td>
                    <td>${el['socatuvong']}</td>
                    <td>${el['value']}</td>
                </tr>
                `
            }

    }
    Stat_Table = `
    <div class="stat_table hide_scrollbar">
        <table class="table table-striped ">
            <thead>
                <tr>
                    <th scope="col">Khu vực</th>
                    <th scope="col">Ca mắc mới</th>
                    <th scope="col">Tử vong</th>
                    <th scope="col">Tổng</th>
                </tr>
            </thead>
            <tbody>
                ${str_data}
            </tbody>
        </table>
    </div>
    `;
    //Show data on screen
    document.querySelector('.stat').insertAdjacentHTML('beforeEnd', Stat_Table)

}).catch(function(error) {
    console.log(error);
});

//GOOGLE Sign in
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();

    User = {
        name: profile.getName(),
        img: profile.getImageUrl(),
        id: profile.getId()
    }
    sessionStorage.setItem('User', JSON.stringify(User))
        //Home page
    document.querySelector('.log_in>.user').classList.remove('none');
    document.querySelector('.g-signin2').classList.add('none');
    document.getElementsByClassName('sign_Out_GG')[0].style.display = "block";
}
//GOOGLE sign OUT
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    sessionStorage.removeItem('User');
    //Homepage
    document.getElementsByClassName('g-signin2')[0].style.display = 'block';
    document.querySelector('.log_in>.user').classList.add('none');
    document.getElementsByClassName('sign_Out_GG')[0].style.display = 'none';

    auth2.signOut();
}

if (sessionStorage.getItem('User') != null) {
    let user = document.querySelectorAll(".user>.avat_img>img");

    const profile = JSON.parse(sessionStorage.getItem('User'));

    user.forEach((e) => {
        e.setAttribute("src", `${profile.img}`);
    });
    let name = document.querySelectorAll(".user>.name");
    name.forEach((e) => {
        e.textContent = `${profile.name}`;
    });


    //USER-Page
    document.querySelector('.form_user>.avatar>img').setAttribute("src", `${profile.img}`);
    document.querySelector('.form_user>.name>h3').textContent = `${profile.name}`;
    //Social page

    document.querySelector('.dis_login').classList.add('none');
    document.querySelector('.user_frame').classList.remove('none');
} else {

    document.querySelector('.dis_login').classList.remove('none');
    document.querySelector('.user_frame').classList.add('none');
}
//=========================FUNCTION=============================
//reset
function reset() {
    document.querySelector('.search_result').reset()
}
//======================share_screen============================
//News PAGE
share_screen = document.querySelector('.share_screen')

function share(e) {
    share_screen.style.display = "block"
}
button_share = document.querySelectorAll('.news_item>.button_share')
button_share.forEach(bt_share => {
    bt_share.addEventListener("click", share);
});

//Social Page
button_share_social = document.querySelectorAll('.article_bottom>.share');
button_share_social.forEach((e, i) => {
    e.addEventListener('click', share)
});


//============================cancle_notification====================

function cancle() {
    share_screen.style.display = "none"
}
cancle_bt = document.querySelector('.cancle')
cancle_bt.addEventListener('click', cancle)

//=======================Option setting========================

let list_ar = document.querySelectorAll(".article_top>.dot_icon");
list_ar.forEach((el, i) => {
    el.addEventListener('click', function() {
        document.querySelectorAll('.choices')[i].classList.toggle('none')
    })
})

//===========================POST================
let button_post = document.querySelector(".user_frame .buttons .button_post");
button_post.addEventListener('click', () => {
    let left_srcreen = document.querySelectorAll('.left');
    left_srcreen.forEach((e) => {
        if (!e.classList.contains('none'))
            e.classList.add('none');
    })
    left_srcreen[1].classList.remove('none')
});

//===========================USER================
let button_user = document.querySelector(".user_frame .buttons .button_user");
button_user.addEventListener('click', () => {
    let left_srcreen = document.querySelectorAll('.left');
    left_srcreen.forEach((e) => {
        if (!e.classList.contains('none'))
            e.classList.add('none');
    })
    left_srcreen[2].classList.remove('none')
});

//===========================Main================
let button_main = document.querySelector(".user_frame .buttons .button_main");
button_main.addEventListener('click', () => {
    let left_srcreen = document.querySelectorAll('.left');
    left_srcreen.forEach((e) => {
        if (!e.classList.contains('none'))
            e.classList.add('none');
    })
    left_srcreen[0].classList.remove('none')
});

//===========================Comment===============
comment_button = document.querySelectorAll('.comment');
comment_button.forEach((e) => {
    e.addEventListener('click', () => {
        let left_srcreen = document.querySelectorAll('.left');
        left_srcreen.forEach((e) => {
            if (!e.classList.contains('none'))
                e.classList.add('none');
        })

        left_srcreen[3].classList.remove('none')
    })

})