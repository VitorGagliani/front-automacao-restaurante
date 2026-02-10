import { Routes, Route } from 'react-router-dom'
import { Sidebar } from './componentes/sidebar'
import { Cardapio } from './componentes/cardapio/index.jsx'
import './index.css'


function App() {
  return (
    <>
    <section>
      
      <Sidebar />

<div className="cardapio ml-[150px] p-6">
      <Routes>  
        <Route path="/" element={<Cardapio />} />
      </Routes>
 </div>
    </section>
    </>
  )
}

export default App
