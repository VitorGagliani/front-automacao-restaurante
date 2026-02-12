import './style.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCategorias } from '../services/api'

export const Sidebar = () => {
  const [categorias, setCategorias] = useState([])  
  const [loading, setLoading] = useState(true)

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

        <div className="sidebar-header">
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
     <Link to={`/cardapio/${categoria.id}`} className="links">
  {open && <p>{categoria.nome}</p>}
</Link>
    </li>
  ))}
</ul>
        )}

      </div>
    </nav>
  )
}
