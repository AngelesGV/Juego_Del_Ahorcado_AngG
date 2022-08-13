let botonSonido = document.querySelector(".btn-volumen");
var on = document.querySelector(".icon-volumen-on")
var off = document.querySelector(".icon-volumen-off")
var au = document.querySelector("#musica-fondo");
const barra_volumen = document.querySelector('.boton-volumen');
var musica = localStorage.getItem('musica');
const audio_ganar = document.querySelector('#musica-ganar');
const audio_perder = document.querySelector('#musica-perder');

/*determina si el valor de musica esta vacio y asigna un valor si lo esta*/
if(musica == null){
    musica = false;
    localStorage.setItem('musica', musica);
}

/*Al cargar las paginas evalua el estado del sonido con la función EstadoMusica */
window.addEventListener("load", EstadoMusica);

/*Al darle al boton de sonido, activa o desactiva el audio, y manda el estado al localStorage*/
botonSonido.addEventListener("click", () => {    

    if(musica==false){
        au.pause();
        on.style.display = "none";
        off.style.display = "flex";
        musica=true;
        localStorage.setItem('musica', musica);
        audio_ganar.volume = 0;
        audio_perder.volume = 0;
        
        
    }else{
        au.play();
        on.style.display = "flex";
        off.style.display = "none";
        musica=false;
        localStorage.setItem('musica', musica);
        audio_ganar.volume = 0.5;
        audio_perder.volume = 0.5;
    }

})

/*Rescata del LocalStorage el estado del audio y lo actualiza*/
function EstadoMusica(){
    console.log(musica);

    if(musica == 'true'){
        au.pause();
        on.style.display = "none";
        off.style.display = "flex";
        audio_ganar.volume = 0;
        audio_perder.volume = 0;
    }else{
        au.play();
        on.style.display = "flex";
        off.style.display = "none";
        audio_ganar.volume = 0.5;
        audio_perder.volume = 0.5;
    }
}

/*Segun lo que se ponga en la barra de volumen el cambia el estado del mismo a la musica de fondo */
barra_volumen.addEventListener("change",function(ev){
    au.volume = ev.currentTarget.value;
    if(au.volume == 0){
        on.style.display = "none";
        off.style.display = "flex";
    }else{
        on.style.display = "flex";
        off.style.display = "none"; 
    }
},true);

/*Decoracion Barra*/
const min = barra_volumen.min
const max = barra_volumen.max
const value = barra_volumen.value

barra_volumen.style.background = `linear-gradient(to right, #3e0b03 0%, #3e0b03 ${(value-min)/(max-min)*100}%, #DEE2E6 ${(value-min)/(max-min)*100}%, #DEE2E6 100%)`

barra_volumen.oninput = function() {
  this.style.background = `linear-gradient(to right, #3e0b03 0%, #3e0b03 ${(this.value-this.min)/(this.max-this.min)*100}%, #DEE2E6 ${(this.value-this.min)/(this.max-this.min)*100}%, #DEE2E6 100%)`
}; 