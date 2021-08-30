// Initialize Firebase


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


//============================GOOGLE Sign in==================
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();

    User = {
        name: profile.getName(),
        img: profile.getImageUrl(),
        id: profile.getId()
    }
    console.log(profile)
    localStorage.setItem('User', JSON.stringify(User));
    //Home page
    document.querySelector(".log_in>.user>.avat_img>img").setAttribute("src", `${profile.getImageUrl()}`);
    document.querySelector(".log_in>.user>.name").textContent = `${profile.getName()}`;

    document.querySelector('.log_in>.user').classList.remove('none');
    document.querySelector('.g-signin2').classList.add('none');
    document.getElementsByClassName('sign_Out_GG')[0].style.display = "block";
}
//GOOGLE sign OUT
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut();
    localStorage.removeItem('User');
    //Homepage
    document.getElementsByClassName('g-signin2')[0].style.display = 'block';
    document.querySelector('.log_in>.user').classList.add('none');
    document.getElementsByClassName('sign_Out_GG')[0].style.display = 'none';
}

function checkSignIn() {
    if (localStorage.getItem('User') != null) {
        let user = document.querySelectorAll(".user>.avat_img>img");

        const profile = JSON.parse(localStorage.getItem('User'));

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

//Social Page
let button_share_social = document.querySelectorAll('.article_bottom>.share');
button_share_social.forEach((e, i) => {
    e.addEventListener('click', share)
});
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
let status_com = `
<div class="status_state">
<div class="time"><p>23/8/2021</p></div>
<ul class="list_status">
    <li>
        <p>Ho</p>
        <input type="checkbox" name="ho" id="" checked >
    </li>
    <li><p>Sốt</p>
        <input type="checkbox" name="sot" id="" checked ></li>
    <li><p>Nhức đầu</p>
        <input type="checkbox" name="nhucdau" id="" checked ></li>
    <li><p>Mệt mỏi</p>
        <input type="checkbox" name="metmoi" id="" checked ></li>
    <li><p>Mất vị giác</p>
        <input type="checkbox" name="matvigiac" id="" checked ></li>
    <li><p>Nhiệt độ</p>
        <div class="tem">35</div>
</ul>
</div>
`

statuses = [];

//statuses.push(localStorage.getItem("Statuses"))
const update_buttton = document.querySelector('.update_post');
update_buttton.addEventListener('submit', (e) => {
    ho = document.querySelector('.update>form>input[name="ho"]').checked;
    sot = document.querySelector('.update>form>input[name="sot"]').checked;
    nhucdau = document.querySelector('.update>form>input[name="nhucdau"]').checked;
    metmoi = document.querySelector('.update>form>input[name="metmoi"]').checked;
    matvigiac = document.querySelector('.update>form>input[name="matvigiac"]').checked;
    temp = document.querySelector('.update>form>input[name="nhietdo"]').value;

    time = new Date();
    h = time.getHours();
    mi = time.getMinutes();
    d = time.getDate();
    m = time.getMonth();
    y = time.getFullYear();
    t = `${h}:${mi} ${d}/${m}/${y}`
    status = {
        _ho: ho,
        _sot: sot,
        _nhucdau: nhucdau,
        _metmoi: metmoi,
        _matvigiac: matvigiac,
        _temp: temp,
        _time: t
    }

    console.log(ho, sot, nhucdau, metmoi, matvigiac, temp, t)
        //localStorage.setItem("Statuses", JSON.stringify(status));
        //localStorage.removeItem("Statuses");
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
let comment_button = document.querySelectorAll('.comment');
comment_button.forEach((e) => {
    e.addEventListener('click', () => {
        let left_srcreen = document.querySelectorAll('.left');
        left_srcreen.forEach((e) => {
            if (!e.classList.contains('none'))
                e.classList.add('none');
        })

        left_srcreen[3].classList.remove('none')
    })

});