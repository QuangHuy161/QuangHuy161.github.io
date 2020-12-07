function createGradient() {
    var color1 = document.getElementById("from-color").value;
    var color2 = document.getElementById("to-color").value;
    var code = 'linear-gradient( 90deg , ' + color1 + ', ' + color2 + ' )';
    document.getElementById("gradient-color").style.backgroundImage = code;
    document.getElementById("code-css").innerHTML = ' background-image: ' + code + ';';
}