var user = localStorage.getItem('User')
document.getElementsByClassName('user')[0].innerHTML = user

//La declaro en este js para asi se puede usar tambien en la pagina principal, y no solo en la de categorias.
function setCatID(id) {
    sessionStorage.setItem("catID", id);
    window.location = "products.html"
}
