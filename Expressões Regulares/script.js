let expressao = document.getElementById('exp')   // Expressao Regular
const testarExp = document.getElementById('testaExpressao') //botão 
const palavra = document.getElementById('test')    // String de Entrada

function validarExp(){
    const regex = new RegExp(expressao.value)

    if(regex.test(palavra.value)){
        palavra.style.background = "#6fc155"
        palavra.style.color = "#034006"

    } 
    else{
        palavra.style.background = "#c15d55"
        palavra.style.color = "#400803"
    }
}

testarExp.addEventListener('click', validarExp)
