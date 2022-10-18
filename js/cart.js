let cant_unit = document.getElementById('cant_unit')
let cartArticles = {}
let cartArticlesList = []
let cartObject = []

function mostrarCarrito(object) {
    let HTMLtext = ''
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
                    <p> USD ${cart.unitCost}</p>
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

// Función encargada de realizar la multiplicación entre el costo de la unidad y el valor ingresado en el input
// con id 'cant_unit', para luego mostrar en pantalla el resultado en tiempo real.

function result(array) {
    let cart = array
    let resultSubtotalInd = 0
    let resultEnvio = 0
    let resultSubTotalGeneral = 0
    let precioEnDolares = 0
    let resutlFinal = 0

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].currency == 'UYU') {
            precioEnDolares = Math.round(cart[i].unitCost / 41)
        }
        else {
            precioEnDolares = cart[i].unitCost
        }
        resultSubtotalInd = precioEnDolares * document.getElementById(`cant_unit${i}`).value
        document.getElementById(`subtotal${i}`).innerHTML = 'USD ' + resultSubtotalInd
        resultSubTotalGeneral += resultSubtotalInd
        document.getElementById('subtotal').innerHTML = 'USD ' + resultSubTotalGeneral
    }
    if (document.getElementById('premium').checked) {
        resultEnvio = resultSubTotalGeneral * 0.15
    }
    else if (document.getElementById('express').checked) {
        resultEnvio = resultSubTotalGeneral * 0.07
    }
    else {
        resultEnvio = resultSubTotalGeneral * 0.05
    }

    resutlFinal = resultSubTotalGeneral + resultEnvio

    document.getElementById('porcentaje').innerHTML = 'USD ' + Math.round(resultEnvio)
    document.getElementById('total').innerHTML = 'USD ' + Math.round(resutlFinal)

    

}

// Una vez cargada la página, obtengo el JSON con el producto para mostrar en el carrito. Llamo a la función
// que se encarga de mostrarlo, y también a la calcula el subtotal. Por último, si se modifica la cantidad de 
// unidades a comprar, se vuelve a llamar a la función subtotal() para actualizar el precio a pagar. 

document.addEventListener('DOMContentLoaded', function () {
    /*  getJSONData(CART_URL).then(function (resultObj) {
         if (resultObj.status === "ok") {
             cartObject = resultObj.data.articles[0] */
    cartArticlesList = JSON.parse(localStorage.getItem('cart'))
    mostrarCarrito(cartArticlesList)
    result(cartArticlesList)

}
)
/*  }

)}
)} */
