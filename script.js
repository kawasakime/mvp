'use strict'

window.addEventListener('DOMContentLoaded', function() {

    const productList = JSON.parse(localStorage.getItem('products'));

    //Товары со скидкой

    const productSaleBlock = document.querySelector('.cards');

    function clearProductSaleBlock() {
        productSaleBlock.innerHTML = "";
    }

    clearProductSaleBlock();

    function fillProductsSaleBlock() {
        for (let i = 1; i <= Object.keys(productList).length; i++) {
            if (productList[`${i}`].sale == 'y') {
                productSaleBlock.innerHTML += `
                <div class="card-1" data-product-id='${i}'>
                    <img src="img/${i}/${productList[i].imgs[0]}" alt="">
                    <div class="name">${productList[i].name}</div>
                    <div class="price-last">${productList[i].lastPrice}₽</div>
                    <div class="price-new">${productList[i].nowPrice}₽</div>
                    <div class="btn buy">В корзину</div>
                </div>
                `
            }
        }
    }

    fillProductsSaleBlock();

    //Открытие товара по акции

    const cards = document.querySelectorAll('.card-1');

    cards.forEach(card => {
        card.addEventListener('click', (event)=> {
            if (event.target.classList[1] != "buy") {
                window.open(`products/${card.dataset.productId}.html`, '_self')
            }
        });
    })

    //Категории

    function setActiveCategory(category = 'dry') {
        localStorage.setItem('activeCategory', category)
    }

    setActiveCategory();

    const categories = document.querySelectorAll('.categories > div');

    categories.forEach(category => {
        category.addEventListener('click', (event)=> {
            if (category.classList[0] == 'category-1') {
                setActiveCategory('dry');
            } else if (category.classList[0] == 'category-2') {
                setActiveCategory('wet');
            } else if (category.classList[0] == 'category-3') {
                setActiveCategory('lawn');
            } else if (category.classList[0] == 'category-4') {
                setActiveCategory('swimmingpool')
            }
            window.open(`catalog.html`, '_self') 
        })
    });


}, false);

