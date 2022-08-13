const boton_teclado = document.querySelector('.boton-teclado');
const boton_cerrar_menu = document.querySelector('.cuerpo-boton-cerrar');
const cuerpo_configuracion = document.querySelector('.negro-contenedor-menu-configuracion');
const boton_configuracion = document.querySelector('.btn-configuracion');

var cli_uno = true;

/*Boton teclado en configuración, hace que el teclado virtual aparezca o desaparesca*/
boton_teclado.addEventListener('click', () => {
    const Teclado = document.querySelector('#teclado');
    boton_teclado.classList.toggle('active');

    if(boton_teclado.classList.value == 'boton-teclado active'){
        Teclado.style.visibility = 'hidden';
    }else{
        Teclado.style.visibility = 'visible';
    }

})

/*Cierra el menu de configuracion en la x*/
boton_cerrar_menu.addEventListener('click',() => {
    cuerpo_configuracion.style.display = "none";
    cli_uno = true;
})

/*Cierra el y abre el menu de configuración con la tuerca*/
boton_configuracion.addEventListener('click', () => {

    if(cli_uno == true){
       cuerpo_configuracion.style.display = "flex"; 
       cli_uno = false;

    }else{
        cuerpo_configuracion.style.display = "none";
        cli_uno = true;
    }
    
})




