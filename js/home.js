
// introduce las categorias en index.html
fetch('https://japdevdep.github.io/ecommerce-api/category/all.json')
    .then(res => res.ok ? Promise.resolve(res) : Promise.reject(res))       // valida que el enlace sea correcto
    .then(res => res.json())        // transforma el contenido de String a Objeto
    .then(res => {
        // represento el objeto dentro de card's en el html

        const listCategory = document.getElementById('productos')
        const fragment = document.createDocumentFragment()

        let contadorCategorias = 0
        const numCategorias = 6     // numero de categorias maxima a mostrar

        for (const productInfo of res) {
            const productCategory = document.createElement('DIV')
            productCategory.classList.add('col-6', 'col-md-4', 'mb-3')

            productCategory.innerHTML = `
                <a href="categories.html" class="card h-100 custom-card">
                    <img src="${productInfo.imgSrc}" alt="" class="img-fluid card-img-top">
                    <div class="card-body">
                        <h2 class="font-weight-light mb-3">
                            <span id="product-name">${productInfo.name}</span>
                            <span id="product-count" class="badge badge-secondary text-light">${productInfo.productCount}</span>
                        </h2>
                        <p id="product-description">${productInfo.description}</p>
                    </div>
                </a>
                `
            fragment.appendChild(productCategory)

            contadorCategorias++

            if (contadorCategorias == numCategorias) break;
        }

        listCategory.appendChild(fragment)
})




