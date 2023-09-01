const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const contenedor = document.querySelector("#contenedor-donaciones");
const donaciones = document.querySelector("#donaciones-total")
const modal = document.querySelector("#modal-body");

donacionesTotal = 0

fetch('../productos.json').then(function (respuesta) {
    return respuesta.json();
}).then(res => {
    productosADonar = res['productos'];
    productosADonar.forEach(p => {
        const div = document.createElement("div");
        div.classList.add("col");

        div.innerHTML = `
        <div class="row align-items-center justify-content-center d-flex">
            <div class="card mx-auto container align-items-center text-center justify-content-center col-12 col-md-6 col-xl-3">
        <div class="card__body text-center">
            <img class="card__img" src=${p.Image} alt="">
            <p class="card__desc">${p.nombre}
            <ul><li>\$${p.precio}</li></ul>
            </p>
            <button class="card__btn badge text-wrap" style="width: 7rem;" id="contenedor-${p.id}"></button>
        </div>
        </div>
    </div>`;

        const buttonAgregar = document.createElement("button");
        buttonAgregar.classList.add("btn");
        buttonAgregar.innerText = "Agregar Donación";



        buttonAgregar.addEventListener("click", () => {
            carrito.push(p);
            donacionesTotal += p.precio
            donaciones.innerHTML= `Total \$${donacionesTotal}
            `
            localStorage.setItem("carrito", JSON.stringify(carrito));
            modal.innerHTML = `<table class="table" id="tabla-carrito"><tr><th>Nombre</th><th>Precio</th><th>Acción</th></tr></table>`
            table = document.querySelector("#tabla-carrito")
            i = 0

            carrito.forEach(c => {
                
                const buttonSacar =  document.createElement("button");
                buttonSacar.classList.add("btn");
                buttonSacar.classList.add("btn-danger")
                buttonSacar.innerText = `X`
                nombre = document.createElement("td")
                precio = document.createElement("td")
                borrar = document.createElement("td")
                nombre.innerHTML = c.nombre
                precio.innerHTML = `\$${c.precio}
                ` 
                
                buttonSacar.addEventListener("click", () => {
                    buttonSacar.parentNode.parentNode.removeChild(buttonSacar.parentNode)
                    carrito.pop(i)
                    localStorage.setItem("carrito", JSON.stringify(carrito));
                })
                    
                tableRow = document.createElement("tr")
                tableRow.appendChild(
                    nombre
                    )
                tableRow.appendChild(
                    precio
                )
                tableRow.appendChild(
                    buttonSacar
                )
                
                
                table.appendChild(tableRow)
                
                i++
            })
        
            
        });


        contenedor.append(div);
        const contenedorID = document.querySelector("#contenedor-" + p.id);
        contenedorID.appendChild(buttonAgregar);
    });

})