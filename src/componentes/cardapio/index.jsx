import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { adicionarAoPedido, getProdutos } from '../services/api'
import { Sidebar } from '../sidebar'

export const Cardapio = () => {
  const [Produtos, setProdutos] = useState([])
  const [loading, setLoading] = useState(true)
  const [produtoSelecionado, setProdutoSelecionado] = useState(null)
  const [quantidade, setQuantidade] = useState(1)
  const [observacao, setObservacao] = useState('')

  const { pedidoId, idCategoria } = useParams()

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const data = await getProdutos(idCategoria)
        setProdutos(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    carregarProdutos()
  }, [idCategoria])

  return (
    <div className="flex">
      <Sidebar />

      <div
        id="produtos"
        className="min-h-screen bg-white px-6 py-10 flex justify-center w-full"
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
                  bg-[#f0f7ee]
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
                      <h3 className="text-xl font-semibold text-[#414141]">
                        {produto.nome}
                      </h3>

                      <p className="text-gray-600 text-sm mt-2">
                        {produto.descricao}
                      </p>
                    </div>

                    <p className="text-green-400 font-bold text-lg mt-4">
                      R$ {produto.preco}
                    </p>
                  </div>

                  
                  <div className="flex gap-4 ml-auto self-end">
                    

                    <button
                      onClick={() => setProdutoSelecionado(produto)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition cursor-pointer"
                    >
                      Adicionar ao pedido
                    </button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* ================= DIALOG ================= */}
      {produtoSelecionado && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setProdutoSelecionado(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 relative animate-fadeIn"
          >
            {/* Botão fechar */}
            <button
              onClick={() => setProdutoSelecionado(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>

            {/* Imagem */}
            <div className="w-full h-64 overflow-hidden rounded-lg">
              <img
                src={produtoSelecionado.imagem}
                alt={produtoSelecionado.nome}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Conteúdo */}
            <div className="mt-4">
              <h2 className="text-2xl font-bold text-[#414141]">
                {produtoSelecionado.nome}
              </h2>

              <p className="text-gray-600 mt-2">
                {produtoSelecionado.descricao}
              </p>

              <p className="text-green-500 font-bold text-xl mt-4">
                R$ {produtoSelecionado.preco}
              </p>

              <input
                type="text"
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
              />


                <div className="flex items-center gap-4 mt-4">
                  <p>Quantidade: </p>
                 <input
                    type="number"
                    min="1"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                    className="w-20 border border-gray-300 rounded-lg px-3 py-2"
                  />

                </div>

              <button
                className="mt-6 w-full bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 transition"
               onClick={async () => {
                  try {
                    await adicionarAoPedido(
                      pedidoId,
                      produtoSelecionado.id,
                      quantidade,
                      observacao
                    )

                    alert("Produto adicionado com sucesso!")
                    setProdutoSelecionado(null)

                  } catch (error) {
                    alert("Erro ao adicionar produto!")
                    console.error(error)
                  }
                  setObservacao('')
                  setQuantidade(1)
                }}


              >
                Adicionar ao Pedido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
