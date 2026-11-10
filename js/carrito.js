let carritoLumen= JSON.parse(localStorage.getItem ("carritoLumen")) || [];


const contenedorCarrito = document.getElementById("contenedor-carrito");
const totalCarritoTexto = document.getElementById("total-carrito");
const btnVaciar = document.getElementById("btn-vaciar");
const btnFinalizar = document.getElementById("btn-finalizar");
const contadorCarrito = document.getElementById("contador-carrito");
const abrirCarrito = document.getElementById("abrir-carrito");
const cerrarCarrito = document.getElementById("cerrar-carrito");
const panelCarrito = document.getElementById("panel-carrito");


const agregarAlCarrito = (producto) => {
        const productoExistente = carritoLumen.find((item) => item.id === producto.id);
        if (productoExistente){
            if(productoExistente.cantidad < producto.stock){
                productoExistente.cantidad++;
            } else{
                Swal.fire({
                    title: "Stock insuficiente",
                    text: "No podés agregar más unidades de este producto.",
                    icon: "warning",
                    confirmButtonColor: "#087F8C"
                });
            }
            
        } else {
           if (producto.stock > 0) {
            carritoLumen.push({...producto,cantidad:1});
           }

        }
        localStorage.setItem("carritoLumen", JSON.stringify(carritoLumen));
        
        mostrarCarrito();
        };

const mostrarCarrito = ()=> {
      contenedorCarrito.innerHTML ="";
      carritoLumen.forEach((producto) => {

        const tarjetaCarrito = document.createElement("div");
        tarjetaCarrito.classList.add("tarjeta-carrito");
        
        const imagenProducto = document.createElement("img");
        imagenProducto.src = producto.imagen;
        imagenProducto.alt = producto.nombre;
        imagenProducto.classList.add("imagen-carrito");
        tarjetaCarrito.appendChild(imagenProducto);

        const nombreProducto =document.createElement("h3");
        nombreProducto.textContent = producto.nombre;
        tarjetaCarrito.appendChild(nombreProducto);

        const precioProducto = document.createElement("p");
        precioProducto.textContent = "Precio: $" + producto.precio;
        tarjetaCarrito.appendChild(precioProducto);

        const cantidadProducto = document.createElement("p");
        cantidadProducto.textContent = "Cantidad:" + producto.cantidad;
        tarjetaCarrito.appendChild(cantidadProducto);

        const subtotalProducto = document.createElement("p");
        subtotalProducto.textContent = "Subtotal: $" + (producto.precio * producto.cantidad).toLocaleString("es-AR");
        tarjetaCarrito.appendChild(subtotalProducto);

        const botonSumar = document.createElement("button");
        botonSumar.textContent = "+";
        botonSumar.addEventListener("click",() =>{
            
            if (producto.cantidad < producto.stock){
                producto.cantidad++;
                localStorage.setItem("carritoLumen", JSON.stringify(carritoLumen));
                mostrarCarrito();
            } else {
                Swal.fire({
                    title: "Stock insuficiente",
                    text: "Alcanzaste la cantidad máxima disponible",
                    icon: "warning",
                    confirmButtonColor: "#087F8C"
                });
            }

        });
        tarjetaCarrito.appendChild(botonSumar);

        const botonRestar = document.createElement("button");
        botonRestar.textContent = "-";

        botonRestar.addEventListener("click",() => {
            if (producto.cantidad > 1){
                producto.cantidad--;
                localStorage.setItem("carritoLumen", JSON.stringify(carritoLumen));
                mostrarCarrito();
            }
        
        });
        
        tarjetaCarrito.appendChild(botonRestar);

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.addEventListener("click",() => {
            carritoLumen =carritoLumen.filter((item) => item.id !== producto.id);
            localStorage.setItem("carritoLumen", JSON.stringify(carritoLumen));
            mostrarCarrito();

        });

        tarjetaCarrito.appendChild(botonEliminar);

        contenedorCarrito.appendChild(tarjetaCarrito);


    });


        const total = carritoLumen.reduce((acumulador,producto) => {
            return acumulador + producto.precio * producto.cantidad;

        }, 0);

        totalCarritoTexto.textContent = total.toLocaleString("es-AR");

        const cantidadTotal = carritoLumen.reduce((acumulador, producto) => {
            return acumulador + producto.cantidad;
        }, 0);

        contadorCarrito.textContent = cantidadTotal;



    }

    btnVaciar.addEventListener("click", () => {
        carritoLumen =[];
        localStorage.removeItem("carritoLumen");
        mostrarCarrito();
    
    });


    btnFinalizar.addEventListener("click", () => {
        if (carritoLumen.length === 0) {
          Swal.fire({
            title: "Carrito vacío",
            text: "Agregá productos antes de finalizar la compra.",
            icon: "warning",
            confirmButtonColor: "#087F8C"
          });
        } else{
            Swal.fire({
                title: "Confirmar compra",
                text: "¿Querés finalizar tu compra?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Sí, comprar",
                cancelButtonText: "Cancelar",
                confirmButtonColor: "#087F8C",
                cancelButtonColor: "#30343B"

            }). then((resultado) => {
                if (resultado.isConfirmed){
                    carritoLumen =[];
                    localStorage.setItem("carritoLumen", JSON.stringify(carritoLumen));
                    mostrarCarrito();

            Swal.fire({
                title: "¡Compra realizada!",
                text: "Gracias por comprar en LUMEN.",
                icon: "success",
                confirmButtonColor: "#087F8C"
            });

                }
            });

        }
    }); 

    abrirCarrito.addEventListener("click", () => {
        panelCarrito.classList.add("abierto");
    });


    cerrarCarrito.addEventListener("click", () => {
        panelCarrito.classList.remove("abierto");
    });


    mostrarCarrito()