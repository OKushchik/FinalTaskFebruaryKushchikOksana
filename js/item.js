"use strict";
///////////////////////// add active
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
//////////////////////////////////// change location
var btnBack = document.querySelector('.header-navBack');

btnBack.onclick = function () {
    document.location.href = "catalog.html";
};

//////////////////////////// get id item
var storageItemId;
if (localStorage.getItem('storageItemId') !== null) {
    storageItemId = JSON.parse(localStorage.getItem('storageItemId'));
}
////////////////////// draw count bag and total price
var countBagPaint = document.querySelector('.count-bag');
var countBag;

if (localStorage.getItem('countBag') !== null) {
    countBag = JSON.parse(localStorage.getItem('countBag'));
} else {
    localStorage.setItem('countBag', JSON.stringify(0));
    countBag = JSON.parse(localStorage.getItem('countBag'));
}

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

//////////////change location
var topCardBag = document.querySelector('.header-top__cardItem');

topCardBag.onclick = function () {
    document.location.href = "shopping-bag.html";
};
//////////////////// set discount if null
for (var i = 0; i < catalog.length; i++) {
    if (catalog[i].discountedPrice === null) {
        catalog[i].discountedPrice = catalog[i].price;
    }
}
/////////////////////////DRAW size and color

var itemBlock = document.querySelector(".item");

