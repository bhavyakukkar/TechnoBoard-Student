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
                    
                    eject();
                    injectSign();

                    setTimeout(injectFail, 30000);
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
    }, 20000);
}


//IMPORTANT: Where document.getElementById('') is to be used, use getFromInjectedScope('') instead
//
//Shifts scope to extension-injected node only,
//so that non-extension elements of similar IDs are not selected
function getFromInjectedScope(id) {
    var injectedScope = document.getElementById("Technoboard-Student-ATS");

    var allInjectedElements = injectedScope.getElementsByTagName("*");
    for (var i = 0; i < allInjectedElements.length; i++) {
        if (allInjectedElements[i].id === id) {
            requestedElement = allInjectedElements[i];
            break;
        }
    }
    return requestedElement;
}

//Abstract inject function
function inject(source) {

    fetch(chrome.runtime.getURL(source)).then(r => r.text()).then(html => {
        document.body.insertAdjacentHTML('beforeend', html);
    });
}

//Eject all injected content
function eject() {
    if(document.getElementById("Technoboard-Student-ATS"))
        document.getElementById("Technoboard-Student-ATS").remove();
        //document.body.removeChild(document.getElementById("Technoboard-Student-ATS"));
}

//Injects student-acknowledgement popup
function injectSign() {
    
    if(!signInjected)
        inject('../html/sign.html');
    
    setTimeout(function() {
        getFromInjectedScope("index-link").addEventListener("click", sign);
    }, 500);

    signInjected = true;
}

//Injects salute after student responded within 3 mins
function injectSalute() {
    
    if(!failInjected) {
        eject();
        saluteInjected = true;
        inject('../html/salute.html');

        setTimeout(function() {
            getFromInjectedScope("close-button").addEventListener("click", eject);
        }, 1000);
    }

    signInjected = false;
}

//Injects salute after student failed to respond within 3 mins
function injectFail() {

    if(!saluteInjected) {
        eject();
        failInjected = true;
        inject('../html/fail.html');

        setTimeout(function() {
            getFromInjectedScope("close-button").addEventListener("click", eject);
        }, 1000);
    }

    signInjected = false;
}

//Eject salute/fail windows
function closeWindow() {
    document.getElementById("Technoboard-Student-ATS").remove();
}

//Adds student signature to attention-track request
function sign() {
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://technoboard-extension.000webhostapp.com/ATS/php/student/s-ATS-sign.php?id=1940224_Ronald&t=john1024&c=csc101", true);
    xmlhttp.send();

    injectSalute();
}

function injectLogin() {
    inject("../html/login.html");

    setTimeout(function() {
        getFromInjectedScope("login").onclick = function(){
            addLogin();
        }
    }, 500);
}

function checkLogin() {
    var username;

    chrome.storage.sync.get('Technoboard-Student-ATS-username', function(data) {
        username = data['Technoboard-Student-ATS-username'];
        if(!username)
            injectLogin();
    });
}

function addLogin() {
    
    var username = getFromInjectedScope("username").value;

    var key = "Technoboard-Student-ATS-username",
        value = username;
    
    var usernameJson = {};
    usernameJson[key] = value;
    chrome.storage.sync.set(usernameJson, function() {
        //login added
    });
}



if (document.readyState !== 'loading') {
    init();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        init();
    });
}