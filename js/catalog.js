"use strict";

////// add remove active class
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
/////////////////////////////// filter on triangle
var trigleIcon = document.querySelector(".trigle");
var y = document.querySelector(".filter-hide");
trigleIcon.onclick = function () {
    if (y.style.display === "flex") {
        y.style.display = 'none';
    } else {
        y.style.display = "flex";
    }
}
//////////////////////////// filter for mob
var outFilter = document.querySelector('.out-filter__text');
var filterItem = document.querySelectorAll('.filter-item a');
var outFil = [];

var _loop = function _loop(i) {
    filterItem[i].onclick = function () {
        if (outFil.indexOf(this.textContent.toString()) !== -1) {
            filterItem[i].style.color = 'black';
            var k = outFil.indexOf(this.textContent);
            outFil.splice(k, 1);
            outFilter.innerHTML = outFil;
        } else if (filterItem[i].textContent !== 'Not selected') {
            filterItem[i].style.color = 'red';
            outFil.push(filterItem[i].textContent);
            outFilter.innerHTML = outFil;
        }
    };
};

for (var i = 0; i < filterItem.length; i++) {
    _loop(i);
}

///////////////////////////sort men
let products;
let manBtnDes  = document.querySelectorAll('.desktop-item');
manBtnDes[1].addEventListener('click', sortMen);
let manBtnMob = document.querySelectorAll('.mobile-item');
manBtnMob[1].addEventListener('click', sortMen);

function sortMen () {
    products = [];
    for (let j = 0; j < catalog.length; j++) {
            if (catalog[j].category === manBtnDes[1].textContent.toLowerCase()){
                products.push(catalog[j]);
            }
        }
        draw();
}

/////////////////////sort women
let womenBtnDesc = document.querySelectorAll('.desktop-item');
womenBtnDesc[0].addEventListener('click', sortWomen);
let womenBtnMob = document.querySelectorAll('.mobile-item');
womenBtnMob[0].addEventListener('click', sortWomen);

function sortWomen () {
    products = [];
    for (let j = 0; j < catalog.length; j++) {
        if (catalog[j].category === womenBtnDesc[0].textContent.toLowerCase()) {
            products.push(catalog[j]);
        }
    }
    draw();
}
///////////////draw
function draw() {
    let out1 = '';
    for (var i = 0; i < products.length; i++) {

        out1 += `
           <div class="block-item item" id = "${products[i].id}">
                <div class="block-item__new item-new"><p>NEW</p></div>
                <div class="block-item__viewItem item-view"><p>View Item</p></div>
                <div class="block-item__img item-img"">
                    <img src="${products[i].thumbnail}" alt="photo-1">
                </div>
                <div class="block-item__text item-text">
                    <h5 class="block-item__title item-title">${products[i].title}</h5>
                    <p class="block-item__price item-price">£ ${products[i].price.toFixed(2)}</p>
                </div>
            </div>
            `;
    }
    block1.innerHTML = out1;
    for (let i = 0; i<document.querySelectorAll('.block-item__new').length; i++){
        if (catalog[i].hasNew === false) {
            document.querySelectorAll('.block-item__new')[i].classList.add('hide')
        }
    }
}

//////////////////////// for burger menu
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
/////////////////////////////////// count Bag and total price

var countBag;
if (localStorage.getItem('countBag') !== null) {
    countBag = JSON.parse(localStorage.getItem('countBag'));
}
var countBagPaint = document.querySelector('.count-bag');
countBagPaint.innerHTML = countBag;
var countTotal;
var countTotalPaint = document.querySelector('.count-total');
if (localStorage.getItem('countBag') !== null) {
    countTotal = JSON.parse(localStorage.getItem('countTotal'));
} else {
    localStorage.setItem('countTotal', JSON.stringify(0));
    countTotal = JSON.parse(localStorage.getItem('countTotal'));
}
if (countTotal !== null){
    countTotalPaint.innerHTML = countTotal.toFixed(2) ;
}

////////////////change location

var topCardBag = document.querySelector('.header-top__cardItem');

topCardBag.onclick = function () {
    document.location.href = "shopping-bag.html";
};
//////////////// sort newest
function sortNewest() {
    catalog.sort(function (a, b) {
        var dateA = new Date(a.dateAdded),
            dateB = new Date(b.dateAdded);
        return dateB - dateA;
    });
}
sortNewest();
for (var i = 0; i < catalog.length; i++) {
    if(catalog[i].discountedPrice === null) {
        catalog[i].discountedPrice = catalog[i].price
    }
}
////////////////////////draw
var block1 = document.querySelector(".block-1");
var out1;
var countItem = 8;
function render() {
    out1 = '';
    for (var i = 0; i < countItem; i++) {
        if (i < catalog.length){
            out1 += "\n<div class=\"block-item item\" id = \"" + catalog[i].id + "\">\n" +
                "<div class=\"block-item__new item-new\"><p>NEW</p></div>\n" +
                "<div class=\"block-item__viewItem item-view\"><p>View Item</p></div>\n" +
                "<div class=\"block-item__img item-img\"\">\n" +
                "<img src=\"" + catalog[i].thumbnail + "\" alt=\"photo-1\">\n" +
                "</div>\n" +
                "<div class=\"block-item__text item-text\">\n" +
                "<h5 class=\"block-item__title item-title\">" + catalog[i].title + "</h5>\n" +
                " <p class=\"block-item__newPrice item-newPrice \">\xA3" + catalog[i].discountedPrice.toFixed(2) + "</p>\n" +
                "<p class=\"block-item__price item-price oldPrice\">\xA3" + catalog[i].price.toFixed(2) + "</p>\n" +
                "</div>\n" +
                "</div> \n            ";
        }
    }
    block1.innerHTML = out1;
    for (var i = 0; i < document.querySelectorAll('.block-item__new').length; i++) {
        if (catalog[i].hasNew === false) {
            document.querySelectorAll('.block-item__new')[i].classList.add('hide');
        }
    }

    for (var i = 0; i < document.querySelectorAll('.block-item__price').length; i++) {
        if (catalog[i].price === catalog[i].discountedPrice) {
            document.querySelectorAll('.block-item__price')[i].classList.add('hide');
        }
    }
}
render();
setLocal();
//////////////show more
var showMoreBtn = document.querySelector('.main-bottom__btnShowMore');
showMoreBtn.onclick = function(){
    countItem = countItem + 4;
    render();
    setLocal();
};

for (var i = 0; i < document.querySelectorAll('.block-item__new').length; i++) {
    if (catalog[i].hasNew === false) {
        document.querySelectorAll('.block-item__new')[i].classList.add('hide');
    }
}

for (var i = 0; i < document.querySelectorAll('.block-item__price').length; i++) {
    if (catalog[i].price === catalog[i].discountedPrice) {
        document.querySelectorAll('.block-item__price')[i].classList.add('hide');
    }
}
////////////////////////save onclick id item
function setLocal() {
    var storageItemId = [];
    var items = document.querySelectorAll(".item");

    for (var i = 0; i < items.length; i++) {
        items[i].onclick = function () {
            storageItemId.push(this.id);
            localStorage.setItem('storageItemId', JSON.stringify(storageItemId));
            document.location.href = "item.html";
        };
    }
}






