let prodID = sessionStorage.getItem('prodID')
let url = PRODUCT_INFO_URL + prodID + '.json'
let comments = PRODUCT_INFO_COMMENTS_URL + prodID + '.json'
let mostrarTodos = ''
let boton_comments = document.getElementById("showAllOrLess")
let currentProduct = []
let comments_list = []
let cartArticlesList = []
let cartArray = []

//Muestro el producto que el usuario seleccionó previamente.
function showProduct(array) {
    let product = array;
    let productos = ""
    let imagenes = ""
    let carrusel = ''
    let otros = "<h4> Productos relacionados </h4>"

    productos += `
            <div>
                <div>
                    <h3 class='mt-5'> ${product.name}<h3>
                            <button onclick='sendToCart(currentProduct)' type="button" class="btn btn-outline-success">Comprar</button>
                </div>
                <hr>
                <div>
                    <h5> Precio </h5>
                    <p>${product.currency} ${product.cost}</p>
                    <h5> Descripción </h5>
                    <p class="mb-1">${product.description}</p>
                    <h5> Categoria </h5>
                    <p> ${product.category}</p>
                    <h5> Cantidad de artículos vendidos </h5>
                    <p>${product.soldCount} artículos</p>
                    <h5>Imagénes del producto </h5>
                </div>
            </div>
                `

    
        imagenes += `
        
        <div class="col-md-3">
          <div class="thumbnail">
            <div id="carruselImg" class="carousel carousel-dark slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img src="${product.images[0]}" alt="${product.description}"class="d-block w-100">
                  </div>
                  <div id='carrusel'>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carruselImg" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carruselImg" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
        
        </div>
       </div>
        `
        for (let i = 1; i < array.images.length; i++) {
        let product = array;
        carrusel+=  
                `<div class="carousel-item">
                    <img src=${product.images[i]} class="d-block w-100" alt=${product.description}>
                  </div>`
    }

    //Al hacer click en una imagen de un producto relacionado, se redirecciona a ese producto.
    for (let i = 0; i < array.relatedProducts.length; i++) {
        let product = array.relatedProducts[i];

        otros += `
    <div onclick="setProdID(${product.id})"
    
    <div class="col-md-3">
      <div class="thumbnail">
       <img src="${product.image}" alt="${product.name}" class='w-100'>
       <div class="caption">
          <p>${product.name}</p>
        </div>
       </div>

    </div>
    `

    }
    document.getElementById("product").innerHTML = productos;
    document.getElementById("product_images").innerHTML += imagenes;
    document.getElementById("otros").innerHTML += otros;
    document.getElementById('carrusel').innerHTML = carrusel;

}


//Muestro los comentarios y los guardo en el almacenamiento local. 
function showComments(array) {
    localStorage.setItem(`comments ${prodID}`, JSON.stringify(array))
    let stars = ''
    let comentarios_list = array
    let comentarios = ""
    //Si hay más de dos comentarios, se muestran los dos primeros y se carga un botón debajo de ellos 
    //para cargar el resto.
    if (array.length > 1) {
        mostrarTodos = `
    <button class="btn btn-light btn-lg btn-block">Mostrar todos los comentarios</button>
    `
        boton_comments.innerHTML = mostrarTodos;
    }

    //Recorro los comentarios del array para mostrarlos; si hay más de dos, se agregan al HTML pero se le 
    //ocultan al usuario.
    for (let i = 0; i < array.length; i++) {
        comentarios = ''
        stars = ''
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

        //Bucle para mostrar las estrellas por comentario, dependiendo el score del comentario.
        for (let i = 0; i < 5; i++) {

            stars += `<span class="fa fa-star ${comentarios_list.score > i ? 'checked' : ''}"></span>`

        }
        document.getElementsByClassName("stars")[i].innerHTML = stars;
    }


}

