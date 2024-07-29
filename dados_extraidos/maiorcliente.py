import pandas as pd
import json

# Ler o arquivo CSV
dataframe = pd.read_csv('dados_extraidos\dados_extraidos - Sheet1 (1).csv')

# Filtrar linhas onde a coluna 'orcamentos' não está vazia e não contém '[]'
filtered_dataframe = dataframe[dataframe['orcamentos'].apply(lambda x: isinstance(x, str) and x.strip() and x != '[]')]

# Dicionário para armazenar o valor total gasto por cada cliente por cidade
cidade_cliente_valores_totais = {}

# Iterar sobre as linhas filtradas
for index, row in filtered_dataframe.iterrows():
    # Acessar o dicionário diretamente
    orçamento = eval(row['orcamentos'])  # Use eval se os dados estão como string
    
    # Obter o ID do layout, nome do cliente e cidade
    id_entrada = row['id_entrada']
    id_layouts = row['id_layouts']
    nome_cliente = row['nome_cliente']
    cidade = orçamento.get('cidade', 'Desconhecida')  # Obter cidade, default para 'Desconhecida' se não existir
    
    # Verificar se o campo 'orcamento_skus' está presente
    if 'orcamento_skus' in orçamento:
        valor_total = 0
        # Iterar sobre a lista de SKUs e calcular o valor total
        for sku in orçamento['orcamento_skus']:
            quantidade = sku['quantidade']
            preco_descontado = sku['preco_descontado']
            valor_total += quantidade * preco_descontado
        
        # Atualizar o dicionário com o valor total gasto pelo cliente por cidade
        if cidade not in cidade_cliente_valores_totais:
            cidade_cliente_valores_totais[cidade] = {}
        
        cliente_chave = (id_entrada, id_layouts, nome_cliente)
        if cliente_chave in cidade_cliente_valores_totais[cidade]:
            cidade_cliente_valores_totais[cidade][cliente_chave] += valor_total
        else:
            cidade_cliente_valores_totais[cidade][cliente_chave] = valor_total

# Dicionário para armazenar o cliente com o maior valor total gasto por cidade
maior_cliente_por_cidade = {}

# Encontrar o cliente com o maior valor total gasto por cidade
for cidade, clientes in cidade_cliente_valores_totais.items():
    cliente_mais_gasto = max(clientes, key=clientes.get)
    valor_mais_gasto = clientes[cliente_mais_gasto]
    
    maior_cliente_por_cidade[cidade] = {
        'id_entrada': cliente_mais_gasto[0],
        'id_layouts': cliente_mais_gasto[1],
        'nome_cliente': cliente_mais_gasto[2],
        'valor_total': valor_mais_gasto
    }

# Ordenar o JSON por valor total em ordem decrescente
maior_cliente_por_cidade_ordenado = dict(sorted(maior_cliente_por_cidade.items(), key=lambda item: item[1]['valor_total'], reverse=True))

# Converter para JSON string e imprimir
resultado_json_str = json.dumps(maior_cliente_por_cidade_ordenado, ensure_ascii=False, indent=4)
print(resultado_json_str)

# Opcional: salvar o JSON em um arquivo
with open('maior_cliente_por_cidade.json', 'w', encoding='utf-8') as f:
    f.write(resultado_json_str)
