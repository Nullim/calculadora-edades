//Este archivo es puramente diseñado para demostrar conocimientos en el uso de pruebas



function probarValidarIntegrantes(){
    console.assert(
        validarIntegrantes("") === "Este campo debe tener al menos 1 numero",
        "Validar integrantes no validó que el campo tenga al menos 1 numero"
    );
    console.assert(
        validarIntegrantes("11111111111111111111111111111111111111111111111111111111111111111111111111"
        ) === "Este campo debe tener menos de 4 numeros", "Validar integrantes no validó que el campo tenga menos de 4 numeros"
    );
    console.assert(
        validarIntegrantes("hola") === "El campo cantidad integrantes solo acepta numeros",
        "Validar integrantes no validó que el campo solo tenga numeros"
    );
    console.assert(
        validarIntegrantes("17") === "",
        "Validar integrantes mostró error cuando el campo era válido"
    );
}

function probarValidarEdades(){
    console.assert(
        validarEdades("") === "El campo edad debe tener al menos 1 caracter",
        "Validar edades no validó que el campo tenga al menos 1 caracter"
    );
    console.assert(
        validarEdades("4.25") === "El campo edad solo acepta numeros",
        "Validar edades no validó que el campo solo tenga números"
    );
    console.assert(
        validarEdades("49059493459345") === "El campo edad debe tener menos de 5 caracteres",
        "Validar edades no validó que el campo tenga menos de 5 caracteres"
    );
    console.assert(
        validarEdades("-5") === "El campo edad debe tener una edad valida",
        "Validar edades no validó que el campo tenga una edad válida"
    );
    console.assert(
        validarEdades("14") === "",
        "Validar edades mostró error cuando la edad era válida"
    );
}

probarValidarIntegrantes();
probarValidarEdades();
