
document.addEventListener("DOMContentLoaded", function(e){

    const formSignin = document.getElementById('formSignin')
    const inputEmail = document.getElementById('inputEmail')
    const inputPass = document.getElementById('inputPass')
    const imageSignin = document.getElementById('imageSignin')


    // cuando toco el boton de 'iniciar sesion'
    formSignin.addEventListener('submit', (e) => {
        e.preventDefault()      // evita que el formulario se envie sin la validacion de Bootstrap
        validateForm()          // guarda la informacion en Web Storage
    })


    // evalua que los campos de formulario sean correctos
    const validateForm = () => {
        const valueEmail = validateEmail(inputEmail.value)     // origin: validation.js / devuelve si el email cumple la verificacion

        if (valueEmail) {
            window.localStorage.setItem('user', inputEmail.value)     //guardo mi usuario hasta que el navegador se cierre
            location.replace('products.html')     // redirige a index.html
        } else {
            console.error('El valor del campo de email no cumple con la validación establecida en validation.js')   //error en consola
            alert('Introdujo una cuenta de email que no cumple con la validación. Revise nuevamente.')      //error para el usuario
        }
    }


    //   ----------   FUNCIONALIDADES GRAFICAS CON EL LOGOTIPO   ----------   //

    // cuando escribo en la casilla de email
    inputEmail.addEventListener('input', (e) => {
        imageSignin.setAttribute('src', 'img/signin01.png')     // selecciona el logotipo con los ojos abiertos
    })


    // cuando escribo en la casilla del password
    //TODO: Mejorar la funcionalidad del mismo para que no se recargue por cada caracter escrito - OPTIMIZAR
    inputPass.addEventListener('input', (e) => {
        imageSignin.setAttribute('src', 'img/signin02.png')     // selecciona el logotipo con los ojos cerrados
    })

});