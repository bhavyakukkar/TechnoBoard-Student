/*var $has_teacher_requested = $("#request-open");
setInterval(function () {
    $has_teacher_requested.load("s-ATS-request.php #main");
}, 30000);*/

/*var button = document.getElementById('clickme');
button.addEventListener("click", function() {
    update();
});*/

function update() {
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert(this.responseText);
        }
    };
    xmlhttp.open("GET", "https://technoboard-extension.000webhostapp.com/ATS/php/student/s-ATS-search-request.php?t=roseline&c=csc101", true);
    xmlhttp.send();
}

/*function loop() {
    update();
    setTimeout(loop(), 20000);
}

loop();*/
setInterval(function() {
    update();
}, 10000);