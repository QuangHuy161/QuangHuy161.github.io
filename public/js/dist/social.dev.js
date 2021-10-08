"use strict";

//============================GOOGLE Sign in==============================================================================================================================
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

checkSignIn(); //======================share_screen======================================================================================================================================
//News PAGE

share_screen = document.querySelector('.share_screen');

function share(e) {
  share_screen.style.display = "block";
}

var button_share = document.querySelectorAll('.news_item>.button_share');
button_share.forEach(function (bt_share) {
  bt_share.addEventListener("click", share);
}); //============================cancle_notification==============================================================================================================================

function cancle() {
  share_screen.style.display = "none";
}

var cancle_bt = document.querySelector('.cancle');
cancle_bt.addEventListener('click', cancle); //Social Page

var button_share_social = document.querySelectorAll('.article_bottom>.share');
button_share_social.forEach(function (e, i) {
  e.addEventListener('click', share);
}); //===========================POST=============================================================================================================================================

var button_post = document.querySelector(".user_frame .buttons .button_post");
button_post.addEventListener('click', function () {
  var left_srcreen = document.querySelectorAll('.left');
  left_srcreen.forEach(function (e) {
    if (!e.classList.contains('none')) e.classList.add('none');
  });
  left_srcreen[1].classList.remove('none');
}); //===========================USER==========================================================================================================================

var button_user = document.querySelector(".user_frame .buttons .button_user");
button_user.addEventListener('click', function () {
  var left_srcreen = document.querySelectorAll('.left');
  left_srcreen.forEach(function (e) {
    if (!e.classList.contains('none')) e.classList.add('none');
  });
  left_srcreen[2].classList.remove('none');
}); //===========================Main==========================================================================================================================

var button_main = document.querySelector(".user_frame .buttons .button_main");
button_main.addEventListener('click', function () {
  var left_srcreen = document.querySelectorAll('.left');
  left_srcreen.forEach(function (e) {
    if (!e.classList.contains('none')) e.classList.add('none');
  });
  left_srcreen[0].classList.remove('none');
}); //===========================Comment=========================================================================================================================

var comment_button = document.querySelectorAll('.comment');
comment_button.forEach(function (e) {
  e.addEventListener('click', function () {
    var left_srcreen = document.querySelectorAll('.left');
    left_srcreen.forEach(function (e) {
      if (!e.classList.contains('none')) e.classList.add('none');
    });
    left_srcreen[3].classList.remove('none');
  });
}); //=======================CREATE ID=================================================================================================

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
statuses = JSON.parse(localStorage.getItem("Statuses"));

if (statuses != null) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = statuses[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;
      if (key !== null) l_id.push(key['_id']);
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

  localStorage.setItem("l_id", JSON.stringify(l_id));
}

l_id = JSON.parse(localStorage.getItem("l_id"));

function createID(l_id, t, length_id) {
  n = ascii_arr.length;
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
      localStorage.setItem(t, JSON.stringify(l_id));
      return id;
    }
  }
} //=======================CREATE status Article=================================================================================================


function create_status(id, ho, sot, nhucdau, metmoi, matvigiac, temp, time) {
  var status_block = "\n    <div class=\"status_state\" id=\"".concat(id, "\">\n        <div class=\"time\"><p>").concat(time, "</p></div>\n        <ul class=\"list_status\">\n            <li>\n                <p>Ho</p>\n                <input type=\"checkbox\" name=\"ho\" id=\"\" ").concat(ho == true ? "checked" : "", " >\n            </li>\n            <li><p>S\u1ED1t</p>\n                <input type=\"checkbox\" name=\"sot\" id=\"\" ").concat(sot == true ? "checked" : "", " ></li>\n            <li><p>Nh\u1EE9c \u0111\u1EA7u</p>\n                <input type=\"checkbox\" name=\"nhucdau\" id=\"\" ").concat(nhucdau == true ? "checked" : "", " ></li>\n            <li><p>M\u1EC7t m\u1ECFi</p>\n                <input type=\"checkbox\" name=\"metmoi\" id=\"\" ").concat(metmoi == true ? "checked" : "", " ></li>\n            <li><p>M\u1EA5t v\u1ECB gi\xE1c</p>\n                <input type=\"checkbox\" name=\"matvigiac\" id=\"\" ").concat(matvigiac == true ? "checked" : "", "></li>\n            <li><p>Nhi\u1EC7t \u0111\u1ED9</p>\n                <div class=\"tem\">").concat(temp, "</div>\n        </ul>\n    </div>\n    ");
  return status_block;
}

