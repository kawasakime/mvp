'use strict'

window.addEventListener('DOMContentLoaded', function() {

    //модальное окно покупки

    const openPanelBtn = document.querySelector('.place-order'),
    closePanelBtn = document.querySelector('.close'),
    panel = document.querySelector('.modalPanel'),
    sendDataBtn = document.querySelector('.send-data'),
    secondPanel = document.querySelector('.panel');

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

    function sendData(btn, panel) {
        const succefulText = document.createElement('div');
        succefulText.style.color = "green";
        succefulText.style.fontSize = "18px";
        succefulText.style.fontWeight = 'bold'
        succefulText.innerHTML = 'Мы свяжемся с вами в ближайшее время!';
        btn.remove()
        panel.append(succefulText);
    }

    sendDataBtn.addEventListener('click', () => {
        sendDataBtn.style.transition = "opacity .3s"
        sendDataBtn.style.opacity = 0;
        setTimeout(sendData, 300, sendDataBtn, secondPanel);
        setTimeout(() => window.location.reload(), 1000);
        
    })

    //формирование элементов в корзине

    const cartProductsContainer = document.querySelector('.cart-products'),
          orderContainer = document.querySelector('.order');

    const categories = {
        dry: "робот-пылесос для сухой уборки",
        wet: 'робот-пылесос для влажной уборки',
        lawn: 'робот для стрижки газона',
        swimmingpool: 'робот для бассейна',
        window: 'робот для мойки окон',
        acses: 'аксессуары для робота-пылесоса'
    } 

        //получения массива с повторами

    function getProductCartList() {
        const cartProductsDataBase = JSON.parse(localStorage.getItem('cartElements'));

        if (cartProductsDataBase === null) {
            return null
        } else {
            const newCartProductDataBase = cartProductsDataBase.reduce((count, product) => { 
                if (count.hasOwnProperty(product)){
                    count[product]++
                } else{
                    count[product] = 1
                }
                
                return count;
            }, {});
                
            return newCartProductDataBase;
        }
    }

    //получить данные из локального хранилища о товарах в корзине

    function getCartProductsInfo() {
        return JSON.parse(localStorage.getItem('cartElements'));
    }

    function getAllProductsList() {
        return JSON.parse(localStorage.getItem('products'));
    }


    function generateProductsList() {
        const productDataBase = getAllProductsList();
        console.log(productDataBase)

        cartProductsContainer.innerHTML = '';

        if (getProductCartList() === null || Object.keys(getProductCartList()).length === 0 ) {
            const empty = document.createElement('div');
            empty.innerHTML = 'Корзина пуста';
            cartProductsContainer.append(empty);
        } else {
            const productsCount = Object.entries(getProductCartList());
            for (let i = 0; i < productsCount.length; i++) {
                const product = productsCount[i];
                cartProductsContainer.innerHTML += `
                <div class="item" data-product-id="${product[0]}">
                    <img src="img/${product[0]}/${productDataBase[product[0]].imgs[0]}" alt="">
                    <div class="name">${productDataBase[product[0]].name}</div>
                    <div class="descr">${categories[productDataBase[product[0]].type]}</div>
                    <div class="availability">Наличие: <b>В наличии</b></div>
                    <div class="price">${calcPrice(productDataBase[product[0]].nowPrice, product[1])} ₽</div>
                    <div class="count">
                        <div class="edit-count left">-</div>
                        <input type="text" value="${product[1]}" disabled>
                        <div class="edit-count right">+</div>
                    </div>
                    <div class="btn-remove">Удалить</div>
                </div>
                `
            }
        }
    }

    generateProductsList();

    //счётчик цены

    function calcPrice(strPrice, i) {
        let price = +(strPrice.split(' ').join(''));
        return (price*i).toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
    }

    //удаление товара

    function removeElement(element) {
        let cartProductsDataBase = getCartProductsInfo();
        let newCartElements = [];

        cartProductsDataBase.forEach(e => {
            if (e !== element.parentElement.dataset.productId) {
                newCartElements.push(e)
            }
        });
        localStorage.setItem('cartElements', JSON.stringify(newCartElements));
        element.parentElement.remove()
    }

    cartProductsContainer.addEventListener('click', (e) => {
        if (e.target.className === 'btn-remove') {
            removeElement(e.target);
            calcTotalCost();
        }
    })

    //уменьшение/увеличение товара

    cartProductsContainer.addEventListener('click', (t) => {

        if (t.target.className === "edit-count left") {
            const parent = t.target.parentElement.parentElement;
            const countElement = t.target.parentElement.querySelector('input');
            const elemId = parent.dataset.productId;

            if (countElement.value > 1) {
                countElement.value--;
                const cartProductsDataBase = getCartProductsInfo()
                let index = 0;
                cartProductsDataBase.forEach((e, i) => {
                    if (e == elemId) {
                        if (index == 0) {
                            index++;
                        } else {
                            index=i;
                        }
                    }
                });
                const newList = cartProductsDataBase.filter((value, i) => {
                    if(i !== index)
                        return value;
                });
                localStorage.setItem('cartElements', JSON.stringify(newList));
                Object.entries(getProductCartList()).forEach((e, i) => {
                    if (e[0] == elemId) {
                        parent.querySelector('.price').innerHTML = `${calcPrice(getAllProductsList()[elemId].nowPrice, e[1])} ₽`;
                        calcTotalCost();
                    }
                });
            }
        }

        if (t.target.className === "edit-count right") {
            const parent = t.target.parentElement.parentElement;
            const countElement = t.target.parentElement.querySelector('input');
            const elemId = parent.dataset.productId;

            countElement.value++;
            let cartProductsDataBase = getCartProductsInfo();
            cartProductsDataBase.push(elemId);
            localStorage.setItem('cartElements', JSON.stringify(cartProductsDataBase));
            Object.entries(getProductCartList()).forEach((e, i) => {
                if (e[0] == elemId) {
                    parent.querySelector('.price').innerHTML = `${calcPrice(getAllProductsList()[elemId].nowPrice, e[1])} ₽`;
                    calcTotalCost();
                }
            });
        }
        
    });

    //пересчёт общей цены

    function calcTotalCost() {
        const allProductsCosts = document.querySelectorAll('.price'),
              totalCost = document.querySelector('.result > b');
        let price = 0;

        allProductsCosts.forEach(elem => {
            console.log(elem.textContent)
            price += +(elem.textContent.split(' ').filter(e => {
                if (Number.isInteger(+e)) return e;
            }).join(''));
        })

        totalCost.innerHTML = `${price.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ' )} ₽`
    }

    calcTotalCost();

}, false);

