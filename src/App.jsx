import { Routes, Route } from 'react-router-dom'
import { Sidebar } from './componentes/sidebar'
import { Cardapio } from './componentes/cardapio/index.jsx'
import './index.css'
import { Mesas } from './componentes/mesas/index.jsx'
import { CriaPedido } from './componentes/criaPedido/index.jsx'


function App() {
  return (
    <>
    <section className=''>
      
    <Routes>  
        <Route path="/" element={<Mesas />} />
        <Route path="/cardapio/:pedidoId/:idCategoria" element={<Cardapio />} />
        <Route path="/pedido/:mesaId" element={<CriaPedido />} />
      </Routes>
    </section>
    </>
  )
}

export default App
