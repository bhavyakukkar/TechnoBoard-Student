var $has_teacher_requested = $("#request-open");
setInterval(function () {
    $has_teacher_requested.load("s-ATS-request.php #main");
}, 30000);

var fetch = true;
var url = 'https://technoboard-extension.000webhostapp.com/ATS/php/student/s-ATS-search-request.php';
$.ajax(
{
    // Post the variable fetch to url.
    type : 'get',
    url : url,
    dataType : 'html', // expected returned data format.
    data : 
    {
        'checkpublish' : fetch // You might want to indicate what you're requesting.
    },
    success : function(data)
    {
        // This happens AFTER the backend has returned an JSON array (or other object type)
        var res1, res2;
        var publish = (document.getElementById("publsih")).innerText;
        if(publish=="True"){
            
        }
    },
    complete : function(data)
    {
        // do something, not critical.
    }
});