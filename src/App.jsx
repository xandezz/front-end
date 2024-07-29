import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './screens/Home/Home'
import Clientes from './screens/Tables/ClientesPorCidade/Clientes'
import Modelos from './screens/Tables/ModelosMaisVendidos/Modelos'
import TicketMedio from './screens/Tables/TicketMedio/TicketMedio'




function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/front-end" element={<Home />} />
        <Route path="/front-end/clientes" element={<Clientes />} />
        <Route path="/front-end/modelos" element={<Modelos />} />
        <Route path="/front-end/ticket" element={<TicketMedio />} />
      </Routes>
    </BrowserRouter>
  )
}



export default App


