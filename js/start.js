"use strict";
//////////////////////////////////// add active class
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

//////////////////////////////////// count in bag
var countBag;
var countBagPaint = document.querySelector('.count-bag');

if (localStorage.getItem('countBag') !== null) {
    countBag = JSON.parse(localStorage.getItem('countBag'));
} else {
    localStorage.setItem('countBag', JSON.stringify(0));
    countBag = JSON.parse(localStorage.getItem('countBag'));
}
countBagPaint.innerHTML = countBag;
////////////////total price
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

////////// change location

var topCardBag = document.querySelector('.header-top__cardItem');

topCardBag.onclick = function () {
    document.location.href = "shopping-bag.html";
};
///////Sort Newest
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
//////////////////////draw best offer 1

var bestOfferArr1 = [];

for (var i = 0; i < bestOffer.left.length; i++) {
    for (var j = 0; j < catalog.length; j++) {
        if (bestOffer.left[i] === catalog[j].id) {
            bestOfferArr1.push(catalog[j]);
        }
    }
}

var btnOfferUp1 = document.querySelector('.bestOffer-1__btnUp');
var btnOfferDown1 = document.querySelector('.bestOffer-1__btnDown');
var btnOfferUp2 = document.querySelector('.bestOffer-2__btnUp');
var btnOfferDown2 = document.querySelector('.bestOffer-2__btnDown');
var count1 = 0;

btnOfferUp1.onclick = function () {
    if (count1 < bestOfferArr1.length - 1) {
        count1 = count1 + 1;
    } else {
        count1 = 0;
    }

    draw1();
    openItem();
    drawRes();
};

btnOfferDown1.onclick = function () {
    if (count1 < 1) {
        count1 = bestOfferArr1.length - 1;
    } else {
        count1 = count1 - 1;
    }

    draw1();
    openItem();
    drawRes();
};

var bestOffer1 = document.querySelector('.bestOffer-1__content');

function draw1() {
    var out = "\n " +
        "<div class=\"bestOffer-block item bestOffer-1__block\" id = \"" + bestOfferArr1[count1].id + "\">\n " +
        "<div class=\"bestOffer-item__viewItem item-view bestOffer-1__view\"><p>View Item</p></div>\n" +
        "<div class=\"bestOffer-item__img item-img bestOffer-1__img\">\n" +
        "<img src=\"" + bestOfferArr1[count1].thumbnail + "\" alt=\"photo-1\">\n" +
        "</div>\n " +
        "<div class=\"bestOffer-item__text item-text bestOffer-1__text\">\n " +
        "<h5 class=\"bestOffer-item__title item-title bestOffer-1__title\">" + bestOfferArr1[count1].title + "</h5>\n " +
        "<p class=\"bestOffer-item__price item-price bestOffer-1__price\">\xA3 " + bestOfferArr1[count1].price.toFixed(2) + "</p>\n " +
        "</div>\n" +
        "</div>\n";
    bestOffer1.innerHTML = out;
}
draw1();
///////////////////////draw best offer 2
var bestOfferArr2 = [];

for (var i = 0; i < bestOffer.right.length; i++) {
    for (var j = 0; j < catalog.length; j++) {
        if (bestOffer.right[i] === catalog[j].id) {
            bestOfferArr2.push(catalog[j]);
        }
    }
}

var count2 = 0;

btnOfferUp2.onclick = function () {
    if (count2 < bestOfferArr2.length - 1) {
        count2 = count2 + 1;
    } else {
        count2 = 0;
    }

    draw2();
    openItem();
    drawRes();
};

btnOfferDown2.onclick = function () {
    if (count2 < 1) {
        count2 = bestOfferArr2.length - 1;
    } else {
        count2 = count2 - 1;
    }

    draw2();
    openItem();
    drawRes();
};

var bestOffer2 = document.querySelector('.bestOffer-2__content');
function draw2() {
    var out = "\n " +
        "<div class=\"bestOffer-block item bestOffer-2__block\" id = \"" + bestOfferArr2[count2].id + "\">\n" +
        "<!--            <div class=\"bestOffer-item__new item-new bestOffer-2__new\"><p>NEW</p></div>-->\n " +
        "<div class=\"bestOffer-item__viewItem item-view bestOffer-2__view\"><p>View Item</p></div>\n" +
        "<div class=\"bestOffer-item__img item-img bestOffer-2__img\">\n " +
        "<img src=\"" + bestOfferArr2[count2].thumbnail + "\" alt=\"photo-1\">\n " +
        "</div>\n" +
        "<div class=\"bestOffer-item__text item-text bestOffer-2__text\">\n" +
        "<h5 class=\"bestOffer-item__title item-title bestOffer-2__title\">" + bestOfferArr2[count2].title + "</h5>\n" +
        "<p class=\"bestOffer-item__price item-price bestOffer-2__price\">\xA3 " + bestOfferArr2[count2].price.toFixed(2) + "</p>\n" +
        "</div>\n " +
        " </div>\n\n    ";
    bestOffer2.innerHTML = out;
}
draw2();
function drawRes() {
    var oldPriceBo = document.querySelector('.oldPrice-bo');
    var newPriceBo = document.querySelector('.newPrice-bo');
    var sum = bestOfferArr1[count1].price + bestOfferArr2[count2].price;
    oldPriceBo.textContent = sum.toFixed(2);
    newPriceBo.textContent = (+sum - +sum * (+bestOffer.discount / 100)).toFixed(2);
}

