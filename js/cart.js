let cant_unit = document.getElementById('cant_unit')
let cartArticles = {}
let cartArticlesList = []
let cartArticlesListFinal = []

function mostrarCarrito(cartArticlesList) {
    let cart = cartArticlesList
    let HTMLtext = ''
    for (let i = 0; i < cart.length; i++) {
        let cart = cartArticlesList[i]

        HTMLtext += `

<div class="row m-0">
    <div class="list-group">
        <div class="list-group-item">
            <div class="row d-flex align-items-center">
                <div class="col">
                    <img src='${cart.image}' alt='${cart.name}' class='w-50 rounded-3'>
                </div>
                <div class="col-2 ">
                    <a onclick="setProdID(${cart.id})"> ${cart.names}</a>
                </div>
                <div class="col-2">
                    <p> ${cart.currency} ${cart.unitCost}</p>
                </div>
                <div class="col-2">
                    <input type="number" class='w-50' id="cant_unit" value='1' min='1'>
                </div>
                  <div class="col-4">
                    <p id='subtotal'>  </p>
                </div>
            </div>
        </div>
    </div>
</div>`

    }

    document.getElementById('carrito_id').innerHTML += HTMLtext

}
/* function subtotal(array) {
    let cart = array
    let result = 0
    result = cart.unitCost * document.getElementById('cant_unit').value
    document.getElementById('subtotal').innerHTML =  cart.currency + ' ' + result
} */

cartArticlesList = JSON.parse(localStorage.getItem('cart'))

function addingObject(object) {
    let cartObject = object
    cartArticles.names = cartObject.name
    cartArticles.currency = cartObject.currency
    cartArticles.image = cartObject.image
    cartArticles.unitCost = cartObject.unitCost
    cartArticles.id = cartObject.id
    cartArticlesListFinal.push(cartArticles)

}

document.addEventListener('DOMContentLoaded', function () {
    //localStorage.setItem('cart', JSON.stringify(cartArray))
    addingObject(cartArticlesList)
    mostrarCarrito(cartArticlesListFinal)
    //subtotal(cartArticles)
    /* document.getElementById('cant_unit').addEventListener('input', function () {
        subtotal(cartArticles)
    }) */

}
    
)


console.log(cartArticlesList)
