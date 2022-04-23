let captcha=document.querySelector('#captcha');
let captchaText=document.querySelector('#captcha_text');
var context=captchaText.getContext("2d");
context.font="30px Roboto";
context.fillStyle="#08e5ff";
let userText=document.querySelector('#textBox');
let submitButton=document.querySelector('#submitButton');
let output=document.querySelector('#output');
let alphaNums=['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let emptyArray=[];
for (let i=1;i<=7;i++){
    emptyArray.push(alphaNums[Math.floor(Math.random()*alphaNums.length)]);
}
var c=emptyArray.join('');
captcha.fillText(emptyArray.join(''),captchaText.width/4,captchaText.height/2);
userText.addEventListener('keyup',function(e){
    if(e.keyCode===13){
        if(userText.value===c){
            output.classList.add("correctCaptcha");
            output.innerHTML="Correct!";
        }
        else{
            output.classList.add("incorrectCaptcha");
            output.innerHTML="Incorrect, please try again!";
        }
    }
});
submitButton.addEventListener('click',function(){
    if(userText.value===c){
        output.classList.add("correctCaptcha");
        output.innerHTML="Correct!";
    }
    else{
        output.classList.add("incorrectCaptcha");
        output.innerHTML="Incorrect, please try again!";
    }
});