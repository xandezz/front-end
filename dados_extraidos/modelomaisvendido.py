import pandas as pd
import json

# Ler o arquivo CSV
dataframe = pd.read_csv('dados_extraidos\\dados_extraidos - Sheet1 (1).csv')

# Filtrar linhas onde a coluna 'orcamentos' não está vazia e não contém '[]'
filtered_dataframe = dataframe[dataframe['orcamentos'].apply(lambda x: isinstance(x, str) and x.strip() and x != '[]')]

# Dicionários para armazenar os dados
cidade_modelos_quantidades = {}  # Para armazenar quantidades por cidade
modelo_quantidades = {}          # Para armazenar quantidades totais

# Iterar sobre as linhas filtradas
for index, row in filtered_dataframe.iterrows():
    orcamento = eval(row['orcamentos'])  # Use eval se os dados estão como string
    
    # Obter a cidade do orçamento
    cidade = orcamento.get('cidade', 'Desconhecida')  # Usar 'Desconhecida' como valor padrão
    
    # Verificar se o campo 'orcamento_skus' está presente
    if 'orcamento_skus' in orcamento:
        for sku in orcamento['orcamento_skus']:
            quantidade = sku['quantidade']
            if quantidade == 0:
                continue  # Ignorar SKUs com quantidade zero
            
            modelo = sku['produto']  # Nome do produto ou modelo
            
            # Atualizar o dicionário com a quantidade acumulada para cada modelo por cidade
            if cidade not in cidade_modelos_quantidades:
                cidade_modelos_quantidades[cidade] = {}
            
            if modelo in cidade_modelos_quantidades[cidade]:
                cidade_modelos_quantidades[cidade][modelo] += quantidade
            else:
                cidade_modelos_quantidades[cidade][modelo] = quantidade
            
            # Atualizar o dicionário com a quantidade acumulada para cada modelo (geral)
            if modelo in modelo_quantidades:
                modelo_quantidades[modelo] += quantidade
            else:
                modelo_quantidades[modelo] = quantidade

# Processar o dicionário para encontrar o modelo mais vendido em cada cidade
cidade_modelo_mais_vendido = {}
for cidade, modelos in cidade_modelos_quantidades.items():
    # Remover modelos com quantidade zero antes de encontrar o mais vendido
    modelos = {modelo: qtd for modelo, qtd in modelos.items() if qtd > 0}
    if not modelos:
        continue  # Se não houver modelos com quantidade > 0, pular esta cidade
    
    modelo_mais_vendido = max(modelos, key=modelos.get)
    quantidade_mais_vendida = modelos[modelo_mais_vendido]
    
    # Ordenar os modelos por quantidade em ordem decrescente
    modelos_ordenados = dict(sorted(modelos.items(), key=lambda item: item[1], reverse=True))
    
    # Adicionar as informações ao dicionário final
    cidade_modelo_mais_vendido[cidade] = {
        "modelo_mais_vendido": modelo_mais_vendido,
        "quantidade_vendida": quantidade_mais_vendida,
        "modelos_quantidades": modelos_ordenados
    }

# Processar o dicionário de modelos gerais
modelo_quantidades_tratadas = {}
for modelo, quantidade in modelo_quantidades.items():
    if quantidade == 0:
        continue  # Ignorar modelos com quantidade zero
    
    modelo_tratado = modelo.split(',')[0].strip()
    
    if modelo_tratado in modelo_quantidades_tratadas:
        modelo_quantidades_tratadas[modelo_tratado] += quantidade
    else:
        modelo_quantidades_tratadas[modelo_tratado] = quantidade

modelo_mais_vendido_tratado = max(modelo_quantidades_tratadas, key=modelo_quantidades_tratadas.get)
quantidade_mais_vendida_tratada = modelo_quantidades_tratadas[modelo_mais_vendido_tratado]

modelo_quantidades_ordenadas = dict(sorted(modelo_quantidades_tratadas.items(), key=lambda item: item[1], reverse=True))

resultado_json_geral = {
    "modelo_mais_vendido": modelo_mais_vendido_tratado,
    "quantidade_vendida": quantidade_mais_vendida_tratada,
    "modelos_quantidades": modelo_quantidades_ordenadas
}

# Converter para JSON strings e imprimir
resultado_json_cidade_str = json.dumps(cidade_modelo_mais_vendido, ensure_ascii=False, indent=4)
resultado_json_geral_str = json.dumps(resultado_json_geral, ensure_ascii=False, indent=4)
print("JSON por cidade:\n", resultado_json_cidade_str)
print("JSON geral:\n", resultado_json_geral_str)

# Salvar os JSONs em arquivos
with open('resultado_modelo_por_cidade.json', 'w', encoding='utf-8') as f_cidade:
    f_cidade.write(resultado_json_cidade_str)
with open('resultado_vendas.json', 'w', encoding='utf-8') as f_geral:
    f_geral.write(resultado_json_geral_str)
