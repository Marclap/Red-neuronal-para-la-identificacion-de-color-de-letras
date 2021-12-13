//Inicializar red neuronal
let network = new brain.NeuralNetwork()
//Entrenarla, darle ejemplos de cuando poner
//texto blanco, o texto negro segun el fondo
network.train([
    //Fondo negro (entrada en 0s) = texto blanco (salida = 1)
    { input: { rojo: 0, verde: 0, azul: 0 }, output: { color: 1 } },
    //Fondo blanco (entrada en 1s) = texto negro (salida = 0)
    { input: { rojo: 1, verde: 1, azul: 1 }, output: { color: 0 } },
    //Fondo verde, texto negro
    { input: { rojo: 0, verde: 1, azul: 0 }, output: { color: 0 } },
    //Fondo azul, texto blanco
    {
        input: { rojo: 0, verde: 0.43, azul: 1 },
        output: { color: 1 },
    },
    //Fondo rojo, texto blanco
    { input: { rojo: 1, verde: 0, azul: 0 }, output: { color: 1 } },
])

function update(color) {
    let rgb = [color.channels.r, color.channels.g, color.channels.b]
    let div = document.getElementById('sitio')
    div.style.background = color.toHEXString()
    //Tomar el fondo actual elegido por el usuario,
    //para usarlo de entrada para que la red nos de su
    //prediccion del mejor color de texto a utilizar
    let entrada = {
        rojo: rgb[0] / 255,
        verde: rgb[1] / 255,
        azul: rgb[2] / 255,
    }
    //Obtener la prediccion de la red
    let resultado = network.run(entrada)
    //Si resultado > .5, se considera color de texto blanco
    if (resultado.color > 0.5) {
        div.style.color = 'white'
    } else {
        div.style.color = 'black'
    }
}
