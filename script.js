'use strict'

const products = document.querySelectorAll('.product');

// products.forEach(e => {
//     e.childNodes.forEach(child => {
//         if (child != e.lastElementChild) {
//             e.addEventListener('click', ()=> window.open("/index.html", '_self'))
//         }
//     })
// })

products.forEach(e => {
    e.addEventListener('click', (t)=> {
        if (t.target.tagName != "A") {
            window.open("product.html", '_self')
        }
    });
})