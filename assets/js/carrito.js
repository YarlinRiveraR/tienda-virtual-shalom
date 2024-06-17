const btnAddCarrito = document.querySelectorAll(".btnAddCarrito");
const btnCarrito = document.querySelector("#btnCantidadCarrito");
let listaCarrito;
document.addEventListener("DOMContentLoaded", function () {
    for (let index = 0; index < btnAddCarrito.length; index++) {
        btnAddCarrito[index].addEventListener("click", function () {
            let idProducto = btnAddCarrito[index].getAttribute("prod");
            agregarCarrito(idProducto, 1);
        });
    }
    cantidadCarrito();
})


//agregar productos al carrito
function agregarCarrito(idProducto, cantidad) {
    if(localStorage.getItem("listaCarrito") == null){
        listaCarrito = [];
    } else{
        let listaExiste = JSON.parse(localStorage.getItem("listaCarrito"));
        for (let index = 0; index < listaExiste.length; index++) {
            if (listaExiste[index]["idProducto"] == idProducto) {
                Swal.fire("Aviso?", "EL PRODUCTO YA ESTA AGREGADO", "warning");
                return;
            }
        }
        listaCarrito.concat(localStorage.getItem("listaCarrito"));
    }
    listaCarrito.push({
        idProducto: idProducto,
        cantidad: cantidad,
    })
    localStorage.setItem("listaCarrito", JSON.stringify(listaCarrito));
    Swal.fire("Aviso?", "PRODUCTO AGREGADO AL CARRITO","warning");
    cantidadCarrito();
}


function cantidadCarrito(){
    let listas = JSON.parse(localStorage.getItem("listaCarrito"));
    if (listas != null) {
        btnCarrito.textContent = listas.length;
    } else{
        btnCarrito.textContent = 0;
    }
}