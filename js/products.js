let currentProductsArray = [];
const ORDER_BY_SOLD_COUNT = "Cant.";
const ORDER_BY_PRICE_UP = 'Price_up';
const ORDER_BY_PRICE_DOWN = 'Price_down';
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
let search = document.getElementById('search');

//Función que ordena los productos dependiendo del criterio pasado por parámetro. 
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

//Muestro los productos desde un comienzo y si hay algún cambio en los filtros de precios o en la búsqueda por 
//nombre o descripción, se evalúa en esta función y se muestran los productos que cumplan las condiciones. 
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

//Acá se muestran los productos que se ordenan en la función sortProducts() cuando se hace click en alguno de
//los botones, ya sea de precio ascendente, descendente o por relevancia.
function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
    showProductsList(currentProductsArray);
}

//Obtengo la ID de la categoría para mostrar los productos de esa categoría.
let catID = sessionStorage.getItem('catID')
let url = PRODUCTS_URL + catID + '.json'

//Relaciono la catID con la posición de la categoría en el JSON para poder usar su descripción y mostrarla. 
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

//Una vez cargada la página, se obtiene el JSON de la categoría en cuestión. También obtengo el de todas las
//categorías para acceder así a la descripción de la categoría solicitada, ya que no está en el JSON de una 
//categoría individual. 
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
    //Limpiar filtros.
    document.getElementById("clearRange").addEventListener("click", function () {
        document.getElementById("filtroMin").value = "";
        document.getElementById("filtroMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList(currentProductsArray);
    });
    //Relevancia.
    document.getElementById("sortByProdCount").addEventListener("click", function () {

        sortAndShowProducts(ORDER_BY_SOLD_COUNT);
    });
    //Precio descendente.
    document.getElementById('maxPrice').addEventListener('click', function () {

        sortAndShowProducts(ORDER_BY_PRICE_UP);

    });
    //Precio ascendente.
    document.getElementById('minPrice').addEventListener('click', function () {

        sortAndShowProducts(ORDER_BY_PRICE_DOWN);
    });
    //Filtro de precio.
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
    
    //Filtro por búsqueda de texto. 
    search.addEventListener('input', function () {
        showProductsList(currentProductsArray)
    })

}) 