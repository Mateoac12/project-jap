const ordenAsc = document.getElementById('costAsc')
const ordenDesc = document.getElementById('costDesc')
const ordenRel = document.getElementById('costRel')

const filtroPalabra = document.getElementById('filtroPalabra')
const filtroPrecio = document.getElementById('rangeFilterPrice')
const limpiarFiltro = document.getElementById('clearRangePrice')

// array que se utuliza para almacenar el filtrado antiguo que se hizo y no tener que andar 
let nuevoArray = []
//*   ----------   CONDICIONES DE FILTRADO   ----------

// filtro ascendente
const filtroAsc = (array) => {
    array.sort((a,b) => {
        if ( parseInt(a.cost) > parseInt(b.cost) ) return -1
        if ( parseInt(a.cost) < parseInt(b.cost) ) return 1
        return 0;
    })
    imprimirLista(array)
}

// filtro descendente
const filtroDesc = (nuevoArray) => {
    nuevoArray.sort((a, b) => {
        if ( parseInt(a.cost) < parseInt(b.cost) )return -1
        if ( parseInt(a.cost) > parseInt(b.cost) )return 1
        return 0;
    })
    imprimirLista(nuevoArray)
}

// filtro de relevancia
const filtroRelevancia = (nuevoArray) => {
    nuevoArray.sort((a,b) => {
        if ( parseInt(a.soldCount) > parseInt(b.soldCount) )return -1
        if ( parseInt(a.soldCount) < parseInt(b.soldCount) )return 1
        return 0;
    })
    imprimirLista(nuevoArray)
}

const filtroPorPalabras = (array) => {
    //TODO: Hay que hacer un gran trabajo aqui
}

const filtroPorPrecio = (array) => {
    // por cada click que doy a filtrar me toma el valor introducido
    const precioMin = document.getElementById('rangeFilterPriceMin').value
    const precioMax = document.getElementById('rangeFilterPriceMax').value
    
    // evalua el valor introducido en el campo de valor minimo
    if ((precioMin != undefined) && (precioMin != "")) valorMin = parseInt(precioMin)
    else valorMin = 0
    
    // evalua el valor introducido en el campo de valor maximo
    if ((precioMax != undefined) && (precioMax != "")) valorMax = parseInt(precioMax)
    else {
        let listaNueva = []
        array.forEach(el => { listaNueva.push(parseInt(el.cost))})
        valorMax = Math.max(...listaNueva)
    }

    // array que pasaremos a Imprimir con el filtro predefinido
    let arrayFiltrado = []

    // ejecuta que elementos dentro del array viejo se van a incorporar al array nuevo
    for (const producto of array) {
        if (valorMin <= producto.cost && valorMax >= producto.cost) {
            arrayFiltrado.push(producto)
        }
    }
    // imprime mi nuevo array filtrado y a su vez en la funcion permite que los demas filtros se apliquen a este array
    imprimirLista(arrayFiltrado)
}

// cambia los valores introducidos en los campos de filtro del usuario y ejecuta nuevamente filtroPorPrecio
const limpiarPrecioFiltro = (array) => {
    document.getElementById('rangeFilterPriceMin').value = 0
    document.getElementById('rangeFilterPriceMax').value = ""
    filtroPorPrecio(array)
}

//* ----------   IMPRIMIR LISTA DE PRODUCTOS EN HTML   ----------

const imprimirLista = (res) => {

    listaProductos.innerHTML = ''   // funciona para limpiar la lista una vez sea actualizo el filtro
    const fragment = document.createDocumentFragment()
    // recorro mi array y coloco cada elemento dentro de un un target
    for (const infoProducto of res) {

        const producto = document.createElement('A')
        producto.setAttribute('href', 'product-info.html')
        producto.classList.add('list-group-item', 'list-group-item-action')
        producto.innerHTML = `
        <div class="row">
            <div class="col-3">
                <img src="${infoProducto.imgSrc}" alt="${infoProducto.description}" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">${infoProducto.name}</h4>
                    <div>
                    <span class="product-rel h6">${infoProducto.soldCount} vendidos!</span>
                        <span class="product-price h5">${infoProducto.currency} ${infoProducto.cost}</span>
                    </div>
                </div>
                <p class="mb-1">` + infoProducto.description + `</p>
            </div>
        </div>
        `
        fragment.appendChild(producto)
    }

    // genera una copia de mi array antiguo para poder hacer filtrados a este y no a mi array original en el que se ven todos los productos
    nuevoArray = res

    listaProductos.appendChild(fragment)
}

const listaProductos = document.getElementById('lista-productos')

//* ----------   VALIDAROR DE JSON y DETECTAR DOM  ----------

document.addEventListener("DOMContentLoaded", function (e) {
    // evalua el url
    fetch(PRODUCTS_URL)

        .then(res => res.ok ? Promise.resolve(res) : Promise.reject(res))   // verifico que la url sea correcta
        .then(res => res.json())    // transformo el json de objeto a un array
        // aplico los filtros 
        .then(res => {

            // filtro predeterminado cuando la pagina carga
            filtroAsc(res)
            imprimirLista(res)

            // filtro ascendente que se aplica una vez damos click
            ordenAsc.addEventListener('click', () => {
                filtroAsc(nuevoArray)
            })

            // filtro descendente que se aplica cuando damos click
            ordenDesc.addEventListener('click', () => {
                filtroDesc(nuevoArray)
            })

            // filtro descendente de precios que se aplica cuando damos click
            ordenRel.addEventListener('click', () => {
                filtroRelevancia(nuevoArray)
            })

            // filtro por precio definido por el usuario
            filtroPrecio.addEventListener('click', () => {
                filtroPorPrecio(res)
            })

            // limpia todos los filtros aplicados
            limpiarFiltro.addEventListener('click', () => {
                limpiarPrecioFiltro(res)
            })

            //? filtro por palabra
            filtroPalabra.addEventListener('keyup', () => {
                filtroPorPalabras(res)
            })
        })

        // en caso de no pasar bien la url informo el problema al usuario y al desarrollador desde consola
        .catch(err => {
            const mensajeError = document.createElement('P')
            mensajeError.textContent = "Error: " + err.status + ". No se pudo encontrar la lista de productos. (Algo salió mal, perdón :c)"

            listaProductos.appendChild(mensajeError)
            console.error('Error en el fetch o en la toma de la url. Nombre del error: ' + err.status)
        })
});