import { Neon } from './Neon2/src/Neon.js';

var neon = new Neon({
    meifile: meiFile,
    bgimg: bgImg,
});

$(document).ready(function () {
    $('#finish-interactive').click(function () {
        $.ajax({url: '', type: 'POST', data: JSON.stringify({'user_input': neon.getMEI()}), contentType: 'application/json', success: function () { window.close(); }});
    });
});
