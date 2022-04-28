var seekRequest = true;

var signInjected = false;
var saluteInjected = false;
var failInjected = false;

//Init method
function init() {
    //checkLogin();
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

                    injectSign();

                    /*setTimeout(function() {
                        ejectSign(false);
                    }, 180000);*/
                    setTimeout(function() {
                        ejectSign(false);
                    }, 60000);
                }
            }
        }
    };
    xmlhttp.open("GET", "https://technoboard-extension.000webhostapp.com/ATS/php/student/s-ATS-search-request.php?t=john1024&c=csc101", true);
    xmlhttp.send();
}

//Suspends update() for 3 minutes
function suspendUpdate() {
    
    seekRequest = false;
    setTimeout(function() {
        seekRequest = true;
    }, 180000);
    /*setTimeout(function() {
        seekRequest = true;
    }, 20000);*/
}

//Abstract inject function
function inject(source) {
    fetch(chrome.runtime.getURL(source)).then(r => r.text()).then(html => {
        document.body.insertAdjacentHTML('beforeend', html);
    });
}

//Eject all injected content
function eject() {
    document.body.removeChild(document.getElementById("Technoboard-Student-ATS-Sign"));
}

//Injects student-acknowledgement popup
function injectSign() {
    
    if(!signInjected)
        inject('../html/sign.html');
    
    setTimeout(function() {
        document.getElementById("index_link").addEventListener("click", sign);
    }, 500);

    signInjected = true;
}

//Injects salute after student responded within 3 mins
function injectSalute() {
    saluteInjected = true;
    inject('../html/salute.html');
}

//Injects salute after student failed to respond within 3 mins
function injectFail() {
    failInjected = true;
    inject('../html/fail.html');
}

//Removes student-acknowledge popup
function ejectSign(inTime) {
    
    if(signInjected)
        eject();
    
    
    if(inTime)
        if(!failInjected) {
            injectSalute();
        }
    else
        if(!saluteInjected) {
            injectFail();
        }
    
    signInjected = false;
}

//Adds student signature to attention-track request
function sign() {
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://technoboard-extension.000webhostapp.com/ATS/php/student/s-ATS-sign.php?id=1940224_Ronald&t=john1024&c=csc101", true);
    xmlhttp.send();

    ejectSign(true);
}


function checkLogin() {
    if(!localStorage.username){
        inject("../html/login.html");
        
        setTimeout(function() {
            document.getElementById("login").addEventListener("click", function() {
                addLogin(document.getElementById("username").innerText);
            });
        }, 500);
    }
    else {
        //navigate to website
    };
}

function addLogin(username) {
    
    /*window.addEventListener('DOMContentLoaded', function() {
    var user = document.querySelector('input#user');
    var form = document.querySelector('form#userinfo');
    
    form.addEventListener('submit', function(evt) {
        evt.preventDefault();
        var userStr = user.value;
        chrome.runtime.getBackgroundPage(function(bgPage) {
            bgPage.login(username); });
            window.close();
        });
    });*/

    chrome.runtime.getBackgroundPage(function(bgPage) {
        bgPage.login(username);
    });
    window.close();
}


if (document.readyState !== 'loading') {
    init();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        init();
    });
}