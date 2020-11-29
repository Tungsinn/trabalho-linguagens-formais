let expressao = document.getElementById('exp')   // Expressao Regular
const testarExp = document.getElementById('testaExpressao') //botão 
const palavra = document.getElementById('test')    // String de Entrada

function validarExp(){
    const resultado = document.getElementById('resul')
    const regex = new RegExp(expressao.value)

    if(regex.test(palavra.value)){
        resultado.textContent = "Expressão Valida"
    } 
    else{
        resultado.textContent = "Expressão Invalida"
    }

}

testarExp.addEventListener('click', validarExp)
