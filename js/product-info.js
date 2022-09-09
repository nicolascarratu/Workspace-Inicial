let prodID = sessionStorage.getItem('prodID')
let url = PRODUCT_INFO_URL + prodID + '.json'

function showProduct(array) {
    let product = array;
    let htmlContentToAppend = ""
    let imagenes = ""
    let otros = "<h4> Productos relacionados </h4>"
    htmlContentToAppend += `
            <div>
            <div> <h1> ${product.name}<h1></div>
            <hr>
            <div>
                <h4> Precio </h4>
                    <p>${product.currency} ${product.cost}</p>
                <h4> Descripción </h4>
                   <p class="mb-1">${product.description}</p>  
                <h4> Categoria </h4>   
                    <p> ${product.category}</p>
                <h4> Cantidad de artículos vendidos </h4>
                <p>${product.soldCount} artículos</p>
                <h4>Imagénes del producto </h4>
                </div>
            </div>
                `
    for (let i = 0; i < array.images.length; i++) {
        let product = array;
    imagenes += `
                <img src="${product.images[i]}" alt="${product.description}" class="img-thumbnail">
        
            `      
    }
    for (let i = 0; i < array.relatedProducts.length; i++) {
        let product = array.relatedProducts[i];
    otros += `
    <div onclick="setProdID(${product.id})">
     <img src="${product.image}" alt="${product.name}" class="img-thumbnail">
    </div>
    `
    document.getElementById("product").innerHTML = htmlContentToAppend;
    document.getElementById("product_images").innerHTML = imagenes;
    document.getElementById("otros").innerHTML = otros;

}
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







