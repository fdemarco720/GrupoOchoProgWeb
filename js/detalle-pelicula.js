 let arrayPeliculas= [
{nombrePelicula: "Coco",
duracion: 120,
genero: "dibujos animados",
sinopsis: "Coco es una película animada de Pixar lanzada en 2017 que cuenta la historia un niño mexicano de 12 años con el sueño de convertirse en músico. En el Día de los Muertos, se encuentra en la Tierra de los Muertos, donde se conoce a sus ancestros y descubre secretos familiares. Con la ayuda de un encantador y travieso, se embarca en un viaje para desbloquear historia familiar y ganar la bendición de su familia para seguir su pasión por la música."
},

{nombrePelicula: "Toy Story",
duracion: 150,
genero: "dibujos animados",
sinopsis: "Toy Story es una película animada que sigue la historia de un grupo de juguetes que cobran vida cuando los humanos no están presentes. El vaquero Woody, el juguete favorito de Andy, se ve amenazado por la llegada de Buzz Lightyear, un moderno y popular juguete espacial. La rivalidad entre ambos lleva a una serie de aventuras y situaciones mientras intentan regresar a casa después de quedar atrapados fuera de ella."
 }
]

 // Esperar a que el DOM esté completamente cargado

  document.addEventListener("DOMContentLoaded", function() {
    
       let listadoPeliculas = document.querySelectorAll("#pelicula_lista img"); //Selecciona todas las imagenes del section

        listadoPeliculas.forEach(function(img) {  // Iterar sobre cada imagen para agregar un evento de click
      
                img.addEventListener("click", function() { // Obtener el valor del atributo 'name' de la imagen clickeada
                
                let namePelicula = img.getAttribute("name");
        
                console.log("Se hizo clic en la imagen con nombre:", namePelicula);
      });
    });
});
