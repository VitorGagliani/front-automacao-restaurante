import './style.css'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCategorias } from '../services/api'

export const Sidebar = () => {
  const [categorias, setCategorias] = useState([])  
  const [loading, setLoading] = useState(true)
  const { pedidoId } = useParams()

  useEffect(() => {
    async function carregarCategorias() {
      try {
        const data = await getCategorias()
        setCategorias(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    carregarCategorias()
  }, [])

  return (
    <nav className='sidebar'>
      <div className="sidebar-content">

        <div className="sidebar-header items-center gap-2">
          <img src="/public/Zesty-Logo.svg" className='w-[40px]' alt="" />
          <h2>{'Categorias'}
          </h2>
        </div>

        {loading ? (
          console.log(categorias),
          <p>Carregando...</p>
        ) : (
          <ul>
  {categorias.map(categoria => (
    <li key={categoria.id}>
     <Link to={`/cardapio/${pedidoId}/${categoria.id}`} className="links">
  <p>{categoria.nome}</p>
</Link>

    </li>
  ))}
</ul>
        )}

      </div>
    </nav>
  )
}
