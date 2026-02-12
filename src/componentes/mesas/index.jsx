import { useEffect, useState } from "react"
import { getMesas } from "../services/api"
import { useNavigate } from "react-router-dom"

export const Mesas = () => {

const [mesas, setMesas] = useState([])
const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function carregarMesas() {
      try {
        const data = await getMesas()
        setMesas(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    carregarMesas()
  }, [])

  const navigate = useNavigate()

  function handleMesaClick(mesaId) {
  navigate(`/pedido/${mesaId}`)
  }


  return (
  <div className="min-h-screen bg px-6 py-10 bg-white text-black flex flex-col items-center">
    
    <div className="logo mb-2">
      <img src="/public/Zesty-Logo-Preto.svg" className="w-[250px]" alt="" />
    </div>

    <h1 className="text-3xl font-bold text-[#414141] mb-6">
      Selecione a mesa
    </h1>

    {loading ? (
      <p className="text-black">Carregando mesas...</p>
    ) : (
      <div className="grid grid-cols-3 gap-6">
        {mesas.map((mesa) => (
          <div
            key={mesa.id}
            className="bg-[#E1FED1] p-6 rounded-xl text-center hover:bg-[#aea9ae] transition cursor-pointer"
          >
            <button onClick={() => handleMesaClick(mesa.id)}>
             <h2 className="text-xl font-semibold text-[#414141]">
              Mesa {mesa.numero}
            </h2>
            </button>
          </div>
        ))}
      </div>
    )}
    
  </div>
)
;
}