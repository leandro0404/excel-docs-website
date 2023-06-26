# -*- coding: utf-8 -*-
import pandas as pd
import json
import os

# Caminho para o arquivo demo.xlsx
file_path = 'data/demo.xlsx'

# Carregar o arquivo Excel
xls = pd.ExcelFile(file_path)

# Criar a pasta "data" se ela não existir
os.makedirs('data', exist_ok=True)

# Iterar pelas abas do arquivo Excel
for sheet_name in ['person', 'address', 'phone']:
    # Ler cada aba e converter para um DataFrame
    df = xls.parse(sheet_name)
    
    # Converter o DataFrame para um dicionário
    sheet_data = df.to_dict(orient='records')
    
    # Converter o dicionário para JSON
    json_data = json.dumps(sheet_data)
    
    # Salvar o JSON em um arquivo na pasta "data"
    file_name = 'data/' + sheet_name + '.json'
    with open(file_name, 'w') as file:
        file.write(json_data)
