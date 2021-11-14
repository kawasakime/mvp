'use strict'

window.addEventListener('DOMContentLoaded', function() {

    // localStorage.setItem('products', JSON.stringify(dataBaseProducts));
    const productList = JSON.parse(localStorage.getItem('products'));

    const productWrapper = document.querySelector('.product-wrapper .wrapper'),
          title = productWrapper.querySelector('.title'),
          product = productWrapper.querySelector('.product'),
          productId = document.querySelector('body').dataset.productId;

    const ourObject = productList[productId];

    function editPage() {
        title.innerHTML = ourObject['name'];

        product.innerHTML = `
                    <div class="photos">
                        <div class="little-photos">
                            <img src="/img/${productId}/${ourObject['imgs'][0]}" alt="">
                            <img src="/img/${productId}/${ourObject['imgs'][1]}" alt="">
                            <img src="/img/${productId}/${ourObject['imgs'][2]}" alt="">
                        </div>
                        <img src="/img/${productId}/${ourObject['imgs'][0]}" alt="" class="main-photo">
                    </div>
                    <div class="product-info">
                        <div class="descr">
                            <div class="title-2">Описание:</div>
                            <div class="description">${ourObject['description']}</div>
                        </div>
                            <div class="raiting">
                                <p>Рейтинг: </p> 
                                <div class="rating-mini">
                                    <span class="active"></span>	
                                    <span class="active"></span>
                                    <span class="active"></span>
                                    <span class="active"></span>  
                                    <span class="active"></span>
                                </div>
                            </div>
                        <div class="price-block" data-product-id="${productId}">
                            
                            <div class="price">${ourObject['nowPrice']}₽</div>
                            <div class="btn buy">Купить</div>
                            <div class="delivery"><u>Бесплатная доставка</u> по всей россии</div>
                        </div>
                    </div>
        `
        if (ourObject['sale'] == 'y') {
            const priceBlock = document.querySelector('.price');
            const price = document.createElement('div')
            price.className = 'last-price';
            price.innerHTML = `${ourObject['lastPrice']}₽`;
            priceBlock.prepend(price);
        }
    }

    editPage();

    // Выбор фотографии

    const littlePhotos = document.querySelectorAll('.little-photos img'),
          largePhoto = document.querySelector('.main-photo');

    function setActivePhoto(i = 0) {
        littlePhotos.forEach(photo => {
            photo.classList.remove('active-photo');
        });
        littlePhotos[i].classList.toggle('active-photo');
    }

    setActivePhoto()

    function changeLargePhoto(i) {
        largePhoto.src = `/img/${productId}/${ourObject["imgs"][i]}`;
    }

    littlePhotos.forEach((photo, i) => {
        photo.addEventListener('click', ()=> {
            setActivePhoto(i);
            changeLargePhoto(i);
        });
    });

}, false);