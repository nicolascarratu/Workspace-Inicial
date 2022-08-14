const LIST_url = 'https://japceibal.github.io/emercado-api/cats_products/101.json';
let productsArray = []
function showProductsList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let listado = array[i];

        htmlContentToAppend += `
            <div onclick="setCatID(${listado.catID})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${products.image}" alt="${products.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${products.name}</h4>
                            <small class="text-muted">${products.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${products.description}</p>
                    </div>
                </div>
            </div>
            `
    }

    document.getElementById("cars").innerHTML = htmlContentToAppend;
}



document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(LIST_url).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            showProductsList(productsArray);

        }
    })
})

console.log(getJSONData(LIST_url))