function obtenerMayorNumero(numeros){
    let mayorNumero = parseInt(numeros[0]);
    for (let i = 1; i < numeros.length; i++){
        if (parseInt(numeros[i]) > mayorNumero){
            mayorNumero = parseInt(numeros[i]);
        }
    }

    return mayorNumero;
}

function obtenerMenorNumero(numeros){
    let menorNumero = parseInt(numeros[0]);
    for (let i = 1; i < numeros.length; i++){
        if (parseInt(numeros[i]) < menorNumero){
            menorNumero = parseInt(numeros[i]);
        }
    }
    
    return menorNumero;
}

function obtenerPromedio(numeros){
    let contador = 0;
    for (let i = 0; i < numeros.length; i++){
        contador += Number(numeros[i]);
    }

    return (contador / numeros.length).toFixed(2);
}
