var palabras = ["APPLE", "ANGEL"];
var palabraSecreta = obtenerPalabraSecreta();
var intentosRestantes = 6;
var letrasUsadas = [];

function obtenerPalabraSecreta() {
    // Puedes cambiar esto para obtener una palabra de una API
    return palabras[Math.floor(Math.random() * palabras.length)];
}

function adivinar() {
    var guessInput = document.getElementById("guess-input");
    var guess = guessInput.value.toUpperCase();

    if (guess.length !== 5 || !/^[A-Z]+$/.test(guess)) {
        alert("Ingresa una palabra válida de 5 letras.");
        return;
    }

    if (intentosRestantes > 0) {
        intentosRestantes--;

        var resultado = verificarAdivinanza(guess);

        actualizarPantalla(resultado);

        if (resultado.ganador) {
            alert("¡Ganaste! La palabra es " + palabraSecreta);
        } else if (intentosRestantes === 0) {
            alert("Perdiste. La palabra era " + palabraSecreta);
        }
    } else {
        alert("Ya has agotado todos tus intentos. La palabra era " + palabraSecreta);
    }
}

function verificarAdivinanza(guess) {
    var resultado = { aciertos: 0, aciertosIncorrectos: 0, ganador: false };
    var palabraArray = palabraSecreta.split('');

    for (var i = 0; i < 5; i++) {
        if (guess[i] === palabraArray[i]) {
            resultado.aciertos++;
        } else if (palabraArray.includes(guess[i])) {
            resultado.aciertosIncorrectos++;
        }
    }

    resultado.ganador = resultado.aciertos === 5;

    letrasUsadas.push(guess);

    return resultado;
}

function actualizarPantalla(resultado) {
    document.getElementById("word-display").innerText = resultado.aciertos === 5 ? palabraSecreta : "_ ".repeat(5);
    document.getElementById("resultado").innerText = "Aciertos: " + resultado.aciertos + ", Aciertos Incorrectos: " + resultado.aciertosIncorrectos;
    document.getElementById("letras-usadas").innerText = "Letras usadas: " + letrasUsadas.join(", ");
    document.getElementById("intentos-restantes").innerText = "Intentos restantes: " + intentosRestantes;
}
