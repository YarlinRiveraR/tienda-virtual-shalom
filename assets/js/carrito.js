const btnAddCarrito = document.querySelectorAll(".btnAddCarrito");
const btnCarrito = document.querySelector("#btnCantidadCarrito");
let listaCarrito;
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("listaCarrito") != null) {
        listaCarrito = JSON.parse(localStorage.getItem("listaCarrito"));
    }

    for (let i = 0; i < btnAddCarrito.length; i++) {
        btnAddCarrito[i].addEventListener("click", function (e) {
            e.preventDefault();
            let idProducto = btnAddCarrito[i].getAttribute("prod");
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
        for (let i = 0; i < listaExiste.length; i++) {
            if (listaExiste[i]["idProducto"] == idProducto) {
                Swal.fire("Aviso?", "EL PRODUCTO YA ESTA AGREGADO", "warning")
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
    Swal.fire("Aviso?", "PRODUCTO AGREGADO AL CARRITO","success");
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