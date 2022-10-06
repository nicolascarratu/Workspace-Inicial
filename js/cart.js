let cart_url = CART_INFO_URL + '25801' + EXT_TYPE
let cant_unit = document.getElementById('cant_unit')

function mostrarCarrito(array) {
    let cart = array.articles[0]
    let HTMLtext = ''

    HTMLtext += `
<div class='row'>
    <div class='list-group'>
        <div class="list-group-item">
            <div class="row">
                <div class="col"></div>
                <div class='col-2'>
                    <p>Nombre</p>
                </div>
                <div class='col-2'>
                    <p>Costo</p>
                </div>
                <div class='col-2'>
                    <p>Cantidad</p>
                </div>
                <div class='col-4'>
                    <p>Subtotal</p>
                </div>

            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="list-group">
        <div class="list-group-item">
            <div class="row">
                <div class="col">
                    <img src='${cart.image}' alt='${cart.name}' class='img-thumbnail'>
                </div>
                <div class="col-2">
                    <p> ${cart.name}</p>
                </div>
                <div class="col-2">
                    <p> ${cart.currency} ${cart.unitCost}</p>
                </div>
                <div class="col-2">
                    <input type="number" id="cant_unit" value='5' >
                </div>
                <div class="col-4">
                    <p id='subtotal'> ${cuenta(cart.unitCost)} </p>
                </div>
            </div>
        </div>
    </div>
</div>`

    document.getElementById('carrito').innerHTML += HTMLtext
}

function cuenta(cost) {
    let result = 0
    if (document.getElementById('cant_unit') != null) {
        result = cost * document.getElementById('cant_unit').value
        document.getElementById('subtotal').innerHTML = result
    }
    return result
    
}

console.log(cant_unit)
document.addEventListener('DOMContentLoaded', function () {
    getJSONData(cart_url).then(function (resultObj) {
        if (resultObj.status === "ok") {
            carrito = resultObj.data;
            console.log(carrito)

            mostrarCarrito(carrito)
            document.getElementById('cant_unit').addEventListener('input', function () {
                        cuenta()
                    })

        }
    }
    )
        
    }
)
