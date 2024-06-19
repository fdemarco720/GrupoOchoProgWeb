
const coco = {nombrePelicula: "Coco", duracion: 120, imagen: "../img/coco.jpeg", genero: "Dibujos animados", iframe: "https://www.youtube.com/embed/gYApro2YXQQ?si=ZcZX3-yh4a9gaR51",
    sinopsis: "Coco es una película animada de Pixar lanzada en 2017 que cuenta la historia un niño mexicano de 12 años con el sueño de convertirse en músico. En el Día de los Muertos, se encuentra en la Tierra de los Muertos, donde se conoce a sus ancestros y descubre secretos familiares. Con la ayuda de un encantador y travieso, se embarca en un viaje para desbloquear historia familiar y ganar la bendición de su familia para seguir su pasión por la música."
 };
    
const toyStory4 = {nombrePelicula: "Toy Story 4", duracion: 150, imagen: "../img/toystory4.webp", genero: "Dibujos animados", sinopsis: "Toy Story es una película animada que sigue la historia de un grupo de juguetes que cobran vida cuando los humanos no están presentes. El vaquero Woody, el juguete favorito de Andy, se ve amenazado por la llegada de Buzz Lightyear, un moderno y popular juguete espacial. La rivalidad entre ambos lleva a una serie de aventuras y situaciones mientras intentan regresar a casa después de quedar atrapados fuera de ella."
     };

const messi = {nombrePelicula: "Messi", duracion: 120, imagen: "../img/messi.jpg", genero: "Dibujos animados",sinopsis: "COMPLETAR" //COMPLETAR 
    };
 
const laDamaYElVagaundo = {nombrePelicula: "La dama y el vagabundo", duracion: 120, imagen: "../img/LaDamaYElVagabundo.jpg", genero: "Dibujos animados", sinopsis: "COMPLETAR" //COMPLETAR
         };
    
const toystory2 =  {nombrePelicula: "Toy Story 2",  duracion: 120, imagen: "../img/toystory2.webp", genero: "Dibujos animados",  sinopsis: "COMPLETAR" //COMPLETAR
         };
         
const valiente  = {nombrePelicula: "Valiente", duracion: 120, imagen: "../img/valiente.jpg", genero: "Dibujos animados", sinopsis: "COMPLETAR" //COMPLETAR
         };
         
const losIncreibles = {nombrePelicula: "Los increibles", duracion: 120, imagen: "../img/losIncreibles.jpg", genero: "Dibujos animados", sinopsis: "COMPLETAR" //COMPLETAR
        };
         
const enredados =  {nombrePelicula: "Enredados", duracion: 120, imagen: "../img/enredados.jpg", genero: "Dibujos animados", sinopsis: "COMPLETAR" //COMPLETAR
         };
         
const mulan = {nombrePelicula: "Mulan", duracion: 120, imagen: "../img/mulan.png", genero: "Dibujos animados", sinopsis: "COMPLETAR" //COMPLETAR
         };

const wish =  {nombrePelicula: "Wish", duracion: 120, imagen: "../img/wish.jpg", genero: "Dibujos animados", sinopsis: "COMPLETAR" //COMPLETAR
         };

const PELICULAS = [coco, wish, mulan, enredados, losIncreibles, valiente, toyStory4, toystory2, messi, laDamaYElVagaundo ];

if(localStorage.getItem("datosPeliculasStorage")==null){ //hago una verificacion para cargar todos los datos en el localStorage una sola vez y no siempre que se actuliece con f5 el navegador

localStorage.setItem("datosPeliculasStorage",JSON.stringify(PELICULAS)); // con json.stringify guardo el objeto como string xq el local storage solo permite string

        }
       
        // SERIES
const treceRazones = {nombrePelicula: "trece razones", duracion: 120, imagen: "../img/13razones.jpg", genero: "Drama",sinopsis: "COMPLETAR" //COMPLETAR 
        };

const bebeReno = {nombrePelicula: "bebe reno", duracion: 120, imagen: "../img/bebereno.jpg", genero: "Drama",sinopsis: "COMPLETAR" //COMPLETAR 
        };

        const strangerThings = {nombrePelicula: "stranger things", duracion: 120, imagen: "../img/series/stranger.jpg", genero: "Suspenso",sinopsis: "COMPLETAR" //COMPLETAR 
        };

        const dark = {nombrePelicula: "dark", duracion: 120, imagen: "../img/series/dark.jpg", genero: "Suspenso",sinopsis: "COMPLETAR" //COMPLETAR 
        };

const SERIES = [treceRazones, bebeReno, strangerThings, dark];

if(localStorage.getItem("datosSeriesStorage")==null){

    localStorage.setItem("datosSeriesStorage",JSON.stringify(SERIES)); 
}


