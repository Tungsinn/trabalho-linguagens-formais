const container = document.getElementById("automato");
const botaoCriarEstado = document.getElementById("criar-estado")
let aux = 0
let count = 0

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
            size: 30,
            align: "center"
        },
        margin: 20
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

network.addEventListener('click', criarEstados)