const JSON_DATOSSERIES = localStorage.getItem("datosSeriesStorage"); 
const ARRAY_SERIES = JSON.parse(JSON_DATOSSERIES); 

function devolverSeriesAlHome(sectionParametro, arrayParametro){
    for (let serie of arrayParametro) {
        let nodo_div = document.createElement("div");
        let nodo_img = document.createElement("img");
        nodo_img.src = serie.imagen;
        let nodo_a = document.createElement("a");
        nodo_a.href = `../pages/vista-detalles.html?nombre=${serie.nombreSerie}&tipo=serie`;
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
function filtrarPorBuscador() {
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

 function filtrarPorCategoria() {
    let categoriaSeleccionada = document.querySelector('#categorias').selectedOptions[0].textContent;
    console.log(categoriaSeleccionada);

    let ARRAY_SERIES_FILTRADAS = [];

    for(series of ARRAY_SERIES){
        if(categoriaSeleccionada == series.genero){
            ARRAY_SERIES_FILTRADAS.push(series);
        }
    }

    // Mostrar series filtradas en el listado de series
    let sectionPrincipalConSeries = document.querySelector("#listadoSeries");
    sectionPrincipalConSeries.innerHTML = '';
    sectionPrincipalConSeries = document.querySelector("#listadoSeries");
    if (ARRAY_SERIES_FILTRADAS.length > 0) {
        devolverSeriesAlHome(sectionPrincipalConSeries, ARRAY_SERIES_FILTRADAS);
    } else {
        let mensajeSeriesNoEncontradas = document.createElement("h3");
        mensajeSeriesNoEncontradas.textContent = "No se encontraron series con ese criterio de búsqueda.";
        sectionPrincipalConSeries.appendChild(mensajeSeriesNoEncontradas);
    }

    if(categoriaSeleccionada == "Lo nuevo"){
        sectionPrincipalConSeries.innerHTML = '';
        devolverSeriesAlHome(sectionPrincipalConSeries, ARRAY_SERIES);
    }

}

function filtrarPorTemporada(){
    let cantidadSeleccionada = document.querySelector('#temporadas').selectedOptions[0].textContent;

    let ARRAY_SERIES_FILTRADAS = [];

    for(series of ARRAY_SERIES){
        if(cantidadSeleccionada == "Una"){
            if(series.temporadas.length == 1){
                ARRAY_SERIES_FILTRADAS.push(series);
            }   
        }else if(cantidadSeleccionada == "Hasta tres"){
            if(series.temporadas.length <= 3){
                ARRAY_SERIES_FILTRADAS.push(series);
            }   
        }else if(cantidadSeleccionada == "Tres o más"){
        if(series.temporadas.length >= 3){
            ARRAY_SERIES_FILTRADAS.push(series);
            }   
        }else{
            ARRAY_SERIES_FILTRADAS = ARRAY_SERIES;
        }
    }

    // Mostrar series filtradas en el listado de series
    let sectionPrincipalConSeries = document.querySelector("#listadoSeries");
    sectionPrincipalConSeries.innerHTML = '';
    sectionPrincipalConSeries = document.querySelector("#listadoSeries");
    if (ARRAY_SERIES_FILTRADAS.length > 0) {
        devolverSeriesAlHome(sectionPrincipalConSeries, ARRAY_SERIES_FILTRADAS);
    } else {
        let mensajeSeriesNoEncontradas = document.createElement("h3");
        mensajeSeriesNoEncontradas.textContent = "No se encontraron series con ese criterio de búsqueda.";
        sectionPrincipalConSeries.appendChild(mensajeSeriesNoEncontradas);
    }
 }


 let sectionPrincipalConSeries = document.querySelector("#listadoSeries");

 devolverSeriesAlHome(sectionPrincipalConSeries, ARRAY_SERIES);
 agregarCategorias();
 document.getElementById('buscador').addEventListener('input', filtrarPorBuscador);    
 document.getElementById('categorias').addEventListener('change',filtrarPorCategoria);
 document.getElementById('temporadas').addEventListener('change',filtrarPorTemporada);
