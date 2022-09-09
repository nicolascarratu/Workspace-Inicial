let currentProductsArray = [];
const ORDER_BY_SOLD_COUNT = "Cant.";
const ORDER_BY_PRICE_UP = 'Price_up';
const ORDER_BY_PRICE_DOWN = 'Price_down';
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
let search = document.getElementById('search');

function sortProducts(criteria, array) {

    let result = [];
    if (criteria === ORDER_BY_SOLD_COUNT) {

        result = array.sort(function (a, b) {

            return parseInt(b.soldCount) - parseInt(a.soldCount);
        });
    }

    if (criteria === ORDER_BY_PRICE_UP) {

        result = array.sort(function (a, b) {

            return parseInt(b.cost) - parseInt(a.cost);
        });
    }
    if (criteria === ORDER_BY_PRICE_DOWN) {

        result = array.sort(function (a, b) {

            return parseInt(a.cost) - parseInt(b.cost);
        });
    }

    return result;

}

function showProductsList(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        let search_val = search.value;
        if (!(parseInt(product.cost) < minCount) && !(parseInt(product.cost) > maxCount)) {

            if (product.name.toLowerCase().includes(search_val.toLowerCase()) || product.description.toLowerCase().includes(search_val.toLowerCase())) {
                htmlContentToAppend += `
                <div onclick="setProdID(${product.id})" class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-3">
                            <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">${product.name}</h4>
                                <h4 class="mb-1">${product.currency} ${product.cost}</h4>
                                <small class="text-muted">${product.soldCount} artículos</small>
                            </div>
                            <p class="mb-1">${product.description}</p>
                        </div>
                    </div>
                </div>
                `
            }

        }
        document.getElementById("products").innerHTML = htmlContentToAppend;
    }
}
function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
    showProductsList(currentProductsArray);
}

let catID = sessionStorage.getItem('catID')
let url = PRODUCTS_URL + catID + '.json'

function setProdID(id) {
    sessionStorage.setItem("prodID", id);
    window.location = "product-info.html"
}


let categorias_ID = {
    '101': '0',
    '102': '1',
    '103': '2',
    '104': '3',
    '105': '4',
    '106': '5',
    '107': '6',
    '108': '7',
    '109': '8',
}
let categorias = []
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(url).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductsArray = resultObj.data.products;
            document.getElementById('product').innerHTML = resultObj.data.catName
            getJSONData(CATEGORIES_URL).then(function (resultObj) {
                if (resultObj.status === "ok") {
                    categorias = resultObj.data;
                    document.getElementById('description').innerHTML = categorias[categorias_ID[catID]].description
                }
            })
            showProductsList(currentProductsArray);
        }
    })

    document.getElementById("clearRange").addEventListener("click", function () {
        document.getElementById("filtroMin").value = "";
        document.getElementById("filtroMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList(currentProductsArray);
    });

    document.getElementById("sortByProdCount").addEventListener("click", function () {

        sortAndShowProducts(ORDER_BY_SOLD_COUNT);
    });

    document.getElementById('maxPrice').addEventListener('click', function () {

        sortAndShowProducts(ORDER_BY_PRICE_UP);

    });

    document.getElementById('minPrice').addEventListener('click', function () {

        sortAndShowProducts(ORDER_BY_PRICE_DOWN);
    });

    document.getElementById("filtroRange").addEventListener("click", function () {

        minCount = document.getElementById("filtroMin").value;
        maxCount = document.getElementById("filtroMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }
        showProductsList(currentProductsArray);
    });

    search.addEventListener('input', function () {
        showProductsList(currentProductsArray)
    })

}) 