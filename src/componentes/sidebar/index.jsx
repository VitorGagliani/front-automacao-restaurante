import './style.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCategorias } from '../services/api'

export const Sidebar = () => {
  const [categorias, setCategorias] = useState([])
  const [open, setOpen] = useState(true)
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
    <nav className={`sidebar ${open ? 'open' : 'closed'}`}>
      <div className="sidebar-content">

        <div className="sidebar-header">
          <h2>{open && 'Categorias'}
          <button className="toggle-btn" onClick={() => setOpen(!open)}>
            ☰
          </button>
          </h2>
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <ul>
            {categorias.map(categoria => (
              <li key={categoria.id}>
                <Link to={categoria.rota} className="links">
                  <p>{open && categoria.nome}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}

      </div>
    </nav>
  )
}
