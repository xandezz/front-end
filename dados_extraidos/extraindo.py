import requests
import pandas as pd

# Carregar a planilha de IDs
ids_df = pd.read_excel('ID sistema interno.xlsx')


# Função para extrair dados da API
def extrair_dados(entrada_id):
    url = f'https://api.seubone.com/layout/layouts/{entrada_id}'
    response = requests.get(url)
    return response.json()

# Iterar sobre os IDs e extrair os dados
dados = []
for id in ids_df['entrada_id']:
    dados.append(extrair_dados(id))

# Converter para DataFrame
dados_df = pd.DataFrame(dados)
dados_df.to_excel('dados_extraidos.xlsx', index=False)
