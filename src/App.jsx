import { Routes, Route } from 'react-router-dom'
import { Sidebar } from './componentes/sidebar'
import { Cardapio } from './componentes/cardapio/index.jsx'
import './index.css'


function App() {
  return (
    <>
    <section className=''>
      
      <Sidebar />

<div className="cardapio text-white ml-[200px] overflow-y-auto">
      <Routes>  
       <Route path="/cardapio/:id" element={<Cardapio />} />
      </Routes>
 </div>
    </section>
    </>
  )
}

export default App
