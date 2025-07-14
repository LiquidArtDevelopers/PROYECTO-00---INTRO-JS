const doc = document
doc.addEventListener('DOMContentLoaded',()=>{


    // ******************************
    // GESTIÓN DE AÑADIR O QUITAR PRODUCTOS A LA TABLA, TOTALIZAR Y NUMERAR FILAS

    // recoger el html en constantes
    // recoger todos los input a través de la clase productos
    const productos = document.getElementsByClassName("producto")
    const tableItems = document.getElementById("tableItems")
    const total = document.getElementById("total") //Span donde totalizo la compra

     // Función para rellenar el contador de filas de la tabla
    function contarFilas(){
        // Recojo todas las filas sólo cuando llamo a esta función
        const filas = document.getElementsByClassName("fila")
        let contador = 0

        // //Hago una iteración mediante foreach
        // filas.forEach(fila => {

        //     const tds = fila.querySelectorAll('td')
        //     let primerTd = tds[0]

        //     console.log(primerTd)
        //     if(primerTd){
        //         contador = contador + 1
        //         console.log(contador)
        //         primerTd.innerText=contador
        //     }
        // });
        
        for(const fila of filas){
            // RECOJO TODOS LOS TD QUE TIENE ESA FILA EN UNA CONSTANTE
            const tds = fila.querySelectorAll('td')
            let primerTd = tds[0]

            console.log(primerTd)
            if(primerTd==true){
                contador = contador + 1
                console.log(contador)
                primerTd.innerText=contador
            } 
        }
    }
    
    // recorrer en un for of todos los productos, en cada iteración trabajaré con cada producto
    for(const producto of productos){
        producto.addEventListener("change", function(){
            // console.log(producto)

            // recojo en constantes los datas de ese input que ha sufrido evento change (nombre, id y precio)
            const id = producto.getAttribute("data-id")
            const nombre = producto.getAttribute("data-nombre")

            let precio = producto.getAttribute("data-precio") //le pongo let ya que luego opero con dicha variable   "10,99"         
            let cantidad = "2" // Vendría dinámico desde input de html
            let totalLinea = 0 //La usaremos para multiplicar cantidad por precio unitario            
            let totalCompraNuevo = 0 //Aquí calcularemos el nuevo total de la compra

            let totalCompra = total.getAttribute("data-total") //Aquí tendremos el total como texto y en un data
            totalCompra=parseFloat(totalCompra) //paso el valor a un número decimal para poder operar 
            
            // Gestión del total por línea            
            precio = parseFloat(precio)
            cantidad = parseInt(cantidad)
            totalLinea = precio * cantidad
            

            // condición para actuar en función de si el input en cuestión está o no checked
            if(producto.checked){
                // Si ese input está checked añado a la tabla un nuevo TR (fila) con los TD y los datos de ese producto
                // console.log(`El input ${id} lo han checkeado`)

                // crear elementos HTML desde JS, para luego metermes atributos y valores y después inyectarlos en el HTML
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
                // Si ese input NO está checked, busco el TR que tenga el mismo ID de este data-id del input, y lo quito
                // console.log(`El input ${id} lo han descheckeado`)
                document.getElementById(id).remove()


                // Gestión del total de la compra (restar)
                totalCompraNuevo = totalCompra - totalLinea
                total.setAttribute("data-total", totalCompraNuevo)
                total.innerText=totalCompraNuevo+" €"
            
            }

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
