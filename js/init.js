const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";


var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

  // valida si hay un usuario registrado, si no es asi redirige a login.html
  if (localStorage.getItem('user') == null) {
    location.replace('login.html')
  }
  else {

    const mostrarUsuario = document.getElementById('carrito-usuario')
    mostrarUsuario.innerHTML += `
      <ul class="navbar-nav d-inline boton-usuario">
      <li class="nav-item dropdown d-inline">
          <a class="nav-link dropdown-toggle d-inline" href="#" id="desplegar-usuario" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img src="img/signin01.png" alt="Usuario" class=" imagen-usuario" width="35">
          </a>
          <div class="dropdown-menu" aria-labelledby="desplegar-usuario">
              <a class="dropdown-item d-none" href="login.html">Iniciar Sesión</a>
              <a class="dropdown-item d-none" href="#">Registrarse</a>
              <div id="opciones-login">
                  <p class=" font-weight-bold py-0 my-0 px-2" id="mostrarEmail"></p>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">Mi Cuenta</a>
                  <a class="dropdown-item" href="#">Publicaciones</a>
                  <div class="dropdown-divider"></div>
                  <a id="boton-cerrar-sesion" class="dropdown-item" href="#">Cerrar Sesión</a>
              </div>
          </div>
      </li>
  </ul> 
  `

    mostrarEmail.textContent = localStorage.getItem('user')
  }

  //*   ----------  OPCIONES BOTONES SESION   ----------

  const botonCerrarSesion = document.getElementById('boton-cerrar-sesion')
  botonCerrarSesion.addEventListener('click', () => {
    localStorage.removeItem('user')
    location.reload()
  })

  //TODO: Crear funcionalidades de DOM cuando de click en botones como por ejemplo el de cerrar sesion
});