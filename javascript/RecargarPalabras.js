var palabraFacil = ['HTML', 'CSS', 'ONE', 'WEB', 'CASA', 'UVA', 'ROPA', 'CARRO', 'BAÑO', 'IMAN'];
var palabraMedio = ['ALURA', 'ORACLE', 'PYTHON','CURSO','ANGULO', 'ARETE', 'GRUPO', 'ACCION', 'ABRIGO', 'FELIZ'];
var palabraDificil = ['AHORCADO', 'JAVASCRIPT', 'ESTUDIANTE', 'PROFESOR', 'ACADEMIA', 'CALCULAR', 'CONCURSO', 'FICTICIO', 'LIBERTAD', 'NOVIAZGO'];

var grupoF = JSON.parse(localStorage.getItem('palabrasFaciles'));
var grupoM = JSON.parse(localStorage.getItem('palabrasMedias'));
var grupoD = JSON.parse(localStorage.getItem('palabrasDificiles'));

/*Aqui se obtiene los arrays de los grupos de palabras y a la vez se suben en el localStorage */
export function ActualizarAlmacenamiento(grupoF, grupoM, grupoD){

    grupoF = JSON.parse(localStorage.getItem('palabrasFaciles'));
    grupoM = JSON.parse(localStorage.getItem('palabrasMedias'));
    grupoD = JSON.parse(localStorage.getItem('palabrasDificiles'));

    if((grupoF == null) || (grupoM == null) || (grupoD == null)){
        grupoF = localStorage.setItem('palabrasFaciles', JSON.stringify(palabraFacil));
        grupoM = localStorage.setItem('palabrasMedias', JSON.stringify(palabraMedio));
        grupoD = localStorage.setItem('palabrasDificiles', JSON.stringify(palabraDificil));
    }

    return grupoF, grupoM, grupoD;
};

ActualizarAlmacenamiento(grupoF,grupoM,grupoD);