let prodID = sessionStorage.getItem('prodID')
let url = PRODUCT_INFO_URL + prodID + '.json'
let comments = PRODUCT_INFO_COMMENTS_URL + prodID + '.json'

function showProduct(array) {
    let product = array;
    let productos = ""
    let imagenes = ""
    let otros = "<h4> Productos relacionados </h4>"

    productos += `
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


    }
    document.getElementById("product").innerHTML = productos;
    document.getElementById("product_images").innerHTML = imagenes;
    document.getElementById("otros").innerHTML = otros;

}

function showComments(array) {
    //let estrellas = []
    let stars = ''
    let comentarios_list = array
    let comentarios = ""
    for (let i = 0; i < array.length; i++) {
        comentarios_list = array[i];
        comentarios += `
        <div>
        <div class='stars'> </div>
        <p> ${comentarios_list.description}</p>
        <p> ${comentarios_list.user}</p>
        <p> ${comentarios_list.dateTime}</p>
        </div>
        `
    }
    document.getElementById("comments").innerHTML += comentarios;

    for (let i = 0; i < array.length; i++) {
        stars = '';
        comentarios_list = array[i]
        /* stars = `
         <p> ${comentarios_list.score} </p>
         <span class="fa fa-star"></span>
         <span class="fa fa-star"></span>
         <span class="fa fa-star"></span>
         <span class="fa fa-star"></span>
         <span class="fa fa-star"></span>
        ` */

        for (let i = 0;i < 5; i++){
            stars += `<span class="fa fa-star ${comentarios_list.score > i ? 'checked' : ''}"></span>`

        }
        document.getElementsByClassName("stars")[i].innerHTML = stars;
        //estrellas.push(document.getElementsByClassName("stars")[i])

        /* for (let i = 0; i < comentarios_list.score; i++) {
            document.getElementsByClassName("fa-star")[i].classList.add('checked')
            } */
        } 
        
    }
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(url).then(function (resultObj) {
        if (resultObj.status === "ok") {
            console.log(getJSONData(url))
            currentProduct = resultObj.data;
            showProduct(currentProduct);
            getJSONData(comments).then(function (resultObj) {
                if (resultObj.status === "ok") {
                    comments_list = resultObj.data;
                    showComments(comments_list)
                }
            })
        }
    })
})







