let currentProductsArray = [];
const ORDER_BY_SOLD_COUNT = "Cant.";
const ORDER_BY_PRICE  = 'Price';
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
function sortProducts(criteria, array) {

    let result = [];
    if (criteria === ORDER_BY_SOLD_COUNT) {

        result = array.sort(function (a, b) {

            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    if (criteria === ORDER_BY_PRICE) {

        result = array.products.sort(function (a, b) {

            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }
    return result;

}

function showProductsList(array) {
    let htmlContentToAppend = "";
    console.log(array)
    for (let i = 0; i < array.length; i++) {
        let product = array[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {

            htmlContentToAppend += `
        <div class="list-group-item list-group-item-action cursor-active">
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
        document.getElementById("cars").innerHTML = htmlContentToAppend;
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
let url = PRODUCTS_URL + localStorage.getItem('catID') + '.json'

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(url).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductsArray = resultObj.data.products;
            
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

})


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



