
const boxItems = document.getElementById("box-item__products");
const boxSend = document.getElementById("box-item__envio");

document.addEventListener("DOMContentLoaded", function (e) {

  //* Muestra los datos de los productos que estan en el carrito  ==================================================================

  getJSONData(EXTRA_CART_INFO_URL).then((res) => {
    if (res.status === "ok") {
      let items = res.data.articles;
      let fragment = document.createDocumentFragment();

      items.forEach((item, index) => {
        let boxItem = document.createElement("DIV");
        boxItem.classList.add("field");
        boxItem.dataset.count = index

        boxItem.innerHTML = `
            <div class="field__image">
              <img src="${item.src}" alt="Primer producto en orden de venta" class="field__image--element">
            </div>
            <div class="field__info">
              <div class="field__info--nombre">
                <h2 class="none-margin h2-short">${item.name}</h2>
              </div>
              <div class="field__info--costo">
                <p class="none-margin">
                  <small class="field__info--costo--title">Costo</small>
                </p>
                <p class="field__info--costo--value">${item.currency}${item.unitCost}</p>
              </div>
              <div class="field__info--cantidad">
                <span class="cuantity-text">Cantidad</span>
                <input type="number" name="number" id="number" min="1" max="100"  class="none-margin field__info--count" data-value="${index}">
              </div>
              <div class="field__info--subtotal">
                <p class="amount-text">Costo <strong>total</strong><span class="value-amount">${item.currency}<span class="item-price" data-itemprice="${index}">${item.unitCost}</span></span></p>
              </div>
            </div>
            `;
        fragment.appendChild(boxItem);
      });
      boxItems.appendChild(fragment)

      //* ==============================================================================================================================
      //* Modifico el valor de mi precio en cada uno de mis productos   ================================================================
      
      let precioTotalItem01 = document.querySelector('[data-itemprice="0"]')
      let precioTotalItem02 = document.querySelector('[data-itemprice="1"]')
      const precioCompraTotal = document.getElementById('total')
      const numeroPinoDeOlor = document.getElementById('numero-pino-de-olor')
      const numeroSusukiCelerio = document.getElementById('numero-susuki-celerio')

      let contador = true
      do {
        precioCompraTotal.textContent = 12500.5
        contador = false
      } while(contador)
      
      const item01 = Array.from(document.querySelectorAll('[data-count]'));   //agarra todos mis items dentro de mi carrito
      item01.forEach((element) => {
        const precioTotalItemOriginal01 = 100
        const precioTotalItemOriginal02 = 12500
        
        element.addEventListener('click', (e) => {
          const inputNumber01 = e.target
          
          if (e.target.dataset.value == "0") inputNumber01.addEventListener('change', () => {
            precioTotalItem01.textContent = (precioTotalItemOriginal01 * parseInt(inputNumber01.value))
            
            precioCompraTotal.textContent = (parseInt(precioTotalItem01.textContent) / 40) + parseInt(precioTotalItem02.textContent)
            numeroPinoDeOlor.textContent = parseInt(inputNumber01.value)
          })
          if (e.target.dataset.value == "1") inputNumber01.addEventListener('change', () => {
            precioTotalItem02.textContent = (precioTotalItemOriginal02 * parseInt(inputNumber01.value))
            precioCompraTotal.textContent = (parseInt(precioTotalItem01.textContent) / 40) + parseInt(precioTotalItem02.textContent)
            numeroSusukiCelerio.textContent = parseInt(inputNumber01.value)
          })
          
        })

     
        const boxElementSend = Array.from(document.querySelectorAll('.box-item__envio--element'))
        const textoMetodoDeEnvio = document.getElementById('texto-metodo-envio')
        boxElementSend.forEach((element, index) => {
          element.addEventListener('click', () => {
            totalCost = (parseInt(precioTotalItem01.textContent) / 40) + parseInt(precioTotalItem02.textContent)
            if (index === 0 && !boxElementSend[index].classList.contains('active')) {
              boxElementSend.map(element => element.classList.remove('active'))
              boxElementSend[index].classList.add('active')

              totalCost += totalCost * 0.15
              precioCompraTotal.textContent = totalCost
              textoMetodoDeEnvio.textContent = boxElementSend[index].textContent
            }
            if (index === 1 && !boxElementSend[index].classList.contains('active')) {
              boxElementSend.map(element => element.classList.remove('active'))
              boxElementSend[index].classList.add('active')

              
              totalCost += totalCost * 0.07
              precioCompraTotal.textContent = totalCost
              textoMetodoDeEnvio.textContent = boxElementSend[index].textContent
            }
            if (index === 2 && !boxElementSend[index].classList.contains('active')) {
              boxElementSend.map(element => element.classList.remove('active'))
              boxElementSend[index].classList.add('active')
              
              
              totalCost += totalCost * 0.05
              precioCompraTotal.textContent = totalCost
              textoMetodoDeEnvio.textContent = boxElementSend[index].textContent
            }
          })
        })

        const botonComprar = document.getElementById('boton-comprar')
        botonComprar.addEventListener('click', (e) => {

          let permitirEnvio = false;
          boxElementSend.forEach((element) => {
            if (element.classList.contains('active')) {
              permitirEnvio = true
            }
          })
          const calle = document.getElementById('calle')
          const numero = document.getElementById('numero')
          const esquina = document.getElementById('esquina')
          if (permitirEnvio && 
              calle.value   != "" &&
              numero.value  != "" &&
              esquina.value != ""   ) {
            const personalModal = document.querySelector('.perosnal-modal')
            personalModal.setAttribute("id", "personal-modal")
          } else {
            Swal.fire({
              title: 'Agregue un Método de Envio y Dirección por favor',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            })
          }
        })
        
      })
      
      //* ==============================================================================================================================
    }
  });




});

