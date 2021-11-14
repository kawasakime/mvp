'use strict'

window.addEventListener('DOMContentLoaded', function() {
    const btnsBuy = document.querySelectorAll('.buy');
    

    function addToCart(element) {
        const productId = element.parentElement.dataset.productId;

        if (localStorage.getItem("cartElements") == null) {
            localStorage.setItem('cartElements', '[]')
        } 

        let cart = JSON.parse(localStorage.getItem("cartElements"));
        cart.push(productId);
        localStorage.setItem('cartElements', JSON.stringify(cart));
    }

    function greenBtn(btn) {
        btn.style.background = "green";
        btn.innerHTML = 'Добавлено'
    }

    function blueBtn(btn) {
        btn.style.background = "rgb(69, 129, 219)";
        btn.innerHTML = 'В корзину';
    }

    document.querySelector('body').addEventListener('click', (e) => {
        if (e.target.classList[1] === 'buy') {
            addToCart(e.target);
            greenBtn(e.target);
            setTimeout(blueBtn, 1000, e.target);
        }
    });

}, false);