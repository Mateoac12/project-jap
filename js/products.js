
const listaProductos = document.getElementById('lista-productos')

document.addEventListener("DOMContentLoaded", function (e) {
    // Muestra la lista de productos dentro de products.html
    fetch(PRODUCTS_URL)

        .then(res => res.ok ? Promise.resolve(res) : Promise.reject(res))
        .then(res => res.json())
        .then(res => {

            const fragment = document.createDocumentFragment()

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
                            <p class="product-price h5">${infoProducto.currency} ${infoProducto.cost}</p>
                        </div>
                        <p class="mb-1">` + infoProducto.description + `</p>
                    </div>
                </div>
                `
                fragment.appendChild(producto)
            }

            listaProductos.appendChild(fragment)

        })
        .catch(err => {

            const mensajeError = document.createElement('P')
            mensajeError.textContent = "Error: " + err.status + ". No se pudo encontrar la lista de productos. (Algo salió mal, perdón :c)"

            listaProductos.appendChild(mensajeError)
            
        })
});