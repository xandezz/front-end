import pandas as pd
import json

# Ler o arquivo CSV
dataframe = pd.read_csv('dados_extraidos\dados_extraidos - Sheet1 (1).csv')

# Filtrar linhas onde a coluna 'orcamentos' não está vazia e não contém '[]'
filtered_dataframe = dataframe[dataframe['orcamentos'].apply(lambda x: isinstance(x, str) and x.strip() and x != '[]')]

# Inicializar a variável para armazenar o valor total
valor_total = 0

# Iterar sobre as linhas filtradas
for index, row in filtered_dataframe.iterrows():
    # Acessar o dicionário diretamente (já está no formato correto)
    orcamento = eval(row['orcamentos'])  # Usar eval para converter a string para um dicionário, se necessário
    
    # Verificar se o campo 'orcamento_skus' está presente
    if 'orcamento_skus' in orcamento:
        # Iterar sobre a lista de SKUs
        for sku in orcamento['orcamento_skus']:
            # Calcular o valor total para cada SKU
            valor_total += sku['quantidade'] * sku['preco_descontado']

# Calcular o número de vendas
quantidade_de_vendas = len(filtered_dataframe)

# Calcular o ticket médio
ticket_medio = valor_total / quantidade_de_vendas if quantidade_de_vendas else 0

# Criar um dicionário com os resultados
resultados = {
    'ValorTotal': valor_total,
    'QuantidadeDeVendas': quantidade_de_vendas,
    'TicketMedio': ticket_medio
}

# Converter o dicionário para JSON
resultado_json = json.dumps(resultados, indent=4)

# Exibir o JSON
print(resultado_json)

# Se desejar salvar o JSON em um arquivo
with open('ticketmedio.json', 'w') as f:
    f.write(resultado_json)
