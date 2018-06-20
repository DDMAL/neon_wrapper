import { Neon } from './Neon2/src/Neon.js';
import 'bulma/css/bulma.css';
import './Neon2/src/bulma-slider.min.css';
import './Neon2/src/bulma-slider.min.js';

var neon = new Neon({
    meifile: meiFile,
    bgimg: bgImg,
});

$(document).ready(function () {
    $('#finish-interactive').click(function () {
        $.ajax({url: '', type: 'POST', data: JSON.stringify({'user_input': neon.getMEI()}), contentType: 'application/json'});
        window.close();
    });
});
