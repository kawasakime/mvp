'use strict'

document.addEventListener('DOMContentLoaded', function() {

    const productList = JSON.parse(localStorage.getItem('products'));

    const productsAmount = document.querySelector('.products-amount span'),
          productsContainer = document.querySelector('.products');

    const categoryButton = document.querySelectorAll('.choice-category'),
          categoryTitle = document.querySelector('.list-products > .wrapper > .title');

    const categories = {
        dry: "робот-пылесос для сухой уборки",
        wet: 'робот-пылесос для влажной уборки',
        lawn: 'робот для стрижки газона',
        swimmingpool: 'робот для бассейна',
        window: 'робот для мойки окон',
        acses: 'аксессуары для робота-пылесоса'
    } 

    function setProducts() {
        const activeCategory = localStorage.getItem('activeCategory');

        let count = 0;
        productsContainer.innerHTML = '';

        for (let i = 1; i <= Object.keys(productList).length; i++) {
            if (productList[i].type == activeCategory) {
                productsContainer.innerHTML += `
                <div class="product" data-product-id="${i}">
                    <img src="img/${i}/${productList[i].imgs[0]}" alt="">
                    <div class="name">${productList[i].name}</div>
                    <div class="descr">${categories[activeCategory]}</div>
                    <div class="price">${productList[i].nowPrice}₽</div>
                    <div class="btn buy">В корзину</div>
                </div>
                `;
                count++;
            }
        }

        productsAmount.innerHTML = `${count}`;
    }

    setActiveCategory();
    setProducts();

    function changeCategory(category) {
        localStorage.setItem('activeCategory', category)
    }

    function setActiveCategory() {
        categoryButton.forEach(btn => {
            btn.classList.remove('active');
        });

        categoryButton.forEach(btn => {
            if (btn.dataset.type == localStorage.getItem('activeCategory')) {
                btn.classList.add('active');
            }
        });
    }

    categoryButton.forEach(btn => {
        btn.addEventListener('click', (event)=> {
            if (event.target.tagName == "A") {
                changeCategory(btn.dataset.type);
                setActiveCategory();
                setProducts();
                categoryTitle.innerHTML = `${event.target.textContent}`
            }
        })
    });

    const products = document.querySelectorAll('.product');

    productsContainer.addEventListener('click', (e) => {
        if (e.target.classList[1] != 'buy') {
            if (e.target.className == 'product') {
                window.open(`products/${e.target.dataset.productId}.html`, '_self');
            }
            if(e.target.parentElement.className == 'product') {
                window.open(`products/${e.target.parentElement.dataset.productId}.html`, '_self');
            }
        }   
    });

}, false);