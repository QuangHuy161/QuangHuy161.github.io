//============================GOOGLE Sign in==============================================================================================================================
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

//======================share_screen======================================================================================================================================
//News PAGE
share_screen = document.querySelector('.share_screen')

function share(e) {
    share_screen.style.display = "block"
}
let button_share = document.querySelectorAll('.news_item>.button_share')
button_share.forEach(bt_share => {
    bt_share.addEventListener("click", share);
});


//============================cancle_notification==============================================================================================================================

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


//===========================POST=============================================================================================================================================
let button_post = document.querySelector(".user_frame .buttons .button_post");
button_post.addEventListener('click', () => {
    let left_srcreen = document.querySelectorAll('.left');
    left_srcreen.forEach((e) => {
        if (!e.classList.contains('none'))
            e.classList.add('none');
    })
    left_srcreen[1].classList.remove('none')
});

//===========================USER==========================================================================================================================
let button_user = document.querySelector(".user_frame .buttons .button_user");
button_user.addEventListener('click', () => {
    let left_srcreen = document.querySelectorAll('.left');
    left_srcreen.forEach((e) => {
        if (!e.classList.contains('none'))
            e.classList.add('none');
    })
    left_srcreen[2].classList.remove('none')
});

//===========================Main==========================================================================================================================
let button_main = document.querySelector(".user_frame .buttons .button_main");
button_main.addEventListener('click', () => {
    let left_srcreen = document.querySelectorAll('.left');
    left_srcreen.forEach((e) => {
        if (!e.classList.contains('none'))
            e.classList.add('none');
    })
    left_srcreen[0].classList.remove('none')
});

//===========================Comment=========================================================================================================================
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



//=======================CREATE ID=================================================================================================
ascii_arr = [];
//create array of ascii characters
for (let i = 0; i < 10; i++) { ascii_arr.push(i) }
for (let i = 'a'; i <= 'z'; i++) { ascii_arr.push(i) }
for (let i = 'A'; i < 'Z'; i++) { ascii_arr.push(i) }

//List_id
l_id = [];
localStorage.setItem("l_id", JSON.stringify(l_id))
statuses = (JSON.parse(localStorage.getItem("Statuses")))
if (statuses != null) {
    for (const key of statuses) {
        if (key !== null) l_id.push(key['_id'])
    }
    localStorage.setItem("l_id", JSON.stringify(l_id))
}

l_id = JSON.parse(localStorage.getItem("l_id"));

function createID(l_id, t, length_id) {
    n = ascii_arr.length
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
            localStorage.setItem(t, JSON.stringify(l_id))
            return id
        }
    }
}
//=======================CREATE status Article=================================================================================================
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
        id = createID(l_id, 'l_id', 6)
        statuses.push({
            '_id': id,
            '_ho': ho,
            '_sot': sot,
            '_nhucdau': nhucdau,
            '_metmoi': metmoi,
            '_matvigiac': matvigiac,
            '_temp': temp,
            '_time': t
        });
        localStorage.setItem("Statuses", JSON.stringify(statuses));
    }
    let left_srcreen = document.querySelectorAll('.left');
    left_srcreen.forEach((e) => {
        if (!e.classList.contains('none'))
            e.classList.add('none');
    })
    left_srcreen[0].classList.remove('none')
    window.location.reload(true);
});

//======================================List Post Article of ID ========================================================
l_id_post = [];
localStorage.setItem("l_id_post", JSON.stringify(l_id_post))
articles = (JSON.parse(localStorage.getItem("Articles")))
if (articles != null) {
    for (const key of articles) {
        if (key !== null) l_id_post.push(key['_id'])
    }
    localStorage.setItem("l_id_post", JSON.stringify(l_id_post))
}
l_id_post = JSON.parse(localStorage.getItem("l_id_post"));