drawRes();
///////////////////////// draw after sort
var arrivalsBlock = document.querySelector(".arrivals-block");
var out = '';
for (var i = 0; i < 4; i++) {
        out +=
            "<div class=\"arrivals-item item\"  data-fashion=\"" + catalog[i].fashion + "\" id=\"" + catalog[i].id + "\">\n" +
            "<div class=\"arrivals-item__new item-new\"><p>NEW</p></div>\n" +
            "<div class=\"arrivals-item__viewItem item-view\"><p>View Item</p></div>\n" +
            "<div class=\"arrivals-item__img item-img\">\n" +
            "<img src=\"" + catalog[i].thumbnail + "\" alt=\"photo-1\">\n" +
            "</div>\n" +
            "<div class=\"arrivals-item__text item-text\">\n" +
            "<h5 class=\"arrivals-item__title item-title\">" + catalog[i].title + "</h5>\n" +
            "<p class=\"arrivals-item__newPrice item-newPrice\">\£" + catalog[i].discountedPrice.toFixed(2)  + "</p>\n" +
            "<p class=\"arrivals-item__price item-price oldPrice\">\£ " + catalog[i].price.toFixed(2) + "</p>\n" +
            "</div>\n" +
            "</div>\n" +
            "";

}

arrivalsBlock.innerHTML = out;


for (var i = 0; i < document.querySelectorAll('.arrivals-item__new').length; i++) {
    if (catalog[i].hasNew === false) {
        document.querySelectorAll('.arrivals-item__new')[i].classList.add('hide');
    }
}

for (var i = 0; i < document.querySelectorAll('.arrivals-item__price').length; i++) {
    if (catalog[i].price === catalog[i].discountedPrice) {
        document.querySelectorAll('.arrivals-item__price')[i].classList.add('hide');
    }
}

//////////////////////////////////////// on click open item
function openItem() {
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
openItem();
///////////////////////////////////Filter
var inputFilter = document.querySelector('#filter-style');

inputFilter.onfocus = function () {
    inputFilter.value = '';
};
inputFilter.onkeyup = function () {
    var productItem = document.getElementsByClassName('item');
    var inputValue = inputFilter.value.toLowerCase();

    for (var i = 2; i < productItem.length; i++){
        if (productItem[i].getAttribute('data-fashion').toLowerCase().indexOf(inputValue) > -1) {
            productItem[i].style.display = "";
        } else {
            productItem[i].style.display = "none";
        }
    }
};
/////////////// change location
var btnAllArrivals = document.querySelector('#btn-allArrivals');

btnAllArrivals.onclick = function () {
    document.location.href = "catalog.html";
};

/////////////////////////////// add best offer

document.querySelector('.bestOffer-result__btn').addEventListener('click',addBestOffer);
document.querySelector('.tablet-btn').addEventListener('click',addBestOffer);

function addBestOffer() {
    var bag = [];
    var offer;

    if (localStorage.getItem('bag') !== null) {
        var arr = JSON.parse(localStorage.getItem('bag'));

        for (var i3 = 0; i3 < arr.length; i3++) {
            bag.push(arr[i3]);
        }
    }

    var discon = window.bestOffer.discount / 100;
    bestOfferArr1[count1].discountedPrice = bestOfferArr1[count1].price - bestOfferArr1[count1].price * discon;
    bestOfferArr2[count2].discountedPrice = bestOfferArr2[count2].price - bestOfferArr2[count2].price * discon;

    if (localStorage.getItem('offer') !== null) {
        offer = JSON.parse(localStorage.getItem('offer'));
    } else {
        offer = 0;
    }

    bestOfferArr1[count1].offer = offer + 1;
    bestOfferArr2[count2].offer = offer + 1;
    offer = offer + 1;
    localStorage.setItem('offer', JSON.stringify(offer));
    var arr1 = [];
    arr1.push(bestOfferArr1[count1]);
    bag.push(arr1);
    var arr2 = [];
    arr2.push(bestOfferArr2[count2]);
    bag.push(arr2);
    localStorage.setItem('bag', JSON.stringify(bag));
    document.location.href = "shopping-bag.html";
}
