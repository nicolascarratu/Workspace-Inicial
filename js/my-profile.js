let usuario = localStorage.getItem('User')
let datosUser = {}
let datosUserLocal = [] 

if (usuario == null) {
    window.location = 'index.html'
}

function datosUsuario() {
    datosUserLocal = JSON.parse(localStorage.getItem('datosUserLocal'))
    if (datosUserLocal == null) {
        document.getElementById('emailUser').value = usuario
    }

    else {
        datosUserLocal.forEach(element => {
            
            if (element.email == usuario) {

                document.getElementById('emailUser').value == element.email
                document.getElementById('primerNombre').value = element.name
                document.getElementById('primerApellido').value = element.surname
                document.getElementById('emailUser').value = element.email
                if (element.middleName) {
                    document.getElementById('segundoNombre').value = element.middleName
                }
                if (element.secondSurname) {
                    document.getElementById('segundoApellido').value = element.secondSurname
                }

                if (element.phone) {
                    document.getElementById('telUser').value = element.phone
                }
            }

            else{
                document.getElementById('emailUser').value = usuario
            }
        });

    }

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

    datosUserLocal.push(datosUser)

    localStorage.setItem('datosUserLocal', JSON.stringify(datosUserLocal))
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