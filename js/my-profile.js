let usuario = localStorage.getItem('User')


if (usuario == null) {
    window.location = 'index.html'
}

/* if (objeto de local existe) {
    llena los campos con los datos del objeto local
   
} else{
     document.getElementById('emailUser').value = usuario
} */

function validacionForm() {
    var form = document.getElementById('cambiosUsuario')
    form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }
        else {

        }

        form.classList.add('was-validated')
    }, false)
}

document.addEventListener('DOMContentLoaded', function () {
    validacionForm()
})