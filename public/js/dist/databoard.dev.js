"use strict";

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
});