import {ActualizarAlmacenamiento} from "./RecargarPalabras.js";

const palabraNueva = document.getElementById('input-agregar-palabra');
const btnAgregar = document.getElementById('btn-agregar');
var palabra = '';
var grupoF = JSON.parse(localStorage.getItem('palabrasFaciles'));
var grupoM = JSON.parse(localStorage.getItem('palabrasMedias'));
var grupoD = JSON.parse(localStorage.getItem('palabrasDificiles'));


ActualizarAlmacenamiento(grupoF, grupoM, grupoD); 

/*Cada vez que se le da al boton agregar, emite la funcion agregar nueva palabra */
btnAgregar.addEventListener('click',
    agregarNuevaPalabra
);

/*Funcion agregarNueva palabra ingresa la palabra que indica el usuario y la agrega al localStorage dependiendo de su longitud*/
function agregarNuevaPalabra(evento){
    evento.preventDefault();
 
    console.log(grupoF);

    if(palabraNueva.value != ''){

        palabra = palabraNueva.value;
        palabra = palabra.toUpperCase();
        var ncaracteres = palabra.length;

        if(ncaracteres <= 4){

            grupoF.push(palabra);
            localStorage.setItem('palabrasFaciles', JSON.stringify(grupoF));

            var historial = JSON.parse(localStorage.getItem('palabrasFaciles'));
            console.log(historial);


        }else if ((ncaracteres > 4) && (ncaracteres <= 6)){
            grupoM.push(palabra);
            localStorage.setItem('palabrasMedias', JSON.stringify(grupoM));

            var historial = JSON.parse(localStorage.getItem('palabrasMedias'));
            console.log(historial);

        }else{
            grupoD.push(palabra);
            localStorage.setItem('palabrasDificiles', JSON.stringify(grupoD));

            var historial = JSON.parse(localStorage.getItem('palabrasDificiles'));
            console.log(historial);
            
        }

        palabraNueva.value = '';
        window.location.href='index.html';

    }else{
        alert("Error, debe ingresar una palabra antes. Solo se aceptan letras");
    }
}

