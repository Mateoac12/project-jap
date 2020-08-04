// introduce las categorias al home de la pagina
fetch('https://japdevdep.github.io/ecommerce-api/category/all.json')
    .then(res => res.ok ? Promise.resolve(res) : Promise.reject(res))
    .then(res => res.json())
    .then(res => {
    
        const listCategory = document.getElementById('productos')
        const fragment = document.createDocumentFragment()

        for (const productInfo of res) {        //TODO: permitir ver unicamente 6 categorias
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
        }

        listCategory.appendChild(fragment)
    })