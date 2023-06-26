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

  // Remove o conteúdo existente da tabela
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }

  var thead = document.createElement('thead');
  var tbody = document.createElement('tbody');

  var headerRow = document.createElement('tr');
  var columns = Object.keys(jsonData[0]);

  for (var i = 0; i < columns.length; i++) {
    var th = document.createElement('th');
    th.innerText = columns[i];
    headerRow.appendChild(th);
  }

  thead.appendChild(headerRow);

  for (var i = 0; i < jsonData.length; i++) {
    var row = jsonData[i];
    var tableRow = document.createElement('tr');

    for (var key in row) {
      var cell = document.createElement('td');

      if (typeof row[key] === 'boolean') {
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.disabled = true;
        checkbox.checked = row[key];
        cell.appendChild(checkbox);
      } else {
        cell.innerText = row[key];
      }

      tableRow.appendChild(cell);
    }

    tbody.appendChild(tableRow);
  }

  table.appendChild(thead);
  table.appendChild(tbody);
}


// Função para adicionar uma nova aba e carregar os dados do respectivo arquivo JSON
function addTab(tabName, fileName, columns) {
  var tabList = document.getElementById('tab-list');
  var tabButton = document.createElement('button');
  tabButton.innerText = tabName;
  tabButton.onclick = function () {
    showTab(fileName);
  };
  tabList.appendChild(tabButton);

  var tabContent = document.createElement('div');
  tabContent.id = fileName;
  tabContent.className = 'tab';
  tabContent.innerHTML = '<h2>' + tabName + '</h2>' +
    '<table id="' + fileName + '-table" class="table"></table>';
  document.getElementById('tab-content').appendChild(tabContent);

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
  { name: 'Phone', file: 'phone', columns: ['Dado', 'Natureza', 'Obrigatório', 'Produto', 'Necessidade', 'País', 'Momento', 'Local', 'Tabela', 'Plataforma', 'Hub', 'Display', 'Sparkle', 'Club', 'Checkout', 'Zendesk'] }
];

// Adiciona as abas dinamicamente
for (var i = 0; i < tabs.length; i++) {
  var tab = tabs[i];
  addTab(tab.name, tab.file, tab.columns);
}

document.addEventListener('DOMContentLoaded', function() {
  // Código para adicionar as classes de estilo do Bootstrap
  var firstTab = document.querySelector('#tab-list li:first-child');
  firstTab.classList.add('active');

  var firstTabContent = document.querySelector('#tab-content > div:first-child');
  firstTabContent.classList.add('show', 'active');
});
