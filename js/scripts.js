/*!
* Start Bootstrap - Simple Sidebar v6.0.5 (https://startbootstrap.com/template/simple-sidebar)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/LICENSE)
*/
// 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

$.getJSON('data/list.json', function (data) {
    let karya = data.karya;
    $.each(karya, function (i, data) {
        // $('#daftar-karya').append(`<div class="card" style="width: 18rem;"><div class="card-body"><h5 class="card-title">`+data.judul+`</h5><h6 class="card-subtitle mb-2 text-body-secondary">`+data.penulis+`,`+data.instansi+`</h6><p class="card-link">`+data.tgl_kirim+`</p></div></div>`);
        $('#daftar-karya').append(`<div class="card border-success" ><div class="card-body"> Judul: <b>`+data.judul+`</b> <br> Penulis: `+data.penulis+`, `+data.instansi+` <br> Dikirim tanggal: `+data.tgl_kirim+`</div></div>`);
    });
});