//==================find id youtube=================
function fil_ID(link) {
    if (link.indexOf('https://www.youtube.com/watch?v') == 0) {
        pos = link.indexOf('=');
        id = link.substring(pos + 1)
        if (pos != -1) return id;
        else
            return '-1';
    }
    return link
}
//=======================Create Post Article=================================================================================================
function create_article(id, caption, link_id, img, name, avat) {
    let link = '';
    if (link_id.indexOf('https://') == 0 && link_id.indexOf('https://www.youtube.com/watch?v') == -1)
        link = `<a href="${link_id}">${link_id}</a>`
    else
    if (link_id != '-1' && link_id != '')
        link = ` <iframe width="100%" height="600" src="https://www.youtube.com/embed/${link_id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

    let article_block = `
    <div class="article" id="${id}">
        <div class="article_top">
            <div class="user">
                <div class="avat_img">
                    <img src="${avat}" alt="avatar" srcset="">

                </div>
                <span class="name">${name}</span>
            </div>
            <div class="dot_icon">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        </div>
        <div class="article_content">
            <div class="caption">
                <p>${caption}</p>
            </div>
            <div class="link">
                ${link}
            </div>
            <div class="file">
                <img src="${img}" alt="">
            </div>
        </div>
        <div class="article_bottom">
            <div class="react">
                <div class="heart">
                    <span class="icon">
                        <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.4453 4.83205L12 5.20185L12.5547 4.83205L17.9334 1.24623L23 5.46838V11.5316L12 20.6983L1 11.5316V5.46838L6.06657 1.24623L11.4453 4.83205Z" fill="#FF7676" stroke="black" stroke-width="2"/>
                            </svg>
                                                                    </span>
                    <span value="1">1</span>
                </div>
                <div class="comment">
                    <span class="icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M20 14C20 14.552 19.552 15 19 15C18.448 15 18 14.552 18 14C18 13.448 18.448 13 19 13C19.552 13 20 13.448 20 14ZM17 14C17 14.552 16.552 15 16 15C15.448 15 15 14.552 15 14C15 13.448 15.448 13 16 13C16.552 13 17 13.448 17 14ZM14 14C14 14.552 13.552 15 13 15C12.448 15 12 14.552 12 14C12 13.448 12.448 13 13 13C13.552 13 14 13.448 14 14ZM19.415 18.946C18.415 19.202 17.426 19.428 16.091 19.428C12.626 19.428 9 17.363 9 14.005C9 10.877 12.14 8.333 16 8.333C19.844 8.333 23 10.875 23 14.005C23 15.596 22.354 16.532 21.519 17.532L22.358 20.218L19.415 18.946ZM6.042 15.571L1.653 17.467L2.909 13.455C1.788 12.114 1 10.79 1 8.756C1 4.479 5.262 1 10.5 1C15.518 1 19.628 4.194 19.967 8.222C18.777 7.656 17.416 7.333 16 7.333C11.801 7.333 8 10.13 8 14.005C8 14.717 8.147 15.405 8.411 16.054C7.458 15.928 6.865 15.782 6.042 15.571ZM24 14.005C24 11.833 22.801 9.99 20.998 8.795L21 8.756C21 3.67 16.012 0 10.5 0C4.954 0 0 3.698 0 8.756C0 10.55 0.646 12.312 1.791 13.678L0.047 19.25L6.125 16.625C7.107 16.878 8.057 17.032 8.975 17.114C10.292 19.067 12.851 20.428 16.091 20.428C17.11 20.428 18.196 20.293 19.333 20L23.964 22L22.636 17.755C23.507 16.713 24 15.371 24 14.005Z" fill="black"/>
                            </svg>

                        </span>
                    <span value="1">1</span>
                </div>
            </div>
            <div class="share">
                <span class="button_share">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM13 15.889V13.666C13 13.666 9.22 13.552 6 16.999C7.513 10.412 13 9.221 13 9.221V7L18 11.425L13 15.889Z" fill="#1D8B6A"/>
                        </svg>

                </span>
            </div>
        </div>
        <div class="choices none">
            <div class="button button_edit">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.363 8.464L19.796 9.895L7.12598 22.564L0.000976562 24L1.43998 16.873L14.105 4.205L15.536 5.636L3.28098 17.86L2.55498 21.444L6.13898 20.721L18.363 8.464ZM18.307 0L15.492 2.817L21.183 8.509L24 5.688L18.307 0V0ZM5.98898 18.718L17.302 7.402L16.597 6.695L5.28398 18.009L5.98898 18.718Z" fill="black"/>
                    </svg>

                <span>Edit</span>
            </div>
            <div class="button button_remove">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.662 23L0.293 17.635C0.098 17.44 0 17.185 0 16.928C0 16.672 0.098 16.416 0.293 16.221L15.222 1.293C15.417 1.099 15.673 1 15.929 1C16.184 1 16.441 1.099 16.636 1.293L23.707 8.366C23.903 8.561 24 8.817 24 9.074C24 9.33 23.903 9.585 23.707 9.781L12.491 21H18.005V23H5.662ZM9.319 21L3.833 15.514L2.414 16.928L6.49 21H9.319ZM15.924 3.419L5.247 14.099L10.905 19.758L21.581 9.076L15.924 3.419Z" fill="black"/>
                    </svg>

                <span>Remove</span>
            </div>
        </div>
    </div>
    `
    return article_block
}



function show_all_articles(list_articles) {
    const article_list_block = document.querySelector('.article_list');
    for (const key of list_articles) {
        if (key !== null) {
            let article = create_article(key['_id'], key['_caption'], key['_link'], key['_img'], key['_name'], key['_avat'])
            article_list_block.insertAdjacentHTML('afterBegin', article);
        }
    }
}
//Show all list_status
if (articles != null) show_all_articles(articles)
else
    articles = [];

const post_buttton = document.querySelector('.button_post');
post_buttton.addEventListener('click', (e) => {
    const inpObj = document.getElementById("ct");
    if (!inpObj.checkValidity()) {
        alert(inpObj.validationMessage)
    } else {
        const cap = document.querySelector('.left_post>form>input[name="caption"]').value;
        const link = document.querySelector('.left_post>form>input[name="link"]').value;
        const img = document.querySelector('.left_post>form>input[name="img"]').value;
        let NAME;
        let avatar;
        if (localStorage.getItem('User') != null) {
            const profile = JSON.parse(localStorage.getItem('User'));
            NAME = profile.name
            avatar = profile.img
        } else {

        }
        articles.push({
            '_id': createID(l_id_post, 'l_id_post', 10),
            '_caption': cap,
            '_link': fil_ID(link),
            '_img': img,
            '_name': NAME,
            '_avat': avatar,
        });
        localStorage.setItem("Articles", JSON.stringify(articles));
    }
    let left_srcreen = document.querySelectorAll('.left');
    left_srcreen.forEach((e) => {
        if (!e.classList.contains('none'))
            e.classList.add('none');
    })
    left_srcreen[0].classList.remove('none')
    window.location.reload(true);
});


//=======================Option setting==================================================================================================================================

let list_ar = document.querySelectorAll(".article_top>.dot_icon");
list_ar.forEach((el, i) => {
    el.addEventListener('click', function() {
        document.querySelectorAll('.choices')[i].classList.toggle('none')
    })
})