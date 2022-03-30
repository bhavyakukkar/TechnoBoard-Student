var $has_teacher_requested = $("#request-open");
setInterval(function () {
    $has_teacher_requested.load("s-ATS-request.php #main");
}, 30000);