const container = document.getElementById("automato");    

let count = 0       
let menu = {        // Todos os Botoes do Menu Superior
  selecionar: 0,  
  criaEstado: 1, 
  apagaEstado: 2,
  criaTransicao: 3
}
let opcaoAtual = menu.selecionar
let NumberID = [] 
let desfazer = []
let nodes = new vis.DataSet([ ])   // As Bolinhas
let edges = new vis.DataSet([ ])   // As Transições
let caminho = []   // ATUAL Vai para VALOR Transicao 
var data = {
    nodes: nodes,
    edges: edges,
};
let firstState, lastState, estadoInicial = "undefined", estadoFinal =[]

function findToState(to){
    const regex = new RegExp(to)
    for(i=0; i<count; i++){
        if( regex.test(NumberID[i])){
            return i
        }
    }
}

function addValueArray(from, to, valor){
    let valores = [], states =[]
    const toState = findToState(to)
    const regex = new RegExp(from)
    for(i=0; i<count; i++){
        if( regex.test(NumberID[i])){
            if(caminho[i].Aux === 0){
                valores[0] = valor
                states[0] = toState
                caminho[i].Aux = 1
            }
            else{
                valores = caminho[i].Valor
                valores.push(valor)
                states = caminho[i].Para
                states.push(toState)
                
            }
            caminho[i].Valor = valores
            caminho[i].Para = states
            break
        }
    }
}

function addTransicao(edgeData, callback) {
    let data = edges.get({
        filter: function(item) {
            return item.from === edgeData.from && item.to === edgeData.to;
        }
    });
    let valor = prompt("Digite o valor da transição", "");
    addValueArray(edgeData.from, edgeData.to, valor)
    if (data.length > 0) {
        edges.update({
            id: data[0].id,
            label: data[0].label + ", " + valor
        });
        callback(null);
    } else {
        edgeData.arrows = "to";
        edgeData.label = valor;
        callback(edgeData);
        network.addEdgeMode();
    }
}

var options = {           // A formatação dos Nós, formato circulo, cor cinza, etc
    nodes: {
        physics: false,
        shape: "circle",
        color: 'gray',
        font: {
            size: 25,
            align: "center",
        },
        margin: 15,
    },
    interaction: {
        hover: true,
        selectConnectedEdges: false,
    },
    edges: {
        arrows: {
            to: {
                enabled: false,
                scaleFactor: 1,
                type: "arrow"
            },
            from: {
                enabled: false,
                scaleFactor: 1,
                type: "arrow"
            }
          
        },
        font: {
            align: "top",
            color: "white",
            size: 17,
            strokeWidth: 1
        },
        width: 1,
    },
    manipulation: {
        enabled: false, 
        addEdge: addTransicao
    }
};


let network = new vis.Network(container, data, options);

// Criando Eventos de Click no Botao. Assim, quando clicado será armazenado um determinado 
// numero na variavel e q
document.getElementById("selecionar").addEventListener('click', () => {opcaoAtual = 0})
document.getElementById("criar-estado").addEventListener('click', () => {opcaoAtual = 1})
document.getElementById("apagar").addEventListener('click', () => {opcaoAtual = 2})
document.getElementById("transicao").addEventListener('click', () => {opcaoAtual = 3})

function removeEstado(number){
    const regex = new RegExp(number)
    for(i=0; i<count; i++){
        if( regex.test(NumberID[i])){
            NumberID[i] = "undefined"
        }
    }
}

function reusandoElementosRemovidos(){
    for(i=0; i<count; i++){
        if(NumberID[i] === "undefined"){
            return i
        }
    }
    return -1
}

