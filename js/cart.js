let cart_url = CART_INFO_URL + '25801' + EXT_TYPE
let cant_unit = document.getElementById('cant_unit')
let cartObject = []

//Función similar a las de mostrar categorías y productos, solo que al ser un único producto, no lo itero.

function mostrarCarrito(object) {
    let cart = object.articles[0]
    let HTMLtext = ''

    HTMLtext += `

<div class="row m-0">
    <div class="list-group">
        <div class="list-group-item">
            <div class="row d-flex align-items-center">
                <div class="col">
                    <img src='${cart.image}' alt='${cart.name}' class='w-50 rounded-3'>
                </div>
                <div class="col-2 ">
                    <p> ${cart.name}</p>
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

    document.getElementById('carrito_id').innerHTML += HTMLtext

}

// Función encargada de realizar la multiplicación entre el costo de la unidad y el valor ingresado en el input
// con id 'cant_unit', para luego mostrar en pantalla el resultado en tiempo real.

function subtotal(object) {
    let cart = object.articles[0]
    let result = 0
    result = cart.unitCost * document.getElementById('cant_unit').value
    document.getElementById('subtotal').innerHTML =  cart.currency + ' ' + result
}


// Una vez cargada la página, obtengo el JSON con el producto para mostrar en el carrito. Llamo a la función
// que se encarga de mostrarlo, y también a la calcula el subtotal. Por último, si se modifica la cantidad de 
// unidades a comprar, se vuelve a llamar a la función subtotal() para actualizar el precio a pagar. 

document.addEventListener('DOMContentLoaded', function () {
    getJSONData(cart_url).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartObject = resultObj.data
            mostrarCarrito(cartObject)
            subtotal(cartObject)
            document.getElementById('cant_unit').addEventListener('input', function () {
                subtotal(cartObject)
            })

        }
    }
    )

}
)

