//Obtengo el nombre del usuario para mostrarlo en cada página del sitio.
var user = localStorage.getItem('User')

function cargaUser() {
    usuario = ''
    if (user != null) {
        usuario =
            `<li class="nav-item">
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle user" type="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" >
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
        <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
        <li><a class="dropdown-item text-start"href="index.html" id='sesion'>Cerrar sesión</a></li>
      </ul>
    </div>
  </li>`
        
        document.getElementsByClassName('navbar-nav')[0].innerHTML += usuario
        document.getElementsByClassName('user')[0].innerHTML = user
        document.getElementById('sesion').addEventListener('click', function () {
            localStorage.removeItem('User')
        })

    }


}
document.addEventListener('DOMContentLoaded', function () {
    cargaUser()
})



//La declaro en este js para asi se puede usar tambien en la pagina principal, y no solo en la de categorias.
function setCatID(id) {
    sessionStorage.setItem("catID", id);
    window.location = "products.html"
}
//Lo mismo en este caso. 
function setProdID(id) {
    sessionStorage.setItem("prodID", id);
    window.location = "product-info.html"
}