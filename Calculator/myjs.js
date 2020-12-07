"use strict";
var result = document.getElementById("result");
var operator;
var temp;


function calc(a) {
    temp = Number(result.value);
    operator = a;
    result.value = "";
    return temp;
}

function final() {
    if (operator == "+")
        temp += Number(result.value);
    if (operator == "-")
        temp -= Number(result.value);
    if (operator == "*")
        temp *= Number(result.value);
    if (operator == "/")
        temp /= Number(result.value);
    result.value = temp;
    temp = 0;
}
var del = document.getElementById("clear");
del.addEventListener("click", function() {
    result.value = "";
})