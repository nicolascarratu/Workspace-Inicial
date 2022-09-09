let prodID = sessionStorage.getItem('prodID')
let url = PRODUCT_INFO_URL + prodID + '.json'

function showProduct(array) {
    let product = array;
    let htmlContentToAppend = ""
    htmlContentToAppend += `
                <div class="row">
                    <div class="col-3">
                        <img src="${product.images[2]}" alt="${product.description}" class="img-thumbnail">
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

    document.getElementById("product").innerHTML = htmlContentToAppend;

}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(url).then(function (resultObj) {
        if (resultObj.status === "ok") {
            console.log(getJSONData(url))
            currentProduct = resultObj.data;
            showProduct(currentProduct);
        }
    })
})







