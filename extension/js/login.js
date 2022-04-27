window.addEventListener('DOMContentLoaded', function() {
    var user  = document.querySelector('input#user');
  
     var form = document.querySelector('form#userinfo');
  
    form.addEventListener('submit', function(evt) {     
      evt.preventDefault();
      var userStr = user.value; 
      chrome.runtime.getBackgroundPage(function(bgPage) {
       bgPage.login(userStr/*,pwdStr*/); });
      window.close();
  
     }); 
  
     });