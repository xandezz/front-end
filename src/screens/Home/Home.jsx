import React from 'react'
import OutlinedCard from '../../components/Card/Card'
import './Home.css'

const Home = () => {
  return (
    <div className='homecontainer'>
        <OutlinedCard 
            jsonPath="public/ticketmedio.json" // Caminho para o arquivo JSON
            title="Ticket Médio" 
            keyToDisplay="TicketMedio" // Chave para exibir do JSON
            link="/Ticket"
        />
        <OutlinedCard 
            jsonPath="public/redirecionamento.json" // Caminho para o arquivo JSON
            title="Maiores clientes por cidade" 
            keyToDisplay="button" // Chave para exibir do JSON
            link="/clientes"
        />
        <OutlinedCard 
            jsonPath="public/resultado_vendas.json" // Caminho para o arquivo JSON
            title="Modelo mais vendido" 
            keyToDisplay="modelo_mais_vendido" // Chave para exibir do JSON
            link="/modelos"
        />
    </div>
  )
}

export default Home