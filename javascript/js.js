//variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito=[];

cargarEventListeners();
function cargarEventListeners(){
    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso);
    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito = [];
        carritoHTML();
    })
}

function agregarCurso(e){
    e.preventDefault();
    if( e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        // console.log(cursoSeleccionado)
        console.log('Agregando al carrito...')
        // leerDatosCursos(curso);
        leerDatosCursos(cursoSeleccionado); 
    }
}

//Lee el contenido del HTML al que le dimos click y extrae la informacion del producto
function leerDatosCursos(curso){
    //console.log(curso);

    //crear un objecto con el contenido del producto actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('p').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un elemento ya existe en el carrito
    // const existe= articulosCarrito.some( curso => curso.id === infoCurso.id);
    if(articulosCarrito.some( curso => curso.id === infoCurso.id)){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if( curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        } )
        articulosCarrito = [...cursos];

    } else {
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    //console.log(infoCurso)
    //agrega elementos al arreglo de carrito
    //articulosCarrito=[...articulosCarrito, infoCurso]
    //console.log(articulosCarrito);
    carritoHTML();
    
}
function eliminarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('borrar')){
        const cursoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
        console.log(articulosCarrito);
        carritoHTML();
    }

}
//Muestra el carrito de compras en el HTML
function carritoHTML(){

    //Limpiar el HTML
    limpiarHTML()
    // Recorre el carrito y gener el HTML
    articulosCarrito.forEach( curso => {
        console.log(curso)
        // const{ imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML= `
            <td> <img src="${curso.imagen}" width=100> </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td>
                <a href="#" class="borrar" data-id="${curso.id}">X</a>
            </td>
            
        `;
        // AGREGA EL HTML DEL CARRITO AL TBODY
        contenedorCarrito.appendChild(row);
    })
}
//Elimina los cursos del tbody
function limpiarHTML(){
    //Forma lenta
    // contenedorCarrito.innerHTML= "";
    
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)

    }
}






