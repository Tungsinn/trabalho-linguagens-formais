const container = document.getElementById("automato");
const botaoCriarEstado = document.getElementById("criar-estado")
let aux = 0
let count = 0
let menu = {
  selecionar: 0,
  criaEstado: 1,
  apagaEstado: 2,
  criaTransicao: 4,
  desfazer:5
}

var nodes = new vis.DataSet([ ]);

  // create an array with edges
var edges = new vis.DataSet([
   // { from: 1, to: 3 },
]);

  // create a network
  var data = {
    nodes: nodes,
    edges: edges,
  };

  var options = {
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

botaoCriarEstado.addEventListener('click', () => {aux = 1})

function criarEstados(data) {
    if(aux == 1){
        nodes.add({
            id: count,
            label: `q${count}`,
            x: data.pointer.canvas.x,
            y: data.pointer.canvas.y
        })
        count++
    }
}

function addTransicao(){
  
}

network.addEventListener('click', criarEstados)