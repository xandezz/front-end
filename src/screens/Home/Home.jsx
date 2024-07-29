import React from 'react'
import OutlinedCard from '../../components/Card/Card'
import './Home.css'

const Home = () => {
  return (
    <div className='homecontainer'>
        <OutlinedCard 
            jsonPath="ticketmedio.json" // Caminho para o arquivo JSON
            title="Ticket Médio" 
            keyToDisplay="TicketMedio" // Chave para exibir do JSON
            link="/front-end/ticket"
        />
        <OutlinedCard 
            jsonPath="redirecionamento.json" // Caminho para o arquivo JSON
            title="Maiores clientes por cidade" 
            keyToDisplay="button" // Chave para exibir do JSON
            link="/front-end/clientes"
        />
        <OutlinedCard 
            jsonPath="resultado_vendas.json" // Caminho para o arquivo JSON
            title="Modelo mais vendido" 
            keyToDisplay="modelo_mais_vendido" // Chave para exibir do JSON
            link="/front-end/modelos"
        />
    </div>
  )
}

export default Home