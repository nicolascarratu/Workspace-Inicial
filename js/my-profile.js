let usuarioLocal = localStorage.getItem('User')
let datosUser = {}
let datosUserByEmail = {}

if (usuarioLocal == null) {
    window.location = 'index.html'
}

function datosUsuario() {
    let email = document.getElementById('emailUser')
    datosUserByEmail = JSON.parse(localStorage.getItem(usuarioLocal))


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

        if (datosUserByEmail.photo) {
            STORAGE_IMG = datosUserByEmail.photo
            const IMG_PROF = new Image()
            IMG_PROF.src = STORAGE_IMG

            document.getElementById('perfil').appendChild(IMG_PROF)
            document.getElementById('perfil').getElementsByTagName('img')[0].classList.add('col-1')
        }

        else {
            const DEF_IMG_PATH = 'img/img_perfil.png'
            const DEF_IMG = new Image()
            DEF_IMG.src = DEF_IMG_PATH
            document.getElementById('perfil').appendChild(DEF_IMG)
            document.getElementById('perfil').getElementsByTagName('img')[0].classList.add('col-1')
        }
    }

    else {
        email.value = usuarioLocal
        const DEF_IMG_PATH = 'img/img_perfil.png'
        const DEF_IMG = new Image()
        DEF_IMG.src = DEF_IMG_PATH
        document.getElementById('perfil').appendChild(DEF_IMG)
        document.getElementById('perfil').getElementsByTagName('img')[0].classList.add('col-1')

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

    if (usuarioLocal !== document.getElementById('emailUser').value) {
        localStorage.removeItem(usuarioLocal)
    }



    localStorage.setItem(datosUser.email, JSON.stringify(datosUser))
    localStorage.setItem('User', datosUser.email)



}

function imgSelect() {
    document.getElementById('imgProfile').addEventListener('change', () => {
        const IMGREADER = new FileReader()
        IMGREADER.readAsDataURL(document.getElementById('imgProfile').files[0])
        IMGREADER.addEventListener('load', () => {
            const URLIMG = IMGREADER.result
            const IMG = new Image()
            IMG.src = URLIMG
            document.getElementById('perfil').appendChild(IMG)
            document.getElementById('perfil').getElementsByTagName('img')[0].classList.add('col-1')
            datosUser.photo = URLIMG
        })
    })
    return true

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
    imgSelect()

})
