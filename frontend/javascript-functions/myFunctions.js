function populateDate() {
    document.getElementById("showCurrentDate").innerHTML = Date();
}
function replaceText() {
    document.getElementById("replaceText").innerHTML = "Hello!";
}
function bulbOn() {
    document.getElementById('myImage').src='pic_bulbon.gif';
}
function bulbOff() {
    document.getElementById('myImage').src='pic_bulboff.gif';
}
var i = 0;
function move() {
    if (i == 0) {
        i = 1;
        var elem = document.getElementById("myBar");
        var width = 10;
        var id = setInterval(frame, 10);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                i = 0;
            } else {
                width++;
                elem.style.width = width + "%";
                elem.innerHTML = width  + "%";
            }
        }
    }
}