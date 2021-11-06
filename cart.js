'use strict'

window.addEventListener('DOMContentLoaded', function() {

    const openPanelBtn = document.querySelector('.place-order'),
    closePanelBtn = document.querySelector('.close'),
    panel = document.querySelector('.modalPanel');

    function showPanel() {
    panel.style.display = "block";
    document.querySelector('body').style.overflow = 'hidden';
    }

    function hidePanel() {
    panel.style.display = 'none';
    document.querySelector('body').style.overflow = '';
    }

    openPanelBtn.addEventListener('click', showPanel);
    closePanelBtn.addEventListener('click', hidePanel);

}, false);

