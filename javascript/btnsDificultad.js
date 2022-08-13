const btnDificultadFacil = document.getElementById('btn-facil');
const btnDificultadMedio = document.getElementById('btn-medio');
const btnDificultadDificil = document.getElementById('btn-dificil');
var Estado = '';

/*Cada vez que recarga la ventana trae la funcion actualizar botones */
window.addEventListener("load", ActualizarBotones);

/*Al dar click al boton dificultad facil, se actualiza visualmente (funcion 1) y el el localStorage (función 2) */
btnDificultadFacil.addEventListener('click', () => {
    ActivacionDeBotones(btnDificultadFacil,btnDificultadMedio,btnDificultadDificil);
    GuardarEstado(btnDificultadFacil);
})

/*Al dar click al boton dificultad media, se actualiza visualmente (funcion 1) y el el localStorage (función 2) */
btnDificultadMedio.addEventListener('click', () => {

    ActivacionDeBotones(btnDificultadMedio, btnDificultadFacil, btnDificultadDificil);
    GuardarEstado(btnDificultadMedio);
})

/*Al dar click al boton dificultad Dificil, se actualiza visualmente (funcion 1) y el el localStorage (función 2) */
btnDificultadDificil.addEventListener('click', () => {

    ActivacionDeBotones(btnDificultadDificil, btnDificultadFacil, btnDificultadMedio);
    GuardarEstado(btnDificultadDificil);
})


/*Le cambia la clase y el css a los botones de dificultad según el que este seleccionado*/
function ActivacionDeBotones(btnActivo, btnDesactivadoUno, btnDesactivadoDos){
    btnActivo.classList.remove('dificultad-bto');
    btnActivo.classList.add('dificultad-bto-active');

    if(btnDesactivadoUno.classList == 'dificultad-bto-active'){
        btnDesactivadoUno.classList.remove('dificultad-bto-active');
        btnDesactivadoUno.classList.add('dificultad-bto');
    }
    
    if(btnDesactivadoDos.classList == 'dificultad-bto-active'){
        btnDesactivadoDos.classList.remove('dificultad-bto-active');
        btnDesactivadoDos.classList.add('dificultad-bto');
    }
}

/*Guarda el valor o nombre actual del boton de dificultad que este activo, es decir, si esta activo Facil, Difícil o Medio*/
function GuardarEstado(btn){
    let Dificultad = btn.value;
    localStorage.removeItem('ElementoActivo');
    Estado = localStorage.setItem('ElementoActivo', Dificultad);
    console.log(Estado);
}

/*Actualiza los botones segun la información que tiene el localStorage para que asi, en las distintas ventanas, este siga 
siendo el mismo que tuvo en la anterior, al menos que el usuario lo cambie*/
function ActualizarBotones(){
    Estado = localStorage.getItem('ElementoActivo');
    console.log(Estado)

    if(Estado == 'Facil'){
        ActivacionDeBotones(btnDificultadFacil, btnDificultadMedio, btnDificultadDificil);

    }else if(Estado == 'Difícil'){
        ActivacionDeBotones(btnDificultadDificil, btnDificultadFacil, btnDificultadMedio);

    }else{
        ActivacionDeBotones(btnDificultadMedio, btnDificultadDificil, btnDificultadFacil);

    }
}