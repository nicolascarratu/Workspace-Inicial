let usuarioLocal = localStorage.getItem('User')
let datosUser = {}
let datosUserByEmail = {}

if (usuarioLocal == null) {
    window.location = 'index.html'
}

function datosUsuario() {
    let email = document.getElementById('emailUser').value
    datosUserByEmail = JSON.parse(localStorage.getItem(usuarioLocal))
    if (datosUserByEmail == null) {
        email = usuarioLocal
    }

    else {

        if (datosUserByEmail.email == usuarioLocal) {
            document.getElementById('emailUser').value = datosUserByEmail.email
            document.getElementById('primerNombre').value = datosUserByEmail.name
            document.getElementById('primerApellido').value = datosUserByEmail.surname
            if (datosUserByEmail.middleName) {
                document.getElementById('segundoNombre').value = datosUserByEmail.middleName
            }
            if (datosUserByEmail.secondSurname) {
                document.getElementById('segundoApellido').value = datosUserByEmail.secondSurname
            }

            if (datosUserByEmail.phone) {
                document.getElementById('telUser').value = datosUserByEmail.phone
            }
        }

        else {
            document.getElementById('emailUser').value = usuarioLocal
        }
    };

}

function datosToLocal() {
    datosUser.name = document.getElementById('primerNombre').value
    datosUser.surname = document.getElementById('primerApellido').value
    datosUser.email = document.getElementById('emailUser').value

    if (document.getElementById('segundoNombre').value != undefined) {
        datosUser.middleName = document.getElementById('segundoNombre').value
    }

    if (document.getElementById('segundoApellido').value != undefined) {
        datosUser.secondSurname = document.getElementById('segundoApellido').value
    }

    if (document.getElementById('telUser').value != undefined) {
        datosUser.phone = document.getElementById('telUser').value
    }

    if (usuarioLocal !== document.getElementById('emailUser').value) {
        localStorage.removeItem(usuarioLocal)
    }
    localStorage.setItem(datosUser.email, JSON.stringify(datosUser))
    localStorage.setItem('User', datosUser.email)



}


function validacionForm() {
    var form = document.getElementById('cambiosUsuario')
    form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }
        else {

            datosToLocal()
        }

        form.classList.add('was-validated')
    }, false)
}

document.addEventListener('DOMContentLoaded', function () {
    validacionForm()
    datosUsuario()
})