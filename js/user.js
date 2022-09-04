var user = localStorage.getItem('User')
document.getElementsByClassName('user')[0].innerHTML = user

function setCatID(id) {
    sessionStorage.setItem("catID", id);
    window.location = "products.html"
}
