import pandas as pd

# Ler o arquivo CSV
dataframe = pd.read_csv('dados_extraidos\dados_extraidos - Sheet1 (1).csv')

# Filtrar linhas onde a coluna 'orcamentos' não está vazia e não contém '[]'
filtered_dataframe = dataframe[dataframe['orcamentos'].apply(lambda x: isinstance(x, str) and x.strip() and x != '[]')]

# Dicionário para armazenar o valor total gasto por cada cliente
cliente_valores_totais = {}

# Iterar sobre as linhas filtradas
for index, row in filtered_dataframe.iterrows():
    # Acessar o dicionário diretamente
    orçamento = eval(row['orcamentos'])  # Use eval se os dados estão como string
    
    # Obter o ID do layout e o nome do cliente
    id_layouts = row['id_layouts']
    nome_cliente = row['nome_cliente']
    
    # Verificar se o campo 'orcamento_skus' está presente
    if 'orcamento_skus' in orçamento:
        valor_total = 0
        # Iterar sobre a lista de SKUs e calcular o valor total
        for sku in orçamento['orcamento_skus']:
            quantidade = sku['quantidade']
            preco_descontado = sku['preco_descontado']
            valor_total += quantidade * preco_descontado
        
        # Atualizar o dicionário com o valor total gasto pelo cliente
        cliente_chave = (id_layouts, nome_cliente)
        if cliente_chave in cliente_valores_totais:
            cliente_valores_totais[cliente_chave] += valor_total
        else:
            cliente_valores_totais[cliente_chave] = valor_total

# Encontrar o cliente com o maior valor total gasto
cliente_mais_gasto = max(cliente_valores_totais, key=cliente_valores_totais.get)
valor_mais_gasto = cliente_valores_totais[cliente_mais_gasto]

# Exibir o cliente com o maior valor gasto
print('Cliente com o maior valor gasto:')
print({
    'id_layouts': cliente_mais_gasto[0],
    'nome_cliente': cliente_mais_gasto[1],
    'valor_total': valor_mais_gasto
})
