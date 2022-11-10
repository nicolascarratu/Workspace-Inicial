let email = document.getElementById('email')
let password = document.getElementById('password')
let dataUser = {}

//Se evalúa si el email y la contraseña son campos con contenido o si están vacíos. 
//Si ambos campos tienen contenido, se guarda el email en el local storage y se redirige a la página principal.
//De lo contrario, se lanza una alerta para que el usuario sepa que debe ingresar todos los datos para ingresar.
document.getElementById('boton').addEventListener('click', function () {
    if (email.value != '' && password.value != '') {
        let usuario = document.getElementById('email').value
        localStorage.setItem('User', usuario)
        if (!localStorage.getItem(email.value)){
            localStorage.setItem(usuario, JSON.stringify(dataUser))
        }

        window.location.href = 'portada.html';

    } else {
        document.getElementById('email').className = 'error_box'
        document.getElementById('password').className = 'error_box'
        alert('Los datos no pueden estar vacios')
    }
})








