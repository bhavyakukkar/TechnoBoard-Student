var seekRequest = true;

//Init method
function init() {
    updateLoop();
}

//calls to loop update() at an interval of 2 seconds
function updateLoop() {
    setInterval(function() {
        update();
    }, 2000);
}

//Checks whether new attention-track request from teacher has arrived
function update() {
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var parser = new DOMParser();
            var responseDoc = parser.parseFromString(this.responseText, "text/html");

            if(responseDoc.getElementById("publish").innerHTML == "True") {
                if(seekRequest) {
                    suspendUpdate();
                    inject_sign();
                }
            }
        }
    };
    xmlhttp.open("GET", "https://technoboard-extension.000webhostapp.com/ATS/php/student/s-ATS-search-request.php?t=roseline&c=csc101", true);
    xmlhttp.send();
}

//Suspends update() for 10 seconds
function suspendUpdate() {
    
    seekRequest = false;
    setTimeout(function() {
        seekRequest = true;
    }, 300000);
}

//Injects student-acknowledgement popup
function inject_sign() {
    
    fetch(chrome.runtime.getURL('/popup.html')).then(r => r.text()).then(html => {
        document.body.insertAdjacentHTML('beforeend', html);
    });
    setTimeout(function() {
        document.getElementById("index_link").addEventListener("click", sign);
    }, 500);
}

//Adds student signature to attention-track request
function sign() {
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://technoboard-extension.000webhostapp.com/ATS/php/student/s-ATS-sign.php?id=bhavya&t=roseline&c=csc101", true);
    xmlhttp.send();
}



if (document.readyState !== 'loading') {
    init();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        init();
    });
}