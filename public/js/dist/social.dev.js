"use strict";

//============================GOOGLE Sign in==================
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  User = {
    name: profile.getName(),
    img: profile.getImageUrl(),
    id: profile.getId()
  };
  localStorage.setItem('User', JSON.stringify(User));
} //GOOGLE sign OUT


function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut();
  localStorage.removeItem('User');
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
}

checkSignIn(); //======================share_screen============================
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
ascii_arr = []; //create array of ascii characters

for (var i = 0; i < 10; i++) {
  ascii_arr.push(i);
}

for (var _i = 'a'; _i <= 'z'; _i++) {
  ascii_arr.push(_i);
}

for (var _i2 = 'A'; _i2 < 'Z'; _i2++) {
  ascii_arr.push(_i2);
} //List_id


l_id = [];
localStorage.setItem("l_id", JSON.stringify(l_id));
l_id = JSON.parse(localStorage.getItem("l_id"));

function createID(l_id) {
  n = ascii_arr.length;
  length_id = 6;
  flag = true;

  while (flag) {
    id = "";

    for (var _i3 = 0; _i3 < length_id; _i3++) {
      var _i4 = Math.floor(Math.random() * n);

      id += ascii_arr[_i4];
    }

    if (l_id.indexOf(id) == -1) {
      flag = false;
      l_id.push(id);
      localStorage.setItem("l_id", JSON.stringify(l_id));
      return id;
    }
  }
}

function create_status(id, ho, sot, nhucdau, metmoi, matvigiac, temp, time) {
  var status_block = "\n    <div class=\"status_state\" id=\"".concat(id, "\">\n        <div class=\"time\"><p>").concat(time, "</p></div>\n        <ul class=\"list_status\">\n            <li>\n                <p>Ho</p>\n                <input type=\"checkbox\" name=\"ho\" id=\"\" ").concat(ho == true ? "checked" : "", " >\n            </li>\n            <li><p>S\u1ED1t</p>\n                <input type=\"checkbox\" name=\"sot\" id=\"\" ").concat(sot == true ? "checked" : "", " ></li>\n            <li><p>Nh\u1EE9c \u0111\u1EA7u</p>\n                <input type=\"checkbox\" name=\"nhucdau\" id=\"\" ").concat(nhucdau == true ? "checked" : "", " ></li>\n            <li><p>M\u1EC7t m\u1ECFi</p>\n                <input type=\"checkbox\" name=\"metmoi\" id=\"\" ").concat(metmoi == true ? "checked" : "", " ></li>\n            <li><p>M\u1EA5t v\u1ECB gi\xE1c</p>\n                <input type=\"checkbox\" name=\"matvigiac\" id=\"\" ").concat(matvigiac == true ? "checked" : "", "></li>\n            <li><p>Nhi\u1EC7t \u0111\u1ED9</p>\n                <div class=\"tem\">").concat(temp, "</div>\n        </ul>\n    </div>\n    ");
  return status_block;
}

statuses = JSON.parse(localStorage.getItem("Statuses"));

function show_all_status(list_status) {
  var statuses_block = document.querySelector('.status');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = list_status[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      if (key !== null) {
        var _status = create_status(key['_id'], key['_ho'], key['_sot'], key['_nhucdau'], key['_metmoi'], key['_matvigiac'], key['_temp'], key['_time']);

        statuses_block.insertAdjacentHTML('beforeend', _status);
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
} //Show all list_status


if (statuses != null) show_all_status(statuses);else statuses = [];
var update_buttton = document.querySelector('.button_update');
update_buttton.addEventListener('click', function (e) {
  e.preventDefault();
  var inpObj = document.getElementById("6");

  if (!inpObj.checkValidity()) {
    alert(inpObj.validationMessage);
  } else {
    var ho = document.querySelector('.update>form>input[name="ho"]').checked;
    var sot = document.querySelector('.update>form>input[name="sot"]').checked;
    var nhucdau = document.querySelector('.update>form>input[name="nhucdau"]').checked;
    var metmoi = document.querySelector('.update>form>input[name="metmoi"]').checked;
    var matvigiac = document.querySelector('.update>form>input[name="matvigiac"]').checked;
    var temp = document.querySelector('.update>form>input[name="nhietdo"]').value;
    time = new Date();
    h = time.getHours();
    mi = time.getMinutes();
    d = time.getDate();
    m = time.getMonth();
    y = time.getFullYear();
    var t = "".concat(h, ":").concat(mi, " ").concat(d, "/").concat(m, "/").concat(y);
    id = createID(l_id);
    statuses.push(status = {
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
  } //localStorage.removeItem("Statuses");

});