var picture = document.getElementById("pic");
var tools = document.getElementsByClassName("range");
var txt = document.getElementById("copy_text");
var file = document.querySelector('input[type="file"]');
var FIL = {
    BLUR: 0,
    BRIGHTNESS: 100,
    CONTRAST: 100,
    GRAYSCALE: 0,
    HUE_ROTATE: 0,
    INVERT: 0,
    OPACITY: 100,
    SATURATE: 100,
    SEPIA: 0,
}

function run() {
    switch (this.name) {
        case "blur":
            {
                FIL.BLUR = this.value;
                break;
            }
        case "brightness":
            {
                FIL.BRIGHTNESS = this.value;
                break;
            }
        case "contrast":
            {
                FIL.CONTRAST = this.value;
                break;
            }
        case "grayscale":
            {
                FIL.GRAYSCALE = this.value;
                break;
            }
        case "hue-rotate":
            {
                FIL.HUE_ROTATE = this.value;
                break;
            }
        case "invert":
            {
                FIL.INVERT = this.value;
                break;
            }
        case "opacity":
            {
                FIL.OPACITY = this.value;
                break;
            }
        case "saturate":
            {
                FIL.SATURATE = this.value;
                break;
            }
        case "sepia":
            {
                FIL.SEPIA = this.value;
                break;
            }
        default:
            break;
    }
    picture.style.filter = `blur(${FIL.BLUR}px) brightness(${FIL.BRIGHTNESS}%) contrast(${FIL.CONTRAST}%) grayscale(${FIL.GRAYSCALE}%) hue-rotate(${FIL.HUE_ROTATE}deg) invert(${FIL.INVERT}%)  opacity(${FIL.OPACITY}%) saturate(${FIL.SATURATE}%) sepia(${FIL.SEPIA}%)`;

    let code = '';
    if (FIL.BLUR != 0) code += ` blur(${FIL.BLUR}px)`;
    if (FIL.BRIGHTNESS != 100) code += ` brightness(${FIL.BRIGHTNESS}%)`;
    if (FIL.CONTRAST != 100) code += ` contrast(${FIL.CONTRAST}%)`;
    if (FIL.GRAYSCALE != 0) code += ` grayscale(${FIL.GRAYSCALE}%)`;
    if (FIL.HUE_ROTATE != 0) code += ` hue-rotate(${FIL.HUE_ROTATE}deg)`;
    if (FIL.INVERT != 0) code += ` invert(${FIL.INVERT}%)`;
    if (FIL.OPACITY != 100) code += ` opacity(${FIL.OPACITY}%)`;
    if (FIL.SATURATE != 100) code += ` saturate(${FIL.SATURATE}%)`;
    if (FIL.SEPIA != 0) code += ` sepia(${FIL.SEPIA}%)`;

    txt.innerHTML = "filter: " + code + " ;";
}
var tool = Array.from(tools);
tool.forEach(e => e.addEventListener("change", run));

//read file
function readURL(event) {
    if (event.files && event.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            picture.setAttribute('src', e.target.result);
        };

        reader.readAsDataURL(event.files[0]);
    }
}