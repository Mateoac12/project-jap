//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){


    const formSignin = document.getElementById('formSignin')
    const inputEmail = document.getElementById('inputEmail')
    const inputPass = document.getElementById('inputPass')
    const submitSignin = document.getElementById('submitSignin')
    const imageSignin = document.getElementById('imageSignin')

    const formIsValid = {
        inputEmail: false,
        inputPass: false
    }

    //evita que el formulario se envie sin ser verificado
    formSignin.addEventListener('submit', (e) => {
        e.preventDefault()
        validateForm()
    })

    inputEmail.addEventListener('input', (e) => {
        imageSignin.setAttribute('src', 'img/signin01.png')
        if (e.target.value.trim().length > 0) formIsValid.inputEmail = true
    })

    inputPass.addEventListener('input', (e) => {
        imageSignin.setAttribute('src', 'img/signin02.png')
        if (e.target.value.trim().length > 0) formIsValid.inputPass = true
    })

    const validateForm = () => {
        const formValues = Object.values(formIsValid)  //pasa a un array los valores del objeto
        const valid = formValues.findIndex(value => value == false)

        if (valid == -1) {
            formSignin.submit()
        }
    }

});