const form = document.getElementById('form')
let aux = 0
function menuEscolha(data){
    switch(opcaoAtual){
        case menu.selecionar:
            network.disableEditMode()
            let id = findToState(data.nodes[0])
            
            if(data.nodes.length > 0){
                if(aux === 0 && firstState === undefined){
                    firstState = document.createElement("div")
                    firstState.innerHTML = `<button id="transicao" class="btn btn-lg btn-outline-secondary mr-3" type="button" data-toggle="tooltip" data-placement="top" 
                    title="Estado Inicial">
                    <i class="fa fa-play" aria-hidden="true"></i>    
                    </button>`
                    form.appendChild(firstState)
                    lastState = document.createElement("div")
                    lastState.innerHTML = `<button id="transicao" class="btn btn-lg btn-outline-secondary mr-3" type="button" data-toggle="tooltip" data-placement="top" 
                    title="Estado Final">
                    <i class="fa fa-stop-circle-o" aria-hidden="true"></i>    
                    </button>`
                    form.appendChild(lastState)
                }
                firstState.addEventListener('click', ()=>{
                    if(estadoInicial != "undefined")
                        nodes.update({id: NumberID[estadoInicial], color: "gray"});
                    estadoInicial = id
                    nodes.update({id: data.nodes[0], color: "green"});
                    form.removeChild(lastState)
                    form.removeChild(firstState)
                    firstState = undefined
                    lastState = undefined
                })
                lastState.addEventListener('click', ()=>{
                    estadoFinal[estadoFinal.length] = id
                    nodes.update({id: data.nodes[0], color: "orange"});
                    form.removeChild(lastState)
                    form.removeChild(firstState)
                    firstState = undefined
                    lastState = undefined
                })
            }
            else{
                aux = 0
                if(firstState !== undefined){
                    form.removeChild(lastState)
                    form.removeChild(firstState)
                    firstState = undefined
                    lastState = undefined
                }
            }
            break;
        case menu.criaEstado:
            if((temporario = reusandoElementosRemovidos()) === -1){        
                NumberID[count] = nodes.add({
                    label: `q${count}`,
                    x: data.pointer.canvas.x,
                    y: data.pointer.canvas.y
                    })
                caminho[count] = {"Estado": NumberID[count], "Aux": 0, "Valor": 0, "Para": 0}
                count++;
            }           
            else{
                NumberID[temporario] = nodes.add({
                    label: `q${temporario}`,
                    x: data.pointer.canvas.x,
                    y: data.pointer.canvas.y
                    })
                caminho[temporario] = {"Estado": NumberID[temporario], "Aux": 0, "Valor": 0, "Para": 0}
            } 
            break;
        
        case menu.apagaEstado:
            removeEstado(data.nodes[0])
            nodes.remove(data.nodes[0]).length;
            break;

        case menu.criaTransicao:
            network.addEdgeMode();  
            break;
    }
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

let entradaTeste = document.getElementById('test')
let userInput
const testButton = document.getElementById("testaExpressao")

function comparaEstadoInput(posicaoEntrada, posicaoAF){
    for(i=0; i<caminho[posicaoAF].Valor.length; i++){
        if(userInput[posicaoEntrada] === caminho[posicaoAF].Valor[i])
            return caminho[posicaoAF].Para[i]
    }
    return -1
}

function testaEstadoFinal(estadoAtual){
    for(i=0; i<estadoFinal.length; i++){
        if(estadoFinal[i]===estadoAtual)
            return true
    }
    return false
}

function testeAutomato(posicaoEntrada, posicaoAF){
    let proxAF
    if(posicaoEntrada === userInput.length){
        console.log('here')
        if(testaEstadoFinal(posicaoAF))
            return true
        else
            return false
    }
    proxAF = comparaEstadoInput(posicaoEntrada, posicaoAF, 0)
    console.log(proxAF)
    if(proxAF !== -1){
        if(testeAutomato(posicaoEntrada+1, proxAF)){
            return true
        }
        else{
            if((proxAF = comparaEstadoInput(posicaoEntrada, posicaoAF, proxAF)) !== -1){
                return testeAutomato(posicaoEntrada+1, proxAF)
            }
            else 
                return false
        }
    }
    else if(posicaoAF === estadoInicial){
        return false
    }
}

function expressionTest(){
    userInput = entradaTeste.value
    let posicaoEntrada = 0
    let isValid = false
    if(estadoInicial === undefined || isEmpty(estadoFinal) ){
        alert("Defina Um Estado Inicial e Um Estado Final antes do teste")
    }
    else{
        if(testeAutomato(posicaoEntrada, estadoInicial)){
            entradaTeste.style.background = "#6fc155"
            entradaTeste.style.color = "#034006"
        }
        else{
            entradaTeste.style.background = "#c15d55"
            entradaTeste.style.color = "#400803"
        }
    }
}

network.on('click', data => {menuEscolha(data)} )
testButton.addEventListener('click', expressionTest)