/*
TAREA: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs+labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad y el promedio del grupo familiar.

Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, borrando los inputs ya creados (investigar cómo en MDN).
*/
const $botonIngreso = document.querySelector('#ingreso');


$botonIngreso.onclick = function(event){
    const $cantidadFamilia = document.querySelector('#cantidad-integrantes-familia');
    const cantidadFamilia = $cantidadFamilia.value;
    const resultadoValidacion = validarIntegrantes(cantidadFamilia)
    if (resultadoValidacion){
        const errores = {
            cantidad: resultadoValidacion
        };
        troubleshooting(errores);
        borrarIntegrantesAnteriores();
        ocultarBotonCalculo();
        ocultarResultados();
    }else{
        ocultarResultados();
        borrarIntegrantesAnteriores();
        crearIntegrantes(cantidadFamilia);
        borrarErrores();
    }
    event.preventDefault();
}

document.querySelector('#calcular').onclick = function(event){
    borrarErrores();
    const numeros = obtenerEdadesIntegrantes();

    const resultadoValidacion = validarEdades(numeros);
    
    manejarErroresEdades(resultadoValidacion);

    if (resultadoValidacion.length === 0){
        document.querySelector('#errores').className = 'oculto';
        mostrarEdad('mayor', obtenerMayorNumero(numeros));
        mostrarEdad('menor', obtenerMenorNumero(numeros));
        mostrarEdad('promedio', obtenerPromedio(numeros));
        mostrarResultados();
    }

    event.preventDefault();
}

document.querySelector('#resetear').onclick = resetear;

function borrarIntegrantesAnteriores(){
    const $integrantes = document.querySelectorAll('.integrante');
    const $integrantesError = document.querySelectorAll('.error1');
    const $linebreaks = document.querySelectorAll('br')

    for (let i = 0; i < $integrantes.length; i++){
        $integrantes[i].remove();
    }

    for (let i = 0; i < $integrantesError.length; i++){
        $integrantesError[i].remove();
    }

    for (let i = 0; i < $linebreaks.length; i++){
        $linebreaks[i].remove();
    }
}

function crearIntegrantes(cantidadFamilia){
    if (cantidadFamilia > 0){
        mostrarBotonCalculo();
    } else{
        resetear();
    }
    for (let i = 0; i < cantidadFamilia; i++){
        crearIntegrante(i);
    }
}

function crearIntegrante(indice){
    const $div = document.createElement('div');
    $div.className = 'integrante';
    $div.id = `integrante-${indice+1}`

    const $label = document.createElement('label');
    $label.textContent = 'Edad del integrante #: ' + (indice + 1);
    const $input = document.createElement('input');
    $input.type = 'input';
    $input.id = `edad-${indice + 1}`

    $div.appendChild($label);
    $div.appendChild($input);

    const $integrantes = document.querySelector('#integrantes')
    $integrantes.appendChild($div);
}

function resetear() {
    borrarErrores();
    borrarIntegrantesAnteriores();
    ocultarBotonCalculo();
    ocultarResultados();
}

function ocultarBotonCalculo() {
    document.querySelector('#calcular').className = 'oculto';
}

function mostrarBotonCalculo() {
    document.querySelector('#calcular').className = '';
}
  
function ocultarResultados() {
    document.querySelector('#analisis').className = 'oculto';
}
  
function mostrarResultados() {
    document.querySelector('#analisis').className = '';
}

function mostrarEdad(tipo, valor) {
    document.querySelector(`#${tipo}-edad`).textContent = valor;
}

function obtenerEdadesIntegrantes() {
    const $integrantes = document.querySelectorAll('.integrante input');
    const edades = [];
    for (let i = 0; i < $integrantes.length; i++) {
      edades.push($integrantes[i].value);
    }
    return edades;
}

function validarIntegrantes (cantidadFamilia) {
    if (cantidadFamilia === ""){
        return 'Este campo debe tener al menos 1 numero';
    }
    if (!/^\d+$/.test(cantidadFamilia)){
        return "El campo cantidad integrantes solo acepta numeros";
    }
    if (cantidadFamilia.length >= 4){
        return 'Este campo debe tener menos de 4 numeros';
    }
    return '';
}

function validarEdades (edades){
    const errores = []
    if (Array.isArray(edades)){
        for (let i = 0; i < edades.length; i++) {
          let edad = edades[i];
          if (edad.length >= 10){
            errores.push(`El campo de edad #${i+1} debe tener menos de 10 caracteres`);
            document.querySelector(`#edad-${i+1}`).className = 'error1'
            continue;
          }
          if (edad === ""){
            errores.push(`El campo de edad #${i+1} debe tener al menos 1 caracter`);
            document.querySelector(`#edad-${i+1}`).className = 'error1'
            continue;
          }
          if (edad <= 0){
            errores.push(`El campo de edad #${i+1} debe tener una edad valida`);
            document.querySelector(`#edad-${i+1}`).className = 'error1'
            continue;
          }
          if (!/^\d+$/.test(edad)){
            errores.push(`El campo de edad #${i+1} solo acepta numeros`);
            document.querySelector(`#edad-${i+1}`).className = 'error1'
            continue;
          }
        }
        return errores;
      } else{
        if (edades.length >= 10){
            return 'El campo edad debe tener menos de 10 caracteres';
        }
        if (edades === ""){
            return 'El campo edad debe tener al menos 1 caracter';
        }
        if (edades <= 0){
            return 'El campo edad debe tener una edad valida';
        }
        if (!/^\d+$/.test(edades)){
            return "El campo edad solo acepta numeros";
        }
        return '';
    }
}

function troubleshooting(errores){
    const $formFamilia = document.querySelector('.cantidad-familia');
    const keys = Object.keys(errores);
    const $errores = document.querySelector('#errores');
    $errores.className = ''

    while ($errores.firstChild) {
        $errores.removeChild($errores.firstChild);
    }

    let cantidadErrores = 0;

    keys.forEach(function(key){
        const error = (errores[key]);
        if (error){
            cantidadErrores++;
            $formFamilia[key].className = "error"
            const $error = document.createElement('li');           
            $error.innerText = error;
            $error.className = "lista-errores";

            $errores.appendChild($error);
        } else{
            $formFamilia[key].className = ""
        }
    });
    return cantidadErrores;
}

function manejarErroresEdades(resultadoValidacion){
    ocultarResultados();
    const $errores = document.querySelector('#errores');
    $errores.className = ''
    while ($errores.firstChild) {
      $errores.removeChild($errores.firstChild);
    }
    for (let i = 0; i < resultadoValidacion.length; i++) {
      const error = resultadoValidacion[i];
      const li = document.createElement('li');
      li.textContent = error;
      $errores.appendChild(li);
    }
}

function borrarErrores(){
    const $errores = document.querySelector('#errores');
    $errores.className = 'oculto'
    while ($errores.firstChild) {
        $errores.removeChild($errores.firstChild);
    }
    document.querySelector('#cantidad-integrantes-familia').className = "";
    if (document.querySelector('.error1')){
        while (document.querySelector('.error1')){
            document.querySelector('.error1').className = "integrante"
        }
    }
}
