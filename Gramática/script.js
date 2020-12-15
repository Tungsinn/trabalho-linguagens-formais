const addInputButton = document.getElementById('buttonPlus')

function addInput() {
    let tabela = document.getElementById('tabela');
    let numeroLinhas = tabela.rows.lenght;
    let linha = tabela.insertRow(numeroLinhas);
    let celula1 = linha.insertCell(0);
    let celula2 = linha.insertCell(1);
    celula1.innerHTML = '<td class="var"><div class="input-group"><input type="text" class="form-control" style="max-width: 50px;"><div class="input-group-append"><span class="input-group-text"><i class="fa fa-arrow-right"></i></span></div></div></td>'
    celula2.innerHTML = '<td class="rule"><input type="text" class="form-control" style="max-width: 150px;"></td>'
} 

addInputButton.addEventListener('click', addInput)