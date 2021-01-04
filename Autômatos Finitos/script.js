const container = document.getElementById("automato");    
let count = 0       
let menu = {        // Todos os Botoes do Menu Superior
  selecionar: 0,  
  criaEstado: 1, 
  apagaEstado: 2,
  criaTransicao: 3,
  desfazer:4
}
let opcaoAtual = menu.selecionar

var nodes = new vis.DataSet([ ])   // As Bolinhas
var edges = new vis.DataSet([ ])   // As Transições

var data = {
    nodes: nodes,
    edges: edges,
};

var options = {           // A formatação dos Nós, formato circulo, cor cinza, etc
    nodes: {
        physics: false,
        shape: "circle",
        color: 'gray',
        font: {
            size: 25,
            align: "center"
        },
        margin: 15
    },
};


let network = new vis.Network(container, data, options);

// Criando Eventos de Click no Botao. Assim, quando clicado será armazenado um determinado 
// numero na variavel e q
document.getElementById("selecionar").addEventListener('click', () => {opcaoAtual = 0})
document.getElementById("criar-estado").addEventListener('click', () => {opcaoAtual = 1})
document.getElementById("apagar").addEventListener('click', () => {opcaoAtual = 2})
document.getElementById("transicao").addEventListener('click', () => {opcaoAtual = 3})
document.getElementById("desfazer").addEventListener('click', () => {opcaoAtual = 4})

function menuEscolha(data){
    switch(opcaoAtual){
      case menu.criaEstado:
        nodes.add({
          label: `q${count}`,
          x: data.pointer.canvas.x,
          y: data.pointer.canvas.y
        })
        count++
        break

      case menu.criaTransicao:
        network.addEdgeMode();  
    }
}

network.addEventListener('click', data => {menuEscolha(data)} )