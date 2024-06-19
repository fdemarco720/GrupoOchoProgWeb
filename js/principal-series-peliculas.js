const JSON_DATOSPELICULAS = localStorage.getItem("datosPeliculasStorage"); //Me paso el array de datos.js que lo envie al localStorage
const ARRAY_PELICULAS = JSON.parse(JSON_DATOSPELICULAS); // lo parseo a formato ARRAY nuevamnete ya que esta en String

//FUNCION PARA QUE SE AGREGUEN PELICULAS A LA VISTA PRINCIPAL -DEBO PASARLE EL SECTION DONDE CARGARSE y EL aRRay Que va a mostrar
function devolverPeliculasAlHome(sectionParametro, arrayParametro){
    for (let pelicula of arrayParametro) {
        let nodo_div = document.createElement("div");
        let nodo_img = document.createElement("img");
        nodo_img.src = pelicula.imagen;
        let nodo_a = document.createElement("a");
        nodo_a.href = `../pages/borrador-detalle-pelicula.html?nombre=${pelicula.nombrePelicula}`;
        nodo_a.target ="_blank";
        
        nodo_a.appendChild(nodo_img);
        nodo_div.appendChild(nodo_a)
        sectionParametro.appendChild(nodo_div)
    
    }
}

let sectionPrincipalConPeliculas = document.querySelector("#listadoSeriesPeliculas");
devolverPeliculasAlHome(sectionPrincipalConPeliculas, ARRAY_PELICULAS);


//FUNCION PARA QUE EL BUSCADOR FILTRE
function filtrarPeliculas() {
        let textoBuscado = document.querySelector('#buscador').value.toLowerCase(); //Valor que le pase por el input
        let sectionPrincipalConPeliculas = document.querySelector("#listadoSeriesPeliculas");
        sectionPrincipalConPeliculas.innerHTML = ''; //Vacio el section con innerHTML = ""; que previamente lo cargue con todas las peliculas;
    
        const ARRAY_PELICULAS_FILTRADAS = [];
        for (let pelicula of ARRAY_PELICULAS) {
            if (pelicula.nombrePelicula.toLowerCase().includes(textoBuscado.toLowerCase())) {
                ARRAY_PELICULAS_FILTRADAS.push(pelicula);
            }
        }
        
           // Si no se encuentran resultados, se muestra un mensaje
           if (ARRAY_PELICULAS_FILTRADAS.length === 0) {
            let mensajePeliculasNoEncontradas = document.createElement("h3");
            mensajePeliculasNoEncontradas.textContent = "No se encontraron películas con ese criterio de búsqueda.";
            sectionPrincipalConPeliculas.appendChild(mensajePeliculasNoEncontradas);
        }else{
            devolverPeliculasAlHome(sectionPrincipalConPeliculas, ARRAY_PELICULAS_FILTRADAS);
        }
}

document.getElementById('buscador').addEventListener('input', filtrarPeliculas);
    
function agregarCategorias(){
    let categoriasHome = document.querySelector("#categorias");

    for (let pelicula of ARRAY_PELICULAS) {
        let i=1;
        let nodo_option = document.createElement("option");
        nodo_option.value = i;
        nodo_option.textContent = pelicula.genero;
        categoriasHome.appendChild(nodo_option);
        i++;
    }
}

agregarCategorias();