//Función que se invoca cuando el usuario envía un nuevo comentario. Se obtiene el contenido del comentario y 
//el puntaje. En comment_obj se guardan esos valores, sumados a la fecha y hora, id del producto y nombre de 
//usuario. Agrego el nuevo comentario con sus valores asociados a comments_list y paso este por parámetro de 
//la función que muestra los comentarios. 
function newOne() {
    let comment_obj = {
        product: '',
        score: '',
        description: '',
        user: '',
        dateTime: '',
    }
    let comentario_nuevo = document.getElementById('comment-box').value
    let estrellas_nuevo = document.getElementById('cantidad').value
    document.getElementById('contenedor').innerHTML = '<h4> Comentarios</h4>'

    comment_obj.description = comentario_nuevo
    comment_obj.score = parseInt(estrellas_nuevo)
    comment_obj.dateTime = getTime()
    if (localStorage.getItem('User') != null) {
        comment_obj.user = localStorage.getItem('User')
    } else {
        comment_obj.user = 'Anónimo'
    }

    comment_obj.product = parseInt(prodID)

    comments_list.push(comment_obj)
    showComments(comments_list)
    console.log(comments_list)

}

//Obtengo la fecha y hora actual para agregarla al nuevo comentario.
function getTime() {
    let date = new Date()
    let anio = date.getFullYear()
    let mes = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    let dia = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    let fecha = `${anio}-${mes}-${dia}`
    let hora = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    let minutos = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    let segundos = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
    let time = `${hora}:${minutos}:${segundos}`
    return fecha + ' ' + time

}


//Función que es llamada cuando se clickea en el botón de los comentarios; cambia la clase de css para 
//ocultarlos o mostrarlos. 
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

    } else if (document.getElementsByClassName('less')[0]) {


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

//Función que es llamada al clickear en el botón de compra. Lo añade al carrito si no está ya añadido.
function sendToCart(array) {
    let product = array
    let cartProduct = {}

    cartArticlesList = JSON.parse(localStorage.getItem('cart'))

    console.log(cartArticlesList)
    let repeated = false

    for (let i = 0; i < cartArticlesList.length; i++) {
        if (Object.values(cartArticlesList[i]).includes(product.id)) {
            repeated = true
            console.log(Object.values(cartArticlesList[i]))
        }

    }
    if (repeated == false) {
        cartProduct.name = product.name
        cartProduct.currency = product.currency
        cartProduct.id = product.id
        cartProduct.unitCost = product.cost
        cartProduct.image = product.images[0]
        cartProduct.count = 1
        cartArticlesList.push(cartProduct)
        
    }

    localStorage.setItem("cart", JSON.stringify(cartArticlesList))

    window.location = "cart.html"
}

//Una vez cargada la página, se obtiene el JSON del producto en cuestión. También se obtienen los comentarios
//de ese producto. Son luego llamadas las funciones para mostrarlas en pantalla. 
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(url).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProduct = resultObj.data;
            showProduct(currentProduct);

        }

    })

    getJSONData(comments).then(function (resultObj) {
        if (resultObj.status === "ok") {
            if (JSON.parse(localStorage.getItem(`comments ${prodID}`)) != null) {
                comments_list = JSON.parse(localStorage.getItem(`comments ${prodID}`))
            } else {
                comments_list = resultObj.data;

            }
            showComments(comments_list)
        }
    })

    getJSONData(CART_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartArray.push(resultObj.data.articles[0])
            let cartArticlesListJSONTest = JSON.parse(localStorage.getItem('cart'))
            console.log(cartArticlesListJSONTest)
            if (cartArticlesListJSONTest === null || cartArticlesListJSONTest == false) {
                localStorage.setItem('cart', JSON.stringify(cartArray))
            }

        }})

    //Mostrar u ocultar comentarios.
    document.getElementById('showAllOrLess').addEventListener('click', function () {
        showAllOrLess()
    })
    //Nuevo comentario.
    document.getElementById('envio').addEventListener('click', function () {
        newOne()
    })
})










