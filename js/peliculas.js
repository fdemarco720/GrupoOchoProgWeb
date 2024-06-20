const JSON_DATOSPELICULAS = localStorage.getItem("datosPeliculasStorage"); //Me paso el array de datos.js que lo envie al localStorage
const ARRAY_PELICULAS = JSON.parse(JSON_DATOSPELICULAS); // lo parseo a formato ARRAY nuevamnete ya que esta en String



//FUNCION PARA QUE SE AGREGUEN PELICULAS A LA VISTA PRINCIPAL -DEBO PASARLE EL SECTION DONDE CARGARSE y EL aRRay Que va a mostrar
function devolverPeliculasAlHome(sectionParametro, arrayParametro){
    for (let pelicula of arrayParametro) {
        let nodo_div = document.createElement("div");
        let nodo_img = document.createElement("img");
        nodo_img.src = pelicula.imagen;
        let nodo_a = document.createElement("a");
        nodo_a.href = `../pages/detalle-pelicula.html?nombre=${pelicula.nombrePelicula}&tipo=pelicula`;
        nodo_a.target ="_blank";
        
        nodo_a.appendChild(nodo_img);
        nodo_div.appendChild(nodo_a)
        sectionParametro.appendChild(nodo_div)
    
    }
}

//AGREGAR CATEGORIAS AL SELECT
function agregarCategoriasSeriesYPeliculas(){
    let categoriasHome = document.querySelector("#categorias");
    let i=1;
    let generosAgregados = []; // Array para almacenar los géneros que ya han sido agregados

    for (let categorias of ARRAY_PELICULAS) {
    if (!generosAgregados.includes(categorias.genero)) {
        let nodo_option = document.createElement("option");
        nodo_option.value = i;
        nodo_option.textContent = categorias.genero;
        categoriasHome.appendChild(nodo_option);
        generosAgregados.push(categorias.genero); 
        i++;
    }
}
}

//FUNCION PARA QUE EL BUSCADOR FILTRE PELICULAS
function filtrarPeliculas() {
let textoBuscado = document.querySelector('#buscador').value.toLowerCase(); //Valor que le pase por el input
let sectionPrincipalConPeliculas = document.querySelector("#listadoPeliculas");
sectionPrincipalConPeliculas.innerHTML = ''; //Vacio el section con innerHTML = ""; que previamente lo cargue con todas las peliculas;

const ARRAY_PELICULAS_FILTRADAS = [];
for (let pelicula of ARRAY_PELICULAS) {
if (pelicula.nombrePelicula.toLowerCase().includes(textoBuscado.toLowerCase())) {
ARRAY_PELICULAS_FILTRADAS.push(pelicula);
   }
}
    
//Si no se encuentran resultados, se muestra un mensaje
if (ARRAY_PELICULAS_FILTRADAS.length === 0) {
let mensajePeliculasNoEncontradas = document.createElement("h3");
mensajePeliculasNoEncontradas.textContent = "No se encontraron películas con ese criterio de búsqueda.";
sectionPrincipalConPeliculas.appendChild(mensajePeliculasNoEncontradas);
}else{
    devolverPeliculasAlHome(sectionPrincipalConPeliculas, ARRAY_PELICULAS_FILTRADAS);
     }
 }

 let sectionPrincipalConPeliculas = document.querySelector("#listadoPeliculas");
 devolverPeliculasAlHome(sectionPrincipalConPeliculas, ARRAY_PELICULAS);
 
 agregarCategoriasSeriesYPeliculas();
 document.querySelector('#buscador').addEventListener('input', filtrarPeliculas);    