for (var i = 0; i < catalog.length; i++) {
    if (storageItemId[0] === catalog[i].id) {
        (function () {
            var out = '';

            var size = void 0;

            if (catalog[i].colors.length === 1 && catalog[i].sizes.length) {
                size = "<th>Size:</th>\n" +
                    "<td class=\"size chosen-prop\">" + catalog[i].sizes[0] + "</td>\n";
                for (var j = 1; j < catalog[i].sizes.length; j++) {
                    size += "\n<td class=\"size\">" + catalog[i].sizes[j] + "</td>\n                ";
                }
            } else {
                size = "<th>Size:</th>";

                for (var j = 0; j < catalog[i].sizes.length; j++) {
                    size += "\n" +
                        "<td class=\"size\">" + catalog[i].sizes[j] + "</td>\n";
                }
            }

            var color = void 0;

            if (catalog[i].colors.length === 1 && catalog[i].sizes.length) {
                color = "<th>Color</th>\n" +
                    "<td class=\"color chosen-prop\">" + catalog[i].colors[0] + "</td>\n                ";
                for (var j2 = 1; j2 < catalog[i].colors.length; j2++) {
                    color += "\n<td class=\"color\">" + catalog[i].colors[j2] + "</td>\n            ";
                }
            } else {
                color = "<th>Color</th>";

                for (var j3 = 0; j3 < catalog[i].colors.length; j3++) {
                    color += "\n" +
                        "<td class=\"color\">" + catalog[i].colors[j3] + "</td>\n";
                }
            }
            /////////////////////////DRAW item
            out += "\n" +
                "<div class=\"item-img\">\n" +
                "<div class=\"item-img__big\">\n" +
                "<img src=\"" + catalog[i].thumbnail + "\" alt=\"img-full\">\n" +
                "</div>\n" +
                "<div class=\"item-img__small\">\n" +
                "<div>\n" +
                "<img src=\"" + catalog[i].preview[0] + "\" alt=\"img-1\">\n" +
                "</div>\n" +
                "<div>\n" +
                "<img src=\"" + catalog[i].preview[1] + "\" alt=\"img-2\">\n" +
                "</div>\n" +
                "<div>\n" +
                "<img src=\"" + catalog[i].preview[2] + "\" alt=\"img-3\">\n" +
                "</div>\n" +
                "</div>\n" +
                "</div>\n" +
                "\n" +
                "<div class=\"item-info\">\n" +
                "<h2 class=\"item-info__title\">" + catalog[i].title + "</h2>\n" +
                "<p class=\"item-info__description\">" + catalog[i].description + "</p>\n " +
                "<p class=\"item-info__priceOld oldPrice\">\xA3 " + catalog[i].price.toFixed(2) + "</p>\n " +
                "<p class=\"item-info__priceNew\">\xA3 " + catalog[i].discountedPrice.toFixed(2) + "</h3>\n " +
                " <table >\n " +
                "<tr>\n " +
                "" + size + "\n " +
                " </tr>\n " +
                "<tr>\n " +
                "" + color + "\n" +
                " </tr>\n " +
                "</table>\n " +
                " <div class=\"item-info__add\">\n " +
                "<button id = \"btn-addToCard\">Add to bag</button>\n " +
                " </div>\n" +
                "</div>\n  ";
            itemBlock.innerHTML = out;
////hide without discount
            if (catalog[i].price === catalog[i].discountedPrice) {
                document.querySelector('.item-info__priceOld').classList.add('hide');
            }
//// set active button
            var Item = catalog[i];
            var baqStorage = [];
            var button = document.querySelector('#btn-addToCard');

            if (catalog[i].colors.length === 1 && catalog[i].sizes.length === 1) {
                document.querySelector('#btn-addToCard').disabled = false;
                document.querySelector('#btn-addToCard').classList.add('item-info__add-hover');
                catalog[i].colors = catalog[i].colors[0];
                catalog[i].sizes = catalog[i].sizes[0];
                baqStorage.push(catalog[i]);
                localStorage.setItem('baqStorage', JSON.stringify(baqStorage));

                if (typeof JSON.parse(localStorage.getItem('baqStorage'))[0].sizes === "string"
                    && typeof JSON.parse(localStorage.getItem('baqStorage'))[0].colors === "string") {
                    button.disabled = false;
                    button.classList.add('item-info__add-hover');
                    document.querySelector('#btn-addToCard').textContent = 'Add to bag';
                }
            } else {
                document.querySelector('#btn-addToCard').disabled = true;
                document.querySelector('#btn-addToCard').innerHTML = 'Please choose color and size';
                var sizee = document.querySelectorAll('.size');
                var colorr = document.querySelectorAll('.color');

                if (catalog[i].colors.length === 0 && catalog[i].sizes.length === 0) {
                    document.querySelector('#btn-addToCard').disabled = true;
                    document.querySelector('#btn-addToCard').innerHTML = 'this product is not available now';
                }

                for (var j4 = 0; j4 < sizee.length; j4++) {
                    sizee[j4].onclick = function () {
                        var buttons = this.parentNode.querySelectorAll('.size');
                        for (var i = 0; i < buttons.length; i++) {
                            buttons[i].classList.remove('chosen-prop');
                        }
                        this.classList.add('chosen-prop');
                        Item.sizes = this.textContent;
                        if (baqStorage !== []) {
                            baqStorage.shift();
                        }
                        baqStorage.push(Item);
                        localStorage.setItem('baqStorage', JSON.stringify(baqStorage));
                        if (typeof JSON.parse(localStorage.getItem('baqStorage'))[0].sizes === "string" &&
                            typeof JSON.parse(localStorage.getItem('baqStorage'))[0].colors === "string") {
                            button.disabled = false;
                            document.querySelector('#btn-addToCard').classList.add('item-info__add-hover');
                            document.querySelector('#btn-addToCard').textContent = 'Add to bag';
                        }
                    };
                }
                for (var j5 = 0; j5 < colorr.length; j5++) {
                    colorr[j5].onclick = function () {
                        var buttons = this.parentNode.querySelectorAll('.color');
                        for (var i2 = 0; i2 < buttons.length; i2++) {
                            buttons[i2].classList.remove('chosen-prop');
                        }
                        this.classList.add('chosen-prop');
                        Item.colors = this.textContent;
                        if (baqStorage !== []) {
                            baqStorage.shift();
                        }
                        baqStorage.push(Item);
                        localStorage.setItem('baqStorage', JSON.stringify(baqStorage));
                        if (typeof JSON.parse(localStorage.getItem('baqStorage'))[0].sizes === "string"
                            && typeof JSON.parse(localStorage.getItem('baqStorage'))[0].colors === "string") {
                            document.querySelector('#btn-addToCard').textContent = 'Add to bag';
                            button.disabled = false;
                            document.querySelector('#btn-addToCard').classList.add('item-info__add-hover');
                        }
                    };
                }
            }
        })();
    }
}

document.querySelector('#btn-addToCard').onclick = function () {
    var bag = [];

    if (localStorage.getItem('bag') !== null) {
        var arr = JSON.parse(localStorage.getItem('bag'));

        for (var i3 = 0; i3 < arr.length; i3++) {
            bag.push(arr[i3]);
        }
    }

    bag.push(JSON.parse(localStorage.getItem('baqStorage')));
    localStorage.setItem('bag', JSON.stringify(bag));
    document.location.href = "shopping-bag.html";
};

