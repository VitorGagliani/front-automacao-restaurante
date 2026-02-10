import { useEffect, useState } from 'react'
import { getProdutos } from '../services/api'


export const Cardapio = () => {
  const [Produtos, setProdutos] = useState([])
  const [loading, setLoading] = useState(true)
  
  
    useEffect(() => {
      async function carregarProdutos() {
        try {
          const data = await getProdutos()
          setProdutos(data)
        } catch (error) {
          console.error(error)
        } finally {
          setLoading(false)
        }
      }
  
      carregarProdutos()
    }, [])


  return (
    <div id='produtos' className=''>
      <ul className=''>
        {console.log(Produtos)}
    {loading ? (
      <p>Carregando...</p>
    ) : (
      Produtos.map(produto => (
        <li key={produto.id}>
          <div className="card flex">
            <div className="img w-[200px] h-[200px]">
              <img src={produto.imagem}/>
            </div>
            <div className="info p-4"> 
              <h3 className=''>{produto.nome}</h3>
              <p>{produto.descricao}</p>
              <p>R$ {produto.preco}</p>
            </div>
          </div>
        </li>
      ))
    )}
  </ul>
</div>
  )
}