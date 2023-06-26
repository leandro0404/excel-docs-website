// Função para exibir a aba selecionada e ocultar as demais
function showTab(tabName) {
    var tabs = document.getElementsByClassName('tab');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].style.display = 'none';
    }
    document.getElementById(tabName).style.display = 'block';
}

// Função para preencher a tabela com base nos dados JSON
function populateTable(jsonData, tableId) {
    var table = document.getElementById(tableId);
    var tbody = table.getElementsByTagName('tbody')[0];

    tbody.innerHTML = '';

    for (var i = 0; i < jsonData.length; i++) {
        var row = jsonData[i];
        var tableRow = document.createElement('tr');

        for (var key in row) {
            var cell = document.createElement('td');
            cell.innerText = row[key];
            tableRow.appendChild(cell);
        }

        tbody.appendChild(tableRow);
    }
}

// Função para adicionar uma nova aba e carregar os dados do respectivo arquivo JSON
function addTab(tabName, fileName, columns) {
    var tabList = document.getElementById('tab-list');
    var tabButton = document.createElement('button');
    tabButton.innerText = tabName;
    tabButton.onclick = function() {
        showTab(fileName);
    };
    tabList.appendChild(tabButton);

    var tabContent = document.createElement('div');
    tabContent.id = fileName;
    tabContent.className = 'tab';
    tabContent.innerHTML = '<h2>' + tabName + '</h2>' +
        '<table id="' + fileName + '-table"></table>';
    document.body.appendChild(tabContent);

    addTableHeader(fileName + '-table', columns);

    fetch('data/' + fileName + '.json')
        .then(response => response.json())
        .then(data => {
            populateTable(data, fileName + '-table');
        });
}

// Função para adicionar as colunas de cabeçalho à tabela
function addTableHeader(tableId, columns) {
    var table = document.getElementById(tableId);
    var thead = table.createTHead();
    var row = thead.insertRow();

    for (var i = 0; i < columns.length; i++) {
        var th = document.createElement('th');
        th.innerText = columns[i];
        row.appendChild(th);
    }
}

// Array com as informações das abas e colunas desejadas
var tabs = [
    { name: 'Person', file: 'person', columns: ['Dado', 'Natureza', 'Obrigatório', 'Produto', 'Necessidade', 'País', 'Momento', 'Local', 'Tabela', 'Plataforma', 'Hub', 'Display', 'Sparkle', 'Club', 'Checkout', 'Zendesk'] },
    { name: 'Address', file: 'address', columns: ['Dado', 'Natureza', 'Obrigatório', 'Produto', 'Necessidade', 'País', 'Momento', 'Local', 'Tabela', 'Plataforma', 'Hub', 'Display', 'Sparkle', 'Club', 'Checkout', 'Zendesk'] },
    { name: 'Phone', file: 'phone', columns: ['Dado', 'Natureza', 'Obrigatório', 'Produto', 'Necessidade', 'País', 'Momento', 'Local', 'Tabela', 'Plataforma', 'Hub', 'Display', 'Sparkle', 'Club', 'Checkout', 'Zendesk'] },
    { name: 'Novo Item', file: 'novoitem', columns: ['Coluna1', 'Coluna2', 'Coluna3', 'Coluna4', 'Coluna5'] }
];

// Adiciona as abas e carrega os dados dos arquivos JSON
for (var i = 0; i < tabs.length; i++) {
    addTab(tabs[i].name, tabs[i].file, tabs[i].columns);
}