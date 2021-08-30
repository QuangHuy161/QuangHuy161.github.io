"use strict";

// Initialize Firebase
// scrapeFunciton('https://ncov.moh.gov.vn/')
var apiCaBenh = 'https://api.apify.com/v2/key-value-stores/ZsOpZgeg7dFS1rgfM/records/LATEST';
var apiKhuVuc = 'https://api.apify.com/v2/key-value-stores/p3nS2Q9TUn6kUOriJ/records/LATEST';
Promise.all([fetch(apiCaBenh), fetch(apiKhuVuc)]).then(function (responses) {
  return Promise.all(responses.map(function (response) {
    return response.json();
  }));
}).then(function (data) {
  var caBenhArr = new Array();
  var khuVucArr = new Array(); //push data into array

  caBenhArr.push(data[0]['detail']);
  khuVucArr.push(data[1]['key']); // sort two arr

  qSort(khuVucArr[0], 0, khuVucArr[0].length - 1);
  qSort1(caBenhArr[0], 0, caBenhArr[0].length - 1);
  console.log(caBenhArr[0]);
  str_data = "";
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = caBenhArr[0][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var el = _step.value;
      t = Bsearch(khuVucArr[0], el['hc-key']);
      if (t != -1) if (el['hc-key'] == khuVucArr[0][t]['hec-key']) {
        str_data += "\n                <tr>\n                    <td>".concat(khuVucArr[0][t]['name'], "</td>\n                    <td>").concat(el['socakhoi'], "</td>\n                    <td>").concat(el['socatuvong'], "</td>\n                    <td>").concat(el['value'], "</td>\n                </tr>\n                ");
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  Stat_Table = "\n    <div class=\"stat_table hide_scrollbar\">\n        <table class=\"table table-striped \">\n            <thead>\n                <tr>\n                    <th scope=\"col\">Khu v\u1EF1c</th>\n                    <th scope=\"col\">Ca m\u1EAFc m\u1EDBi</th>\n                    <th scope=\"col\">T\u1EED vong</th>\n                    <th scope=\"col\">T\u1ED5ng</th>\n                </tr>\n            </thead>\n            <tbody>\n                ".concat(str_data, "\n            </tbody>\n        </table>\n    </div>\n    "); //Show data on screen

  document.querySelector('.stat').insertAdjacentHTML('beforeEnd', Stat_Table);
})["catch"](function (error) {
  console.log(error);
}); //============================GOOGLE Sign in==================

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  User = {
    name: profile.getName(),
    img: profile.getImageUrl(),
    id: profile.getId()
  };
  console.log(profile);
  localStorage.setItem('User', JSON.stringify(User)); //Home page

  document.querySelector(".log_in>.user>.avat_img>img").setAttribute("src", "".concat(profile.getImageUrl()));
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

function checkSignIn() {
  if (localStorage.getItem('User') != null) {
    var user = document.querySelectorAll(".user>.avat_img>img");
    var profile = JSON.parse(localStorage.getItem('User'));
    user.forEach(function (e) {
      e.setAttribute("src", "".concat(profile.img));
    });
    var name = document.querySelectorAll(".user>.name");
    name.forEach(function (e) {
      e.textContent = "".concat(profile.name);
    }); //USER-Page

    document.querySelector('.form_user>.avatar>img').setAttribute("src", "".concat(profile.img));
    document.querySelector('.form_user>.name>h3').textContent = "".concat(profile.name); //Social page

    document.querySelector('.dis_login').classList.add('none');
    document.querySelector('.user_frame').classList.remove('none');
  } else {
    document.querySelector('.dis_login').classList.remove('none');
    document.querySelector('.user_frame').classList.add('none');
  }
} //=========================FUNCTION=============================
//reset


function reset() {
  document.querySelector('.search_result').reset();
} //======================share_screen============================
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
cancle_bt.addEventListener('click', cancle); //Social Page

var button_share_social = document.querySelectorAll('.article_bottom>.share');
button_share_social.forEach(function (e, i) {
  e.addEventListener('click', share);
}); //=======================Option setting========================

var list_ar = document.querySelectorAll(".article_top>.dot_icon");
list_ar.forEach(function (el, i) {
  el.addEventListener('click', function () {
    document.querySelectorAll('.choices')[i].classList.toggle('none');
  });
}); //===========================POST================

var button_post = document.querySelector(".user_frame .buttons .button_post");
button_post.addEventListener('click', function () {
  var left_srcreen = document.querySelectorAll('.left');
  left_srcreen.forEach(function (e) {
    if (!e.classList.contains('none')) e.classList.add('none');
  });
  left_srcreen[1].classList.remove('none');
}); //===========================USER================

var button_user = document.querySelector(".user_frame .buttons .button_user");
button_user.addEventListener('click', function () {
  var left_srcreen = document.querySelectorAll('.left');
  left_srcreen.forEach(function (e) {
    if (!e.classList.contains('none')) e.classList.add('none');
  });
  left_srcreen[2].classList.remove('none');
});
var status_com = "\n<div class=\"status_state\">\n<div class=\"time\"><p>23/8/2021</p></div>\n<ul class=\"list_status\">\n    <li>\n        <p>Ho</p>\n        <input type=\"checkbox\" name=\"ho\" id=\"\" checked >\n    </li>\n    <li><p>S\u1ED1t</p>\n        <input type=\"checkbox\" name=\"sot\" id=\"\" checked ></li>\n    <li><p>Nh\u1EE9c \u0111\u1EA7u</p>\n        <input type=\"checkbox\" name=\"nhucdau\" id=\"\" checked ></li>\n    <li><p>M\u1EC7t m\u1ECFi</p>\n        <input type=\"checkbox\" name=\"metmoi\" id=\"\" checked ></li>\n    <li><p>M\u1EA5t v\u1ECB gi\xE1c</p>\n        <input type=\"checkbox\" name=\"matvigiac\" id=\"\" checked ></li>\n    <li><p>Nhi\u1EC7t \u0111\u1ED9</p>\n        <div class=\"tem\">35</div>\n</ul>\n</div>\n";
statuses = []; //statuses.push(localStorage.getItem("Statuses"))

var update_buttton = document.querySelector('.update_post');
update_buttton.addEventListener('submit', function (e) {
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
  t = "".concat(h, ":").concat(mi, " ").concat(d, "/").concat(m, "/").concat(y);
  status = {
    _ho: ho,
    _sot: sot,
    _nhucdau: nhucdau,
    _metmoi: metmoi,
    _matvigiac: matvigiac,
    _temp: temp,
    _time: t
  };
  console.log(ho, sot, nhucdau, metmoi, matvigiac, temp, t); //localStorage.setItem("Statuses", JSON.stringify(status));
  //localStorage.removeItem("Statuses");
}); //===========================Main================

var button_main = document.querySelector(".user_frame .buttons .button_main");
button_main.addEventListener('click', function () {
  var left_srcreen = document.querySelectorAll('.left');
  left_srcreen.forEach(function (e) {
    if (!e.classList.contains('none')) e.classList.add('none');
  });
  left_srcreen[0].classList.remove('none');
}); //===========================Comment===============

var comment_button = document.querySelectorAll('.comment');
comment_button.forEach(function (e) {
  e.addEventListener('click', function () {
    var left_srcreen = document.querySelectorAll('.left');
    left_srcreen.forEach(function (e) {
      if (!e.classList.contains('none')) e.classList.add('none');
    });
    left_srcreen[3].classList.remove('none');
  });
});