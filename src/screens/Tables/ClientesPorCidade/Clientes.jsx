import React from 'react'
import TableClientesPorCidade from '../../../components/Table/TableClientesPorCidade'


const Clientes = () => {
  return (
    <TableClientesPorCidade jsonPath={"maior_cliente_por_cidade.json"} title={"Maiores clientes de cada cidade"}/>
  )
}

export default Clientes