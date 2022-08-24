let productsArray = [];

function showProductsList(array) {
    let htmlContentToAppend = "";
    
    for (let i = 0; i < array.products.length; i++) {
        let product = array.products[i];
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
        document.getElementById("cars").innerHTML = htmlContentToAppend;
        
    }
}

let url = PRODUCTS_URL + localStorage.getItem('catID') + '.json'

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(url).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            showProductsList(productsArray);

        }
    })
})



