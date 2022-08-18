let email = document.getElementById('email')
let password = document.getElementById('password')

function redireccion() {
    if (email.value != '' && password.value != '') {
        window.location.href = 'portada.html';
    } else {
        document.getElementById('email').className = 'error_box'
        document.getElementById('password').className = 'error_box'
        alert('Los datos no pueden estar vacios')
    }
}






