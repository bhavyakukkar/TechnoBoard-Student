main = document.getElementById("main");

$.getJSON('https://cc95-2402-3a80-d22-969a-1843-da9e-feb8-f07b.ngrok.io/Technoboard/student-list.json', function(data) {
    main.innerHTML += data;
});