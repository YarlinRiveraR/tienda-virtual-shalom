const btnAddCarrito = document.querySelectorAll(".btnAddCarrito");
const btnCarrito = document.querySelector("#btnCantidadCarrito");
const verCarrito = document.querySelector('#verCarrito');
const tableListaCarrito = document.querySelector('#tableListaCarrito tbody');

const btnAddDeseo = document.querySelectorAll(".btnAddDeseo");
const btnDeseo = document.querySelector('#btnCantidadDeseo');

//ver carrito
const myModal = new bootstrap.Modal(document.getElementById('myModal'));

let listaDeseo, listaCarrito;
document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('listaDeseo') != null) {
        listaDeseo = JSON.parse(localStorage.getItem('listaDeseo'));
    }
    if (localStorage.getItem("listaCarrito") != null) {
        listaCarrito = JSON.parse(localStorage.getItem("listaCarrito"));
    }
    for (let i = 0; i < btnAddDeseo.length; i++) {
        btnAddDeseo[i].addEventListener('click', function () {
            let idProducto = btnAddDeseo[i].getAttribute('prod');
            agregarDeseo(idProducto);
        })        
    }
    for (let i = 0; i < btnAddCarrito.length; i++) {
        btnAddCarrito[i].addEventListener("click", function (e) {
            e.preventDefault();
            let idProducto = btnAddCarrito[i].getAttribute("prod");
            agregarCarrito(idProducto, 1);
        });
    }
    cantidadDeseo();
    cantidadCarrito();

    verCarrito.addEventListener('click', function(){
        getListaCarrito();
        myModal.show();
    })
})
//agregar productos a la lista de deseos
function agregarDeseo(idProducto) {
    if (localStorage.getItem('listaDeseo') == null) {
        listaDeseo = [];
    } else {
        let listaExiste = JSON.parse(localStorage.getItem('listaDeseo'));
        for (let i = 0; i < listaExiste.length; i++) {
            if (listaExiste[i]['idProducto'] == idProducto) {
                Swal.fire(
                    'Aviso?',
                    'EL PRODUCTO YA ESTÁ EN TU LISTA DE DESEO',
                    'warning'
                )
                return;
            }            
        }
        listaDeseo.concat(localStorage.getItem('listaDeseo'));
    }

    listaDeseo.push({
        idProducto: idProducto,
        cantidad: 1
    });
    localStorage.setItem('listaDeseo', JSON.stringify(listaDeseo));
    Swal.fire('Aviso?', 'PRODUCTO AGREGADO A LA LISTA DE DESEOS', 'success');
    cantidadDeseo();
}

function cantidadDeseo() {
    let listas = JSON.parse(localStorage.getItem("listaDeseo"));
    if (listas != null) {
        btnDeseo.textContent = listas.length;
    } else {
        btnDeseo.textContent = 0;
    }
}
//agregar productos al carrito
function agregarCarrito(idProducto, cantidad, accion = false) {
    if(localStorage.getItem("listaCarrito") == null){
        listaCarrito = [];
    } else{
        let listaExiste = JSON.parse(localStorage.getItem("listaCarrito"));
        for (let i = 0; i < listaExiste.length; i++) {
            if (accion) {
                eliminarListaDeseo(idProducto);
            }
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
    });
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

//ver carrito
function getListaCarrito() {
    const url = base_url + 'principal/listaProductos';
    const http = new XMLHttpRequest();
    http.open('POST', url, true);
    http.send(JSON.stringify(listaCarrito));
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(this.responseText);
            let html = '';
            res.productos.forEach(producto => {
                html += `<tr>
                    <td>
                    <img class="img-thumbnail" src="${base_url + producto.imagen}" alt="" width="100">
                    </td>
                    <td>${producto.nombre}</td>
                    <td><span class="badge bg-warning">${res.moneda + ' ' + producto.precio}</span></td>
                    <td width="100">
                    <input type="number" class="form-control agregarCantidad" id="${producto.id}" value="${producto.cantidad}">
                    </td>
                    <td>${producto.subTotal}</td>
                    <td>
                    <button class="btn btn-danger btnDeletecart" type="button" prod="${producto.id}"><i class="fas fa-times-circle"></i></button>
                    </td>
                </tr>`;
            });
            tableListaCarrito.innerHTML = html;
            document.querySelector('#totalGeneral').textContent = "Total: " + res.total;
            btnEliminarCarrito();
            //cambiarCantidad();
        }
    }
}

function btnEliminarCarrito() {
    let listaEliminar = document.querySelectorAll('.btnDeletecart');
    for (let i = 0; i < listaEliminar.length; i++) {
        listaEliminar[i].addEventListener('click', function () {
            let idProducto = listaEliminar[i].getAttribute('prod');
            eliminarListaCarrito(idProducto);
        })
    }
}

function eliminarListaCarrito(idProducto) {
    for (let i = 0; i < listaCarrito.length; i++) {
        if (listaCarrito[i]['idProducto'] == idProducto) {
            listaCarrito.splice(i, 1);
        }
    }
    localStorage.setItem('listaCarrito', JSON.stringify(listaCarrito));
    getListaCarrito();
    cantidadCarrito();
    Swal.fire("PRODUCTO ELIMINADO DEL CARRITO", "success")
}