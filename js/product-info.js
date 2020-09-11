
let infoProduct = {}    // para almacenar la informacion del producto
let productsRecoment = []   // para almacenar el ID de los productos relacionados que debo mostrar

document.addEventListener("DOMContentLoaded", function(e){

    //* ----------   IMPRIMIR ELEMENTOS DEL JSON EN EL DOM   ----------

    // ------ DOM para agregar elementos ------
    const nameProduct = document.getElementById('name-product')
    const descriptionProduct = document.getElementById('description-product')
    const costProduct = document.getElementById('cost-product')
    const categoryProduct = document.getElementById('category-product')
    const numsoldProduct = document.getElementById('numSold')
    const boxImages = document.getElementById('box-images')
    const boxRecomendation = document.getElementById('box-recomendation')
    const boxComentUsers = document.getElementById('box-coment-users')
    const selectStar = document.getElementById('select-star')
    const userComent = document.getElementById('user-comment')
    const bottonPushComment = document.getElementById('botton-push-comment')

    let starPushed = 0

    // ejecuta y muestra la informacion del producto seleccionado
    getJSONData(PRODUCT_INFO_URL).then((res) => {
        if (res.status === "ok") {
            
            infoProduct = res.data

            nameProduct.textContent = infoProduct.name
            descriptionProduct.innerHTML = infoProduct.description      /* Utilizo innerHTML porque hay un <br> en su contenido */
            costProduct.textContent = infoProduct.currency + infoProduct.cost
            categoryProduct.innerHTML = `<i class="fas fa-car"></i> ${infoProduct.category}`
            numsoldProduct.textContent = infoProduct.soldCount

            productsRecoment = infoProduct.relatedProducts

            setImagesProduct(infoProduct.images)
        }
    })

    // ------ mostrar imagenes en la vista de images ------
    const setImagesProduct = (images) => {
        for (let i = 0; i < images.length; i++) {
            let image = images[i]
            if (i === 0) {
                boxImages.innerHTML = `
                <div class="col-12 p-0 pb-1"><img class="photo-box__item img-fluid " src="${image}" alt=""></div>
                `
            } else {
                boxImages.innerHTML += `
                <div class="photo-box col-3 p-0"><img class="photo-box__item img-fluid " src="${image}" alt=""></div>
                `
            }
        }
    }


    //* ----------   SISTEMA PARA HACER ZOOM A LAS FOTOS DEL PRODUCTO   ----------

    boxImages.addEventListener('click', (e) => {

        const firstImage = document.querySelector('.photo-box__item') /* Devuelve el primer elemento que tenga esta clase para identificar mi imagen central*/
        console.log(firstImage)
        console.dir(e.target.naturalHeight)
        console.dir(e.target.naturalWidth)

        const imageSelected = e.target      // guardo mi imagen seleccionada
        const parentElement = e.target.parentElement        // obtengo el padre de la imagen seleccionada para luego agregarle la imagen que hay en la central

        firstImage.replaceWith(imageSelected)       // reemplazo mi imagen central por la que habia hecho click 
        parentElement.appendChild(firstImage)       // cuando el campo de la imagen que seleccione quede vacio por mandarla a la imagen central, la relleno con la imagen que estaba en el centro
    });


    //* ----------   MOSTRAR PRODUCTOS RECOMENDADOS   ----------

    getJSONData(PRODUCTS_URL).then((res) => {
        if (res.status === "ok") {
            let infoRes = res.data

            productsRecoment.forEach(num => {
                
                boxRecomendation.innerHTML += `
                <div class="col-3">
                    <a href="#" class="card custom-card">
                        <img src="${infoRes[num].imgSrc}" alt="" class="img-fluid card-img-top">
                        <div class="card-body">
                            <h3 class="font-weight-light">
                                <span >${infoRes[num].currency}${infoRes[num].cost}</span>
                            </h3>
                            <p>${infoRes[num].name}</p>
                        </div>
                    </a>
                </div>
                `
            })
        }
    });


    //* ----------   PUBLICAR COMENTARIO DEL PRODUCTO   ----------
    //! ----------   HECHO POR LETRA DE LA TAREA: EN LA PRUEBA FINAL SE DEBE ELIMINAR ESTA PARTE Y HACERLO CON BBDD DE FORMA CORRECTA   ----------

    // cuando seleccionamos las entrellas que vamos a poner
    selectStar.addEventListener('click', (e) => {

        starSelected = parseInt(e.target.dataset.value)

        for (let i = 0; i < selectStar.childElementCount; i++) {
            selectStar.children[i].classList.replace('fas', 'far')
        }

        for (let i = 0; i < starSelected; i++) {
            selectStar.children[i].classList.replace('far', 'fas')
        }

        starPushed = parseInt(e.target.dataset.value)
    })

    // cuando damos click al boton de publicar el comentario
    bottonPushComment.addEventListener('click', (e) => {
        e.preventDefault()  // previene la accion por defecto para que no se recarge la pagina

        const DateNow = () => {
            let timeNow = new Date(); 
            return datetime = timeNow.getFullYear() + "-"
                   + (timeNow.getMonth()+1)  + "-"  
                   + timeNow.getDate() + " " 
                   + timeNow.getHours() + ":" 
                   + timeNow.getMinutes() + ":" 
                   + timeNow.getSeconds();
        }

        const boxUserComment = document.createElement('div')
        boxUserComment.innerHTML = `
        <header class="my-3 py-2 row container">
            <div class="col-1 text-center"><img src="img/signin01.png" alt="Usuario" width="35"></div>
            <div class="col-9 box-coment">
                <div class="comment my-2 row">
                    <div class="col-6 font-weight-bold">${localStorage.getItem('user')}</div>
                    <div class="col-6 text-right text-muted">${DateNow()}</div>
                    <div class="col-12 my-2">${userComent.value}</div>
                </div>
            </div>
            <div class="col-2 d-flex box-star">${colocarEstrellas(starPushed)}
            </div>
        </header>
        `
        boxComentUsers.appendChild(boxUserComment)

        // alerta de que se publico correctamente el comentario
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se publicó su comentario con éxito!',
            showConfirmButton: false,
            timer: 2000
          })

    })


    //* ----------   MOSTRAR COMENTARIOS DE LOS USUARIOS   ----------

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then((res) => {
        if (res.status === "ok") {
            let infoComents = res.data

            infoComents.forEach((coment) => {

                // imprime los comentarios de los usuarios
                boxComentUsers.innerHTML += `
                <header class="my-3 py-2 row container">
                    <div class="col-1 text-center"><img src="img/signin01.png" alt="Usuario" width="35"></div>
                    <div class="col-9 box-coment">
                        <div class="comment my-2 row">
                            <div class="col-6 font-weight-bold">${coment.user}</div>
                            <div class="col-6 text-right text-muted">${coment.dateTime}</div>
                            <div class="col-12 my-2">${coment.description}</div>
                        </div>
                    </div>
                    <div class="col-2 d-flex box-star">${colocarEstrellas(coment.score)}
                    </div>
                </header>
                `
            })
        }
    });

    // dependiendo de la cantidad de estrellas, imprime el numero de ellas
    //TODO: Se puede hacer mejor con: switch o con while para reducir el codigo
    const colocarEstrellas = (score) => {
        if (score === 1 || score === 0) {
            return `<i class="fas fa-star"></i>`
        }
        if (score === 2) {
            return `
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            `
        }
        if (score === 3) {
            return `
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            `
        }
        if (score === 4) {
            return `
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            `
        }
        if (score === 5) {
            return `
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            `
        }
    }
});