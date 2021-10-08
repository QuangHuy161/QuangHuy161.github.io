"use strict";

// scrapeFunciton('https://ncov.moh.gov.vn/')
var apiCaBenh = 'https://api.apify.com/v2/key-value-stores/ZsOpZgeg7dFS1rgfM/records/LATEST';
var apiKhuVuc = 'https://api.apify.com/v2/key-value-stores/p3nS2Q9TUn6kUOriJ/records/LATEST';
Promise.all([fetch(apiCaBenh), fetch(apiKhuVuc)]).then(function (responses) {
  return Promise.all(responses.map(function (response) {
    return response.json();
  }));
}).then(function (data) {
  var caBenhArr = [];
  var khuVucArr = []; //push data into array

  caBenhArr.push(data[0]['detail']);
  khuVucArr.push(data[1]['key']);
  sortKhuVUc = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = khuVucArr[0][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var t = _step.value;
      sortKhuVUc.push(t);
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

  ;
  sortKhuVUc.sort(function (a, b) {
    return a['hec-key'] - b['hec-key'];
  });
  str_data = "";
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = caBenhArr[0][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var el = _step2.value;
      str_data += "\n                <tr>\n                    <td>".concat(el['name'], "</td>\n                    <td>").concat(el['casesToday'], "</td>\n                    <td>").concat(el['death'], "</td>\n                    <td>").concat(el['cases'], "</td>\n                </tr>\n                ");
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

  Stat_Table = "\n    <div class=\"stat_table hide_scrollbar\">\n        <table class=\"table table-striped \">\n            <thead>\n                <tr>\n                    <th scope=\"col\">Khu v\u1EF1c</th>\n                    <th scope=\"col\">Ca m\u1EAFc m\u1EDBi</th>\n                    <th scope=\"col\">T\u1EED vong</th>\n                    <th scope=\"col\">T\u1ED5ng</th>\n                </tr>\n            </thead>\n            <tbody>\n                ".concat(str_data, "\n            </tbody>\n        </table>\n    </div>\n    "); //Show data on screen

  document.querySelector('.stat').insertAdjacentHTML('beforeEnd', Stat_Table);
})["catch"](function (error) {
  console.log(error);
});