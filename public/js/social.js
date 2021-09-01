//============================GOOGLE Sign in==================
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();

    User = {
        name: profile.getName(),
        img: profile.getImageUrl(),
        id: profile.getId()
    }
    localStorage.setItem('User', JSON.stringify(User));
}
//GOOGLE sign OUT
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut();
    localStorage.removeItem('User');
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
checkSignIn();

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




ascii_arr = [];
//create array of ascii characters
for (let i = 0; i < 10; i++) { ascii_arr.push(i) }
for (let i = 'a'; i <= 'z'; i++) { ascii_arr.push(i) }
for (let i = 'A'; i < 'Z'; i++) { ascii_arr.push(i) }

//List_id
l_id = [];
localStorage.setItem("l_id", JSON.stringify(l_id))
l_id = JSON.parse(localStorage.getItem("l_id"))

function createID(l_id) {
    n = ascii_arr.length
    length_id = 6

    flag = true
    while (flag) {
        id = ""
        for (let i = 0; i < length_id; i++) {
            let i = Math.floor(Math.random() * n)
            id += ascii_arr[i]
        }
        if (l_id.indexOf(id) == -1) {
            flag = false;
            l_id.push(id);
            localStorage.setItem("l_id", JSON.stringify(l_id))
            return id
        }
    }
}

function create_status(id, ho, sot, nhucdau, metmoi, matvigiac, temp, time) {
    let status_block = `
    <div class="status_state" id="${id}">
        <div class="time"><p>${time}</p></div>
        <ul class="list_status">
            <li>
                <p>Ho</p>
                <input type="checkbox" name="ho" id="" ${ ho == true ? "checked":""} >
            </li>
            <li><p>Sốt</p>
                <input type="checkbox" name="sot" id="" ${ sot == true ? "checked":""} ></li>
            <li><p>Nhức đầu</p>
                <input type="checkbox" name="nhucdau" id="" ${ nhucdau == true ? "checked":""} ></li>
            <li><p>Mệt mỏi</p>
                <input type="checkbox" name="metmoi" id="" ${ metmoi == true ? "checked":""} ></li>
            <li><p>Mất vị giác</p>
                <input type="checkbox" name="matvigiac" id="" ${ matvigiac == true ? "checked":""}></li>
            <li><p>Nhiệt độ</p>
                <div class="tem">${temp}</div>
        </ul>
    </div>
    `
    return status_block
}



statuses = (JSON.parse(localStorage.getItem("Statuses")))

function show_all_status(list_status) {
    const statuses_block = document.querySelector('.status');
    for (const key of list_status) {
        if (key !== null) {
            let status = create_status(key['_id'], key['_ho'], key['_sot'], key['_nhucdau'], key['_metmoi'], key['_matvigiac'], key['_temp'], key['_time'])
            statuses_block.insertAdjacentHTML('beforeend', status);
        }
    }
}
//Show all list_status
if (statuses != null) show_all_status(statuses)
else
    statuses = [];


const update_buttton = document.querySelector('.button_update');
update_buttton.addEventListener('click', (e) => {
    e.preventDefault()
    const inpObj = document.getElementById("6");
    if (!inpObj.checkValidity()) {
        alert(inpObj.validationMessage)
    } else {
        const ho = document.querySelector('.update>form>input[name="ho"]').checked;
        const sot = document.querySelector('.update>form>input[name="sot"]').checked;
        const nhucdau = document.querySelector('.update>form>input[name="nhucdau"]').checked;
        const metmoi = document.querySelector('.update>form>input[name="metmoi"]').checked;
        const matvigiac = document.querySelector('.update>form>input[name="matvigiac"]').checked;
        const temp = document.querySelector('.update>form>input[name="nhietdo"]').value;

        time = new Date();
        h = time.getHours();
        mi = time.getMinutes();
        d = time.getDate();
        m = time.getMonth();
        y = time.getFullYear();
        const t = `${h}:${mi} ${d}/${m}/${y}`
        id = createID(l_id)
        statuses.push(
            status = {
                '_id': id,
                '_ho': ho,
                '_sot': sot,
                '_nhucdau': nhucdau,
                '_metmoi': metmoi,
                '_matvigiac': matvigiac,
                '_temp': temp,
                '_time': t
            }
        );
        localStorage.setItem("Statuses", JSON.stringify(statuses));
    }
    //localStorage.removeItem("Statuses");
});