function obtenerMayorNumero(numeros){
    let mayorNumero = numeros[0];
    for (let i = 1; i < numeros.length; i++){
        if (numeros[i] < mayorNumero){
            mayorNumero = numeros[i];
        }
    }

    return mayorNumero;
}

function obtenerMenorNumero(numeros){
    let menorNumero = numeros[0];
    for (let i = 1; i < numeros.length; i++){
        if (numeros[i] > menorNumero){
            menorNumero = numeros[i];
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
