const ARRAY_PELICULAS = JSON.parse(localStorage.getItem("datosPeliculasStorage")); //Me paso el array de datos.js que lo envie al localStorage en formato string y lo parseo a formato ARRAY nuevamnete

function agregarPeliculas(){
        let sectionListadoPeliculas = document.querySelector("#listadoSeriesPeliculas")
        
        for (let pelicula of ARRAY_PELICULAS) {
            let nodo_div = document.createElement("div");
            let nodo_img = document.createElement("img");
            nodo_img.src = pelicula.imagen;
            let nodo_a = document.createElement("a");
            nodo_a.href = `../pages/borrador-detalle-pelicula.html?nombre=${pelicula.nombrePelicula}`;
            nodo_a.target ="_blank";
            
            nodo_a.appendChild(nodo_img);
            nodo_div.appendChild(nodo_a)
            sectionListadoPeliculas.appendChild(nodo_div)
        
        }
    }
    agregarPeliculas();