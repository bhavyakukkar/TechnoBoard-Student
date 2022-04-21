function update() {
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var parser = new DOMParser();
            var responseDoc = parser.parseFromString(this.responseText, "text/html");

            if(responseDoc.getElementById("publish").innerHTML == "True")
                inject_sign();
        }
    };
    xmlhttp.open("GET", "https://technoboard-extension.000webhostapp.com/ATS/php/student/s-ATS-search-request.php?t=roseline&c=csc101", true);
    xmlhttp.send();
}

function sign() {
    alert("signing");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://technoboard-extension.000webhostapp.com/ATS/php/student/s-ATS-sign.php?id=bhavya&t=roseline&c=csc101", true);
    xmlhttp.send();
}

setInterval(function() {
    update();
}, 2000);

function inject_sign() {
    
    fetch(chrome.runtime.getURL('/popup.html')).then(r => r.text()).then(html => {
        document.body.insertAdjacentHTML('beforeend', html);
    });
    var signButton = document.getElementById("index_link");
    signButton.addEventListener("click", sign);
}