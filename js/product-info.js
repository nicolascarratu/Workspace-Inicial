let prodID = sessionStorage.getItem('prodID')
let url = PRODUCT_INFO_URL + prodID + '.json'
let comments = PRODUCT_INFO_COMMENTS_URL + prodID + '.json'
let mostrarTodos = ''
let boton_comments = document.getElementById("showAllOrLess")

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
    let stars = ''
    let comentarios_list = array
    let comentarios = ""
    if (array.length > 1) {
        mostrarTodos = `
    <button class="btn btn-light btn-lg btn-block">Mostrar todos los comentarios</button>
    `
        boton_comments.innerHTML = mostrarTodos;
    }
    for (let i = 0; i < array.length; i++) {
        comentarios=''
        stars=''
        comentarios_list = array[i];
        comentarios += `
        <div class='comment ${i > 1 ? 'hide' : ''}'>
        <div class='stars'> </div>
          <p> ${comentarios_list.description}</p>
        <p> ${comentarios_list.user}</p>
        <p> ${comentarios_list.dateTime}</p>
        <hr>
        </div> 
        </div>
        `
        document.getElementById("contenedor").innerHTML += comentarios;

        for (let i = 0; i < 5; i++) {

            stars += `<span class="fa fa-star ${comentarios_list.score > i ? 'checked' : ''}"></span>`
            
        }
        document.getElementsByClassName("stars")[i].innerHTML = stars;
    }

}

function newOne() {
    let stars = ''
    let comentario_nuevo = document.getElementById('comment-box').value
    let comentario_nuevo_final = ''
    let estrellas_nuevo = document.getElementById('cantidad').value
    comentario_nuevo_final += 
    `<div class='comment'>
        <div class='stars'> </div>
        <p> ${comentario_nuevo} </p>
    <hr>`
    
    for (let i = 0; i < 5; i++) {
            stars += `<span class="fa fa-star ${estrellas_nuevo > i ? 'checked' : ''}"></span>`
    }
    document.getElementById('contenedor').innerHTML = comentario_nuevo_final
   
    showComments(comments_list)
    document.getElementsByClassName("stars")[0].innerHTML = stars
}

function showAllOrLess() {
    if (document.getElementsByClassName('all')[0]) {
        for (let i = 0; i < document.getElementsByClassName('hide').length; i++) {
            document.getElementsByClassName('hide')[i].classList.add('show')
        }
        mostrarTodos = `
    <button class="btn btn-light btn-lg btn-block">Mostrar menos comentarios</button>
    `
        boton_comments.innerHTML = mostrarTodos;
        boton_comments.classList.remove('all')
        boton_comments.classList.add('less')

    } else if(document.getElementsByClassName('less')[0]) {


        for (let i = 0; i < document.getElementsByClassName('hide').length; i++) {
            document.getElementsByClassName('hide')[i].classList.remove('show')
        }
        mostrarTodos = `
    <button class="btn btn-light btn-lg btn-block">Mostrar todos los comentarios</button>
    `
        boton_comments.innerHTML = mostrarTodos;
        boton_comments.classList.remove('less')
        boton_comments.classList.add('all')
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

    document.getElementById('showAllOrLess').addEventListener('click', function () {
        showAllOrLess()
    })

    document.getElementById('envio').addEventListener('click', function () {
        newOne()
    })
})









