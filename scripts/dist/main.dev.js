"use strict";

//scroll
//typing text-intro
var txt = document.querySelector('.typing-text');
var MyText = [];
test1 = 'Front-end developer. ';
test2 = 'Website designer. ';
MyText.push(test1);
MyText.push(test2);
var indexMain = 0;
var indexSub = 0;

function autoDel(indexSub, indexMain) {
  txt.innerHTML = MyText[indexMain].slice(0, indexSub);

  while (indexSub != 0) {
    autoDel(indexSub--);
  }
}

function autoWrite() {
  txt.innerHTML = MyText[indexMain].slice(0, indexSub);
  indexSub++;

  if (indexSub == MyText[indexMain].length) {
    // /autoDel(indexSub, indexMain);
    indexSub = 0;
    indexMain++;

    if (indexMain == MyText.length) {
      indexMain = 0;
    }
  }
}

var interval = setInterval(autoWrite, 200);