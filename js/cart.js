let cant_unit = document.getElementById('cant_unit')
let cartArticles = {}
let cartArticlesList = []


function mostrarCarrito(object) {
    let HTMLtext = ''
    console.log(object)
    for (let i = 0; i < object.length; i++) {
        let cart = object[i]
        HTMLtext += `

<div class="row m-0">
    <div class="list-group">
        <div class="list-group-item">
            <div class="row d-flex align-items-center">
                <div class="col">
                    <img src='${cart.image}' alt='${cart.name}' class='w-50 rounded-3'>
                </div>
                <div class="col-2 ">
                    <a onclick="setProdID(${cart.id})"> ${cart.name}</a>
                </div>
                <div class="col-2">
                    <p> ${cart.currency} ${cart.unitCost}</p>
                </div>
                <div class="col-2">
                    <input type="number" class='w-50' id="cant_unit${i}" oninput='result(cartArticlesList)' value='1' min='1'>
                </div>
                  <div class="col-4">
                    <p id='subtotal${i}'>  </p>
                </div>
            </div>
        </div>
    </div>
</div>`

    }

    document.getElementById('carrito_id').innerHTML += HTMLtext

}
function result(array) {
    let cart = array
    let resultParcial = 0
    let resultTotal = 0
    for (let i = 0; i < cart.length; i++) {
        resultParcial = cart[i].unitCost * document.getElementById(`cant_unit${i}`).value
        document.getElementById(`subtotal${i}`).innerHTML = cart[i].currency + ' ' + resultParcial
        resultTotal += resultParcial
        document.getElementById('total').innerHTML = 'Total: ' + cart[i].currency + ' ' + resultTotal
    }

}


document.addEventListener('DOMContentLoaded', function () {
    getJSONData(CART_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartArray = resultObj.data.articles[0]
            cartArticlesList = JSON.parse(localStorage.getItem('cart'))
            mostrarCarrito(cartArticlesList)
            result(cartArticlesList)
            console.log(cartArticlesList)


}

    }

)})




