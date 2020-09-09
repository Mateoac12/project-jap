
let infoProduct = {}

document.addEventListener("DOMContentLoaded", function(e){

    //* ----------   IMPRIMIR ELEMENTOS DEL JSON EN EL DOM   ----------

    // ------ DOM para agregar elementos del producto ------
    const mainProduct = document.getElementById('product-info')

    getJSONData(PRODUCT_INFO_URL).then((res) => {
        if (res.status === "ok") {
            infoProduct = res.data
        }
    })




    //* ----------   SISTEMA PARA HACER ZOOM A LAS FOTOS DEL PRODUCTO   ----------

    const boxImages = document.getElementById('box-images')
    boxImages.addEventListener('click', (e) => {

        const firstImage = document.querySelector('.photo-box__item') /* Devuelve el primer elemento que tenga esta clase para identificar mi imagen central*/

        const imageSelected = e.target      // guardo mi imagen seleccionada
        const parentElement = e.target.parentElement        // obtengo el padre de la imagen seleccionada para luego agregarle la imagen que hay en la central

        firstImage.replaceWith(imageSelected)       // reemplazo mi imagen central por la que habia hecho click 
        parentElement.appendChild(firstImage)       // cuando el campo de la imagen que seleccione quede vacio por mandarla a la imagen central, la relleno con la imagen que estaba en el centro
    })





});