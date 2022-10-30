let cant_unit = document.getElementById('cant_unit')
let cartArticles = {}
let cartArticlesList = []
let cartObject = []
let cartArray = []

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
                    <p> USD ${cuenta(cart.currency, cart.unitCost)}</p>
                </div>
                    <div class='col-2'>
                    <input type="number" class='w-50 cantidad-unidades' id="cant_unit${i}" oninput='result(cartArticlesList); updateCount(cartArticlesList, ${cart.id})' value=${cart.count} min='1'>
                     </div> 
            
                  <div class="col-2">
                    <p id='subtotal${i}'>  </p>
                </div>
                <div class='col-2'>
                    <i id='${cart.id}' class='fa fa-trash' onclick='deleteElement(cartArticlesList, ${cart.id})'> </i>
            </div>
        </div>
    </div>
</div>
</div>
`

    }

    document.getElementById('carrito_id').innerHTML = HTMLtext

}

// Pasa de pesos a dólares el precio de los productos.
function cuenta(currency, cost) {
    if (currency == 'UYU') {
        precioEnDolares = Math.round(cost / 41)
    }
    else {
        precioEnDolares = cost
    }
    return precioEnDolares
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
    document.getElementById('subtotal').innerHTML = 'USD ' + resultSubTotalGeneral
}

// Borra un producto del carrito si se selecciona en el ícono de basura y se actualiza el subtotal y total.
function deleteElement(array, id) {
    for (let i = 0; i < array.length; i++) {
        if (Object.values(array[i]).includes(id)) {
            array.splice(i, 1)
        }
    }
    mostrarCarrito(cartArticlesList)
    result(cartArticlesList)
    localStorage.setItem("cart", JSON.stringify(array))
}

// Actualiza la cantidad de unidades de cada producto en el array principal y se guarda en el almacenamiento local.
function updateCount(array, id) {
    for (let i = 0; i < array.length; i++) {
        if (Object.values(array[i]).includes(id)) {
            array[i].count = document.getElementById(`cant_unit${i}`).value
        }

    }

    localStorage.setItem("cart", JSON.stringify(array))
}

// Si se selecciona la forma de pago con tarjeta, se deshabilitan las opciones de tranferencia bancaria y se 
// vuelven requeridos los campos de la tarjeta. 
function formaDePagoTarjeta() {
    document.getElementById('option2').setAttribute('disabled', '')
    document.getElementById('option1').removeAttribute('disabled', '')
    let arrayOpcion1 = document.getElementById('option1')['elements']
    for (let i = 0; i < arrayOpcion1.length; i++) {
        let opcion = arrayOpcion1[i];
        opcion.setAttribute('required', '')
    }

}

// Lo mismo pero para el pago con transferencia. 
function formaDePagoTransfer() {
    document.getElementById('option1').setAttribute('disabled', '')
    document.getElementById('option2').removeAttribute('disabled', '')
    document.getElementById('cuenta').setAttribute('required', '')

}

// Función encargada de realizar las validaciones del formulario con la dirección de envío, cantidad de unidades,
// elementos en el carrito, opción de pago y de envío. Si todo está OK, se alerta del éxito en la compra y se 
// recarga la página luego de unos segundos. Si no, se da feedback al usuario para que complete los campos.
function validaciones() {
    var form = document.getElementById('formBuy')
    var cantUnits = document.querySelectorAll('.cantidad-unidades')
    var envio = document.querySelectorAll('input[name="envio"]')
    const TARJETA = document.getElementById('tarjeta')
    const TRANFERENCIA = document.getElementById('transfer')

    let tiposDePago = document.getElementsByName('opcionPago')
    let optionPagoNull = true
    let optionEnvioNull = true
    let productNot = false

    form.addEventListener('submit', function (event) {
        for (let i = 0; i < cantUnits.length; i++) {
            let product = cantUnits[i];

            if (product.value <= 0) {
                productNot = true
                document.getElementById(`cant_unit${[i]}`).classList.add('border', 'border-danger')
                document.getElementById(`cant_unit${[i]}`).addEventListener('input', function () {
                    if (product.value > 0) {
                        document.getElementById(`cant_unit${[i]}`).classList.remove('border', 'border-danger')
                        productNot = false
                    }
                })
            }
        }

        for (let i = 0; i < envio.length; i++) {
            let radioButton = envio[i];
            if (radioButton.checked) {
                optionEnvioNull = false
            }

        }
        if (optionEnvioNull) {
            document.getElementById('tipoEnvio').classList.add('border', 'border-danger')
            document.getElementById('tipoEnvio').addEventListener('click', function () {
                document.getElementById('tipoEnvio').classList.remove('border', 'border-danger')
                optionEnvioNull = true
            })

        }
        tiposDePago.forEach(optionPago => {
            if (optionPago.checked) {
                optionPagoNull = false

            }
        })

        if (optionPagoNull) {
            document.getElementById('formaDePago').innerHTML = 'Debes seleccionar una forma de pago'
            document.getElementById('formaDePago').classList.add('text-danger')
            document.getElementById('cerrar').addEventListener('click', function () {
                if (TARJETA.checked || TRANFERENCIA.checked) {
                    document.getElementById('formaDePago').classList.remove('text-danger')
                }
            })
        }

        if (cartArticlesList == false) {

            document.getElementById('alerts').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <p>¡Debes tener al menos un producto en el carrito!</p>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`
        }


        if (form.checkValidity() && (cartArticlesList != false) && !optionEnvioNull && !productNot && !optionPagoNull && document.getElementById('formPayment').checkValidity()) {
            document.getElementById('alerts').innerHTML = `<div class="alert alert-success" role="alert">
        ¡Has comprado con éxito!
            </div>`
            localStorage.setItem('cart', JSON.stringify(cartArray))
            setTimeout(function () {
                location.reload()
            }, 3000)

        }

        event.preventDefault()
        event.stopPropagation()
        form.classList.add('was-validated')
    }, false)

}

// Se encarga de añadir o quitar el color rojo de alerta en la forma de pago si no se cumple la validación.
function checkeo() {
    document.getElementById('cerrar').addEventListener('click', function () {
        if (!document.getElementById('formPayment').checkValidity()) {
            document.getElementById('formaDePago').classList.add('text-danger')

        }
        else {
            document.getElementById('formaDePago').classList.remove('text-danger')
        }
        document.getElementById('formPayment').classList.add('was-validated')

    })

}

document.addEventListener('DOMContentLoaded', function () {
    getJSONData(CART_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartArray.push(resultObj.data.articles[0])
            let cartArticlesListJSONTest = JSON.parse(localStorage.getItem('cart'))
            if (cartArticlesListJSONTest === null || cartArticlesListJSONTest == false) {
                localStorage.setItem('cart', JSON.stringify(cartArray))
            }
        }

        cartArticlesList = JSON.parse(localStorage.getItem('cart'))
        mostrarCarrito(cartArticlesList)
        result(cartArticlesList)
        validaciones()

    })

    document.getElementById('tarjeta').addEventListener('click', function () {
        formaDePagoTarjeta()
        checkeo()
    })

    document.getElementById('transfer').addEventListener('click', function () {
        formaDePagoTransfer()
        checkeo()

    })
    document.getElementById('cerrar').addEventListener('click', function () {
        if (document.getElementById('tarjeta').checked) {
            document.getElementById('formaDePago').innerHTML = 'Tarjeta de crédito'
        }
        else if (document.getElementById('transfer').checked) {
            document.getElementById('formaDePago').innerHTML = 'Transferencia bancaria'
        }

    }
    )

})


