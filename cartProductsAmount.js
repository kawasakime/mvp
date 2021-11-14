'use strict';

window.addEventListener('DOMContentLoaded', function() {
    const cartBtn = document.querySelector('.cart-btn');

    cartBtn.style.position = "relative";

    let counter = document.createElement('div');

    counter.style.cssText = `
    position: absolute;
    right: -5px;
    top: -5px;
    height: 20px;
    width: 20px;
    color: white;
    background: #355eb8;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 11px;
    `

    function getCount() {
        if (localStorage.getItem('cartElements') == null) {
            return 0;
        } else {
            return JSON.parse(localStorage.getItem('cartElements')).length
        }
    }

    function updateCount() {
        counter.innerHTML = `${getCount()}`;
    }

    cartBtn.append(counter);

    updateCount();
    setInterval(updateCount, 1000);
}, false);