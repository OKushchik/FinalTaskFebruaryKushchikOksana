"use strict";
////////////////////// add active style
var menu = document.querySelectorAll(".header-nav__item");

var _loop = function _loop(i) {
    menu[i].onclick = function () {
        for (var j = 0; j < menu.length; j++) {
            if (menu[j].classList.contains('active')) {
                menu[j].classList.remove('active');
            }
        }
        menu[i].classList.add('active');
    };
};

for (var i = 0; i < menu.length; i++) {
    _loop(i);
}

/////////////////////////////// burger menu
var burgerIcon = document.querySelector(".header-top__burgerIcon");
var x = document.querySelector(".mobile-menu");
burgerIcon.onclick = function () {
    if (x.style.display === "block") {
        x.style.display = "none";
        document.querySelector(".nav-close").style.display = 'none';
        document.querySelector(".nav-open").style.display = 'block';
    } else {
        x.style.display = "block";
        document.querySelector(".nav-close").style.display = 'block';
        document.querySelector(".nav-open").style.display = 'none';
    }
};

//////////////////////////////////// set count
var  bag;
if (localStorage.getItem('bag') !== null) {
    bag = JSON.parse(localStorage.getItem('bag'));

}
for (var i = 0; i < bag.length; i++) {
    if (typeof bag[i][0].count === "undefined") {
        bag[i][0].count = 1;
    }
}

/////////////// change location
var btnBack = document.querySelector('.header-navBack');

btnBack.onclick = function () {
    document.location.href = "catalog.html";
};
///////////////////// change null discont price
var block = document.querySelector('.content-block');

for (var i = 0; i < catalog.length; i++) {
    if (catalog[i].discountedPrice === null) {
        catalog[i].discountedPrice = catalog[i].price;
    }
}
/////////////////////////draw
function draw() {
    var out = '';

    for (var i = 0; i < bag.length; i++) {
        out += "\n<div class=\"block-item\">\n " +
            "<div class=\"block-item__Img\">\n " +
            " <img src=\"" + bag[i][0].thumbnail + "\" alt=\"photo\">\n " +
            " </div>\n    <div class=\"block-item__Info\">\n " +
            "<h3 class=\"block-item__title\">" + bag[i][0].title + "</h3>\n " +
            " <p class=\"block-item__price item-price oldPrice\">\xA3 " + bag[i][0].price.toFixed(2) + "</p>\n " +
            "<p class=\"block-item__newPrice item-newPrice \">\xA3" + bag[i][0].discountedPrice.toFixed(2) + "</p>\n " +
            "<div class=\"block-item__parameter\">\n" +
            "<p class=\"block-item__parameter--color\">Color: " + bag[i][0].colors + "</p>\n " +
            "<p class=\"block-item__parameter--size\">Size: " + bag[i][0].sizes + "</p>\n" +
            "<p class=\"block-item__parameter--Quantity\">Quantity: <button class=\"quantity-minus\">-</button><span class=\"quantity\" >" + bag[i][0].count + "</span><button class=\"quantity-plus\">+</button></p>\n " +
            "</div>\n " +
            "<div class=\"block-item__remove\">\n " +
            "<button class=\"item-remove\">Remove item</button>\n " +
            "</div>\n " +
            "</div>\n</div>\n";
    }

    block.innerHTML = out;

    for (var _i = 0; _i < document.querySelectorAll('.block-item__price').length; _i++) {
        if (bag[_i][0].price === bag[_i][0].discountedPrice) {
            document.querySelectorAll('.block-item__price')[_i].classList.add('hide');
        }
    }
}
draw();

var quantity = document.querySelectorAll('.quantity');
var quantityMinus = document.querySelectorAll('.quantity-minus');
var quantityPlus = document.querySelectorAll('.quantity-plus');

////////////////////disable quantity for best offer
for (let i = 0; i<bag.length; i++){
    if(bag[i][0].offer !== undefined){
        quantityMinus[i].style.display = 'none';
        quantityPlus[i].style.display = 'none';
    }
}

