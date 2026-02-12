import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProdutos } from '../services/api'


export const Cardapio = () => {
  const [Produtos, setProdutos] = useState([])
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const data = await getProdutos(id)
        setProdutos(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    carregarProdutos()
  }, [id])

  return (
    <div
      id="produtos"
      className="min-h-screen bg-[#121212] px-6 py-10 flex justify-center"
    >
      <ul className="w-full max-w-3xl space-y-8 gap-[35px] grid">
        {loading ? (
          <p className="text-center text-gray-300 text-lg">
            Carregando...
          </p>
        ) : (
          Produtos.map(produto => (
            <li key={produto.id}>
              <div className="
                flex gap-6
                bg-[#1D1C1C]
                rounded-xl
                shadow-lg
                p-4
                items-center
                hover:scale-[1.02]
                transition-transform
                duration-200
              ">
             
                <div className="w-[140px] h-[140px] flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="w-full h-full object-cover"
                  />
                </div>

            
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {produto.nome}
                    </h3>

                    <p className="text-gray-400 text-sm mt-2">
                      {produto.descricao}
                    </p>
                  </div>

                  <p className="text-green-400 font-bold text-lg mt-4">
                    R$ {produto.preco}
                  </p>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
