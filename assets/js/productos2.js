const doc = document
doc.addEventListener('DOMContentLoaded',()=>{


    // ******************************
    // GESTIÓN DE AÑADIR O QUITAR PRODUCTOS Y SUMATORIOS DE PRECIOS EN LA TABLA

    // recoger el html en constantes
    // recoger todos los input a través de la clase productos
    const productos = document.getElementsByClassName("producto")
    const tableItems = document.getElementById("tableItems")
    const total = document.getElementById("total") //Span donde totalizo la compra

     // Función para rellenar el contador de filas de la tabla
    function contarFilas(){
        // Recojo todas las filas sólo cuando llamo a esta función
        const filas = document.querySelectorAll(".fila")
        let contador = 0

        //Hago una iteración mediante foreach
        filas.forEach(fila => {

            const tds = fila.querySelectorAll('td')
            let primerTd = tds[0]            
            if(primerTd){
                contador = contador + 1
                // console.log(contador)
                primerTd.innerText=contador
            }
        }); 
    }

    function comprobarSiExisteFila(valorRecibido){
        // Esta función recibe un valor con el que captaremos un elemento HTML a través de su ID
        // Si ese elemento existe, la función devuelve un boolean = true, sino, devuelve false
        const fila = document.getElementById(valorRecibido)
        if(fila){
            return true
        }else{
            return false
        }
    }
    
    
    // recorrer en un for of todos los productos, en cada iteración trabajaré con cada producto
    for(const producto of productos){
        producto.addEventListener("click", function(){
            // console.log(producto)

            // recojo en una constante el elemento input tipo number que tiene toda la información a través del data-input-id del boton
            const dataInputId = producto.getAttribute("data-input-id") //Recojo el data-input-id del botón en el que se ha hecho click
            const input = document.getElementById(dataInputId) // sabiendo el id que tiene el input, lo meto en const
            

            // recojo en constantes los datas de ese input (nombre, id y precio) Y CANTIDAD (VALUE)
            const id = input.getAttribute("data-id")
            const nombre = input.getAttribute("data-nombre")

            let precio = input.getAttribute("data-precio") //le pongo let ya que luego opero con dicha variable   "10,99"    
            let cantidad = input.value // Ahora viene como valor dinámico
            let totalLinea = 0 //La usaremos para multiplicar cantidad por precio unitario            
            let totalCompraNuevo = 0 //Aquí calcularemos el nuevo total de la compra

            let totalCompra = total.getAttribute("data-total") //Aquí tendremos el total como texto y en un data
            totalCompra=parseFloat(totalCompra) //paso el valor a un número decimal para poder operar 
            
            // Gestión del total por línea            
            precio = parseFloat(precio)
            cantidad = parseInt(cantidad)
            totalLinea = precio * cantidad            
            console.log(totalLinea)

            // Si "cantidad" es mayor o igual a 1, entonces añadimos línea o modificamos sus datos si esta ya existe
            if(cantidad >= 1){
                
                // Condición para saber si existe ya la línea y debo modificar los datos, o sino existe la añado.
                // Llamo a una función a la que envío como parámetro el valor del id que tendrá la fila en caso de existir.
                if(comprobarSiExisteFila(id) == false){
                    // Si la fila no existe para este producto, añado una nueva fila
                    const tr = document.createElement("tr")
                    const td1 = document.createElement("td")
                    const td2 = document.createElement("td")
                    const td3 = document.createElement("td")
                    const td4 = document.createElement("td")
                    const td5 = document.createElement("td")

                    // asigno valores
                    tr.setAttribute("id", id)
                    tr.setAttribute("class", "fila")
                    td1.innerText="#"
                    td2.innerText=nombre
                    td3.innerText=precio +" €"
                    td4.innerText=cantidad
                    td5.innerText=totalLinea+" €"
                    // anidamiento appendChild
                    tr.appendChild(td1)
                    tr.appendChild(td2)
                    tr.appendChild(td3)
                    tr.appendChild(td4)
                    tr.appendChild(td5)
                    tableItems.appendChild(tr)

                    // Gestión del total de la compra (sumar)
                    totalCompraNuevo = totalCompra + totalLinea
                    total.setAttribute("data-total", totalCompraNuevo)
                    total.innerText=totalCompraNuevo+" €"
                }else{
                    // Si la fila existe en la tabla, cambio sus datos. Usaré el id para llegar al nodo hijo que necesite.

                    // Recojo en variables td que debo modificar.
                    // Cojo del elemento a través de su id
                    const fila = document.getElementById(id)
                    const td4 = fila.children[3]
                    const td5 = fila.children[4]                    

                    // Compruebo que no sea el mismo valor cantidad de la cantidad que ya está en la tabla
                    if(cantidad !== parseInt(td4.innerText)){

                        let totalLineaAnterior = parseFloat(td5.innerText)
                        // piso los text de la tabla
                        td4.innerText=cantidad
                        td5.innerText=totalLinea+" €"


                        // Gestión del total de la compra (sumar)
                        totalCompraNuevo = totalCompra + (totalLinea - totalLineaAnterior)
                        total.setAttribute("data-total", totalCompraNuevo)
                        total.innerText=totalCompraNuevo+" €"
                    }             
                }

            }else{ //Sino, significa que "cantidad" no es igual o mayor que 1, por lo que es = 0. En ese caso, si existe la fila la borro, y si no existe, no hago nada
                if(comprobarSiExisteFila(id)==true){
                    const fila = document.getElementById(id)
                    const td5 = fila.children[4]
                    fila.remove()
                    totalLinea = parseFloat(td5.innerText)
                    totalCompraNuevo = totalCompra - totalLinea
                    total.setAttribute("data-total", totalCompraNuevo)
                    total.innerText=totalCompraNuevo+" €"
                }
            }                

            // Después de haber añadido o quitado fila en la acción de "añadirº"
            contarFilas()

        })
    }
       



    // ******************************
    // GESTIÓN DEL MODAL QUE APARECE O SE QUITA Y LA INFO QUE LLEVA CLONADA

    const botonPedido = document.getElementById("botonPedido")
    const close = document.getElementById("close")
    const modal = document.getElementById("modal")

    const tablaPedido = document.getElementById("tablaPedido")
    const totalCompra = document.getElementById("totalCompra")  
    const contenedorModal = document.getElementById("contenedorModal")

    // si se hace click sobre botonPedido, abro modal
    botonPedido.addEventListener("click", function(){ 

        // Clono el HTML de la tabla con todos sus hijos (true)
        const tablaPedidoClonada = tablaPedido.cloneNode(true)
        const totalCompraClonada = totalCompra.cloneNode(true)

        // Comprobamos si ya hay tabla, y si la hay la quito. También compruebo si existe el div con el total del precio para lo mismo
        const tablaAnterior =contenedorModal.querySelector('table')
        const totalCompraAnterior =contenedorModal.querySelector('#totalCompra')
        if (tablaAnterior){
            // quito los elementos para que no se dupliquen si vuelvo a abrir el modal
            tablaAnterior?.remove()
            totalCompraAnterior?.remove()
        }
        contenedorModal.insertBefore(tablaPedidoClonada, contenedorModal.children[2])
        contenedorModal.insertBefore(totalCompraClonada, contenedorModal.children[3])

        modal.style.display="flex"        
    })

    // SI hago click sobre el boton de id close, cierro
    close.addEventListener("click", function(){
        modal.style.display="none"
    })


});