///////////////////////quantity func


var _loop = function _loop(i) {
    quantityMinus[i].addEventListener('click', function () {
        if (quantity[i].textContent > '0') {
            bag[i][0].count = bag[i][0].count - 1;
            quantity[i].textContent = bag[i][0].count;
            sumPrice();
            discont();
            localStorage.setItem('bag', JSON.stringify(bag));
            location.reload()
        } else {
            quantity[i].textContent = 0;
        }
    });
};

for (var i = 0; i < bag.length; i++) {
    _loop(i);
}

var _loop2 = function _loop2(_i) {
    quantityPlus[_i].onclick = function () {
        bag[_i][0].count = bag[_i][0].count + 1;
        quantity[_i].textContent = bag[_i][0].count;
        sumPrice();
        discont();
        localStorage.setItem('bag', JSON.stringify(bag));
        location.reload()
    };
};

for (var _i = 0; _i < bag.length; _i++) {
    _loop2(_i);
}

var itemRemove = document.querySelectorAll('.item-remove');

/////////////////////////////remove item
var loop = function loop(i) {
    itemRemove[i].addEventListener('click', function () {
        if (bag[i][0].offer !== undefined) {
            var offerNum = bag[i][0].offer;
            bag.splice(i, 1);

            for (var j = 0; j < bag.length; j++) {
                if (bag[j][0].offer === offerNum) {
                    bag.splice(j, 1);
                    draw();
                    localStorage.setItem('bag', JSON.stringify(bag));
                    location.reload();
                }
            }
        } else {
            bag.splice(i, 1);
            draw();
            localStorage.setItem('bag', JSON.stringify(bag));
            location.reload();
        }
    });
};

for (var i = 0; i < bag.length; i++) {
    loop(i);
}

/////////////// set count bag
var countBag;
if (bag.length > 0) {
    countBag = 0;
    for (let i = 0; i<bag.length; i++){
        countBag = countBag + bag[i][0].count;
    }
} else {
    countBag = 0;
}


var countBagPaint = document.querySelector('.count-bag');

countBagPaint.innerHTML = countBag;
localStorage.setItem('countBag', JSON.stringify(countBag));

/////////////////////////// econom sum
var economPrice = document.querySelector('#discontPrice');

function discont() {
    var discont = 0;
    var price = 0;
    var econom = 0;

    for (var i = 0; i < bag.length; i++) {
        if (bag[i][0].discountedPrice === null) {
            bag[i][0].discountedPrice = bag[i][0].price;
        }

        discont = Number(bag[i][0].discountedPrice);
        price = Number(bag[i][0].price);
        var count = Number(bag[i][0].count);
        econom += price * count - discont * count;
    }

    economPrice.textContent = econom.toFixed(2) ;
}
discont();
//////////////////////// price total

var priceTotal = document.querySelector('#priceTotal');

function sumPrice() {
    var priceSum = 0;

    for (var i = 0; i < bag.length; i++) {
        var a;

        if (Number(bag[i][0].price) !== Number(bag[i][0].discountedPrice) && Number(bag[i][0].discountedPrice) !== null) {
            a = Number(bag[i][0].discountedPrice);
        } else {
            a = Number(bag[i][0].price);
        }

        var b = Number(bag[i][0].count);
        priceSum += a * b;
    }

    priceTotal.textContent = priceSum.toFixed(2) ;

    var countTotal = priceSum;
    var countTotalPaint = document.querySelector('.count-total');
    countTotalPaint.innerHTML = priceSum.toFixed(2) ;
    localStorage.setItem('countTotal', JSON.stringify(countTotal));
}

sumPrice();
/////////////////////////// emptyBag

var emptyBag = document.querySelector('.checkout__emptyBag');

emptyBag.onclick = function () {
    localStorage.setItem('bag', JSON.stringify([]) );
    localStorage.setItem('countBag', JSON.stringify(0));
    location.reload();
};



