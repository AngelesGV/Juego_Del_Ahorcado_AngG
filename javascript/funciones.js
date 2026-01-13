import {ActualizarAlmacenamiento} from "./RecargarPalabras.js";
var palabra_Facil = JSON.parse(localStorage.getItem('palabrasFaciles'));
var palabra_Medio = JSON.parse(localStorage.getItem('palabrasMedias'));
var palabra_Dificil = JSON.parse(localStorage.getItem('palabrasDificiles'));
var letrasPulsadas = [];

/*Variables de Canva y Teclado*/
const btnJuego = conseguirId('btn-juego-nuevo');
const elemtCanva = conseguirId('intentos');
const teclas_letras = document.querySelectorAll('#teclado .tecla');
const parrafoLetrasInco = conseguirId('letras-incorrectas');


/*Variables de Mensajes Fin Juego */
const cuerpo_mensaje_ganar = conseguirId('mensaje-ganar');
const cuerpo_mensaje_perder = conseguirId('mensaje-perder');
const cuerpo_mensaje_error = conseguirId('mensaje-error');
const btnMensajeGanar = conseguirId('btn-cerrar-ganar');
const btnMensajePerder = conseguirId('btn-cerrar-perder');
const TextMensajeGanar = conseguirId('mensaje-ganaste');
const TextMensajePerder = conseguirId('mensaje-perdiste')
const audio_ganar = document.querySelector('#musica-ganar');
const audio_perder = document.querySelector('#musica-perder');


/*Variables Globales */
var LetrasIncorrectas = '';
var palabraSecreta = '';
let cantErrores = 0;
let cantAciertos = 0;
let finDelJuego = 'No';

/*Trae los datos del almacenamiento para las palabras*/
ActualizarAlmacenamiento(palabra_Facil, palabra_Medio, palabra_Dificil);

/*Cada vez que la pantalla entra, empieza un juego nuevo*/
window.addEventListener("load", juegoNuevo);

/*Permite que la persona vuelva a jugar*/
if(btnJuego){
    btnJuego.addEventListener('click', juegoNuevo);
}

/*Escucha cada letra y le asigna la funcion presionarTeclas */
for(let i = 0; i < teclas_letras.length; i++){
    teclas_letras[i].addEventListener('click', clickTeclas);
}

/*getElementId reducido */
export function conseguirId(str){
    return document.getElementById(str);
}

/*Inicia las funciones y guarda la palabra secreta*/
function juegoNuevo(event){
    palabraSecreta = Resetear();
}

/*Selecciona del Arrya de palabras una de ellas*/
function ElegirPalabraSecreta(){
    var Dificultad = localStorage.getItem('ElementoActivo');
    var palabra = '';

    if(Dificultad == 'Facil'){
        palabra = palabra_Facil[Math.floor(Math.random()*palabra_Facil.length)];
    }else if(Dificultad == 'Difícil'){
        palabra = palabra_Dificil[Math.floor(Math.random()*palabra_Dificil.length)];
    }else{
        palabra = palabra_Medio[Math.floor(Math.random()*palabra_Medio.length)];
    }

    return palabra;
}

/*Inicializa la partidad desde cero y las lineas*/
function Resetear(){
    letrasPulsadas = [];
    finDelJuego = 'No'
    const parrafo = conseguirId('palabra-secreta');
    var palabraSecreta = ElegirPalabraSecreta();
    var cant_letra = palabraSecreta.length;

    /*Reiniciar */
    LetrasIncorrectas = '';
    parrafoLetrasInco.textContent = LetrasIncorrectas;
    cantErrores = 0;
    cantAciertos = 0;
    elemtCanva.src = `./imagenes/canva/intento0.png` ; 
    btnJuego.disabled = true;
    parrafo.innerHTML = '';

    /*Activar y desactivar teclas*/
    for(let i = 0; i < teclas_letras.length; i++){
        teclas_letras[i].disabled = false;

        if(teclas_letras[i].classList == 'tecla-active'){
            teclas_letras[i].classList.remove('tecla-active');
            teclas_letras[i].classList.add('tecla');
        } 
    }

    /*Crear Lineas */
    for(let i=0; i< cant_letra; i++){
        const crearLinea = document.createElement('span');
        parrafo.appendChild(crearLinea);
    }

    return palabraSecreta;

}

/*Funcion de Teclado Virtual y Respuesta*/
function clickTeclas(event){
    const lineas = document.querySelectorAll('#palabra-secreta span');
    const tecla = event.target;
    const letra = tecla.innerHTML.toUpperCase();

    /*Da el css activo a la tecla que tuvo click */
    tecla.disabled = true;
    tecla.classList.remove('tecla');
    tecla.classList.add('tecla-active');
    Juego(lineas,letra);
}

