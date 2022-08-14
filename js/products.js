const LIST_url = 'https://japceibal.github.io/emercado-api/cats_products/101.json';

function showCategoriesList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentCategoriesArray.length; i++) {
        let products = currentCategoriesArray[i];

            htmlContentToAppend += `
            <div onclick="setCatID(${products.id})" class="list-group-item list-group-item-action cursor-active">
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


function test(LIST_url) {
    document.addEventListener("DOMContentLoaded", function (e) {
        getJSONData(LIST_url).then(function (resultObj) {
            if (resultObj.status === "ok") {
                currentCategoriesArray = resultObj.data
                showCategoriesList()
            }
        })
    })}
console.log(test())