function show_all_status(list_status) {
  var statuses_block = document.querySelector('.status');
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = list_status[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _key = _step2.value;

      if (_key !== null) {
        var status = create_status(_key['_id'], _key['_ho'], _key['_sot'], _key['_nhucdau'], _key['_metmoi'], _key['_matvigiac'], _key['_temp'], _key['_time']);
        statuses_block.insertAdjacentHTML('beforeend', status);
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
} //Show all list_status


if (statuses != null) show_all_status(statuses);else statuses = [];
var update_buttton = document.querySelector('.button_update');
update_buttton.addEventListener('click', function (e) {
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
    id = createID(l_id, 'l_id', 6);
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

  var left_srcreen = document.querySelectorAll('.left');
  left_srcreen.forEach(function (e) {
    if (!e.classList.contains('none')) e.classList.add('none');
  });
  left_srcreen[0].classList.remove('none');
  window.location.reload(true);
}); //======================================List Post Article of ID ========================================================

l_id_post = [];
localStorage.setItem("l_id_post", JSON.stringify(l_id_post));
articles = JSON.parse(localStorage.getItem("Articles"));

if (articles != null) {
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = articles[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _key2 = _step3.value;
      if (_key2 !== null) l_id_post.push(_key2['_id']);
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  localStorage.setItem("l_id_post", JSON.stringify(l_id_post));
}

l_id_post = JSON.parse(localStorage.getItem("l_id_post")); //==================find id youtube=================

function fil_ID(link) {
  if (link.indexOf('https://www.youtube.com/watch?v') == 0) {
    pos = link.indexOf('=');
    id = link.substring(pos + 1);
    if (pos != -1) return id;else return '-1';
  }

  return link;
} //=======================Create Post Article=================================================================================================


function create_article(id, caption, link_id, img, name, avat) {
  var link = '';
  if (link_id.indexOf('https://') == 0 && link_id.indexOf('https://www.youtube.com/watch?v') == -1) link = "<a href=\"".concat(link_id, "\">").concat(link_id, "</a>");else if (link_id != '-1' && link_id != '') link = " <iframe width=\"100%\" height=\"600\" src=\"https://www.youtube.com/embed/".concat(link_id, "\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>");
  var article_block = "\n    <div class=\"article\" id=\"".concat(id, "\">\n        <div class=\"article_top\">\n            <div class=\"user\">\n                <div class=\"avat_img\">\n                    <img src=\"").concat(avat, "\" alt=\"avatar\" srcset=\"\">\n\n                </div>\n                <span class=\"name\">").concat(name, "</span>\n            </div>\n            <div class=\"dot_icon\">\n                <div class=\"dot\"></div>\n                <div class=\"dot\"></div>\n                <div class=\"dot\"></div>\n            </div>\n        </div>\n        <div class=\"article_content\">\n            <div class=\"caption\">\n                <p>").concat(caption, "</p>\n            </div>\n            <div class=\"link\">\n                ").concat(link, "\n            </div>\n            <div class=\"file\">\n                <img src=\"").concat(img, "\" alt=\"\">\n            </div>\n        </div>\n        <div class=\"article_bottom\">\n            <div class=\"react\">\n                <div class=\"heart\">\n                    <span class=\"icon\">\n                        <svg width=\"24\" height=\"22\" viewBox=\"0 0 24 22\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <path d=\"M11.4453 4.83205L12 5.20185L12.5547 4.83205L17.9334 1.24623L23 5.46838V11.5316L12 20.6983L1 11.5316V5.46838L6.06657 1.24623L11.4453 4.83205Z\" fill=\"#FF7676\" stroke=\"black\" stroke-width=\"2\"/>\n                            </svg>\n                                                                    </span>\n                    <span value=\"1\">1</span>\n                </div>\n                <div class=\"comment\">\n                    <span class=\"icon\">\n                        <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M20 14C20 14.552 19.552 15 19 15C18.448 15 18 14.552 18 14C18 13.448 18.448 13 19 13C19.552 13 20 13.448 20 14ZM17 14C17 14.552 16.552 15 16 15C15.448 15 15 14.552 15 14C15 13.448 15.448 13 16 13C16.552 13 17 13.448 17 14ZM14 14C14 14.552 13.552 15 13 15C12.448 15 12 14.552 12 14C12 13.448 12.448 13 13 13C13.552 13 14 13.448 14 14ZM19.415 18.946C18.415 19.202 17.426 19.428 16.091 19.428C12.626 19.428 9 17.363 9 14.005C9 10.877 12.14 8.333 16 8.333C19.844 8.333 23 10.875 23 14.005C23 15.596 22.354 16.532 21.519 17.532L22.358 20.218L19.415 18.946ZM6.042 15.571L1.653 17.467L2.909 13.455C1.788 12.114 1 10.79 1 8.756C1 4.479 5.262 1 10.5 1C15.518 1 19.628 4.194 19.967 8.222C18.777 7.656 17.416 7.333 16 7.333C11.801 7.333 8 10.13 8 14.005C8 14.717 8.147 15.405 8.411 16.054C7.458 15.928 6.865 15.782 6.042 15.571ZM24 14.005C24 11.833 22.801 9.99 20.998 8.795L21 8.756C21 3.67 16.012 0 10.5 0C4.954 0 0 3.698 0 8.756C0 10.55 0.646 12.312 1.791 13.678L0.047 19.25L6.125 16.625C7.107 16.878 8.057 17.032 8.975 17.114C10.292 19.067 12.851 20.428 16.091 20.428C17.11 20.428 18.196 20.293 19.333 20L23.964 22L22.636 17.755C23.507 16.713 24 15.371 24 14.005Z\" fill=\"black\"/>\n                            </svg>\n\n                        </span>\n                    <span value=\"1\">1</span>\n                </div>\n            </div>\n            <div class=\"share\">\n                <span class=\"button_share\">\n                    <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <path d=\"M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM13 15.889V13.666C13 13.666 9.22 13.552 6 16.999C7.513 10.412 13 9.221 13 9.221V7L18 11.425L13 15.889Z\" fill=\"#1D8B6A\"/>\n                        </svg>\n\n                </span>\n            </div>\n        </div>\n        <div class=\"choices none\">\n            <div class=\"button button_edit\">\n                <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M18.363 8.464L19.796 9.895L7.12598 22.564L0.000976562 24L1.43998 16.873L14.105 4.205L15.536 5.636L3.28098 17.86L2.55498 21.444L6.13898 20.721L18.363 8.464ZM18.307 0L15.492 2.817L21.183 8.509L24 5.688L18.307 0V0ZM5.98898 18.718L17.302 7.402L16.597 6.695L5.28398 18.009L5.98898 18.718Z\" fill=\"black\"/>\n                    </svg>\n\n                <span>Edit</span>\n            </div>\n            <div class=\"button button_remove\">\n                <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M5.662 23L0.293 17.635C0.098 17.44 0 17.185 0 16.928C0 16.672 0.098 16.416 0.293 16.221L15.222 1.293C15.417 1.099 15.673 1 15.929 1C16.184 1 16.441 1.099 16.636 1.293L23.707 8.366C23.903 8.561 24 8.817 24 9.074C24 9.33 23.903 9.585 23.707 9.781L12.491 21H18.005V23H5.662ZM9.319 21L3.833 15.514L2.414 16.928L6.49 21H9.319ZM15.924 3.419L5.247 14.099L10.905 19.758L21.581 9.076L15.924 3.419Z\" fill=\"black\"/>\n                    </svg>\n\n                <span>Remove</span>\n            </div>\n        </div>\n    </div>\n    ");
  return article_block;
}

function show_all_articles(list_articles) {
  var article_list_block = document.querySelector('.article_list');
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = list_articles[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var _key3 = _step4.value;

      if (_key3 !== null) {
        var article = create_article(_key3['_id'], _key3['_caption'], _key3['_link'], _key3['_img'], _key3['_name'], _key3['_avat']);
        article_list_block.insertAdjacentHTML('afterBegin', article);
      }
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
        _iterator4["return"]();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }
} //Show all list_status


if (articles != null) show_all_articles(articles);else articles = [];
var post_buttton = document.querySelector('.button_post');
post_buttton.addEventListener('click', function (e) {
  var inpObj = document.getElementById("ct");

  if (!inpObj.checkValidity()) {
    alert(inpObj.validationMessage);
  } else {
    var cap = document.querySelector('.left_post>form>input[name="caption"]').value;
    var link = document.querySelector('.left_post>form>input[name="link"]').value;
    var img = document.querySelector('.left_post>form>input[name="img"]').value;
    var NAME;
    var avatar;

    if (localStorage.getItem('User') != null) {
      var profile = JSON.parse(localStorage.getItem('User'));
      NAME = profile.name;
      avatar = profile.img;
    } else {}

    articles.push({
      '_id': createID(l_id_post, 'l_id_post', 10),
      '_caption': cap,
      '_link': fil_ID(link),
      '_img': img,
      '_name': NAME,
      '_avat': avatar
    });
    localStorage.setItem("Articles", JSON.stringify(articles));
  }

  var left_srcreen = document.querySelectorAll('.left');
  left_srcreen.forEach(function (e) {
    if (!e.classList.contains('none')) e.classList.add('none');
  });
  left_srcreen[0].classList.remove('none');
  window.location.reload(true);
}); //=======================Option setting==================================================================================================================================

var list_ar = document.querySelectorAll(".article_top>.dot_icon");
list_ar.forEach(function (el, i) {
  el.addEventListener('click', function () {
    document.querySelectorAll('.choices')[i].classList.toggle('none');
  });
});