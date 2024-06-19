
const coco = {nombrePelicula: "Coco", duracion: 120, imagen: "../img/coco.jpeg", genero: "Dibujos animados", iframe: "https://www.youtube.com/embed/Fq_x-gGimtQ?si=hcY09gTFvWDC5HYk", linkVideo: "https://www.youtube.com/embed/Fq_x-gGimtQ?si=hcY09gTFvWDC5HYk",
    sinopsis: "Coco es una película animada de Pixar lanzada en 2017 que cuenta la historia un niño mexicano de 12 años con el sueño de convertirse en músico. En el Día de los Muertos, se encuentra en la Tierra de los Muertos, donde se conoce a sus ancestros y descubre secretos familiares. Con la ayuda de un encantador y travieso, se embarca en un viaje para desbloquear historia familiar y ganar la bendición de su familia para seguir su pasión por la música."
 };
    
const toyStory4 = {nombrePelicula: "Toy Story 4", duracion: 150, imagen: "../img/toystory4.webp", genero: "Dibujos animados", iframe: "https://youtu.be/Fq_x-gGimtQ?si=-dKACqzYONBfDhkd", linkVideo: "https://youtu.be/Fq_x-gGimtQ?si=-dKACqzYONBfDhkd", sinopsis: "Toy Story es una película animada que sigue la historia de un grupo de juguetes que cobran vida cuando los humanos no están presentes. El vaquero Woody, el juguete favorito de Andy, se ve amenazado por la llegada de Buzz Lightyear, un moderno y popular juguete espacial. La rivalidad entre ambos lleva a una serie de aventuras y situaciones mientras intentan regresar a casa después de quedar atrapados fuera de ella."
     };

const messi = {nombrePelicula: "Messi", duracion: 10, imagen: "../img/messi.jpg", genero: "Dibujos animados",
    iframe:"https://youtu.be/Fq_x-gGimtQ?si=ftGsfBBqLp-Ml_Ep", linkVideo: "https://youtu.be/nFnFf7ji_l4?si=tTEdCkWWgK9ABn5V", sinopsis: "Messi combina imágenes de archivo, entrevistas y filmaciones familiares inéditas, con la recreación de los momentos más importantes de la vida del protagonista. Álex de la Iglesia repara especialmente en la infancia y adolescencia del jugador argentino. Toda gran leyenda comienza con un pequeño sueño. En la película intervienen importantes figuras del mundo del fútbol como Johan Cruyff, César Luis Menotti, Jorge Valdano, Andrés Iniesta o Alejandro Sabella, entre muchos otros." 
    };
 
const laDamaYElVagaundo = {nombrePelicula: "La dama y el vagabundo", duracion: 120, imagen: "../img/LaDamaYElVagabundo.jpg", genero: "Dibujos animados", iframe:"https://www.youtube.com/watch?v=1ReKrWnm7nc", linkVideo: "https://www.youtube.com/watch?v=1ReKrWnm7nc" , sinopsis: "La Dama y el Vagabundo es el decimoquinto largometraje de animación del canon de largometrajes animados de Disney. Fue producido por Walt Disney para Walt Disney Productions, y se estrenó en cines el 16 de junio de 1955, siendo distribuido por Buena Vista Distribution, una nueva división de Disney que asumió los derechos de distribución de los productos del estudio en lugar de los antes poseedores de los derechos, RKO Radio Pictures." //COMPLETAR
         };
        
const toystory2 =  {nombrePelicula: "Toy Story 2",  duracion: 120, imagen: "../img/toystory2.webp", genero: "Dibujos animados",  sinopsis: "COMPLETAR" //COMPLETAR
         };
         
const valiente  = {nombrePelicula: "Valiente", duracion: 120, imagen: "../img/valiente.jpg", genero: "Dibujos animados", sinopsis: "COMPLETAR" //COMPLETAR
         };
         
const losIncreibles = {nombrePelicula: "Los increibles", duracion: 120, imagen: "../img/losIncreibles.jpg", genero: "Dibujos animados", sinopsis: "COMPLETAR" //COMPLETAR
        };
         
const enredados =  {nombrePelicula: "Enredados", duracion: 120, imagen: "../img/enredados.jpg", genero: "Dibujos animados", iframe:"https://youtu.be/Fq_x-gGimtQ?si=ftGsfBBqLp-Ml_Ep", linkVideo: " https://www.youtube.com/watch?v=zQL4bpAEROs", sinopsis: "Flynn rider, el más buscado y encantador bandido del reino, se esconde en una misteriosa torre y allí se encuentra con Rapunzel, una bella y avispada adolescente con una cabellera dorada de 21 metros de largo, que vive encerrada allí desde hace años. Ambos sellan un pacto, y a partir de ese momento la pareja vivirá emocionantes aventuras en compañía de un caballo superpolicía, un camaleón sobreprotector y una ruda pandilla de matones." //COMPLETAR
         };
         
const mulan = {nombrePelicula: "Mulan", duracion: 120, imagen: "../img/mulan.png", genero: "Dibujos animados", iframe:"https://youtu.be/Fq_x-gGimtQ?si=ftGsfBBqLp-Ml_Ep", linkVideo: "https://www.youtube.com/watch?v=rmCAg6RbkTE", sinopsis: "El ejército de los Hunos, encabezado por el malvado Shun Yiu, quiere conquistar China. El emperador, para impedírselo, ha mandado a filas a todos los varones con el fin de proteger el imperio. Por otra parte, Mulán es una chica joven y valiente que vive en una aldea. Su padre está enfermo pero a pesar de ello quiere luchar por su país. Mulán no lo va a consentir y se fugará de casa con la intención de hacerse pasar por un chico y combatir en lugar de su padre." //COMPLETAR
         };

const wish =  {nombrePelicula: "Wish", duracion: 120, imagen: "../img/wish.jpg", genero: "Dibujos animados", sinopsis: "COMPLETAR" //COMPLETAR
         };

const PELICULAS = [coco, toyStory4, wish, mulan, enredados, losIncreibles, valiente, toystory2, messi, laDamaYElVagaundo ];

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


