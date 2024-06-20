const JSON_DATOSSERIES = localStorage.getItem("datosSeriesStorage"); 
const ARRAY_SERIES = JSON.parse(JSON_DATOSSERIES); 

function devolverSeriesAlHome(sectionParametro, arrayParametro){
    for (let serie of arrayParametro) {
        let nodo_div = document.createElement("div");
        let nodo_img = document.createElement("img");
        nodo_img.src = serie.imagen;
        let nodo_a = document.createElement("a");
        nodo_a.href = `../pages/detalle-pelicula.html?nombre=${serie.nombreSerie}&tipo=serie`;
        nodo_a.target ="_blank";
        
        nodo_a.appendChild(nodo_img);
        nodo_div.appendChild(nodo_a)
        sectionParametro.appendChild(nodo_div)
    
    }
}

//AGREGAR CATEGORIAS AL SELECT
function agregarCategorias(){
    let categoriasHome = document.querySelector("#categorias");
    let i=1;
    let generosAgregados = []; // Array para almacenar los géneros que ya han sido agregados

    for (let categorias of ARRAY_SERIES) {
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

 //FUNCION PARA QUE EL BUSCADOR FILTRE SERIES
function filtrarSeries() {
    let textoBuscado = document.querySelector('#buscador').value.toLowerCase();
    let sectionPrincipalConSeries = document.querySelector("#listadoSeries");
    sectionPrincipalConSeries.innerHTML = '';
    
    
    const ARRAY_SERIES_FILTRADAS = [];
    for (let serie of ARRAY_SERIES) {
    if (serie.nombreSerie.toLowerCase().includes(textoBuscado.toLowerCase())) {
    ARRAY_SERIES_FILTRADAS.push(serie);
       }
    }
        
    if (ARRAY_SERIES_FILTRADAS.length === 0) {
    let mensajeSeriesNoEncontradas = document.createElement("h3");
    mensajeSeriesNoEncontradas.textContent = "No se encontraron series con ese criterio de búsqueda.";
    sectionPrincipalConSeries.appendChild(mensajeSeriesNoEncontradas);
    }else{
        devolverSeriesAlHome(sectionPrincipalConSeries, ARRAY_SERIES_FILTRADAS);
         }
 }

 let sectionPrincipalConSeries = document.querySelector("#listadoSeries");

 devolverSeriesAlHome(sectionPrincipalConSeries, ARRAY_SERIES);
 agregarCategorias();
 document.getElementById('buscador').addEventListener('input', filtrarSeries);    
