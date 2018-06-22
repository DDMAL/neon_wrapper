import NeonView from './Neon2/src/NeonView.js';

var view = new NeonView({
    meifile: meiFile,
    bgimg: bgImg,
    meipath: meiPath,
});

$(document).ready(function () {
    $('#finish-interactive').click(function () {
        $.ajax({url: '', type: 'POST', data: JSON.stringify({'user_input': view.rodanGetMei()}), contentType: 'application/json', success: function () { window.close(); }});
    });
});
