import React from 'react'
import TableModelos from '../../../components/Table/TableModelos'
import TableModelosPorCidade from '../../../components/Table/TableModelosPorCidade'


const Modelos = () => {
  return (
    <>
        <TableModelos jsonPath={"resultado_vendas.json"} title={"Modelos mais vendidos"}/>
        <TableModelosPorCidade jsonPath={"resultado_modelo_por_cidade.json"} title={"Modelos mais vendidos por cidade"}/>
    </>
  )
}

export default Modelos