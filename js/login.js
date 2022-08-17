let email = document.getElementById('email')
let password = document.getElementById('password')

function redireccion() {
    if (email.value != '' && password.value != '') {
        window.location.href = 'index.html';
    } else {
        alert('Los datos no pueden estar vacios')
    }
}



