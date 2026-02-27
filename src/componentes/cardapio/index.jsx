import { useEffect, useState } from 'react'
import { useParams,useLocation } from 'react-router-dom'
import { adicionarAoPedido, getCarrinho, getProdutos } from '../services/api'
import { Sidebar } from '../sidebar'


export const Cardapio = () => {
  const [Produtos, setProdutos] = useState([])
  const [loading, setLoading] = useState(true)
  const [produtoSelecionado, setProdutoSelecionado] = useState(null)
  const [carrinho, setCarrinho] = useState(false)
  const [quantidade, setQuantidade] = useState(1)
  const [observacao, setObservacao] = useState('')
  const [carrinhoProdutos, setCarrinhoProdutos] = useState([])
  const location = useLocation()
  const mesa = location.state?.mesa

  const { pedidoId, idCategoria} = useParams()

  //calc carrinho

  const total = carrinhoProdutos.reduce(
  (acc, item) => acc + item.preco * item.quantidade,
  0
)

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

  useEffect(() => {
    async function carregarCarrinho() {
      try {
        const data = await getCarrinho(pedidoId)
        setCarrinhoProdutos(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    carregarCarrinho()
  }, [pedidoId])

  return (
    
    <div className="flex">
        <header className='fixed top-0 right-0 p-6 z-50'>
          <button onClick={() => setCarrinho(pedidoId)}>
            <img src="/cart.svg" alt="Carrinho" className='w-8 h-8 cursor-pointer' />
          </button>
        </header>
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
                  bg-emerald-50
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
                      R$ {produto.preco.toFixed(2)}
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

      {/* ================= DIALOGS ================= */}
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
                R$ {produtoSelecionado.preco.toFixed(2)}
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
                      mesa,
                      produtoSelecionado.id,
                      quantidade,
                      observacao
                    )

                    alert("Produto adicionado com sucesso!")
                    setProdutoSelecionado(null)

                     const carrinhoAtualizado = await getCarrinho(pedidoId)
                      setCarrinhoProdutos(carrinhoAtualizado)

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


       {carrinho && (
  <div
    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-end z-50"
    onClick={() => setCarrinho(false)}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-full max-w-md h-full bg-white shadow-2xl flex flex-col animate-fadeIn"
    >
      
      {/* Header */}
      <div className="p-6 flex justify-between items-center border-b">
        <h1 className="text-2xl font-bold text-[#414141]">
          Seu carrinho
        </h1>

        <button
          onClick={() => setCarrinho(false)}
          className="text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>
      </div>

      {/* Lista de produtos */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {carrinhoProdutos.length === 0 ? (
          <p className="text-gray-400 text-center mt-10">
            Nenhum item adicionado ainda.
          </p>
        ) : (
          carrinhoProdutos.map(item => (
            <div
              key={item.id}
              className="bg-[#f0f7ee] rounded-xl p-4 shadow-md flex justify-between gap-4"
            >
              <div className="flex gap-4">
                <img
                  src={item.produtoImagem}
                  alt={item.nome}
                  className="w-16 h-16 object-cover rounded-lg"
                />

                <div>
                  <h3 className="font-semibold text-[#414141]">
                    {item.nome}
                  </h3>

                  <p className="text-sm text-gray-600">
                    Qtd: {item.quantidade}
                  </p>

                  {item.observacao && (
                    <p className="text-xs text-gray-500 mt-1">
                      Obs: {item.observacao}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <p className="text-green-600 font-bold">
                  R$ {(item.preco * item.quantidade).toFixed(2)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Total */}
      <div className="border-t bg-white p-6">
        <div className="flex justify-between items-center text-lg font-semibold text-[#414141]">
          <span>Total</span>
          <span className="text-green-600 text-xl font-bold">
            R$ {total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  </div>
)}


    </div>
  )
}