/*Función que detecta las teclas seleccionadas fisicamente desde el computador del usuario, tambien devuelve un error si no es letra*/
document.addEventListener('keydown', (event) => {
    const lineas = document.querySelectorAll('#palabra-secreta span');
    const audio_error = document.querySelector('#musica-error');
    var codigo = event.keyCode;
    var tecla = event.key;

    /*Comprueba que el juego no este finalizado y asi seguir detectando teclas */
    if(finDelJuego == 'Si'){
        tecla = '';
        return
    }

    /*Se valida que sean letras las teclas precionadas */
   if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo == 192)){
        tecla = tecla.toUpperCase();
        for(let l = 0; l < letrasPulsadas.length; l++){
            if(tecla == letrasPulsadas[l]){
                return

            }
        }

        letrasPulsadas.push(tecla);
        console.log(letrasPulsadas);

        /*Se le activa el css en teclado virtual para que visualmente si el usuario quiere, sepa que letras lleva*/
        for(let i = 0; i < teclas_letras.length; i++){
            if(teclas_letras[i].textContent == tecla){
                teclas_letras[i].disabled = true;
                teclas_letras[i].classList.remove('tecla');
                teclas_letras[i].classList.add('tecla-active');
            }
        }
   }else{
        /*En caso de no ser una letra manda el mensaje de error */
        audio_error.play();
        cuerpo_mensaje_error.style.display = 'flex';
        setTimeout(function(){
            cuerpo_mensaje_error.style.display = 'none';
            audio_error.pause();
            audio_error.currentTime = 0;
        },2000);

        return
   }

   /*Llama a la función que hace todo el proceso de visualizar letras y que devuelve los valores cuando el juego termina */
   Juego(lineas, tecla);

    console.log("Tecla: " + tecla );
    console.log("N: " + codigo );



}, false);


/*Función Principal: Aqui se ingresan las letras y se muestran, tambien cuando la persona tuvo todos sus intentos finaliza el juego
y manda los respectivos mensajes de ganar o perder*/
function Juego(lineas, letra){
    var palabraAValidar = palabraSecreta;
    var acerto = false;

    /*Muestra la letra en el span si coincide con alguna letra de la palabra secreta*/
    for(let i = 0; i < palabraAValidar.length; i++){
        if(letra == palabraAValidar[i]){
            lineas[i].innerHTML = letra;
            cantAciertos++;
            acerto = true;
        }
    }

    /*Cambia la imagen dependiendo de si acierta o no*/
    if(acerto == false){
        cantErrores++;
        const cambioImagen = `/imagenes/canva/intento${cantErrores}.png`
        console.log( elemtCanva.src(`./imagenes/canva/intento${cantErrores}.png`));
        console.log(cambioImagen);
        elemtCanva.src = cambioImagen; 
        console.log(cambioImagen);
        LetrasIncorrectas = LetrasIncorrectas +  ' ' + letra;
        parrafoLetrasInco.textContent = LetrasIncorrectas;
    }


    /*Da mensaje y llama a la funcion que habilita o desabilita los botones de letras y juego nuevo*/
    if(cantErrores == 6){
        for(let i = 0; i < palabraAValidar.length; i++){
            lineas[i].innerHTML = palabraAValidar[i];
        }
        audio_perder.play();
        var Mensaje_Perder = 'Game Over. La palabra era: ' + palabraAValidar.toLowerCase();
        TextMensajePerder.textContent = Mensaje_Perder;
        cuerpo_mensaje_perder.style.display = "flex";
        finDelJuego = 'Si'
        reinicioJuego();

    }else if(cantAciertos == palabraSecreta.length){
        audio_ganar.play();
        var Mensaje_Ganar = '¡¡Felicidades Ganaste!!. La palabra era: ' + palabraAValidar.toLowerCase();
        TextMensajeGanar.textContent = Mensaje_Ganar;
        cuerpo_mensaje_ganar.style.display = "flex";
        finDelJuego = 'Si'
        reinicioJuego();

    }

    console.log(acerto)

}


/*Funcion que habilita o desabilita los botones de letras y juego nuevo*/
function reinicioJuego(){
    for(let i = 0; i < teclas_letras.length; i++){
        teclas_letras[i].disabled = true;
    }
    btnJuego.disabled = false;
}


/*Cerrar mensajes de alerta*/
btnMensajePerder.addEventListener('click', () =>{
    audio_perder.pause();
    audio_perder.currentTime = 0;
    cuerpo_mensaje_perder.style.display = "none";
});

btnMensajeGanar.addEventListener('click', () =>{
    cuerpo_mensaje_ganar.style.display = "none";
    audio_ganar.pause();
    audio_ganar.currentTime = 0;
});
