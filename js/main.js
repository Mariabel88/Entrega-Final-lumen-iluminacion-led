let catalogoProductos = []

const contenedorProductos = document.getElementById("contenedor-productos");
const inputBusqueda = document.getElementById("input-busqueda");
const filtroCategoria = document.getElementById("filtro-categoria");
const mensajePromo = document.getElementById("mensaje-promo");

const cargarProductos = async () => {
   
    mensajePromo.textContent = "Cargando productos...";

    try{
    const respuesta = await fetch("./data/data.json");
    if (!respuesta.ok){
        throw new Error ("No se pudo cargar el archivo JSON");
    }

    const datos = await respuesta.json ();
    catalogoProductos = datos;
    mostrarProductos();
    } catch (error){
    contenedorProductos.textContent = " No se pudieron cargar los productos.";
     console.error("Error al cargar productos", error);
    
    } finally {

        mensajePromo.textContent = "";

    }     


   
};


const mostrarProductos = (productos = catalogoProductos) => {
    contenedorProductos.innerHTML ="";

    productos.forEach((producto) => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-producto");

        const {
            nombre: nombreProducto,
            precio: precioProducto,
            imagen: rutaImagen
        } = producto;



        const imagen = document.createElement("img");
        imagen.src = rutaImagen;
        imagen.alt = nombreProducto;
        imagen.classList.add("imagen-producto");
        tarjeta.appendChild(imagen);

        const titulo = document.createElement("h3");
        titulo.textContent = nombreProducto;
        tarjeta.appendChild(titulo);

        const precio = document.createElement("p");
        precio.textContent = "$" + precioProducto.toLocaleString("es-AR");
        tarjeta.appendChild(precio);

        const estadoStock = document.createElement("p");

        estadoStock.textContent = producto.stock > 0
           ? "Disponible"
           : "Sin stock";

        tarjeta.appendChild(estadoStock);
        
        const botonAgregar = document.createElement("button");
        botonAgregar.textContent = "Agregar al carrito";
        
        if (producto.stock === 0) {
            botonAgregar.disabled =true;
            botonAgregar.textContent = "Sin stock";
        }

            botonAgregar.addEventListener("click",() =>{
            agregarAlCarrito(producto);

        });

        tarjeta.appendChild(botonAgregar);
        contenedorProductos.appendChild(tarjeta);
       
       
    });
};
   

    const filtrarProductos = () => {
        const textoBuscado = inputBusqueda.value.toLowerCase();
        const categoriaSeleccionada = filtroCategoria.value;

        const productosFiltrados = catalogoProductos.filter(( producto) => {
           
            const coincideNombre = producto.nombre.toLowerCase().includes(textoBuscado);

            const coincideCategoria = categoriaSeleccionada === "todas" ||
               producto.categoria === categoriaSeleccionada;

            return coincideNombre && coincideCategoria;
            

        });

        mostrarProductos (productosFiltrados)
    };



   inputBusqueda.addEventListener("input", filtrarProductos);

   filtroCategoria.addEventListener("change", filtrarProductos);

   cargarProductos();

  











