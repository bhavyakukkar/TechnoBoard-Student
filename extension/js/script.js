var seekRequest = true;

var signInjected = false;
var saluteInjected = false;
var failInjected = false;


//Init method
function init() {
    checkLogin();
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

//Shifts scope to extension-injected node only,
//so that non-extension elements of similar IDs are not selected
function getInjectedScope() {
    injectedScope = document.getElementById("Technoboard-Student-ATS");
    return injectedScope;
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
        getInjectedScope().getElementById("index-link").addEventListener("click", sign);
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
            getInjectedScope().getElementById("close-button").addEventListener("click", eject);
        }, 500);
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
            getInjectedScope().getElementById("close-button").addEventListener("click", eject);
        }, 500);
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

    ejectSign(true);
}


function checkLogin() {
    var check;
    
    chrome.storage.sync.get(['username'],function(data){
        check = data.username;
        // alert(check);//This code is to check if the username is stored or not (useful for debugging)
    });

    if(check==''){
        inject("../html/login.html");
        setTimeout(function() {
            getInjectedScope().getElementById("login").onclick = function(){
                addLogin();
            }

        }, 500);
    }
    else {
        //navigate to website
    };
}

function addLogin() {
    
    var value = getInjectedScope().getElementById("username").value;
    // alert(value);

    chrome.storage.sync.set({'username':value},function(){
        alert("success");
    });

    chrome.storage.sync.get(['username'],function(data){
        alert("The Stored data is:", data.username);
    });

    // window.close();
}



if (document.readyState !== 'loading') {
    init();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        init();
    });
}